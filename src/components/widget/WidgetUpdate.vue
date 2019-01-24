<template>
    <div v-if="showModal">
                 <b-modal v-model="showModal" header-bg-variant="primary" header-text-variant="white" title="Update Widget">
                    <b-form-group id="title"
                                    label="Widget title:"
                                    label-for="id">
                        <b-form-input id="title"
                                    type="text"
                                    v-model="form.title">
                        </b-form-input>
                    </b-form-group>
                    <div slot="modal-footer" class="w-100">
                        <b-btn size="sm" variant="primary" @click="addWidget">Save</b-btn>
                        <b-btn size="sm" variant="danger" @click="hide">Close</b-btn>
                    </div>
                </b-modal>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    props:['id'],
    data(){
        return{
            form:{
                id: getWidgetInfo.id,
                title: getWidgetInfo.title,
                isAdded: getWidgetInfo.isAdded
            }
        }
    },
    methods:{
        show:function () {
            this.showModal = true;
        },
        hide() {
            this.showModal = false;
        },
        updateWidget(){
            this.showModal = false;
            let payload = {
                id: this.form.id,
                title: this.form.title,
                isAdded: true,
            }
            this.$store.dispatch('updateWidget',payload);
        },
        ...mapGetters(['getDashboardWidgetInfo']),
    },
    destroyed(){
        this.showModal = false;
    }
}
</script>


<style scoped>

</style>
