'use strict'
declare var require: any

import VueComponent from 'vue-class-component'
import Popup from './Popup';


@VueComponent({
  template: require('./PopupManager.html'),
  props: {
  },
  components: {
  	Popup
  }
})
export default class {



    // console.log('Does this get run?');
}
