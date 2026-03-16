# ---------- BUILD STAGE ----------
FROM node:alpine AS builder 
# Run update and upgrade to have the latest security patches
RUN apk update && apk upgrade

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build
RUN npm run build

# ---------- RUNTIME STAGE ----------
FROM nginx:alpine-slim
# Run update and upgrade to have the latest security patches
RUN apk update && apk upgrade
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