const Redis = require('ioredis');
const fs = require('fs');

const redis = new Redis({
    host: 'redis-18891.c60.us-west-1-2.ec2.cloud.redislabs.com',
    port: 18891,
    password: '8Fg0mqTkelMSRQQpwLiGw8cbdMaUFok9'
});

module.exports = redis