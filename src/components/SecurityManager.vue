<template> 
	<div id="security-manager">
	    <div class="container">
	        <div class="row main-head">
	            <div class="col-md-3">Code</div>
	            <div class="col-md-3">Bid</div>
	            <div class="col-md-3">Ask</div>
	            <div class="col-md-3">Actions</div>
	        </div>
	        
	        <security v-bind:bid="1" v-bind:ask="2" code="potato"></security>
	    </div>
	</div>
</template>

<script>

	'use strict';
	declare var require: any;
	import {JamesPoint} from './JamesPoint';
	var Security = require('./Security.vue').default;
	var io:SocketIOClientStatic = require('socket.io-client');


	export default {

		props: {
			securities: Array<JamesPoint.StandardSecurity>(),
			socket: io.Socket
		},
		components: {
			Security
		},
		mounted: function() {
			console.log('in here');
			//Handle socket stuff
            this.socket = io('http://localhost:8080');
            // this.socket.on('dude', (data) => {
            // 	console.log(data);
            //     this.onEmit(data);
            // });
		}



	}


</script>
