FROM node:17-alpine3.12 as base
WORKDIR /app

ARG GITHUB_ACCESS_TOKEN
RUN apk add --no-cache git && \
  git config --global --add url."https://${GITHUB_ACCESS_TOKEN}:x-oauth-basic@github.com/moneyforwardvietnam".insteadOf "https://github.com/moneyforwardvietnam" && \
  git config --global --add url."https://${GITHUB_ACCESS_TOKEN}:x-oauth-basic@github.com/moneyforwardvietnam".insteadOf "git@github.com:moneyforwardvietnam" 

ENV PATH /app/node_modules/.bin:$PATH
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
RUN git submodule update --init --recursive  
RUN yarn build
CMD ["yarn", "start"]
EXPOSE 3000