var message = require('../../component/message/message')
var config = require('../../comm/script/config')
var httpclient = require('../../util/httpclient')

function findByNameLike(data, cb) {
  var that = this;
  httpclient.request(
    config.server + "api/school/findByNameLike",
    data,
    'POST',
    function (res) {
      typeof cb == 'function' && cb(res.data)
    },
    function () {
      message.show.call(that, {
        content: '网络开小差了',
        icon: 'offline',
        duration: 3000
      })
    }
  );
}

function findHotSchools(data, cb) {
  var that = this;
  httpclient.request(
    config.server + "api/school/findHotSchools",
    data,
    'POST',
    function (res) {
      typeof cb == 'function' && cb(res.data)
    },
    function () {
      message.show.call(that, {
        content: '网络开小差了',
        icon: 'offline',
        duration: 3000
      })
    }
  );
}


module.exports = {
  findByNameLike: findByNameLike,
  findHotSchools: findHotSchools
}