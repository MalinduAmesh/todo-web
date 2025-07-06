# 1) Build stage
FROM node:18-alpine AS build
WORKDIR /app

# install deps and build
COPY package*.json tsconfig.json vite.config.ts ./
COPY public ./public
COPY src ./src
RUN npm ci && npm run build

# 2) Serve stage
FROM nginx:stable-alpine
# Copy built assets into Nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
