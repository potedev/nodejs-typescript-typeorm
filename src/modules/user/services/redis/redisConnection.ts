import redis from 'redis';

const redisConnection = redis.createClient()

redisConnection.on('connect', () => {
    console.log(`[Redis]: Connected to redis server`)
});

//Get a redis connection
export { redisConnection }
