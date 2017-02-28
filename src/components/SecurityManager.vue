<template> 
	<div id="security-manager">
	    <div class="container">
	        <div class="row main-head">
	            <div class="col-md-3">Code</div>
	            <div class="col-md-3">Bid</div>
	            <div class="col-md-3">Ask</div>
	            <div class="col-md-3">Actions</div>
	        </div>
	        <!-- render the securities. (so easy) -->
	        <security v-for="security in securities" v-bind:ask="(Number)(security.ask)" v-bind:bid="(Number)(security.bid)" v-bind:code="security.code"></security>
	    </div>
	</div>
</template>

<script>
	///<reference path="../../node_modules/@types/socket.io-client/index.d.ts"/>

	'use strict';
	declare var require: any;
	import {JamesPoint} from './JamesPoint';
	var Security = require('./Security.vue').default;

	export default {

		props: {
			securities: Array<JamesPoint.StandardSecurity>(),
			securityLookUp: Object,
		},
		components: {
			Security
		},

	}


</script>
