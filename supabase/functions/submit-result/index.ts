import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const VALID_CATEGORIES = ['dream', 'soul', 'adventure'] as const;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

type TurnstileVerifyResponse = {
  success: boolean;
};

async function verifyTurnstile(token: string, req: Request): Promise<boolean> {
  const secret = Deno.env.get('TURNSTILE_SECRET_KEY');
  if (!secret) {
    console.error('TURNSTILE_SECRET_KEY is not configured');
    return false;
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const body = new URLSearchParams({
    secret,
    response: token,
  });
  if (ip) {
    body.set('remoteip', ip);
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  const data = (await response.json()) as TurnstileVerifyResponse;
  return data.success === true;
}

function jsonResponse(body: Record<string, unknown>, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  try {
    const { category, captchaToken } = await req.json();

    if (!VALID_CATEGORIES.includes(category)) {
      return jsonResponse({ error: 'Invalid category' }, 400);
    }

    if (!captchaToken || typeof captchaToken !== 'string') {
      return jsonResponse({ error: 'Missing captcha token' }, 400);
    }

    const captchaValid = await verifyTurnstile(captchaToken, req);
    if (!captchaValid) {
      return jsonResponse({ error: 'Captcha verification failed' }, 403);
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!supabaseUrl || !serviceRoleKey) {
      console.error('Supabase environment variables are not configured');
      return jsonResponse({ error: 'Server configuration error' }, 500);
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const { error } = await supabase.rpc('increment_result_count', {
      p_category: category,
    });

    if (error) {
      console.error('Failed to increment category count', error);
      return jsonResponse({ error: 'Failed to save result' }, 500);
    }

    return jsonResponse({ ok: true }, 200);
  } catch (error) {
    console.error('submit-result error', error);
    return jsonResponse({ error: 'Internal server error' }, 500);
  }
});
