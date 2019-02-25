import redis from 'redis';

const client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

client.on('connect', function() {
  console.log('Connected to Redis...');
});

const redisMiddleware = (req, res, next) => {
  let key = "__expIress__" + req.originalUrl || req.url;
  client.get(key, function(err, reply) {
    if (reply) {
      res.send(JSON.parse(reply));
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        client.set(key, JSON.stringify(body));
        res.sendResponse(body);
      }
      next();
    }
  });
}

export default redisMiddleware;