FROM node:16
WORKDIR /usr/src/clean_ts_api
COPY ./package.json .
RUN npm install --only=prod