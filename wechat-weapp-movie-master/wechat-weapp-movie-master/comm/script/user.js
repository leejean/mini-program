var message = require('../../component/message/message')

/**
 * 获取微信用户信息
 * @param {String} url 后台服务地址
 * @param {Object} data 请求参数
 * @param {Function} cb 回调函数
 */
function getUserInfo(url, data, cb) {
  var that = this;
  wx.request({
    url: url,
    data: data,
    method: 'GET',
    header: {
      "Content-Type": "application/json,application/json"
    },
    success: function(res){
      typeof cb == 'function' && cb(res.data)
    },
    fail: function() {
      message.show.call(that,{
        content: '网络开小差了',
        icon: 'offline',
        duration: 3000
      })
    }
  })
}

module.exports = {
  getUserInfo: getUserInfo
}