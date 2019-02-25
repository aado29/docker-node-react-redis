FROM redis:4.0.5-alpine

RUN mkdir -p /srv/app/redis-data
WORKDIR /srv/app/redis-data

CMD ["redis-server", "--appendonly", "yes"]