
// / <reference path="JamesPoint.ts" />
'use strict'
declare var require: any

import VueComponent from 'vue-class-component'
import Popup from './Popup'
import SecurityManager from './SecurityManager'
import PopupManager from './PopupManager'


@VueComponent({
  template: require('./Tabs.html'),
  props: {
  	tabTickers: Boolean,
  	tabPortfolio:Boolean,
  	tabHistory: Boolean,
  },
  components: {
	Popup,
	SecurityManager,
	PopupManager
  }


})

export default class {
    tabTickers = true;
    tabPortfolio = false;
    tabHistory =  false;

    tickers() {
    	this.tabTickers = true
        this.tabPortfolio = false
        this.tabHistory = false
    }
    portfolio() {
	    this.tabTickers = false
	    this.tabPortfolio = true
	    this.tabHistory = false
	}
    history() {
	    this.tabTickers = false
	    this.tabPortfolio = false
	    this.tabHistory = true
	}

};