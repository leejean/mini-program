var douban = require('../../comm/script/fetch')
var config = require('../../comm/script/config')
var app = getApp()
Page({
	data: {
		films: [],
		hasMore: true,//是否有更多数据标记
		showLoading: true,
		start: 0,
		bannerList: config.bannerList
	},
	onLoad: function() {
		var that = this
		//在当前页面显示导航条加载动画
		wx.showNavigationBarLoading()
		app.getCity(function(){
			//隐藏导航条加载动画
			wx.hideNavigationBarLoading()
			wx.setNavigationBarTitle({
				title: '正在热映 - ' + config.city
			})
			douban.fetchFilms.call(that, config.apiList.popular, that.data.start)
		})
	},
	//监听该页面用户下拉刷新事件
	onPullDownRefresh: function() {
		var that = this
		that.setData({
			films: [],
			hasMore: true,
			showLoading: true,
			start: 0
		})
		this.onLoad()
	},
	//页面上拉触底事件的处理函数
	onReachBottom: function() {
		var that = this
		if (!that.data.showLoading) {
			douban.fetchFilms.call(that, config.apiList.popular, that.data.start)
		}
	},
	//详情
	viewFilmDetail: function(e) {
		var data = e.currentTarget.dataset;
		wx.navigateTo({
			url: "../filmDetail/filmDetail?id=" + data.id
		})
	},
	//点击标签	
	viewFilmByTag: function(e) {
		var data = e.currentTarget.dataset
		var keyword = data.tag
		wx.navigateTo({
			url: '../searchResult/searchResult?url=' + encodeURIComponent(config.apiList.search.byTag) + '&keyword=' + keyword
		})
	},
	//点击轮播图
	viewBannerDetail: function(e) {
		var data = e.currentTarget.dataset
		if (data.type == 'film') {
			wx.navigateTo({
				url: "../filmDetail/filmDetail?id=" + data.id
			})
		} else if (data.type == 'person') {
			wx.navigateTo({
				url: '../personDetail/personDetail?id=' + data.id
			})
		} else if (data.type == 'search') {
			// stype(searchType) 0:关键词, 1:类型标签
			var searchUrl = stype == 'keyword' ? config.search.byKeyword : config.search.byTag
			wx.navigateTo({
				url: '../searchResult/searchResult?url=' + encodeURIComponent(searchUrl) + '&keyword=' + keyword
			})
		}
	},
	//跳转到搜索页
	viewSearch: function() {
		wx.navigateTo({
			url: '../search/search'
		})
	}
})