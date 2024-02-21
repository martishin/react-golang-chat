# base
FROM node:16 AS base

WORKDIR /usr/src/app

COPY package*.json ./
    
RUN npm install

COPY . .

# for lint

FROM base as linter

WORKDIR /usr/src/app

RUN npm run lint

# for build

FROM linter as builder

WORKDIR /usr/src/app

RUN npm run build


# for production
FROM nginx:1.25.4-alpine

# Copy built files from the build stage to the production image
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Container startup command for the web server (nginx in this case)
ENTRYPOINT ["nginx", "-g", "daemon off;"]
