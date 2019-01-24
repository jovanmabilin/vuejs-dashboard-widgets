<template>
    <div>
          <grid-layout
                :layout.sync="getDashboardWidgets"
                :col-num="3"
                :row-height="20"
                :is-draggable="true"
                :is-resizable="true"
                :is-mirrored="false"
                :vertical-compact="true"
                :horizontal-compact="true"
                :margin="[10, 10]"
                :auto-size="true"
                @layout-updated="layoutUpdatedEvent"
                :use-css-transforms="false">
            <grid-item v-for="(item,index) in getDashboardWidgets"
                    :x="item.x"
                    :y="item.y"
                    :w="item.w"
                    :h="item.h"
                    :i="item.i" 
                    @moved="movedEvent"
                    @resized="resizedEvent">
                <b-card header-bg-variant="primary"  header-text-variant="white">
                    <div slot="header">{{item.component.title}}
                        <span> 
                                <b-dropdown id="ddown-right" class="float-right" variant="primary" right text="Settings" no-caret>
                                    <template slot="button-content">&#x2699;</template>
                                    <b-dropdown-item-button>Edit</b-dropdown-item-button>
                                    <b-dropdown-item-button @click="deleteWidget(index,$event)">Delete</b-dropdown-item-button>
                                </b-dropdown>
                        </span>
                        <span> 
                                <b-dropdown id="ddown-right" class="float-right" variant="primary" right text="Settings" no-caret>
                                    <template slot="button-content">&#x1F4CC;</template>
                                    <b-dropdown-item-button>Pin to dashboard</b-dropdown-item-button>
                                </b-dropdown>
                        </span>
                    </div>
                    <component v-bind:is="item.i"></component>
                </b-card>
            </grid-item>
        </grid-layout> 
    </div>
</template>

<script>
    import VueGridLayout from 'vue-grid-layout';
    import {mapGetters,} from 'vuex'
    
    export default {
        data() {
            return {
                isDraggable: true,
            }
        },
        methods: {
            movedEvent: function(i, newX, newY){
                var newXY = {
                    i: i,
                    x: newX,
                    y: newY
                }
                console.log(newXY);
                this.$store.dispatch('updateXY',newXY)
            },
            resizedEvent: function(i, newH, newW, newHPx, newWPx){
                var newWidthHeight = {
                    i: i,
                    h: newH,
                    w: newW
                }

                console.log(newWidthHeight);

                this.$store.dispatch('updateWidthHeight',newWidthHeight)
            },
            layoutUpdatedEvent: function(newLayout){
            console.log("Updated layout: ", newLayout)
            },
            deleteWidget: function(index,event) {
                if ( confirm("Are you sure?") ) {
                    this.$store.dispatch('deleteWidget',index);
                }
            }
        },
        computed: {
            ...mapGetters(['getDashboardWidgets']),
        }
    }
</script>

<style scoped>
    .custom-card{
        padding: 20px;
        height: inherit;
    }
</style>
