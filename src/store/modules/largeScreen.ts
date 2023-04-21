import { defineStore } from 'pinia'
import _request from '@/utils/request'
import { ApiRes, TodayData, LineDataType, AssetType, LoopPicture} from '@/types/data'
export default defineStore('largeScreen', {
  state: () => ({
    statisticToday: {} as TodayData,
    pictureLoop: {} as LoopPicture,
    totalData: {},
    nearlySevenCombo: {
      xShaft: [],
      yShaft: []
    },
    nearlySevenChangeBattery: {
      xShaft: [],
      yShaft: []
    },
    nearlySevenUser: {
      xShaft: [],
      yShaft: []
    },
    nearlySevenUseBattery: {
      xShaft: [],
      yShaft: []
    },
    statisticAsset: {} as AssetType
  }),
  actions: {
    // 总数据
    async getTotalData() {
      const res = await _request.get<ApiRes<LineDataType>>('/openData/statisticTotalData')
      this.totalData = res
    },
    // 今日数据统计
    async getStatisticToday() {
      const res = await _request.get<ApiRes<TodayData>>('/openData/statisticToday')
      this.statisticToday = res
    },
    // 近7天套餐收益
    async getSevenCombo() {
      let res = await _request.get<ApiRes<LineDataType>>('openData/chartComboTenDays')
      const newRes = Object.entries(res).splice(3, 9)
      newRes.forEach(item => {
        if(item[0][8] === '0') {
          item[0] = item[0].substring(9) + '日'
        }else {
          item[0] = item[0].substring(8) + '日'
        }
        this.nearlySevenCombo.xShaft.push(item[0])
        this.nearlySevenCombo.yShaft.push(item[1])
      })
      this.nearlySevenCombo.xShaft.unshift('')
      this.nearlySevenCombo.xShaft.push('')
      this.nearlySevenCombo.yShaft.unshift('')
      this.nearlySevenCombo.yShaft.push('')
    },
    // 近7天换电量数据
    async getSevenChange() {
      const res = await _request.get<ApiRes<LineDataType>>('/openData/chartExchangTenDays')
      const newRes = Object.entries(res).splice(3, 9)
      newRes.forEach(item => {
        if(item[0][8] === '0') {
          item[0] = item[0].substring(9) + '日'
        }else {
          item[0] = item[0].substring(8) + '日'
        }
        this.nearlySevenChangeBattery.xShaft.push(item[0])
        this.nearlySevenChangeBattery.yShaft.push(item[1])
      })
      this.nearlySevenChangeBattery.xShaft.unshift('-')
      this.nearlySevenChangeBattery.xShaft.push('-')
      this.nearlySevenChangeBattery.yShaft.unshift('-')
      this.nearlySevenChangeBattery.yShaft.push('-')
    },
    // 换电柜、电池、车辆数据统计
    async getStatisticAsset() {
      const res = await _request.get<ApiRes<AssetType>>('openData/statisticAssetData')
      this.statisticAsset = res
    },
    // 近7天用户数据
    async getSevenUser() {
      const res = await _request.get<ApiRes<LineDataType>>('/openData/chartUserTenDays')
      const newRes = Object.entries(res).splice(3, 9)
      newRes.forEach(item => {
        if(item[0][8] === '0') {
          item[0] = item[0].substring(9) + '日'
        }else {
          item[0] = item[0].substring(8) + '日'
        }
        this.nearlySevenUser.xShaft.push(item[0])
        this.nearlySevenUser.yShaft.push(item[1])
      })
      this.nearlySevenUser.xShaft.unshift('-')
      this.nearlySevenUser.xShaft.push('-')
      this.nearlySevenUser.yShaft.unshift('-')
      this.nearlySevenUser.yShaft.push('-')
    },
    // 近7天使用电池
    async getSevenUseBattery() {
      const res = await _request.get<ApiRes<LineDataType>>('/openData/chartBatteryTenDays')
      const newRes = Object.entries(res).splice(3, 9)
      newRes.forEach(item => {
        if(item[0][8] === '0') {
          item[0] = item[0].substring(9) + '日'
        }else {
          item[0] = item[0].substring(8) + '日'
        }
        this.nearlySevenUseBattery.xShaft.push(item[0])
        this.nearlySevenUseBattery.yShaft.push(item[1])
      })
      this.nearlySevenUseBattery.xShaft.unshift('-')
      this.nearlySevenUseBattery.xShaft.push('-')
      this.nearlySevenUseBattery.yShaft.unshift('-')
      this.nearlySevenUseBattery.yShaft.push('-')
    },
    // 轮播图
    async getPicture() {
      const res = await _request.get<ApiRes<LoopPicture[]>>('/openData/pictureLoop')
      this.pictureLoop = res
    }

  }
})