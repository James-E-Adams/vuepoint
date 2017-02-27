<template>

	<div class="virtual-window">
	    <span class="popup-code">{{code}}</span>
	    <div class="popup-close">
	        <button class="btn btn-warning"> X</button>
	    </div>
	    <!-- Is this bad practice? -->
	    <br>
	    <hr>
	    <div>
	        <span class="popup-holdings-title"> 
	        Current Position:
	        </span>
	        <span class="popup-holdings-title">{{holdings}}</span>
	    </div>
	    <!-- <b> Index: <h4 data-bind="text: $parent"></h4></b> -->
	    <div class="container popup-table">
	        <div class="row">
	            <div class="col-md-6">Bid</div>
	            <div class="col-md-6">Ask</div>
	        </div>
	        <div class="row">
	            <div class="col-md-6">
	                <button type="button" class="btn btn-success" data-toggle="modal" data-target="#security-modal" id="buy">
	                    Buy
	                </button>
	            </div>
	            <div class="col-md-6">
	                <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#security-modal" id="sell">
	                    Sell
	                </button>
	            </div>
	        </div>
	    </div>
	</div>


</template>

<script>

	'use strict';
	declare var require: any;
	var interact = require('interactjs');

	export default {

		props: {
		  	code: String,
		  	holdings: Number
	  	},

	  	mounted: function ()  {
	  		this.makeDrag('.virtual-window')
	  	},

	  	methods: {
			 //##########################################
		  		
		    //Functions to handle Draggable/Resizable using InteractJS
		    makeDrag(element_name: string) {
		        // target elements with the "element_name" class
		        interact(element_name)
		            .draggable( {
		              onmove: this.dragMoveListener
		              })
		            .resizable({
		                preserveAspectRatio: true,
		                edges: { left: true, right: true, bottom: true, top: true }
		              })
		              .on('resizemove', function (event) {
		                var target = event.target;
		                var x = (parseFloat(target.getAttribute('data-x')) || 0);
		                var y = (parseFloat(target.getAttribute('data-y')) || 0);
		                // update the element's style
		                target.style.width  = event.rect.width + 'px';
		                target.style.height = event.rect.height + 'px';
		                // translate when resizing from top or left edges
		                x += event.deltaRect.left;
		                y += event.deltaRect.top;
		                target.style.webkitTransform = target.style.transform ='translate(' + x + 'px,' + y + 'px)';
		                target.setAttribute('data-x', x);
		                target.setAttribute('data-y', y);
		              });
		    },
		    //Event handler for when a popup is moved.
		    dragMoveListener (event) {
		        var target = event.target,
		            // keep the dragged position in the data-x/data-y attributes
		            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
		            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

		        // translate the element
		        target.style.webkitTransform =
		        target.style.transform =
		          'translate(' + x + 'px, ' + y + 'px)';

		        // update the posiion attributes
		        target.setAttribute('data-x', x);
		        target.setAttribute('data-y', y);
		    }
		}
	}


</script>