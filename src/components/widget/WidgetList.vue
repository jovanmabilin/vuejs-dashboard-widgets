<template>
    <div>
        <WidgetForm ref="WidgetForm" :id="id" :title="title"></WidgetForm>
        <WidgetAdd ref="WidgetAdd"></WidgetAdd>
           <b-dropdown id="ddown-aria" text="Widget List" variant="primary" class="m-2 ">
                <div role="group" aria-labelledby="header1">
                    <b-dropdown-header id="header1">Widgets</b-dropdown-header>
                    <b-dropdown-item-button v-for="(widget,index) in getWidgetLists" :key="index"  aria-describedby="header1" @click="openWidgetForm(widget,$event)">
                        {{widget.title}}
                    </b-dropdown-item-button>
                </div>
                <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item-button bg-variant="primary" @click="openWidgetAdd">Add widget +</b-dropdown-item-button>
            </b-dropdown>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
const WidgetForm = () => import('./WidgetForm.vue');
const WidgetAdd  = () => import('./WidgetAdd.vue');

export default {
    components:{
        WidgetForm  ,
        WidgetAdd   ,
    },
    data(){
        return {
            modalShow: false,
            id: null,
            title:null
        }
    },
    methods:{
            openWidgetForm(widget,event){
                this.id = widget.id;
                this.title = widget.title;
                this.$refs.WidgetForm.show();
            },
            openWidgetAdd(){
                this.$refs.WidgetAdd.show(); 
            }
    },
    computed:{
            ...mapGetters(['getWidgetLists']),
    },
    created(){
        this.$store.dispatch('widgetLists');
    }
}
</script>

<style scoped>
    
</style>
