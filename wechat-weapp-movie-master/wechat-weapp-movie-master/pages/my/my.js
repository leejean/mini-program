var config = require('../../comm/script/config')
var app = getApp();
Page({
  data:{
    gridList: [
      //{enName:'favorite', zhName:'收藏'},
      {enName:'history', zhName:'浏览记录'},
      {enName:'released', zhName:'我发布的'},
      // {enName:'shake', zhName:'摇一摇'},
      // {enName:'gallery', zhName:'相册'},
      //{enName:'setting', zhName:'设置'}
      {enName:'about', zhName:'关于'}
    ],
    skin: ''
  },
  onLoad:function(cb){
    var that = this
    console.log(app.globalData.userInfo)
    // 检测是否存在用户信息
    if (app.globalData.userInfo != null) {
      that.setData({
          userInfo: app.globalData.userInfo
      })
    } else {
      app.getUserInfo()
    }
    typeof cb == 'function' && cb()
  },
  onShow:function(){
    var that = this
    wx.getStorage({
      key: 'skin',
      success: function(res){
        if (res.data == "") {
          that.setData({
            skin: config.skinList[0].imgUrl
          })
        } else {
          that.setData({
            skin: res.data
          })
        }
      }
    })
  },
  onPullDownRefresh: function() {
    this.onLoad(function(){
      wx.stopPullDownRefresh()
    })
  },
  viewGridDetail: function(e) {
    var data = e.currentTarget.dataset
		wx.navigateTo({
			url: "../" + data.url + '/' + data.url
		})
  },
  viewSkin: function() {
		wx.navigateTo({
			url: "../skin/skin"
		})
  },
  toBindSchool:function(){
			wx.navigateTo({
					url: '../bind/bind?userId='+app.globalData.userInfo.id
			})
  }
})