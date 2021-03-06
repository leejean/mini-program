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
    sourceType: ['album', 'camera'],//['拍照', '相册', '拍照或相册'],
    sizeType: ['original', 'compressed'], //['压缩', '原图', '压缩或原图'],
    maxCount: 9,
    canChoose:true,
  },
  onLoad:function(options){
    var that = this
    wx.setNavigationBarTitle({
			title: "发布" + that.data.infoTypes[that.data.infoType-1]
		})
  },
  changeInfoType:function(e){
    var that  = this
    that.setData({
      infoType: e.target.dataset.id
    })
    wx.setNavigationBarTitle({
      title: "发布" + that.data.infoTypes[e.target.dataset.id - 1]
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
    data.schoolId = app.globalData.userInfo.schoolId;
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
//  wx.chooseImage({
//    count: 1,
//    success: function(res) {
//      var tempFilePath = res.tempFilePaths[0]
//      wx.saveFile({
//        tempFilePath: tempFilePath,
//        success: function(res) {
//          var savedFilePath = res.savedFilePath
//          console.log(savedFilePath)
//          that.setData({
//            pictures: that.data.pictures.concat(savedFilePath)
//          })
//          wx.setStorage({
//            key: 'gallery',
//            data: that.data.pictures
//          })
//        }
//      })
//    }
//  })
    wx.chooseImage({
    	count:1,//单次可选
      sourceType: that.data.sourceType,
      sizeType: that.data.sizeType,
      success: function (res) {
        var tempFilePath = res.tempFilePaths[0];
        wx.showLoading({
				  title: '图片上传中',
				})
        wx.uploadFile({
		      url: app.globalData.server + 'api/file/upload', 
          filePath: tempFilePath,
		      name: 'file',
		      success: function(dto){
		        dto = JSON.parse(dto.data)
		        if(dto.status){
              console.info(dto.data);
		        	that.setData({
			           ossImageList:that.data.ossImageList.concat(dto.data),
                 imageList: that.data.imageList.concat(dto.data),
                 canChoose: that.data.imageList.length < that.data.maxCount
			        })
		        	wx.hideLoading()
		        }else{
		        	wx.showToast({
							  title: data.msg,
							  duration: 2000
							})
		        }
		      },
		      fail:function(){
		      	wx.hideLoading()
		      },
		      complete:function(){
		      	
		      },
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