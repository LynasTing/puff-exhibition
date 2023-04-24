<script lang="ts" setup name="Header">
let nowTime = ref('')
let flag: Ref<boolean | null> = ref(false)
const getNowTime  = () =>{
  let theNowTime = function () {
    nowTime.value = timeNumber()
  }
  setInterval(theNowTime, 1000)
}
const timeNumber = () => {
  let today = new Date()
  let date = today.getFullYear() + '-' + twoDigits(today.getMonth() + 1) + '-' + twoDigits(today.getDate())
  let time = twoDigits(today.getHours()) + ':' + twoDigits(today.getMinutes()) + ':' + twoDigits(today.getSeconds())
  return date + ' ' + time
}
const twoDigits = (val: number) => {
  if (val < 10) return '0' + val
  return val
}
// 全屏
const screen = () => {
  let element = document.documentElement
  flag.value = document.fullscreenElement === null ? false : true
  if(flag.value) {
    if(document.exitFullscreen) document.exitFullscreen()
  }else {
    if(element.requestFullscreen) element.requestFullscreen()
  }
}
onMounted(()=> {
  getNowTime()
})
</script>

<template>
  <header class="mx-24 text-white pt-4" >
   <div class="main h-full grid gap-1 grid-cols-3">
    <div class="leading-4">
      {{ nowTime || '2023-04-18 22:66:22'}}
    </div>
    <h1 class="text-5xl text-center pr-3">
      左海河豚换电数据大屏
    </h1>
    <ul class="flex justify-end leading-4 space-x-2">
      <li class="area">福州</li>
      <li class="mr-9 ml-1 flex">
        <img src="/imgs/arrow-down.png" class="switch-arrow w-5 h-3 object-contain">
      </li>
      <el-icon :size="20" class="cursor-pointer" @click="screen" @keydown.esc.native><FullScreen /></el-icon>
      <li class="flex">
        <img src="/imgs/theme@2x.png" class="skin w-5 h-5 ml-1">
      </li>
    </ul>
   </div>
  </header>
</template>

<style lang="scss" scoped>
  header {
    height: 104px;
    .main {
      font-size: 22px;
      // background连写: 颜色 图片 是否重复 图片位置(可用像素及方位名称, 方位可选: top right left bottom center) / 图片宽高 以及下一张背景图及其属性
      background: url('/imgs/header@2x.png') no-repeat center / 100% 100%;
    }
  }
</style>