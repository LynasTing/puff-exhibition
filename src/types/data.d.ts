// 所有的接口的通用类型
export interface ApiRes<T> {
  code: string
  msg: string,
  result: T
}
// 左海大屏今日统计
export type TodayData = {
  batteryActive: number
  electricity: string
  exchangCount: number
  getCount: number
  incomeTotal: number
  returnCount: number
  userActive: number
}
// 折线图数据
export type LineDataType = {}

// 换电柜、电池、车辆
export type AssetType = {
  battery: {
    inClose: number
    inUse: number
    inBox: number
  }
  cabinet: {
    offLine: number
    total: number
    line: number
  }
  vehicle: {
    inIdle: number
    inClose: number
    inUse: number
  }
}
// 站点数据
export type SiteData = {
  lng: number
  siteName: string
  batteryCount: number
  cabineCount: number
  lat: number
}
// 轮播图
export type LoopPicture = {
  title: string 
  type: string 
  url: string 
  order: number 
}