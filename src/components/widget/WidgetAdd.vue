<template>
    <div v-if="showModal">
                 <b-modal v-model="showModal" header-bg-variant="primary" header-text-variant="white" title="Add Widget">
                     <b-form-group id="id"
                                    label="Component name:"
                                    label-for="id">
                        <b-form-input id="id"
                                    type="text"
                                    v-model="form.id">
                        </b-form-input>
                    </b-form-group>
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
    export default {
        data() {
            return {
                showModal: false,
                form:{
                    id: null,
                    title: null,
                    isAdded: false
                }
            }
        },
        methods: {
            show:function () {
                this.showModal = true;
            },
            hide() {
                this.showModal = false;
            },
            addWidget(){
                this.showModal = false;
                this.$store.dispatch('addWidget',{ id: 'dash-' + this.form.id, title: this.form.title,});
            }
        },
        destroyed(){
            this.showModal = false;
        }
     
    }
</script>

<style scoped>
    
</style>
