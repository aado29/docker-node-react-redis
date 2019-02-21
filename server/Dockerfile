FROM node:8.11.1-alpine

RUN mkdir -p /srv/app/admin-server
WORKDIR /srv/app/admin-server

COPY package.json /srv/app/admin-server
COPY package-lock.json /srv/app/admin-server

RUN npm install

COPY . /srv/app/admin-server

CMD ["npm", "run", "start"]