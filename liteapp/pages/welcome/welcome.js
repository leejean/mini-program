//welcome.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    console.debug("跳转");
    wx.navigateTo({
      url: '../index/index'
    })
  },
  onLoad: function(options) {
        console.log('onLoad');
        var that = this;
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo){
            //更新数据
            that.setData({
                userInfo:userInfo
            });
        });
  }/*,
  onReady: function() {
    // Do something when page ready.
  },
  onShow: function() {
    // Do something when page show.
  },
  onHide: function() {
    // Do something when page hide.
  },
  onUnload: function() {
    // Do something when page close.
  },
  onPullDownRefresh: function() {
    // Do something when pull down.
  },
  onReachBottom: function() {
    // Do something when page reach bottom.
  },
  onShareAppMessage: function () {
   // return custom share data when user share.
  },
  // Event handler.
  viewTap: function() {
    this.setData({
      text: 'Set some data for updating view.'
    })
  },
  customData: {
    hi: 'MINA'
  }*/
})


// data	Object	页面的初始数据
// onLoad	Function	生命周期函数--监听页面加载
// onReady	Function	生命周期函数--监听页面初次渲染完成
// onShow	Function	生命周期函数--监听页面显示
// onHide	Function	生命周期函数--监听页面隐藏
// onUnload	Function	生命周期函数--监听页面卸载
// onPullDownRefresh	Function	页面相关事件处理函数--监听用户下拉动作
// onReachBottom	Function	页面上拉触底事件的处理函数
// onShareAppMessage	Function	用户点击右上角分享
// 其他	Any	开发者可以添加任意的函数或数据到 object 参数中，在页面的函数中用 this 可以访问