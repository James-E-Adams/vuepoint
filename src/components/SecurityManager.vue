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

	var Security = require('./Security.vue').default;

	export default {
		components: {
			Security
		}

	}


</script>
