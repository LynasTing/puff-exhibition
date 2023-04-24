<script lang="ts" setup name="ChartMode">
import * as echarts from 'echarts/core'
import { TooltipComponent, TitleComponent, TooltipComponentOption, LegendComponent, LegendComponentOption } from 'echarts/components'
import { PieChart, PieSeriesOption } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import EChartMapCopy from '@/views/chart-overview-amap/components/chart-mode/EchartMapCopy.vue'
// import EChartMap from '@/views/chart-overview-chart/components/chart-mode/EchartMap.vue'
import useStore from '@/store'
echarts.use([TooltipComponent, LegendComponent, PieChart, CanvasRenderer, LabelLayout, TitleComponent])
type EChartsOption = echarts.ComposeOption<TooltipComponentOption | LegendComponentOption | PieSeriesOption>
const { largeScreen } = useStore()
largeScreen.getStatisticAsset()
largeScreen.getStatisticToday()
import img1 from '/imgs/mid-top-1.png'
import img2 from '/imgs/mid-top-2.png'
import img3 from '/imgs/mid-top-3.png'
import img4 from '/imgs/mid-top-4.png'
var optionCabinet: EChartsOption
var optionBattery: EChartsOption
var optionVehicle: EChartsOption
onMounted(()=> {
  setTimeout(() => {
    optionCabinet = {
      title: {
        text: '换电柜',
        left: 'center',
        top: 'center',
        textStyle:{
          color: '#fff',
          fontSize: 16,
          align: 'center'
        },
      },
      color: ['#00ccf7', '#f48124', '#ff003a'],
      series: [
        {
          name: '换电柜',
          type: 'pie',
          radius: ['80%', '100%'], // 内半径及外半径
          avoidLabelOverlap: false,
          top: 5,
          right: 5,
          bottom: 5,
          left: 5,
          itemStyle: {
            borderRadius: 10,
            borderColor: 'transparent'
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: false,
              fontSize: 16,
              color: 'white',
              fontWeight: 'normal'
            }
          },
          data: [
            { value: largeScreen.statisticAsset.cabinet.total, name: '总数' },
            { value: largeScreen.statisticAsset.cabinet.line, name: '在线' },
            { value: largeScreen.statisticAsset.cabinet.offLine, name: '离线' }
          ]
        }
      ]
    }
    optionBattery = {
      title: {
        text: '电池',
        left: 'center',
        top: 'center',
        textStyle:{
          color: '#fff',
          fontSize: 16,
          align: 'center'
        },
      },
      color: ['#00ccf7', '#f48124', '#ff003a'],
      series: [
        {
          name: '电池',
          type: 'pie',
          radius: ['80%', '100%'], // 内半径及外半径
          avoidLabelOverlap: false,
          top: 5,
          right: 5,
          bottom: 5,
          left: 5,
          itemStyle: {
            borderRadius: 10,
            borderColor: 'transparent'
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: false,
              fontSize: 16,
              color: 'white',
              fontWeight: 'normal'
            }
          },
          data: [
            { value: largeScreen.statisticAsset.battery.inUse, name: '使用中' },
            { value: largeScreen.statisticAsset.battery.inBox, name: '柜子中' },
            { value: largeScreen.statisticAsset.battery.inClose, name: '未投放' }
          ]
        }
      ]
    }
    optionVehicle = {
      title: {
        text: '车辆',
        left: 'center',
        top: 'center',
        textStyle:{
          color: '#fff',
          fontSize: 16,
          align: 'center'
        },
      },
      color: ['#00ccf7', '#f48124', '#ff003a'],
      series: [
        {
          name: '换电柜',
          type: 'pie',
          radius: ['80%', '100%'], // 内半径及外半径
          avoidLabelOverlap: false,
          top: 5,
          right: 5,
          bottom: 5,
          left: 5,
          itemStyle: {
            borderRadius: 10,
            borderColor: 'transparent'
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: false,
              fontSize: 16,
              color: 'white',
              fontWeight: 'normal'
            }
          },
          data: [
            { value: largeScreen.statisticAsset.vehicle.inUse, name: '使用中' },
            { value: largeScreen.statisticAsset.vehicle.inIdle, name: '闲置' },
            { value: largeScreen.statisticAsset.vehicle.inClose, name: '未投放' }
          ]
        }
      ]
    }
    // 换电柜
    const PieCabinet = echarts.init(document.getElementById('PieCabinet') as HTMLElement)
    optionCabinet && PieCabinet.setOption(optionCabinet)
    // 电池
    const PieBattery = echarts.init(document.getElementById('PieBattery') as HTMLElement)
    optionBattery && PieBattery.setOption(optionBattery)
    // 车辆
    const PieVehicle = echarts.init(document.getElementById('PieVehicle') as HTMLElement)
    optionVehicle && PieVehicle.setOption(optionVehicle)
  }, 500)
})
const timerMid = setInterval(function(){
  largeScreen.getStatisticAsset()
  largeScreen.getStatisticToday()
  setTimeout(() => {
    optionCabinet = {
      title: {
        text: '换电柜',
        left: 'center',
        top: 'center',
        textStyle:{
          color: '#fff',
          fontSize: 16,
          align: 'center'
        },
      },
      color: ['#00ccf7', '#f48124', '#ff003a'],
      series: [
        {
          name: '换电柜',
          type: 'pie',
          radius: ['80%', '100%'], // 内半径及外半径
          avoidLabelOverlap: false,
          top: 5,
          right: 5,
          bottom: 5,
          left: 5,
          itemStyle: {
            borderRadius: 10,
            borderColor: 'transparent'
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: false,
              fontSize: 16,
              color: 'white',
              fontWeight: 'normal'
            }
          },
          data: [
            { value: largeScreen.statisticAsset.cabinet.total, name: '总数' },
            { value: largeScreen.statisticAsset.cabinet.line, name: '在线' },
            { value: largeScreen.statisticAsset.cabinet.offLine, name: '离线' }
          ]
        }
      ]
    }
    optionBattery = {
      title: {
        text: '电池',
        left: 'center',
        top: 'center',
        textStyle:{
          color: '#fff',
          fontSize: 16,
          align: 'center'
        },
      },
      color: ['#00ccf7', '#f48124', '#ff003a'],
      series: [
        {
          name: '电池',
          type: 'pie',
          radius: ['80%', '100%'], // 内半径及外半径
          avoidLabelOverlap: false,
          top: 5,
          right: 5,
          bottom: 5,
          left: 5,
          itemStyle: {
            borderRadius: 10,
            borderColor: 'transparent'
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: false,
              fontSize: 16,
              color: 'white',
              fontWeight: 'normal'
            }
          },
          data: [
            { value: largeScreen.statisticAsset.battery.inUse, name: '使用中' },
            { value: largeScreen.statisticAsset.battery.inBox, name: '柜子中' },
            { value: largeScreen.statisticAsset.battery.inClose, name: '未投放' }
          ]
        }
      ]
    }
    optionVehicle = {
      title: {
        text: '车辆',
        left: 'center',
        top: 'center',
        textStyle:{
          color: '#fff',
          fontSize: 16,
          align: 'center'
        },
      },
      color: ['#00ccf7', '#f48124', '#ff003a'],
      series: [
        {
          name: '换电柜',
          type: 'pie',
          radius: ['80%', '100%'], // 内半径及外半径
          avoidLabelOverlap: false,
          top: 5,
          right: 5,
          bottom: 5,
          left: 5,
          itemStyle: {
            borderRadius: 10,
            borderColor: 'transparent'
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: false,
              fontSize: 16,
              color: 'white',
              fontWeight: 'normal'
            }
          },
          data: [
            { value: largeScreen.statisticAsset.vehicle.inUse, name: '使用中' },
            { value: largeScreen.statisticAsset.vehicle.inIdle, name: '闲置' },
            { value: largeScreen.statisticAsset.vehicle.inClose, name: '未投放' }
          ]
        }
      ]
    }
    // 换电柜
    const PieCabinet = echarts.init(document.getElementById('PieCabinet') as HTMLElement)
    optionCabinet && PieCabinet.setOption(optionCabinet)
    // 电池
    const PieBattery = echarts.init(document.getElementById('PieBattery') as HTMLElement)
    optionBattery && PieBattery.setOption(optionBattery)
    // 车辆
    const PieVehicle = echarts.init(document.getElementById('PieVehicle') as HTMLElement)
    optionVehicle && PieVehicle.setOption(optionVehicle)
  }, 1 * 1000)
}, 30 * 1000)
onUnmounted(() => {
  clearInterval(timerMid)
})

</script>

<template>
  <main class="text-white mx-5 mt-10 flex-1 flex flex-col">
    <!-- 上 -->
    <ul class="flex today-data justify-between space-x-2">
      <li class="flex flex-1 items-center pl-4 pr-6 pt-8 pb-8 rounded-xl">
        <img :src="img1" class="w-10 h-10 mr-3">
        <div>
          <div>
            <span 
              v-if="largeScreen.statisticToday.electricity"
              :class="Number(largeScreen.statisticToday.electricity).toFixed(2).length > 7 ? 'text-2xl' : 'text-2xl'"
              >
              {{ Number(largeScreen.statisticToday.electricity).toFixed(2) }}
            </span>
            <span v-else class="text-2xl">0</span>
            <i class="not-italic text-sm ">kW·h</i>
          </div>
          <p class="mt-1">今日使用电量</p>
        </div>
      </li>
      <li class="flex flex-1 items-center pl-4 pr-6 pt-8 pb-8 rounded-xl">
        <img :src="img2" class="w-10 h-10 mr-3">
        <div>
          <div>
            <span class="text-2xl">{{ largeScreen.statisticToday.incomeTotal || 0  }}</span>
            <i class="not-italic text-sm ">元</i>
          </div>
          <p class="mt-1">今日收益总额</p>
        </div>
      </li>
      <li class="flex flex-1 items-center pl-4 pr-6 pt-8 pb-8 rounded-xl">
        <img :src="img3" class="w-10 h-10 mr-3">
        <div>
          <div>
            <span class="text-2xl">{{ largeScreen.statisticToday.userActive || 0  }}</span>
            <i class="not-italic text-sm ">位</i>
          </div>
          <p class="mt-1">今日使用用户量</p>
        </div>
      </li>
      <li class="flex flex-1 items-center pl-4 pr-6 pt-8 pb-8 rounded-xl">
        <img :src="img4" class="w-10 h-10 mr-3">
        <div>
          <div>
            <span class="text-2xl">{{ largeScreen.statisticToday.exchangCount }}</span>
            <i class="not-italic text-sm ">单</i>
          </div>
          <p class="mt-1">今日换电量</p>
        </div>
      </li>
    </ul>
    <!-- 中 -->
    <div class="map-box my-5 flex-1 ">
      <EChartMapCopy /> 
      <!-- <EChartMap /> -->
    </div>
    <!-- 下 -->
    <ul class="bottom-pie flex justify-between">
      <li class="flex items-center px-4 ">
        <figure class="pie-chart mr-4 " ref="PieCabinet" id="PieCabinet"></figure>
        <ul class="flex flex-col justify-evenly h-full ">
          <li class="flex items-center">
            <span class="w-2 h-2 inline-block rounded-full point-blue mr-3"></span>
            <p>总数: {{ largeScreen.statisticAsset.cabinet?.total || 0 }}</p>
          </li>
          <li class="flex items-center">
            <span class="w-2 h-2 inline-block rounded-full point-orange mr-3"></span>
            <p>在线: {{ largeScreen.statisticAsset.cabinet?.line || 0 }}</p>
          </li> 
          <li class="flex items-center">
            <span class="w-2 h-2 inline-block rounded-full point-red mr-3"></span>
            <p>离线: {{ largeScreen.statisticAsset.cabinet?.offLine || 0 }}</p>
          </li>
        </ul>
      </li>
      <li class="flex items-center px-4 ">
        <figure class="pie-chart mr-4 " ref="PieBattery" id="PieBattery"></figure>
        <ul class="flex flex-col justify-evenly h-full ">
          <li class="flex items-center">
            <span class="w-2 h-2 inline-block rounded-full point-blue mr-3"></span>
            <p>使用中: {{ largeScreen.statisticAsset.battery?.inUse || 0 }}</p>
          </li>
          <li class="flex items-center">
            <span class="w-2 h-2 inline-block rounded-full point-orange mr-3"></span>
            <p>柜子中: {{ largeScreen.statisticAsset.battery?.inBox || 0 }}</p>
          </li>
          <li class="flex items-center">
            <span class="w-2 h-2 inline-block rounded-full point-red mr-3"></span>
            <p>未投放: {{ largeScreen.statisticAsset.battery?.inClose || 0 }}</p>
          </li>
        </ul>
      </li>
      <li class="flex items-center px-4 ">
        <figure class="pie-chart mr-4 " ref="PieVehicle" id="PieVehicle"></figure>
        <ul class="flex flex-col justify-evenly h-full ">
          <li class="flex items-center">
            <span class="w-2 h-2 inline-block rounded-full point-blue mr-3"></span>
            <p>使用中: {{ largeScreen.statisticAsset.vehicle?.inUse || 0 }}</p>
          </li>
          <li class="flex items-center">
            <span class="w-2 h-2 inline-block rounded-full point-orange mr-3"></span>
            <p>闲&nbsp;&nbsp;置: {{ largeScreen.statisticAsset.vehicle?.inIdle || 0 }}</p>
          </li>
          <li class="flex items-center">
            <span class="w-2 h-2 inline-block rounded-full point-red mr-3"></span>
            <p>未投放: {{ largeScreen.statisticAsset.vehicle?.inClose || 0 }}</p>
          </li>
        </ul>
      </li>
    </ul>
  </main>
</template>

<style lang="scss" scoped>
.today-data {
  // .today-num {
  //   font-size: 26px;
  // }
  & li:first-child {
    background: linear-gradient(145.11deg, rgba(19, 145, 228, 1) 0%, rgba(47, 94, 206, 1) 100%);
  }
  & li:nth-child(2) {
    background: linear-gradient(91.92deg, rgba(0, 123, 217, 1) 0%, rgba(12, 167, 220, 1) 100%);
  }
  & li:nth-child(3) {
    background: linear-gradient(91.92deg, rgba(95, 99, 204, 1) 0%, rgba(55, 61, 209, 1) 100%);
  }
  & li:last-child{
    background: linear-gradient(91.92deg, rgba(227, 81, 121, 1) 0%, rgba(195, 68, 25, 1) 100%);
  }
}
.map-box {
   background-color: #030528
}
.bottom-pie {
  height: 120px;
  .pie-chart {
    width: 120px;
    height: 120px;
  }
  .point-blue {
    background-color: rgba(0, 204, 247, 1);
  }
  .point-orange {
    background-color: rgba(244, 129, 36, 1);
  }
  .point-red {
    background-color: rgba(255, 0, 58, 1);
  }
}
</style>