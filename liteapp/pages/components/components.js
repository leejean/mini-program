//index.js
//获取应用实例
Page({
  data: {},
  onLoad: function () {
    console.log('onLoad')
  },
  redirect:function(e){
    var id = e.currentTarget.id;
    var url = id+"/"+id;
    console.info(url);
    wx.navigateTo({
        url: url
    });
  }
})