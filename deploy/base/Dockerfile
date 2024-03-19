FROM node:18-alpine3.16 as base
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json yarn.lock ./
COPY node_modules ./node_modules
RUN yarn install
CMD ["sh", "-c", "tail -f /dev/null"]
