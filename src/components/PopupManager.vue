<template>

<popup v-bind:code="bha" v-bind:holdings="0"></popup>
</template>


<script>
	
	'use strict';
	declare var require: any;
	var Popup = require('./Popup.vue').default;

	export default {
		props: {},
		components: {
			Popup
		}
	}

</script>