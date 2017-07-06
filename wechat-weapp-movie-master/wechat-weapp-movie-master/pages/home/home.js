var config = require('../../comm/script/config')
var info = require('../../comm/script/info')
var user = require('../../comm/script/user')
var app = getApp()
Page({
	data: {
		server:config.server,
		hasMore: true,//是否有更多数据标记
		showLoading: true,
		bannerList: config.bannerList,
		queryData:{
			page:1,
			pagesize:4,
			//longitude:113.877012,
			//latitude:22.575624,
			//scope:100,
			//infoType:1,
			schoolId:0,
			keyWord:''
		},
		infos:[]
	},
	onLoad: function() {
		var that = this
		//在当前页面显示导航条加载动画
		wx.showNavigationBarLoading()
		that.initUserInfo(function(data){
			app.globalData.userInfo =data
			if(app.globalData.userInfo.schoolId==0){
				wx.showModal({
				  title: '提示',
				  content: '你的账号暂未绑定学校信息',
				  showCancel:false,
				  confirmText:'立即绑定',
				  confirmColor:"#27C79A",
				  success: function(res) {
				    if (res.confirm) {
				      wx.navigateTo({
							url: '../bind/bind?userId='+app.globalData.userInfo.id
					  })
				    }
				  }
				})
			}else{
				wx.setNavigationBarTitle({
					title: app.globalData.userInfo.schoolName
				})
				var queryData = that.data.queryData;
				queryData.schoolId = app.globalData.userInfo.schoolId;
				that.setData({
					queryData:queryData
				})
				
			}
			info.getInfos.call(that,that.data.queryData)
			wx.hideNavigationBarLoading()
		})
		
	},
	//监听该页面用户下拉刷新事件
	onPullDownRefresh: function() {
		var that = this
		var data = that.data
		data.page = 1
		data.keyWord = ''
		that.setData({
			infos: [],
			hasMore: true,
			showLoading: true,
			queryData: data
			
		})
		this.onLoad()
	},
	//页面上拉触底事件的处理函数
	onReachBottom: function() {
		var that = this
		if (!that.data.showLoading) {
			info.getInfos.call(that,that.data.queryData)
		}
	},
	 initUserInfo:function(cb){
	    var that = this
	    
	    wx.login({
	      success: function (res) {
	        app.globalData.loginCode = res.code
	        wx.getUserInfo({
	          success: function (res) {
	            var data = {
	            	code:app.globalData.loginCode,
	            	encryptedData:res.encryptedData,
	            	iv:res.iv
	            }
	            user.getUserInfo.call(that,data,function(dto){
	            	console.info(app.globalData.userInfo)
	            	typeof cb == 'function' && cb(dto.data)
	            })
	          }
	        })
	      }
	    })
  	},
	//详情
	viewInfoDetail: function(e) {
		var data = e.currentTarget.dataset;
	},
	//点击轮播图
	viewBannerDetail: function(e) {
		var data = e.currentTarget.dataset
		console.info(data);
	},
	//跳转到搜索页
	viewSearch: function() {
		wx.navigateTo({
			url: '../infosearch/infosearch'
		})
  },
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: e.target.dataset.srcs
    })
  }
})