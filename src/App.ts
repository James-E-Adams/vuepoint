'use strict'
declare var require: any
declare var expose: any

import VueComponent from 'vue-class-component'

var Tabs = require('./components/Tabs.vue').default;
require('expose?$!expose?jQuery!jquery');
require('./App.css')
require('./bootstrap-grid.css');
require('./bootstrap-reboot.css');
require('./bootstrap.css');
require('bootstrap');

@VueComponent({
  template: require('./App.html'),

  props: {
  },
  components: {
    Tabs,
  }

})
export default class {


}
