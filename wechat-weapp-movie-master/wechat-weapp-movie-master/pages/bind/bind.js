var message = require('../../component/message/message')
var user = require('../../comm/script/user')
var school = require('../../comm/script/school')
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
  	school.findHotSchools.call(
  		that,
  		{topsize:8},
  		function(dto){
	  			that.setData({
			  		hotSchools:dto.data
			  	})
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
    	var searchSchools = [];
    	school.findByNameLike.call(
  		that,
  		{
  			schoolName:keyword,
  			topsize:8
  		},
  		function(dto){
	  			searchSchools = dto.data;
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
  		)
    	
    	
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
			    console.info(schoolName);
			    user.bindSchool.call(
  				that,
		  		{
		  			userId:userId,
		  			schoolId:schoolId
		  		},
		  		function(dto){
			  			message.show.call(that,{
				        content: dto.msg,
				        icon: dto.status?'ok':'null',
				        duration: 1500
				      })
			  			if(dto.status)wx.reLaunch({url: '../home/home'})
		  		}
  		)
			    
		    } else if (res.cancel) {
		      console.log('用户点击取消')
		    }
		  }
		})
  },
  searchByKeyword:function(e){
  	var that = this;
  	that.bindSchool(e);
  }
})