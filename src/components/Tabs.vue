<template>
    <div id="tabs">
        <div class="tabs-header">
            <span :class="{'active': tabTickers}" @click="tickers">Tickers & Pop-ups</span>
            <span :class="{'active': tabPortfolio}" @click="portfolio">Portfolio</span>
            <span :class="{'active': tabHistory}" @click="history">Transaction History</span>
        </div>
        <div class="tabs-content">
            <div v-if="tabTickers">
                <security-manager></security-manager>
                <popup-manager></popup-manager>
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
    import Popup from './Popup'
    var SecurityManager = require('./SecurityManager.vue').default;
    var PopupManager = require('./PopupManager.vue').default;
    var Portfolio = require('./Portfolio.vue').default;
    var TransactionList = require('./TransactionList.vue').default;

    export default {
        props: {
            tabTickers: Boolean,
            tabPortfolio:Boolean,
            tabHistory: Boolean,
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
            }
        },

        mounted: function() {
            this.tabTickers=true;
        },

        components: {
            SecurityManager,
            PopupManager,
            Portfolio,
            TransactionList
        }
    }
</script>
