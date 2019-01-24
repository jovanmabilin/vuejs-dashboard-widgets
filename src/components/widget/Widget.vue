<template>
    <div>
        <WidgetList></WidgetList>
        <Dashboard></Dashboard>
    </div>
</template>

<script>
// Needs update:
// The dash-[component] should not be reflected on the update form
// Make sure to implement dash-[component] stealthy when adding new components
require('./common');
const Dashboard  = () => import('./Dashboard.vue');
const WidgetList = () => import('./WidgetList.vue');

export default {
    components:{
        Dashboard ,
        WidgetList,
    },
}
</script>

<style scoped>
    li{
        list-style: none;
    }

</style>
