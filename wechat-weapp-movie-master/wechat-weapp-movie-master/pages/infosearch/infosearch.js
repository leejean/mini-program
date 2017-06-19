var message = require('../../component/message/message')
var config = require('../../comm/script/config')
var info = require('../../comm/script/info')
Page({
  data:{
    server: config.server,
    searchType: 0,
    searchTypeName:'全部',
    showLoading: false,
    hasMore: true,//是否有更多数据标记
    notSearchMode:true,
    queryData: {
      page: 1,
      pagesize: 10,
      infoType:1,
      keyWord: null
    },
    infos: []
  },
  changeSearchType: function() {
    var types = ['全部', '失物', '招领']
    var searchType = [0, 1, 2]
    var that = this
    wx.showActionSheet({
      itemList: types,
      success: function(res) {
        console.log(res)
        if (!res.cancel) {
          that.setData({
            searchType: searchType[res.tapIndex],
            searchTypeName:types[res.tapIndex],
            hasMore: true
          })
        }
      }
    })
  },
  bindInput:function(e){
    var that = this
    var queryData = that.data.queryData;
    queryData.keyWord = e.detail.value;
    that.setData({
      queryData: queryData,
      hasMore: true
    })
  },
  search: function(e) {
    var that = this
    var keyword = that.data.queryData.keyWord
    if (keyword == null || keyword == '') {
      message.show.call(that,{
        content: '请输入关键字',
        icon: 'null',
        duration: 1500
      })
      return false
    } else {
      var queryData = that.data.queryData;
      queryData.infoType = that.data.searchType;
      queryData.page = 1;
      that.setData({
        queryData: queryData
      })
      info.getInfos.call(that, that.data.queryData)
    }
  }
})