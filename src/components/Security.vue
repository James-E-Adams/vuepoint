<template> 
	<div class="row">
	    <div class="col-md-3">
	        {{code}}
	    </div>
	    <div class="col-md-3">
	        {{bid}}</div>
	    <div class="col-md-3">
	        {{ask}}
	    </div>
	    <div class="col-md-3">
	        <button type="button" class="btn btn-success" data-toggle="modal" data-target="#security-modal" id="buy">
	            Buy
	        </button>
	        <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#security-modal" id="sell">
	            Sell
	        </button>
	        <button class="btn btn-warning"> Pop</button>
	    </div>
	</div>
</template>


<script>

	'use strict'
	declare var require: any
	export default {
	 props: {
	  	bid: Number,
	  	ask: Number,
	  	code: String
	  },
		//Do some stuff with the the props.

	}

</script>
