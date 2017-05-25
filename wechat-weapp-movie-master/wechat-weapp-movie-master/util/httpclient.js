var app = getApp();
function request(url, data, method, success, fail){
    var mydata = data || {};
    wx.request({
      url: url,
      data: mydata,
      header: {
      	"Content-Type": "application/x-www-form-urlencoded"
      },
      method: method,
      success: success,
      fail: fail,
      complete: function() {
        // complete
      }
    })
}
module.exports = {
  request: request
}