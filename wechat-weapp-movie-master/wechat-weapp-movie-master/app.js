var config = require('comm/script/config')
var httpclient = require('util/httpclient.js')
App({
  globalData: {
    userInfo: null,
    loginCode: null,
    encryptedData: null,
    iv: null,
    server: 'https://localhost:8080/weappservice/api/v1',
    appId: 'wxb945e7beb12d7059',
    apiNames: ['WX_CODE', 'WX_CHECK_USER', 'WX_DECODE_USERINFO']
  },
  onLaunch: function() {
    // 获取用户信息
    this.initUserInfo()
    //初始化缓存
    this.initStorage()

    //this.get3rdSessionId()

    //this.getUserAllData()
  },
  initUserInfo:function(cb){
    var that = this
    wx.login({
      success: function (res) {
        that.globalData.loginCode = res.code
        wx.getUserInfo({
          success: function (res) {
            that.globalData.userInfo = res.userInfo
            that.globalData.iv = res.iv
            that.globalData.encryptedData = res.encryptedData
            typeof cb == "function" && cb(that.globalData.userInfo)
            debugger;
            that.get3rdSessionId()
          }
        })
      }
    })
  },
  // 从服务端获取sessionId
  get3rdSessionId: function (e) {
    debugger;
    var that = this;
    // //根据code获取sessionsession_key和openid
    // wx.showToast({
    //   title: '正在请求',
    //   icon: 'loading',
    //   duration: 10000
    // });
    console.info(that.globalData.loginCode);
    httpclient.req(
      'http://127.0.0.1:8080/api/v1/wx/getSession',
      {
        apiName: 'WX_CODE',
        code: that.globalData.loginCode
      },
      'GET',
      function (result) {
        // wx.hideToast()
        var sessionId = result.data.data.sessionId;
        that.setData({ sessionId: sessionId })
        wx.setStorageSync('sessionId', sessionId)
      },
      function (result) {
        console.log(result)
      }
    );
  },
  //解密用户敏感数据
  getUserAllData: function (e) {
    var that = this;
    // wx.showToast({
    //   title: '正在请求',
    //   icon: 'loading',
    //   duration: 10000
    // })
    httpclient.req(
      '/wx/decodeUserInfo',
      {
        apiName: 'WX_DECODE_USERINFO',
        encryptedData: that.globalData.encryptedData,
        iv: that.globalData.iv,
        sessionId: wx.getStorageSync('sessionId')
      },
      'GET',
      function (result) {
        // wx.hideToast()
        var data = JSON.parse(result.data.data);
        that.setData({
          openId: data.openId,
          unionId: data.unionId,
          nickname1: data.nickName
        })
      },
      function (result) {
        console.log(result)
      }
    );
  },    
  getCity: function(cb) {
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var locationParam = res.latitude + ',' + res.longitude + '1'
        wx.request({
          url: config.apiList.baiduMap,
          data: {
            ak: config.baiduAK,
            location: locationParam,
            output: 'json',
            pois: '1'
          },
          method: 'GET',
          success: function(res){
            config.city = res.data.result.addressComponent.city.slice(0,-1)
            typeof cb == "function" && cb(res.data.result.addressComponent.city.slice(0,-1))
          },
          fail: function(res) {
            // 重新定位
            that.getCity();
          }
        })
      }
    })
  },
  initStorage: function() {
    wx.getStorageInfo({
      success: function(res) {
        // 判断电影收藏是否存在，没有则创建
        if (!('film_favorite' in res.keys)) {
          wx.setStorage({
            key: 'film_favorite',
            data: []
          })
        }
        // 判断人物收藏是否存在，没有则创建
        if (!('person_favorite' in res.keys)) {
          wx.setStorage({
            key: 'person_favorite',
            data: []
          })
        }
        // 判断电影浏览记录是否存在，没有则创建
        if (!('film_history' in res.keys)) {
          wx.setStorage({
            key: 'film_history',
            data: []
          })
        }
        // 判断人物浏览记录是否存在，没有则创建
        if (!('person_history' in res.keys)) {
          wx.setStorage({
            key: 'person_history',
            data: []
          })
        }
        // 个人信息默认数据
        var personInfo = {
          name: '',
          nickName: '',
          gender: '',
          age: '',
          birthday: '',
          constellation: '',
          company: '',
          school: '',
          tel: '',
          email:'',
          intro: ''
        }
        // 判断个人信息是否存在，没有则创建
        if (!('person_info' in res.keys)) {
          wx.setStorage({
            key: 'person_info',
            data: personInfo
          })
        }
        // 判断相册数据是否存在，没有则创建
        if (!('gallery' in res.keys)) {
          wx.setStorage({
            key: 'gallery',
            data: []
          })
        }
        // 判断背景卡选择数据是否存在，没有则创建
        if (!('skin' in res.keys)) {
          wx.setStorage({
            key: 'skin',
            data: ''
          })
        }
      }
    })
  }
})