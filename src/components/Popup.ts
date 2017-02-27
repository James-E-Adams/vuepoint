'use strict'
declare var require: any

import VueComponent from 'vue-class-component'
var interact = require('interactjs');
@VueComponent({
  template: require('./Popup.html'),
  props: {
  	code: String,
  	holdings: Number
  },
})

export default class {

	ready(){
		this.makeDrag('.virtual-window');
    }
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
    }
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
