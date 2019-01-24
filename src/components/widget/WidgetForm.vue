<template>
    <div v-if="showModal">
        <b-modal v-model="showModal" header-bg-variant="primary" header-text-variant="white" :title="title +' ('+id+')'">
            <b-form-group   id="column"
                            label="Column:"
                            label-for="column">
                <b-form-radio-group id="btnradios1"
                  buttons
                  v-model.number="form.x"
                  :options="options"
                  name="radiosBtnDefault"
                  button-variant="primary" 
                  />
            </b-form-group>
            <b-form-group   id="row"
                            label="Row:"
                            label-for="row">
                <b-form-input   id="row"
                                type="number"
                                v-model.number="form.y">
                </b-form-input>
            </b-form-group>
            <b-form-group   id="width"
                            label="Width:"
                            label-for="width"
                            >
                <b-form-input id="width"
                            type="number"
                            v-model.number="form.width">
                </b-form-input>
            </b-form-group>
            <b-form-group   id="height"
                            label="Height:"
                            label-for="height"
                            :description="'Pixel conversion: '+calculatePixels + 'px'"
                            >
                <b-form-input id="height"
                            type="number"
                            v-model.number="form.height">
                </b-form-input>
            </b-form-group>
            <div slot="modal-footer" class="w-100">
                <b-btn size="sm" variant="primary" @click="addWidgetForm">Save</b-btn>
                <b-btn size="sm" variant="danger" @click="hide">Close</b-btn>
            </div>
        </b-modal>
    </div>
</template>


<script>
    import {mapGetters,} from 'vuex'
    import { EventBus } from './eventBus';

    export default {
        props:['title','id'],
        data() {
            return {
                showModal: false,
                state: false,
                options:[
                    { text: 'Column 1', value:0},
                    { text: 'Column 2', value:1},
                    { text: 'Column 3', value:2},
                ],
                form:{
                    x: 0,
                    y: 0,
                    width: 1,
                    height: 10,
                    isAdded: true,
                    i: null,
                    title: null,
                }
            }
        },
        methods: {
            show:function () {
                this.showModal = true;
            },
            hide() {
                this.resetForm();
            },
            addWidgetForm(){
                this.processedInputs();
                let payload = {
                    id: this.id,
                    x: this.form.x,
                    y: this.form.y,
                    w: this.form.w,
                    h: this.form.height,
                    title: this.title,
                    isAdded: this.form.isAdded,
                }
                this.$store.dispatch('addWidgetForm',payload);
                EventBus.$emit('fixedLayout',payload);
                this.resetForm();
            },
            processedInputs(){
                const defaultW      = ( w )     =>  ( w >= 3 ) ? 3 : w ;
                const defaultH      = ( h )     =>  ( h < 1 ) ? 10 : h ;
                const defaultX      = ( x,w )   =>  ( ( x >= 1 && w >= 3 ) || ( x >= 2 && w === 2 ) ) ? 0 : x ;
                const defaults      = ( x,d )   =>  ( x ) ? x : d;
                this.form.x         = defaultX( Number(this.form.x),Number(this.form.width) );
                this.form.w         = defaults( defaultW(Number(this.form.width)), 1 );
                this.form.y         = defaults( Number(this.form.y),0 );
                this.form.height    = defaultH( Number(this.form.height) )
            },
            resetForm(){
                this.showModal = false;
                this.form = {
                    x: 0,
                    y: 0,
                    width: 1,
                    height: 10,
                    isAdded: true,
                    i: null,
                    title: null,
                }
            },
        },
        computed: {
            ...mapGetters(['getHighestRow','getGridLayoutOptions']),
             calculatePixels(){
                let calculatedPixels =  (this.getGridLayoutOptions.rowHeight) * this.form.height +this.getGridLayoutOptions.marginY * (this.form.height-1) 
                return calculatedPixels;
            }
        },
        destroyed(){
            this.showModal = false;
        }
    }
</script>


<style scoped>
    
</style>
