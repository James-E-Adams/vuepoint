'use strict'
declare var require: any

import VueComponent from 'vue-class-component'


@VueComponent({
  template: require('./Security.html'),
  props: {
  	bid: Number,
  	ask: Number,
  	code: String
  },
})
export default class {

	//Do some stuff with the the props.

}
