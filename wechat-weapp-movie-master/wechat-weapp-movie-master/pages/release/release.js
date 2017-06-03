var util = require('../../util/util')
var info = require('../../comm/script/info')
var config = require('../../comm/script/config')
var app = getApp()
Page({
  data:{
  	server:config.server,
    infoTypes: ['失物启示', '招领启示'],
    typeIndex: 0,
    infoType :1,
    infoTypeName:'',
    imageList: [],
    ossImageList: [],
    sourceType: 2,//['拍照', '相册', '拍照或相册'],
    sizeType: 1, //['压缩', '原图', '压缩或原图'],
    count: 9,
    canChoose:true,
  },
  onLoad:function(options){
    var birthdayEndDate = util.getDate()
    var that = this
    wx.getStorage({
      key: 'person_info',
      success: function(res){
        var data = res.data
        that.setData({
          name: data.name,
          nickName: data.nickName,
          gender: data.gender,
          age: data.age,
          birthday: data.birthday,
          constellation: data.constellation,
          company: data.company,
          school: data.school,
          tel: data.tel,
          email: data.email,
          intro: data.intro,
          birthdayEndDate: birthdayEndDate
        })
      }
    })
  },
  save: function(e) {
  	var that =  this;
    var data = e.detail.value
    if(that.data.ossImageList.length>0){
    	data.imgs = that.data.ossImageList.join(",")
    }
    data.userId = app.globalData.userInfo.id;
    console.info(data);
    info.save.call(that, data ,function(dto){
			 if(dto.status){
			 		wx.showToast({
					  title: dto.msg,
					  icon: 'success',
					  duration: 2000
					})
			 }else{
			 		wx.showToast({
					  title: dto.msg,
					  duration: 2000
					})
			 }
		})
  },
  changeType: function(e) {
    var typeIndex = e.detail.value
    if (typeIndex != "null") {
      this.setData({
        typeIndex: typeIndex,
        infoTypeName :this.data.infoTypes[this.data.typeIndex],
        infoType: parseInt(typeIndex)+1
      })
    }
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