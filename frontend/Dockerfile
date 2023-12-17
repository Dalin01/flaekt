# Install dependencies
FROM node:18-alpine AS deps

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Build source code
FROM deps AS builder

WORKDIR /app

ARG APP_URL=localhost
ENV VITE_APP_URL=${APP_URL}

COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn run build && yarn install --production --ignore-scripts --prefer-offline

# Runtime image
FROM builder AS runner

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/build ./build

RUN yarn global add serve

EXPOSE 3001

CMD ["serve", "-s", "build", "-l", "3001"]
