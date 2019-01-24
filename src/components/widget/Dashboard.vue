<template>
    <div>
          <grid-layout
                :layout.sync        ="getDashboardWidgets"
                :col-num            ="getGridLayoutOptions.column"
                :row-height         ="getGridLayoutOptions.rowHeight"
                :is-draggable       ="getGridLayoutOptions.isDraggable"
                :is-resizable       ="getGridLayoutOptions.isResizable"
                :is-mirrored        ="getGridLayoutOptions.isMirrored"
                :vertical-compact   ="getGridLayoutOptions.verticalCompact"
                :horizontal-compact ="getGridLayoutOptions.horizontalCompact"
                :margin             ="[getGridLayoutOptions.marginX, getGridLayoutOptions.marginY]"
                :auto-size          ="getGridLayoutOptions.autoSize"
                @layout-updated     ="layoutUpdatedEvent"
                :use-css-transforms ="getGridLayoutOptions.useCssTransforms"
                >
            <grid-item v-for="(item,index) in getDashboardWidgets"
                    :x      ="item.x"
                    :y      ="item.y"
                    :w      ="item.w"
                    :h      ="item.h"
                    :i      ="item.i" 
                    :key    ="item.i"
                    drag-ignore-from=".no-drag" >
                <b-card header-bg-variant="primary"  header-text-variant="white" class="inherited-style" no-body>
                    <div slot="header">{{item.component.title}}
                        <span> 
                            <b-dropdown id="ddown-right" class="float-right" variant="primary" right text="Settings" no-caret>
                                <template slot="button-content">&#x2699;</template>
                                <b-dropdown-item-button>Edit</b-dropdown-item-button>
                                <b-dropdown-item-button @click="deleteWidget(index,$event)">Delete</b-dropdown-item-button>
                            </b-dropdown>
                        </span>
                    </div>
                    <component v-bind:is="item.component.id" class="no-drag overflow"  :width="item.w" ></component>
                </b-card>
            </grid-item>
        </grid-layout> 
    </div>
</template>

<script>

    import VueGridLayout from 'vue-grid-layout';
    import {mapGetters,} from 'vuex'
    import { EventBus } from './eventBus';
    import * as _ from 'lodash';
    export default {
        data() {
            return {

            }
        },
        methods: {
            layoutUpdatedEvent: function(newLayout){
                // this.$store.dispatch('findColumnHighestRow');
            },
            deleteWidget: function(index,event) {
                if ( confirm("Are you sure?") ) {
                    this.$store.dispatch('deleteDashboardWidget',index);
                }
            },
        },
        computed: {
            ...mapGetters(['getDashboardWidgets','getGridLayoutOptions']),
        },
        created: function(){
            // this.$store.dispatch('findColumnHighestRow');
            this.$store.dispatch('dashboardWidgets');
        },
        mounted: function(){
            this.$store.dispatch('updateCurrentWidgetId');
        }

    }
</script>

<style scoped>

.parent{
    resize: both;
    overflow: auto;
    display: block;
    border: 1px solid black;
}

.inherited-style{
    height:inherit;
    width: inherit;
}

.overflow{
    overflow:auto;
    padding:20px;
}
</style>
