//Note: Hincrby float wasn't implemented in node_redis. If I get time it might 
//be worth making a pull request..
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Bluebird = require("bluebird");
var Externals;
(function (Externals) {
    Externals.express = require('express');
    Externals.http = require('http');
    Externals.path = require('path');
    Externals.fs = require('fs');
    Externals.redis = require('redis');
    Externals.bluebird = require('bluebird');
    Externals.io = require('socket.io');
    Externals.config = require('./webpack.dev.conf');
    Externals.webpack = require('webpack');
})(Externals || (Externals = {}));
var Constants;
(function (Constants) {
    Constants.sides = ["bid", "ask"];
    Constants.securities_file = 'securities.json';
    //How often securities' prices are sent to the 
    Constants.SOCKET_EMIT_SPEED = 1000;
})(Constants || (Constants = {}));
var JamesPoint;
(function (JamesPoint) {
    var Server = (function () {
        function Server() {
            var _this = this;
            //Looks up the bid/ask for a given code, async.
            this.lookupCode = function (code) { return __awaiter(_this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.client.hgetallAsync(code)];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, (__assign({}, data, { code: code }))];
                    }
                });
            }); };
            this.compiler = Externals.webpack(Externals.config);
            this.codes = JSON.parse(Externals.fs.readFileSync(Constants.securities_file, 'utf8')).codes;
            this.client = Externals.redis.createClient();
            this.app = Externals.express();
            this.server = Externals.http.createServer(this.app);
            this.io = Externals.io.listen(this.server);
            //Webpack stuff.
            // handle fallback for HTML5 history API
            this.app.use(require('connect-history-api-fallback')());
            // serve webpack bundle output
            this.app.use(require('webpack-dev-middleware')(this.compiler, {
                publicPath: Externals.config.output.publicPath,
                stats: {
                    colors: true,
                    chunks: false
                }
            }));
            // enable hot-reload and state-preserving
            // compilation error display
            this.app.use(require('webpack-hot-middleware')(this.compiler));
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
            this.app.listen(8080, 'localhost', function (err) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('Listening at http://localhost:8080');
            });
            //IO Socket stuff
            this.io.on('connection', function (socket) { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    console.log("we got a connection!");
                    setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                        var codes, arr;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.client.smembersAsync('codes')];
                                case 1:
                                    codes = _a.sent();
                                    return [4 /*yield*/, Bluebird.map(codes, this.lookupCode)];
                                case 2:
                                    arr = _a.sent();
                                    console.log("emitting!");
                                    socket.emit('dude', arr);
                                    return [2 /*return*/];
                            }
                        });
                    }); }, Constants.SOCKET_EMIT_SPEED);
                    return [2 /*return*/];
                });
            }); });
        }
        //Does everything needed when connecting initially to redis, as well as 
        //setting up the randomwalk at interval.
        Server.prototype.onRedisConnect = function () {
            var that = this;
            //Done on connection to Redis.                
            this.client.on('connect', function () {
                var _this = this;
                //Clear codes:
                this.del('codes');
                //add the securities' codes in the format that redis likes
                var redis_arg = that.codes.slice(0);
                //then add codes to the front.
                redis_arg.unshift('codes');
                this.sadd(redis_arg);
                //store some basic bid/ask
                for (var i = 0; i < that.codes.length; i++) {
                    this.hmset(that.codes[i], Constants.sides[0], i, Constants.sides[1], 2 * i);
                }
                //Make it do randomwalks every second.
                setInterval(function () { return SecurityFluctuation.randomWalk(_this, that.codes); }, SecurityFluctuation.RANDOM_WALK_FREQUENCY);
            });
        };
        return Server;
    }());
    JamesPoint.Server = Server;
})(JamesPoint || (JamesPoint = {}));
var SecurityFluctuation;
(function (SecurityFluctuation) {
    //This process is O(3N) where N = number of codes. 
    //Can't think of a more efficient way to do it with still using the
    //previous bid as a starting point.
    function randomWalk(client, codes) {
        //Iterating over all codes and bid/ask
        for (var code in codes) {
            //Get the current bid:
            var current_bid = client.hget(codes[code], 'bid');
            //Workout increment amount for the bid
            //Random number between 0 and 9
            var incr_amount = Math.round(Math.random() * 9);
            //Let's change that to -5 and 5:
            if (incr_amount > 5) {
                incr_amount -= 11;
            }
            var new_bid = current_bid + incr_amount;
            //Incase the new_bid is under 0:
            if (new_bid < 0) {
                new_bid = -new_bid;
            }
            //calculate ask to new current bid + random number between 1 and 5:
            var new_ask = new_bid + Math.round(Math.random() * 5);
            //set in redis new bid/ask amounts.
            client.hmset(codes[code], 'bid', new_bid, 'ask', new_ask);
        }
    }
    SecurityFluctuation.randomWalk = randomWalk;
    SecurityFluctuation.RANDOM_WALK_FREQUENCY = 1;
})(SecurityFluctuation || (SecurityFluctuation = {}));
//Set up the server!
new JamesPoint.Server();
