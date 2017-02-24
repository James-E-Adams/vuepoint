'use strict'
declare var require: any

import VueComponent from 'vue-class-component'

import Hello from './components/Hello'

require('./App.css')

@VueComponent({
  template: require('./App.html'),
  components: {
    Hello
  }
})
export default class {
}
