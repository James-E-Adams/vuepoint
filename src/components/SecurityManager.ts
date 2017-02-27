'use strict'
declare var require: any

import VueComponent from 'vue-class-component'
// import {JamesPoint} from './JamesPoint';
import Security from './Security';

@VueComponent({
  template: require('./SecurityManager.html'),
  props: {
  	securities: Array<JamesPoint.StandardSecurity>()
  },
  components: {
  	Security
  }
})
export default class {
	   // securities = [{
    //                     "code": 'bah',
    //                     "bid": 5,
    //                     "ask": 21,
    //                     "holdings": 0
    //                     }];

}
