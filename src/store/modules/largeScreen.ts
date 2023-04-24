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
    // getNumber() {
    //   this.nearlySevenCombo.yShaft[2] = Number(this.nearlySevenCombo.yShaft[2]) + 30
    //   this.nearlySevenChangeBattery.yShaft[2] = Number(this.nearlySevenChangeBattery.yShaft[2]) + 30
    //   this.nearlySevenUser.yShaft[2] = Number(this.nearlySevenUser.yShaft[2]) + 30
    //   this.nearlySevenUseBattery.yShaft[2] = Number(this.nearlySevenUseBattery.yShaft[2]) + 30
    //   this.statisticAsset.cabinet.total += 5
    //   this.statisticToday.electricity = Number(this.statisticToday.electricity) + 8 
    // },
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
      function sortDate(a, b) {
        return Date.parse(a) - Date.parse(b)
      }
      this.nearlySevenCombo = {
        xShaft: [],
        yShaft: []
      }
      let res = await _request.get<ApiRes<LineDataType>>('openData/chartComboTenDays')
      const newRes = Object.keys(res).sort(sortDate).splice(3, 9)
      newRes.forEach(item => {
        Object.entries(res).forEach(sub => {
          if(sub[0] == item) this.nearlySevenCombo.yShaft.push(sub[1])
        })
        if(item[8] === '0') {
          item = item.substring(9) + '日'
        }else {
          item = item.substring(8) + '日'
        }
        this.nearlySevenCombo.xShaft.push(item)
      })
      this.nearlySevenCombo.xShaft.unshift('')
      this.nearlySevenCombo.xShaft.push('')
      this.nearlySevenCombo.yShaft.unshift('')
      this.nearlySevenCombo.yShaft.push('')
    },
    // 近7天换电量数据
    async getSevenChange() {
      function sortDate(a, b) {
        return Date.parse(a) - Date.parse(b)
      }
      this.nearlySevenChangeBattery =  {
        xShaft: [],
        yShaft: []
      }
      const res = await _request.get<ApiRes<LineDataType>>('/openData/chartExchangTenDays')
      const newRes = Object.keys(res).sort(sortDate).splice(3, 9)
      newRes.forEach(item => {
        Object.entries(res).forEach(sub => {
          if(sub[0] == item) this.nearlySevenChangeBattery.yShaft.push(sub[1])
        })
        if(item[8] === '0') {
          item = item.substring(9) + '日'
        }else {
          item = item.substring(8) + '日'
        }
        this.nearlySevenChangeBattery.xShaft.push(item)
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
      function sortDate(a, b) {
        return Date.parse(a) - Date.parse(b)
      }
      this.nearlySevenUser = {
        xShaft: [],
        yShaft: []
      }
      const res = await _request.get<ApiRes<LineDataType>>('/openData/chartUserTenDays')
      const newRes = Object.keys(res).sort(sortDate).splice(3, 9)
      newRes.forEach(item => {
        Object.entries(res).forEach(sub => {
          if(sub[0] == item) this.nearlySevenUser.yShaft.push(sub[1])
        })
        if(item[8] === '0') {
          item = item.substring(9) + '日'
        }else {
          item = item.substring(8) + '日'
        }
        this.nearlySevenUser.xShaft.push(item)
      })
      this.nearlySevenUser.xShaft.unshift('-')
      this.nearlySevenUser.xShaft.push('-')
      this.nearlySevenUser.yShaft.unshift('-')
      this.nearlySevenUser.yShaft.push('-')
    },
    // 近7天使用电池
    async getSevenUseBattery() {
      function sortDate(a, b) {
        return Date.parse(a) - Date.parse(b)
      }
      this.nearlySevenUseBattery = {
        xShaft: [],
        yShaft: []
      }
      const res = await _request.get<ApiRes<LineDataType>>('/openData/chartBatteryTenDays')
      const newRes = Object.keys(res).sort(sortDate).splice(3, 9)
      newRes.forEach(item => {
        Object.entries(res).forEach(sub => {
          if(sub[0] == item) this.nearlySevenUseBattery.yShaft.push(sub[1])
        })
        if(item[8] === '0') {
          item = item.substring(9) + '日'
        }else {
          item = item.substring(8) + '日'
        }
        this.nearlySevenUseBattery.xShaft.push(item)
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