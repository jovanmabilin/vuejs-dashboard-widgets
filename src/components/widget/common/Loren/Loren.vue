<template >
<div ref="currentHeight">
            <h1>Google Charts</h1>
            <p>A Loren dummy text is a dummy text that revolutionize the world</p>
            <div style="width:inherit">
            <GChart
                type="ColumnChart"
                :data="chartData"
                :options="chartOptions"
                />
                </div>

</div>
    
</template>


<script>
import { GChart } from 'vue-google-charts'
export default {
    components: {
        GChart
    },
    data(){
        return{
            title: 'Hello',
            chartData: [
                ['Year', 'Sales', 'Expenses', 'Profit'],
                ['2014', 1000, 400, 200],
                ['2015', 1170, 460, 250],
                ['2016', 660, 1120, 300],
                ['2017', 1030, 540, 350]
            ],
            chartOptions: {
                chart: {
                title: 'Company Performance',
                subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                }
            },
            height: this.$refs.currentHeight

        }
    },
    mounted(){
    }

}
</script>


<style scoped>

</style>
