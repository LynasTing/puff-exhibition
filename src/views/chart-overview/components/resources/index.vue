<script lang="ts" setup name="Resources">
import * as echarts from 'echarts/core'
import { GridComponent, GridComponentOption } from 'echarts/components'
import { LineChart, LineSeriesOption, BarChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import useStore from '@/store'

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition, BarChart])
type EChartsOption = echarts.ComposeOption<GridComponentOption | LineSeriesOption>
const { largeScreen } = useStore()
largeScreen.getSevenCombo()
largeScreen.getSevenChange()
largeScreen.getTotalData()
var optionSevenCombo: EChartsOption
var optionChangeBattery: EChartsOption
onMounted(() => {
 setTimeout(() => {
    const comboChart = echarts.init(document.getElementById("sevenCombo")as HTMLElement)
    const changeBatteryChart = echarts.init(document.getElementById("changeBattery")as HTMLElement)
    optionSevenCombo && comboChart.setOption(optionSevenCombo)
    optionChangeBattery && changeBatteryChart.setOption(optionChangeBattery)
 }, 500)
})
// 近七日套餐收益配置 
optionSevenCombo = {
  grid: {
    top: '34px',
    right: 0,
    bottom: '34px',
    left: 0,
    containLabel: false
  },
  tooltip: {
    show: true,
    trigger: 'axis'
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
    data: largeScreen.nearlySevenCombo.xShaft
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
      data: largeScreen.nearlySevenCombo.yShaft,
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
// 近七日换电量数据配置
optionChangeBattery = {
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
    data: largeScreen.nearlySevenChangeBattery.xShaft
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
      data: largeScreen.nearlySevenChangeBattery.yShaft,
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
const totalData = ref([
  { label: '累计换电次数', number: 1982 },
  { label: '累计公里数', number: 78051 },
  { label: '累计用户数', number: 141564 },
  { label: '开通用户数', number: 198278051 }
])
</script>

<template>
  <div class="left-view">
    <ul class="flex flex-col">
      <!-- 总数据 -->
      <li>
        <h3 class="sub-title">总数据</h3>
        <ul class="grid gap-4 grid-cols-2 mt-7 mb-5 px-5">
          <li class="flex flex-col items-center total-item">
            <span>{{ largeScreen.totalData.exchangTotal || 0 }}</span>
            <h5>累计换电次数</h5>
          </li>
          <li class="flex flex-col items-center total-item">
            <span>{{ largeScreen.totalData.kilTotal || 0 }}</span>
            <h5>累计公里数</h5>
          </li>
          <li class="flex flex-col items-center total-item">
            <span>{{ largeScreen.totalData.userTotal || 0 }}</span>
            <h5>累计用户数</h5>
          </li>
          <li class="flex flex-col items-center total-item">
            <span>{{ largeScreen.totalData.cityTotal || 0 }}</span>
            <h5>开通城市数量</h5>
          </li>
        </ul>
      </li>
      <!-- 近7日套餐收益数据 -->
      <li>
        <h3 class="sub-title">近7日套餐收益数据</h3>
        <figure id="sevenCombo" ref="sevenCombo"></figure>
      </li>
      <!-- 近7日换电量数据 -->
      <li>
        <h3 class="sub-title">近7日换电量数据</h3>
        <figure id="changeBattery" ref="changeBattery">图表</figure>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.left-view {
  width: 480px;
  .total-item {
    padding: 9px 45px;
    text-align: center;
    background: url('/imgs/corners.png') no-repeat center / 100% 100%;
    span {
      font-size: 34px;
      letter-spacing: 1.02px;
      color: rgba(0, 204, 247, 1);
    }
    h5 {
      font-size: 16px;
      font-weight: 400;
      letter-spacing: 0.54px;
      color: white;
    }
  }
  #sevenCombo {
    width: 480px;
    height: 268px;
  }
  #changeBattery {
    width: 480px;
    height: 268px;
  }
}

</style>