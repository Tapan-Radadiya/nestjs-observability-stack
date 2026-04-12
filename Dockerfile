FROM node:20-alpine AS downloader

WORKDIR /app

RUN npm i -g pnpm

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN pnpm install -g @nestjs/cli

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod=false

FROM downloader AS builder

WORKDIR /app

COPY --from=downloader /app/node_modules /app/node_modules

COPY . .

RUN pnpm run build

FROM node:20-alpine AS runner

WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm i -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod=false

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/prometheus ./prometheus

CMD ["pnpm","run","start:prod"]