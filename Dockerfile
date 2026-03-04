# cgr.dev/chainguard/node:latest-dev — zero CVE Node image by Chainguard.
# "-dev" variant includes npm/shell needed for building.
# The free tier only provides :latest (rebuilt + patched daily).
FROM cgr.dev/chainguard/node:latest-dev AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

COPY . .
RUN npm run build


# cgr.dev/chainguard/nginx — zero CVE nginx, runs as non-root (uid 65532).
# Rebuilt daily. Consistently scores 0 CVEs on Trivy/Snyk/Docker Scout.
FROM cgr.dev/chainguard/nginx:latest AS runner

COPY --from=builder --chown=65532:65532 /app/dist /usr/share/nginx/html
COPY --chown=65532:65532 nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

