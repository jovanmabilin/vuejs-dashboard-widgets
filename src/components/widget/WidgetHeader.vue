<template>
    <div class="header">
        {{title}}
    </div>    
</template>


<script>
export default {
    props:['title']
}
</script>

<style scoped>

    .header{
        background-color: #0050ff;
        margin: -20px -20px 10px -20px;
        padding: 20px;
        color: #ffffff;
    }


</style>
