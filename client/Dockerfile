FROM node:8.11.1-alpine

RUN mkdir -p /srv/app/admin-client
WORKDIR /srv/app/admin-client

COPY package.json /srv/app/admin-client
COPY package-lock.json /srv/app/admin-client

RUN npm install

COPY . /srv/app/admin-client

CMD ["yarn", "start"]