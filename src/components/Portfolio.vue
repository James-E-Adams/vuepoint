<template> 
    <div id="portfolio" class="container">
        <div class="row">
            <div class="col-md-6">Code</div>
            <div class="col-md-6">Position</div>
        </div>
        <div class="row">
            <div class="col-md-6"> POO</div>
            <div class="col-md-6">100%</div>
        </div>
    </div>
</template>

<script>
    'use strict';
    declare var require: any;
    import {JamesPoint} from './JamesPoint';

    export default {

        props: {
            securities: Array<JamesPoint.StandardSecurity>(),
        },
        components: {
        },

    }
</script>