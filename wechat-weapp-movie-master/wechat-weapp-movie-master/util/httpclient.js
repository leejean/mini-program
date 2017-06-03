var app = getApp();
function request(url, data, method, success, fail){
    data = data || {}
    wx.request({
      url: url,
      data: data,
      header: {
      	"Content-Type": "application/x-www-form-urlencoded"
      },
      method: method,
      success: function (dto){
      	console.info("============================")
      	console.info("==URL:"+url)
      	console.info("==method:"+method)
      	console.info("==data:")
      	console.info(data)
      	console.info("==returnDTO:")
      	console.info(dto)
      	console.info("============================")
      	typeof success == 'function' && success(dto)
      },
      fail: fail,
      complete: function() {
        // complete
      }
    })
}
module.exports = {
  request: request
}