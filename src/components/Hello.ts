'use strict'
declare var require: any

import VueComponent from 'vue-class-component'

@VueComponent({
  template: require('./Hello.html')
})
export default class {
  data(): { msg: string } {
    return {
      msg: 'Hello Worldd!'
    }
  }
}
