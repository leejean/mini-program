Page({
  data:{
  	
  },
  onLoad:function(options){
    var that = this
  },
  navigateTo:function(e){
  	var data = e.currentTarget.dataset;
  	wx.navigateTo({
			url: "../release/release?infoType=" + data.id
		})
  }
})