//Note: Hincrby float wasn't implemented in node_redis. If I get time it might 
//be worth making a pull request..

import { RedisClient } from 'redis';
import * as Bluebird from 'bluebird';
import * as express from 'express';
import * as http from 'http';
import * as socket from 'socket.io';
import * as webpack from 'webpack';

//to handle all the redis async stuff. 
declare module "redis" {

    interface RedisClient extends NodeJS.EventEmitter {
        hgetallAsync(key:string): Promise<Object>;
        smembersAsync(key: string): Promise<string[]>;
        getAsync(key:string): Promise<Object>;
    }

}

namespace Externals {
    export const express = require('express');
    export const http = require('http');
    export const path = require('path');
    export const fs = require('fs');
    export const redis = require('redis');
    export const bluebird = require('bluebird');
    export const io = require('socket.io');
    export const config = require('./webpack.dev.conf')
    export const webpack = require('webpack');
}

namespace Constants {
    export const sides = ["bid","ask"];
    export const securities_file = 'securities.json';
    //How often securities' prices are sent to the 
    export const SOCKET_EMIT_SPEED = 1000;
}

namespace JamesPoint {
    export class Server { 

        //vars
        codes: Array<string>;
        client: RedisClient;
        app: express.Application;
        server: http.Server;
        io: SocketIO.Server;
        compiler: any;

        constructor() {
            this.compiler = Externals.webpack(Externals.config);
            this.codes = JSON.parse(Externals.fs.readFileSync(Constants.securities_file,'utf8')).codes
            this.client = Externals.redis.createClient();
            this.app = Externals.express();
            // this.server=Externals.http.createServer(this.app);
            // this.io=Externals.io.listen(this.server);

            //Webpack stuff.

            // handle fallback for HTML5 history API
            this.app.use(require('connect-history-api-fallback')())
            // serve webpack bundle output
            this.app.use(require('webpack-dev-middleware')(this.compiler, {
              publicPath: Externals.config.output.publicPath,
              stats: {
                colors: true,
                chunks: false
              }
            }))
            // enable hot-reload and state-preserving
            // compilation error display
            this.app.use(require('webpack-hot-middleware')(this.compiler))

            Bluebird.promisifyAll(Externals.redis.RedisClient.prototype);
            Bluebird.promisifyAll(Externals.redis.Multi.prototype, {});
            this.onRedisConnect();


            //OLD SERVER

            // //Listen on Port 3000
            // this.server.listen(3000);
            // //Serves everything in the public folder
            // this.app.use('/static', Externals.express.static(Externals.path.join(__dirname, 'public')));
            // // Handle connection to the websocket


            //NEW SERVER
            this.server = this.app.listen(8080);

            this.io = Externals.io.listen(this.server);

            this.app.listen(8080, 'localhost', function (err) {
              if (err) {
                console.log(err)
                return
              }
              console.log('Listening at http://localhost:8080')
            });

            //IO Socket stuff


            this.io.on('connection', async (socket) => {
                console.log("we got a connection!")
                setInterval( async () => {
                    const codes = await this.client.smembersAsync('codes');
                    const arr = await Bluebird.map(codes, this.lookupCode);
                    socket.emit('dude', arr);
                },Constants.SOCKET_EMIT_SPEED);
            });

        }
        //Does everything needed when connecting initially to redis, as well as 
        //setting up the randomwalk at interval.
        onRedisConnect () {
            const that=this;
            //Done on connection to Redis.                
            this.client.on('connect', function() {
                //Clear codes:
                this.del('codes');
                //add the securities' codes in the format that redis likes
                var redis_arg = that.codes.slice(0);
                //then add codes to the front.
                redis_arg.unshift('codes');

                this.sadd(redis_arg);
                //store some basic bid/ask
                for(var i=0; i<that.codes.length;i++){
                    this.hmset(that.codes[i], Constants.sides[0], i, Constants.sides[1], 2*i);
                }
                //Make it do randomwalks every second.
                setInterval(() => SecurityFluctuation.randomWalk(this,that.codes), SecurityFluctuation.RANDOM_WALK_FREQUENCY);
            });
        }
        //Looks up the bid/ask for a given code, async.
        lookupCode = async (code) => {
            //Look at all the codes
            const data = await this.client.hgetallAsync(code)
            return ({ ...data, code })
        }
    }
}

namespace SecurityFluctuation{

    //This process is O(3N) where N = number of codes. 
    //Can't think of a more efficient way to do it with still using the
    //previous bid as a starting point.

    export function randomWalk(client,codes) {
        //Iterating over all codes and bid/ask
        for (var code in codes) {
            //Get the current bid:
            var current_bid = client.hget(codes[code], 'bid');
            //Workout increment amount for the bid
            //Random number between 0 and 9
            var incr_amount = Math.round(Math.random()*9)
            //Let's change that to -5 and 5:
            if(incr_amount>5) { incr_amount-=11;}
            var new_bid = current_bid+incr_amount;
            //Incase the new_bid is under 0:
            if (new_bid<0) {
                new_bid=-new_bid;
            }
            //calculate ask to new current bid + random number between 1 and 5:
            var new_ask = new_bid+Math.round(Math.random()*5);
            //set in redis new bid/ask amounts.
            client.hmset(codes[code], 'bid', new_bid, 'ask', new_ask);
        }
    }

    export const RANDOM_WALK_FREQUENCY = 1;
}


//Set up the server!
new JamesPoint.Server();


