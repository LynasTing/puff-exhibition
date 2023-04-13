<script setup lang="ts" name="Echarts">
import { onMounted } from 'vue';
import { EChartsOption, init } from 'echarts';

onMounted(() => {
//   // 基于准备好的dom，初始化echarts实例
//   var myChart = echarts.init(document.getElementById('main'));

// // 指定图表的配置项和数据
// var option = {
//   title: {
//     text: 'ECharts 入门示例'
//   },
//   tooltip: {},
//   legend: {
//     data: ['销量']
//   },
//   xAxis: {
//     data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
//   },
//   yAxis: {},
//   series: [
//     {
//       name: '销量',
//       type: 'bar',
//       data: [5, 20, 36, 10, 10, 20]
//     }
//   ]
// };

// // 使用刚指定的配置项和数据显示图表。
// myChart.setOption(option);

  // 获取dom，断言HTMLElement类型，否则会报错
  const chartEle: HTMLElement = document.getElementById('chart') as HTMLElement
  const chart = init(chartEle)
  const option: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  };
  option && chart.setOption(option);
})
</script>

<template>
  <div id="chart"></div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#chart {
  width: 600px;
  height: 400px;
}
</style>
