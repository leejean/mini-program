// pages/main/main.js
Page({
  data:{
      txs:['waveimage','loveparticle','flappybird'],
      url:''
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    
  },
 
  onItemClick : function(e){
      var tempTitle=e.currentTarget.dataset.id
      this.url='?title='+tempTitle.substring(tempTitle.lastIndexOf('/')+1)
      wx.navigateTo({
          url: tempTitle+this.url,
          
          success: function(res){
            // success
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
  }
})
