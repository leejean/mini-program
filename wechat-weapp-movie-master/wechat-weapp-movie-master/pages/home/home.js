var config = require('../../comm/script/config')
var info = require('../../comm/script/info')
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
			keyWord:''
		},
		infos:[]
	},
	onLoad: function() {
		var that = this
		//在当前页面显示导航条加载动画
		wx.showNavigationBarLoading()
		app.getCity(function(){
			//隐藏导航条加载动画
			wx.hideNavigationBarLoading()
			wx.setNavigationBarTitle({
				title: '发现'// + config.city
			})
			info.getInfos.call(that,that.data.queryData)
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
			url: '../search/search'
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