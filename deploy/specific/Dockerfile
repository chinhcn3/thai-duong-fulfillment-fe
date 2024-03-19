FROM 532150849273.dkr.ecr.ap-northeast-1.amazonaws.com/project-cost_aweb:base as staging-production
ARG NPM_GITHUB_PAT
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json yarn.lock .npmrc ./
RUN yarn install
# only copy from circleCI to run here, not build in this image
COPY /.next ./.next
RUN rm -rf ./.npmrc
CMD ["yarn", "start"]
EXPOSE 3000
