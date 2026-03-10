# ---------- BUILD STAGE ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build
RUN --mount=type=secret,id=supabase_url \
    --mount=type=secret,id=supabase_anon_key \
    VITE_SUPABASE_URL=$(cat /run/secrets/supabase_url) \
    VITE_SUPABASE_ANON_KEY=$(cat /run/secrets/supabase_anon_key) \
    npm run build

# ---------- RUNTIME STAGE ----------
FROM nginx:alpine-slim

# Image metadata
LABEL org.opencontainers.image.title="ODS"
LABEL org.opencontainers.image.description="React application served with Nginx"
LABEL org.opencontainers.image.version="1.0"

# Copy the compiled React build from the builder stage
# into the Nginx public directory
COPY --from=builder /app/dist /usr/share/nginx/html
# Replace default Nginx configuration
# Usually used for SPA routing (React Router fallback to index.html)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080
EXPOSE 8080

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]