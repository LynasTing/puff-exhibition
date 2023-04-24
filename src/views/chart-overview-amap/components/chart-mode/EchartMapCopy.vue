<script setup lang="ts" name="EchartsMapCopy">
  import AMapLoader from "@amap/amap-jsapi-loader"
  import { ApiRes, SiteData } from '@/types/data'
  import _request from '@/utils/request'
  import markIcon from "/imgs/markIcon.png"
  import { ElMessage } from "element-plus"
  const map = ref<any>(null)
  let locationArr = ref<number[]>([116.397428, 39.90923])
  let loadingInstance = ref()
  const createInfoWindow = (map, pos, item) => {
    const showCard =
      `<div class="px-4 py-4 rounded-2xl bg-white text-black shadow-sm">
        <div class="flex justify-between text-lg truncate">
          <span class="mr-8">门店名称</span>  
          <span>${item.siteName}</span>  
        </div>
        <div class="flex justify-between text-lg my-5">
          <span>柜子数量</span>  
          <span>${item.cabineCount}</span>  
        </div>
        <div class="flex justify-between text-lg">
          <span>电池数量</span>  
          <span>${item.batteryCount}</span>  
        </div>
      </div>`
    // 信息窗体
    var InfoWindow = new AMap.InfoWindow({
      // isCustom: true,
      offset: new AMap.Pixel(10, -25),   
      content: showCard
    })
    InfoWindow.open(map, pos)
    // InfoWindow.close()
  }
  const initMap = () => {
    AMapLoader.load({
      key: 'dc2ae58c4702640fef5014e76ed2b4c5',
      version: '2.0', 
      // mapStyle: 'amap://styles/whitesmoke',
      plugins: ['AMap.DistrictSearch'] // 需要使用的的插件列表
    })
    .then(async AMap => {
      const province = new AMap.DistrictSearch({
        extensions: 'all',
        level:'province',
        subdistrict: 3
      })
      province.search('福州市', function(status, result) {
        // var outer = [
        //   new AMap.LngLat(-360, 90, true),
        //   new AMap.LngLat(-360, -90, true),
        //   new AMap.LngLat(360, -90, true),
        //   new AMap.LngLat(360, 90, true)
        // ]
        // var holes = result.districtList[0].boundaries
        // var pathArray = [outer]
        // pathArray.push.apply(pathArray, holes)
        // var polygon = new AMap.Polygon({
        //   pathL: pathArray,
        //   strokeWeight: 1,
        //   fillColor: '#000001',
        //   fillOpacity: 1
        // })
        // polygon.setPath(pathArray)
        // map.value.add(polygon)
      })
      const siteRes = await _request.get<ApiRes<SiteData[]>>('openData/statisticSiteData')
      const iconLocation = siteRes.map((item: {} )=> {{
        return [ item.lng, item.lat ]
      }})
      map.value = new AMap.Map('lbsMap', {
        viewMode: '2D', 
        zoom: 12, 
        icon: markIcon,
        mapStyle: 'amap://styles/whitesmoke', //设置地图的显示样式
        center: iconLocation[0]
      })
      let markers = []
      siteRes.forEach(item => {
        const icon = new AMap.Icon({
          imageSize: new AMap.Size(26, 35),
          image: markIcon
        })
        const marker = new AMap.Marker({
          position: new AMap.LngLat(item.lng, item.lat),
          offset: new AMap.Pixel(-5, -5),
          title: item.siteName,
          data: item,
          icon
        })
        const showCard =
          `<div class="px-4 py-4 rounded-3xl">
            <div class="flex justify-between text-lg truncate">
              <span class="mr-8">门店名称</span>  
              <span>${item.siteName}</span>  
            </div>
            <div class="flex justify-between text-lg my-5">
              <span>柜子数量</span>  
              <span>${item.cabineCount}</span>  
            </div>
            <div class="flex justify-between text-lg">
              <span>电池数量</span>  
              <span>${item.batteryCount}</span>  
            </div>
          </div>`
        const infoWindow = new AMap.InfoWindow({
          isCustom: true,
          offset: new AMap.Pixel(16, -45),
          content: showCard
        })
        const onMarkerClick = function(e) {
          createInfoWindow(map.value, e.target.getPosition(), item)
        }
        marker.on('click', onMarkerClick)
        markers.push(marker)
      })
      map.value.add(markers)
      loadingInstance.close()
    })
    .catch(err => {
      console.log(`高德地图渲染catch + ::>>`, err)
    })
  }
  onMounted(async () => {
    loadingInstance = ElLoading.service({
      target: document.getElementById('lbsMap'),
      background: 'rbga(0, 0, 0, 0.7)',
      lock: true
    })
    await nextTick()
    initMap()
  })
</script>
<template>
  <figure id="lbsMap" ref="lbsMap"></figure>
</template>
 
<style lang="scss">
  #lbsMap {
    width: 100%;
    height: 618px;
    border-radius: 16px
  }
</style>