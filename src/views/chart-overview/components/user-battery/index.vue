<script lang="ts" setup name="UserBattery">
import * as echarts from 'echarts/core'
import { GridComponent, GridComponentOption } from 'echarts/components'
import { LineChart, LineSeriesOption, BarChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import useStore from '@/store'
echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition, BarChart])
type EChartsOption = echarts.ComposeOption<GridComponentOption | LineSeriesOption>
const { largeScreen } = useStore()
largeScreen.getSevenUser()
largeScreen.getPicture()
largeScreen.getSevenUseBattery()
console.log(`largeScreen.pictureLoop + ::>>`, largeScreen.pictureLoop)
var optionUser: EChartsOption
var optionUseBattery: EChartsOption
onMounted(() => {
  setTimeout(() => {
    const comboChart = echarts.init(document.getElementById('userData')as HTMLElement)
    const changeBatteryChart = echarts.init(document.getElementById('batteryData')as HTMLElement)
    optionUser && comboChart.setOption(optionUser)
    optionUseBattery && changeBatteryChart.setOption(optionUseBattery)
  }, 500)
})
// 近7日用户数据
optionUser = {
  tooltip: {
    show: true,
    trigger: 'axis'
  },
  grid: {
    top: '34px',
    right: 0,
    bottom: '34px',
    left: 0,
    containLabel: false
  },
  xAxis: {
    type: 'category',
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#0376a5'
      },
      onZero: true
    },
    axisLabel: {
      interval: 0,
      textStyle: {
        color: function(value: any, index: any) {
          return value = 'white'
        }
      },
      fontSize: '14px'
    },
    
    boundaryGap: true,
    data: largeScreen.nearlySevenUser.xShaft
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      inside: true,
      verticalAlign: 'bottom',
      // lineHeight: 24,
      textStyle: {
        color: function(value, index) {
          return 'white'
        }
      },
      fontSize: '14px'
    },
    splitLine: {
      lineStyle: {
        color: '#03324c',
        type: 'dashed'
      }
    }
  },
  series: [
    {
      data: largeScreen.nearlySevenUser.yShaft,
      type: 'line',
      showSymbol: false,
      smooth: true,
      lineStyle: {
        color: '#32a7fb',
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#041221' },
            { offset: 1, color: '#123e60' }
          ]
        }
      }
    },
  ]
}
// 近7日使用电池数据
optionUseBattery = {
  tooltip: {
    show: true,
    trigger: 'axis'
  },
  grid: {
    top: '34px',
    right: 0,
    bottom: '34px',
    left: 0,
    containLabel: false
  },
  xAxis: {
    type: 'category',
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#0376a5'
      },
      onZero: true
    },
    axisLabel: {
      interval: 0,
      textStyle: {
        color: function(value: any, index: any) {
          return value = 'white'
        }
      },
      fontSize: '14px'
    },
    
    boundaryGap: true,
    data: largeScreen.nearlySevenUseBattery.xShaft
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      inside: true,
      verticalAlign: 'bottom',
      // lineHeight: 24,
      textStyle: {
        color: function(value, index) {
          return 'white'
        }
      },
      fontSize: '14px'
    },
    splitLine: {
      lineStyle: {
        color: '#03324c',
        type: 'dashed'
      }
    }
  },
  series: [
    {
      data: largeScreen.nearlySevenUseBattery.yShaft,
      type: 'bar',
      showSymbol: false,
      smooth: true,
      barWidth: '20px',
      lineStyle: {
        color: '#32a7fb',
      },
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'rgba(2, 90, 116, 1)'
        },
        {
          offset: 1,
          color: 'rgba(0, 204, 247, 1)'
        }])
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#041221' },
            { offset: 1, color: '#123e60' }
          ]
        }
      }
    },
  ]
}
</script>
<template>
  <main class="flex flex-col justify-center">
    <el-carousel indicator-position="none" arrow="never" class="mb-4 ">
      <el-carousel-item v-for="item in largeScreen.pictureLoop" :key="item">
        <img :src="item.url" class="bicycle  rounded-2xl" >
      </el-carousel-item>
    </el-carousel>
    <div>
      <h3 class="sub-title">近7日用户数据</h3>
      <figure id="userData" ref="userData"></figure>
    </div>
    <div>
      <h3 class="sub-title">近7日使用电池数据</h3>
      <figure id="batteryData" ref="batteryData"></figure>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.bicycle {
  width: 480px;
  height: 304px;
}
#userData {
    width: 480px;
    height: 268px;
  }
#batteryData {
  width: 480px;
  height: 268px;
}
</style>