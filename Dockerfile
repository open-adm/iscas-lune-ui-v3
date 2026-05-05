FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

#RUN npm run build
RUN npm run build && rm -rf node_modules && npm install --production --legacy-peer-deps

FROM node:24-alpine

WORKDIR /app

COPY --from=builder /app ./

RUN npm prune --production

EXPOSE 8081
ENV TZ=America/Sao_Paulo

CMD ["npm", "start"]
