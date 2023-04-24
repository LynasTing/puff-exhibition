<script lang="ts" setup name="AMap">
/**
 *@html5 新增的语义化标签
 *@aside	定义文章。
 *@figcaption	定义<figure> 元素的标题。
 *@figure	规定自包含内容，比如图示、图表、照片、代码清单等。
 *@footer	定义文档或节的页脚。
 *@header	规定文档或节的页眉。
 *@main	规定文档的主内容。
 *@mark	定义重要的或强调的文本。
 *@nav	定义导航链接。
 *@section	定义文档中的节。
 *@summary	定义 <details> 元素的可见标题。
 *@details	定义用户能够查看或隐藏的额外细节。
 *@time	定义日期/时间。
 */

 /**
  * @echarts 常用字段
  * @title	标题
  * @legend	图例
  * @tooltip 提示
  * @xAxis	x轴线
  * @yAxis	y轴线
  * @series	系列
  * @data	数据
  */


import Resources from '@/views/chart-overview-amap/components/resources/index.vue'
import ChartMode from '@/views/chart-overview-amap/components/chart-mode/index.vue'
import UserBattery from '@/views/chart-overview-amap/components/user-battery/index.vue'
import Header from '@/views/chart-overview-amap/components/header/index.vue'
</script>

<template>
  <RouterView>
    
  </RouterView>
  <div class="lay-container">
    <Header />
    <main class="main px-5 pb-5 flex">
      <Resources />
      <ChartMode />
      <UserBattery />
    </main>
  </div>
</template>
<style lang="scss" scoped>
.lay-container {
  background-color: #03101f;
}
</style>