FROM node:14.15.3-alpine

WORKDIR /usr/src/api

RUN echo "unsafe-perm = true" >> ~/.npmrc

RUN apk add --no-cache \
  autoconf \
  automake \
  gcc \
  libc-dev \
  libtool \
  make \
  nasm \
  zlib-dev

RUN npm install -g strapi@beta

COPY . ./strapi-app
COPY strapi.sh ./
RUN chmod +x ./strapi.sh

EXPOSE 1337

COPY healthcheck.js ./
HEALTHCHECK --interval=15s --timeout=5s --start-period=30s \
      CMD node /usr/src/api/healthcheck.js

CMD ["./strapi.sh"]
