<template>
    <div id="tabs">
        <div class="tabs-header">
            <span :class="{'active': tabTickers}" @click="tickers">Tickers & Pop-ups</span>
            <span :class="{'active': tabPortfolio}" @click="portfolio">Portfolio</span>
            <span :class="{'active': tabHistory}" @click="history">Transaction History</span>
        </div>
        <div class="tabs-content">
            <div v-if="tabTickers">
                <security-manager v-bind:securities = "securities"></security-manager>
                <popup-manager v-bind:securities = "securities"></popup-manager>
            </div>
            <div v-else-if="tabPortfolio">
                <portfolio></portfolio>
            </div>
            <div v-else>
                <transaction-list></transaction-list>
            </div>
        </div>
    </div>
</template>

<script>
    var io:SocketIOClientStatic = require('socket.io-client');
    import Popup from './Popup'
    var SecurityManager = require('./SecurityManager.vue').default;
    var PopupManager = require('./PopupManager.vue').default;
    var Portfolio = require('./Portfolio.vue').default;
    var TransactionList = require('./TransactionList.vue').default;
    import {JamesPoint} from './JamesPoint';
    

    export default {
        props: {
            tabTickers: Boolean,
            tabPortfolio:Boolean,
            tabHistory: Boolean,
            securities: Array<JamesPoint.StandardSecurity>(),
            socket: io.Socket,
            securityLookUp: Object,

        },
        methods: {
            tickers(): void {
                this.tabTickers = true
                this.tabPortfolio = false
                this.tabHistory = false
            },
            portfolio(): void {
                this.tabTickers = false
                this.tabPortfolio = true
                this.tabHistory = false
            },
            history(): void {
                this.tabTickers = false
                this.tabPortfolio = false
                this.tabHistory = true
            },
            //Handles a message in from the socket.
            onEmit(data: Array<JamesPoint.IncomingSecurity>) {
                for (var i=0; i< data.length; i++) {
                    var position = this.securityLookUp[data[i].code];
                    if (position!==undefined) {
                        //Cool, it's already in there:
                        //Update the bid and ask:
                        this.securities[position].bid = data[i].bid;
                        this.securities[position].ask = data[i].ask;
                    } else {
                       var new_position = this.securities.push( {
                            "code": data[i].code,
                            "bid": data[i].bid,
                            "ask": data[i].ask,
                            "holdings": 0
                            }
                        )
                        //store the new position:
                        this.securityLookUp[data[i].code]=Number(new_position)-1;
                    }
                }
            }
        },

        mounted: function() {
            this.tabTickers=true;
            //initialise securities stuff
            this.securities=[];
            this.securityLookUp=[];
            //Handle socket stuff
            this.socket = io('http://localhost:8080');
            this.socket.on('dude', (data) => {
                this.onEmit(data);
            });
        },

        components: {
            SecurityManager,
            PopupManager,
            Portfolio,
            TransactionList
        }
    }
</script>
