var util = require('../../util/util')
var info = require('../../comm/script/info')
var config = require('../../comm/script/config')
var message = require('../../component/message/message')
var app = getApp()
Page({
  data:{
  	server:config.server,
    infoTypes: ['失物启示', '招领启示'],
    infoType : 1,
    imageList: [],
    ossImageList: [],
    sourceType: 2,//['拍照', '相册', '拍照或相册'],
    sizeType: 1, //['压缩', '原图', '压缩或原图'],
    count: 9,
    canChoose:true,
  },
  onLoad:function(options){
    var that = this
    that.setData({
    	infoType:options.infoType
    })
    wx.setNavigationBarTitle({
			title: "发布" + that.data.infoTypes[options.infoType-1]
		})
  },
  save: function(e) {
  	var that =  this;
  	message.show.call(that,{
      content: '保存中',
      icon: 'offline',
      duration: 3000
    })
    var data = e.detail.value
    if(that.data.ossImageList.length>0){
    	data.imgs = that.data.ossImageList.join(",")
    }
    data.infoType = that.data.infoType;
    data.userId = app.globalData.userInfo.id;
    console.info(data);
    info.save.call(that, data ,function(dto){
			 if(dto.status){
			 		wx.showToast({
					  title: dto.msg,
					  icon: 'success',
					  duration: 2000
					})
			 		wx.reLaunch({
					  url: '../home/home'
					})
			 }else{
			 		wx.showToast({
					  title: dto.msg,
					  duration: 2000
					})
			 		
			 }
		})
  },
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      sourceType: that.data.sourceType,
      sizeType: that.data.sizeType,
      count: this.data.count[this.data.countIndex],
      success: function (res) {
        that.setData({
          imageList: that.data.imageList.concat(res.tempFilePaths)
        })
        that.setData({
          canChoose:that.data.imageList.length<that.data.count
        })
        wx.uploadFile({
		      url: app.globalData.server + 'api/file/upload', 
		      filePath: that.data.imageList[0],
		      name: 'file',
		      success: function(dto){
		        dto = JSON.parse(dto.data)
		        if(dto.status){
		        	that.setData({
			          ossImageList:that.data.ossImageList.concat(dto.data)
			        })	   
		        }else{
		        	wx.showToast({
							  title: data.msg,
							  duration: 2000
							})
		        }
		      }
		    })
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  }
})