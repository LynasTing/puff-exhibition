
<script setup lang="ts" name="EChartMap">
import { ApiRes, SiteData } from '@/types/data'
import _request from '@/utils/request'
import * as echarts from 'echarts'
// 获取echart渲染DOM
const mapDom = ref<HTMLElement>()
const iconUrl = '/imgs/markIcon.png'
onMounted(() => {
  /**
   * 1.拿地图数据
   * 2.拿站点数据
   * 3.渲染地图
   * 4.渲染站点标记
   * 5.点击站点标记弹框
   */
  fetch(`https://geo.datav.aliyun.com/areas_v3/bound/350100_full.json`)
  .then((res: any) => res.json())
  .then( async json => {
    const siteRes = await _request.get<ApiRes<SiteData[]>>('openData/statisticSiteData')
    // 处理站点数据 
    const iconArr = siteRes.map(item => {
      return {
        name: item.siteName,
        value: [item.lng, item.lat]
      }
    })
    // echart 配置
    let option = {
      tooltip: {
         trigger: 'none'
      },
      geo: {
        map: 'fuZhou',
        selectedMode: false,
        zoom: 2,
        triggerOn: 'none',
        layoutCenter: ['70%', '50%'],
        layoutSize: '150%',
        roam: true,
        scaleLimit: { min: 0.5, max: 20 },
        label: {
          normal: {
            show: true,
            textStyle: { color: 'white', fontSize: 18 }
          },
          emphasis: {
            show: true,
            textStyle: { color: '#fff', fontSize: 14 },
          }
        },
        // 区域块样式
        itemStyle: {
          normal: {
            areaColor: '#1d5b6a',
            borderColor:'rgba(147, 235, 248, 1)'
          },
          emphasis: {
            show: true,
            areaColor: '#2B91B7',
            textStyle: { color: '#fff', fontSize: 20 }
          }
        },
      },
      series: [{
        name: 'icon标记',
        type: 'scatter',
        coordinateSystem: 'geo',
        symbolSize: [28, 35],
        symbol: `image://${iconUrl}`,
        data: iconArr,
        tooltip: {
         position: 'top',
         triggerOn: 'click',
         formatter: function(params: object) {
            console.log(`1 + ::>>`, )
            const { data, dataIndex} = params
            return `
            <div class="px-4 py-4 rounded-3xl">
               <div class="flex justify-between text-lg truncate">
               <span class="mr-8">门店名称</span>  
               <span>${data.name}</span>  
               </div>
               <div class="flex justify-between text-lg my-5">
               <span>柜子数量</span>  
               <span>${siteRes[dataIndex].cabineCount}</span>  
               </div>
               <div class="flex justify-between text-lg">
               <span>电池数量</span>  
               <span>${siteRes[dataIndex].batteryCount}</span>  
               </div>
            </div>`
            }
         },
      },
      {
         
      }
      
    ]
    }
    var map = echarts.init(mapDom.value as HTMLElement)
    echarts.registerMap('fuZhou', json)
    map.setOption(option)
  })
  .catch((err) => (console.log(`err + ::>>`, err)))
})
</script>
<template>
  <figure id="map" ref="mapDom"></figure>
</template>

<style>
#map {
  width: 880px;
  height: 618px;
}
</style>
