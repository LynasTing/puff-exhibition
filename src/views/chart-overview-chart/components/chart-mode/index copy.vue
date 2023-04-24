<script lang="ts" setup name="ChartMode">
import * as echarts from 'echarts/core'
import _request from '@/utils/request'
import { ApiRes, AssetType } from '@/types/data'
import { TooltipComponent, TitleComponent, TooltipComponentOption, LegendComponent, LegendComponentOption } from 'echarts/components'
import { PieChart, PieSeriesOption } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import EChartMapCopy from '@/views/chart-overview-amap/components/chart-mode/EchartMapCopy.vue'
import EChartMap from '@/views/chart-overview-chart/components/chart-mode/EchartMap.vue'
import useStore from '@/store'
import img1 from '/imgs/mid-top-1.png'
import img2 from '/imgs/mid-top-2.png'
import img3 from '/imgs/mid-top-3.png'
import img4 from '/imgs/mid-top-4.png'
echarts.use([TooltipComponent, LegendComponent, PieChart, CanvasRenderer, LabelLayout, TitleComponent])
type EChartsOption = echarts.ComposeOption<TooltipComponentOption | LegendComponentOption | PieSeriesOption>
let equipmentData = ref()
let todayData = ref({})
const getModuleData = async () => {
  const today = await _request.get<ApiRes<TodayData>>('/openData/statisticToday')
  todayData.value = today
  const equipment = await _request.get<ApiRes<AssetType>>('openData/statisticAssetData')
  equipmentData.value = equipment
}
getModuleData()
var optionCabinet: EChartsOption
var optionBattery: EChartsOption
var optionVehicle: EChartsOption
onMounted(async ()=> {
  await nextTick()
  setTimeout(() => {
    console.log(`equipmentData + ::>>`, equipmentData)
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
            { value: equipmentData.cabinet.total, name: '总数' },
            { value: equipmentData.cabinet.line, name: '在线' },
            { value: equipmentData.cabinet.offLine, name: '离线' }
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
            { value: equipmentData.battery.inUse, name: '使用中' },
            { value: equipmentData.battery.inBox, name: '柜子中' },
            { value: equipmentData.battery.inClose, name: '未投放' }
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
            { value: equipmentData.vehicle.inUse, name: '使用中' },
            { value: equipmentData.vehicle.inIdle, name: '闲置' },
            { value: equipmentData.vehicle.inClose, name: '未投放' }
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
  }, 0)
})
// 

</script>

<template>
  <main class="text-white mx-5 mt-10 flex-1 flex flex-col">
    <!-- 上 -->
    <ul class="flex today-data justify-between">
      <li class="flex items-center pl-5 pr-6 pt-8 pb-8 rounded-xl">
        <img :src="img1" class="w-10 h-10 mr-4">
        <div>
          <div>
            <span class="today-num">{{ todayData?.electricity }}</span>
            <i class="not-italic text-sm ">元</i>
          </div>
          <p class="mt-1">今日耗电量</p>
        </div>
      </li>
      <li class="flex items-center pl-5 pr-6 pt-8 pb-8 rounded-xl">
        <img :src="img2" class="w-10 h-10 mr-4">
        <div>
          <div>
            <span class="today-num">{{ todayData?.incomeTotal  }}</span>
            <i class="not-italic text-sm ">元</i>
          </div>
          <p class="mt-1">今日收益总额</p>
        </div>
      </li>
      <li class="flex items-center pl-5 pr-6 pt-8 pb-8 rounded-xl">
        <img :src="img3" class="w-10 h-10 mr-4">
        <div>
          <div>
            <span class="today-num">{{ todayData?.userActive  }}</span>
            <i class="not-italic text-sm ">元</i>
          </div>
          <p class="mt-1">今日使用用户量</p>
        </div>
      </li>
      <li class="flex items-center pl-5 pr-6 pt-8 pb-8 rounded-xl">
        <img :src="img4" class="w-10 h-10 mr-4">
        <div>
          <div>
            <span class="today-num">{{ todayData?.exchangCount }}</span>
            <i class="not-italic text-sm ">元</i>
          </div>
          <p class="mt-1">今日换电量</p>
        </div>
      </li>
    </ul>
    <!-- 中 -->
    <div class="map-box my-5 flex-1 ">
      <!-- <EChartMapCopy />  -->
      <EChartMap />
    </div>
    <!-- 下 -->
    <ul class="bottom-pie flex justify-between">
      <li class="flex items-center px-4 ">
        <figure class="pie-chart mr-4 " ref="PieCabinet" id="PieCabinet"></figure>
        <ul class="flex flex-col justify-evenly h-full ">
          <li class="flex items-center">
            <span class="w-2 h-2 inline-block rounded-full point-blue mr-3"></span>
            <p>总数: {{ equipmentData?.cabinet?.total }}</p>
          </li>
          <li class="flex items-center">
            <span class="w-2 h-2 inline-block rounded-full point-orange mr-3"></span>
            <p>在线: {{ equipmentData?.cabinet?.line }}</p>
          </li> 
          <li class="flex items-center">
            <span class="w-2 h-2 inline-block rounded-full point-red mr-3"></span>
            <p>离线: {{ equipmentData?.cabinet?.offLine }}</p>
          </li>
        </ul>
      </li>
      <li class="flex items-center px-4 ">
        <figure class="pie-chart mr-4 " ref="PieBattery" id="PieBattery"></figure>
        <ul class="flex flex-col justify-evenly h-full ">
          <li class="flex items-center">
            <span class="w-2 h-2 inline-block rounded-full point-blue mr-3"></span>
            <p>使用中: {{ equipmentData?.battery?.inUse }}</p>
          </li>
          <li class="flex items-center">
            <span class="w-2 h-2 inline-block rounded-full point-orange mr-3"></span>
            <p>柜子中: {{ equipmentData?.battery?.inBox }}</p>
          </li>
          <li class="flex items-center">
            <span class="w-2 h-2 inline-block rounded-full point-red mr-3"></span>
            <p>未投放: {{ equipmentData?.battery?.inClose }}</p>
          </li>
        </ul>
      </li>
      <li class="flex items-center px-4 ">
        <figure class="pie-chart mr-4 " ref="PieVehicle" id="PieVehicle"></figure>
        <ul class="flex flex-col justify-evenly h-full ">
          <li class="flex items-center">
            <span class="w-2 h-2 inline-block rounded-full point-blue mr-3"></span>
            <p>使用中: {{ equipmentData?.vehicle?.inUse }}</p>
          </li>
          <li class="flex items-center">
            <span class="w-2 h-2 inline-block rounded-full point-orange mr-3"></span>
            <p>闲&nbsp;&nbsp;&nbsp;置: {{ '' + equipmentData?.vehicle?.inIdle }}</p>
          </li>
          <li class="flex items-center">
            <span class="w-2 h-2 inline-block rounded-full point-red mr-3"></span>
            <p>未投放: {{ equipmentData?.vehicle?.inClose }}</p>
          </li>
        </ul>
      </li>
    </ul>
  </main>
</template>

<style lang="scss" scoped>
.today-data {
  .today-num {
    font-size: 26px;
  }
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