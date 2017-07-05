var message = require('../../component/message/message')
var douban  = require('../../comm/script/fetch')
var config  = require('../../comm/script/config')
Page({
  data:{
  	resultTitle:null,
  	userId:0,
    hotSchools: [],
    searchSchools:[]
  },
  onLoad:function(options){
  	var that  = this
  	that.setData({
  		userId:options.userId,
  	})
  	that.initHotSchools();
  },
  onUnload: function() {
      console.info("onUnload");
      
  },
  initHotSchools:function(){
  	var that  = this
  	that.setData({
  		hotSchools:[
  			{id:1,schoolName:"北京大学"},
  			{id:2,schoolName:"中国人民大学"},
  			{id:3,schoolName:"清华大学"},
  			{id:2,schoolName:"中国人民大学"},
  			{id:3,schoolName:"清华大学"},
  			{id:2,schoolName:"中国人民大学"},
  			{id:3,schoolName:"清华大学"}
  		]
  	})
  },
  search: function(e) {
    var that = this
    var keyword = e.detail.value.keyword
    if (keyword == '') {
      message.show.call(that,{
        content: '请输学校名称',
        icon: 'null',
        duration: 1500
      })
      return false
    } else {
    	var searchSchools = [{id:1,schoolName:"湖南大学"}];
    	if(searchSchools.length>0){
    		for(var idx in searchSchools){
    		searchSchools[idx].words = that.hightLightKeyWords(keyword,searchSchools[idx].schoolName);
    	}
      that.setData({
		  		searchSchools:searchSchools,
		  		resultTitle:"搜索结果"
	  	})
    	}else{
    		that.setData({
		  		searchSchools:[],
		  		resultTitle:"未找到 '"+keyword+"' 学校信息"
	  		})
    	}
    }
  },
  hightLightKeyWords:function(keyword,content){
  	var keywords = keyword.split("");
  	var contents = content.split("");
  	var lightChars = [];
  	var k_idx = 0;
  	for(var c_idx in contents){
  			var c_char = contents[c_idx];
  			if(c_char==keywords[k_idx]){
  					lightChars[c_idx] = {word:c_char,hightlignt:true}
  					k_idx++;
  			}else{
  				lightChars[c_idx] = {word:c_char,hightlignt:false}
  			}
  	}
  	return lightChars;
  },
  bindSchool:function(e){
  	var that = this
    var schoolId = e.currentTarget.dataset.id;
    var schoolName = e.currentTarget.dataset.name;
    var userId = that.data.userId;
    wx.showModal({
		  title: '提示',
		  content: '您要绑定['+schoolName+']作为你的学校',
		  confirmColor:"#27C79A",
		  success: function(res) {
		    if (res.confirm) {
		      console.info(schoolId);
			    console.info(schoolName);
			    console.info(userId);
		    } else if (res.cancel) {
		      console.log('用户点击取消')
		    }
		  }
		})
  },
  searchByKeyword:function(e){
  	console.info(e.target.dataset.name);
  }
})