'use strict'
declare var require: any
declare var expose: any

import VueComponent from 'vue-class-component'

import Popup from './components/Popup'
import Tabs from './components/Tabs'

require('expose?$!expose?jQuery!jquery');
require('./App.css')
require('./bootstrap-grid.css');
require('./bootstrap-reboot.css');
require('./bootstrap.css');
require('bootstrap');
require('interactjs');

@VueComponent({
  template: require('./App.html'),

  props: {
  },
  components: {
    Popup,
    Tabs
  }
})
export default class {


}
