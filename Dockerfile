FROM node:alpine AS builder
RUN apk update && apk upgrade

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN --mount=type=secret,id=env,required=true \
	sh -ec 'tr -d "\r" < /run/secrets/env > /tmp/build.env; set -a; . /tmp/build.env; set +a; npm run build'

FROM nginx:alpine-slim
RUN apk update && apk upgrade

LABEL org.opencontainers.image.title="ODSZ"
LABEL org.opencontainers.image.description="React application served with Nginx"
LABEL org.opencontainers.image.version="1.0"

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
