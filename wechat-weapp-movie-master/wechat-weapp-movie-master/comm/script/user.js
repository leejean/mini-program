var message = require('../../component/message/message')
var httpclient = require('../../util/httpclient')
/**
 * 获取微信用户信息
 * @param {String} url 后台服务地址
 * @param {Object} data 请求参数
 * @param {Function} cb 回调函数
 */
function getUserInfo(data, cb) {
  var that = this;
  httpclient.request(
  	that.globalData.server + "api/wxauth/getUserInfo", 
  	data, 
  	'POST',  
  	function(res){
      typeof cb == 'function' && cb(res.data)
    },
    function() {
      message.show.call(that,{
        content: '网络开小差了',
        icon: 'offline',
        duration: 3000
      })
    }
  );
}

module.exports = {
  getUserInfo: getUserInfo
}