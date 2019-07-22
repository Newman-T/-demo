//app.js

var util = require('./utils/util.js');
const http = require('./utils/http.js');
App({
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    var that = this
    // that.onLogin(that.loginFun)
  },

  loginFun: function () {
    var that = this
    if (wx.getStorageSync('mobile') != '') {
      var params = {
        mobile: wx.getStorageSync('mobile'),
        type: 1,
        role_id: 1//角色id
      }
      var sessionkey = wx.getStorageSync('sessionkey')
      

      http.post1(
        app.globalData.domain + 'api/login/login',
        params,
        function (res) {
          console.log(res)
          if (res.data.code == 40001) {
            wx.setStorageSync('role_id', params.role_id)
          }
        },
        function (error) {
          console.log(error)
        }
      )

      // wx.request({
      //   url: that.globalData.domain + 'api/login/login',
      //   method: 'POST',
      //   header: {
      //     'Content-Type': 'json',
      //     role: '1',
      //     sessionkey: sessionkey,
      //   },
      //   data: params,
      //   success: function (res) {
      //     if (res.data.code == 40001) {
      //       wx.setStorageSync('role_id', params.role_id)
      //     }
      //   },
      //   fail: function (err) {
      //     console.log(err)
      //   }
      // })
    } else {
      wx.reLaunch({
        url: '/pages/login/getSetting/getSetting',
      })
    }
  },

  onLogin: function (callBack) {
    var self = this
    var user = wx.getStorageSync('user') || {};
    var sessionkey = wx.getStorageSync('sessionkey') || null;
    console.log(user)
    console.log(sessionkey)
    if (!user.openid || !sessionkey || (user.expires_in < Date.parse(new Date()) / 1000)) {
      console.log('!user.openid')
      wx.login({
        success: function (data) {
          wx.showLoading({
            title: '获取账号信息',
          })
          wx.request({
            url: self.globalData.domain + 'api/base/onLogin',
            header: {
              role: '1',//角色id
              usertype: '5'
            },
            data: {
              code: data.code
            },
            success: function (res) {
              wx.hideLoading()
              console.log('拉取openid成功666661', res)
              if (res.data.code == 40001) {
                wx.setStorageSync('sessionkey', res.data.data.sessionKey)
                wx.setStorageSync('user', res.data.data.uinfo)
                typeof callback === "function" ? callback() : false;//判断回调函数是否function
              } else {
                console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
              }
            },
            fail: function (res) {
              console.log('拉取用户openid失败，接口故障', res)
            }
          })
        },
        fail: function (err) {
          console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
        }
      })
    }
    else {
      console.log('else')
      typeof callback === "function" ? callback() : false;//判断回调函数是否function
      // if (typeof callback === "function") {
      //   callback();
      // }
      // callBack();
    }
  },

  ontime: function () {
    var user = wx.getStorageSync('user') || {};
    var self = this
    var timer = setTimeout(function () {
      self.onLogin(self.onShow);
      var inter = setInterval(function () {
        if ((user.expires_in < Date.parse(new Date()) / 1000)) {
          clearInterval(inter)
        }
        self.onLogin(self.onShow);
      }, 1000)
    }, user.expires_in * 1000 - Date.parse(new Date()) + 10000)

  },

  onHide: function () {
    console.log('App Hide')
  },


  // startWebSocket: function() {
  //   var that = this;
  //   that.WebSocketInit()
  //   wx.onSocketError(function() {})
  //   wx.onSocketMessage(function(data_) {
  //     that.socketOperation(data_)
  //   })
  //   wx.onSocketClose(function(res) {
  //     that.WebSocketInit()
  //   })
  // },

  //连接websocket
  // WebSocketInit: function() {
  //   var that = this;
  //   if (that.globalData.socket1 != null) {
  //     return
  //   }
  //   that.globalData.socket1 = wx.connectSocket({
  //     url: that.globalData.wws,
  //     data: {},
  //     method: 'GET',
  //     success: function(res) {
  //       console.log("connectSocket 成功")
  //     },
  //     fail: function(res) {
  //       console.log("connectSocket 失败")
  //     }
  //   })
  //   wx.onSocketOpen(function() {
  //     // callback
  //     var mCmd = {
  //       "pid": 1,
  //       "from_uid": wx.getStorageSync("uid"),
  //       "to_uid": "",
  //       "from_role_id": wx.getStorageSync("role_id"),
  //       "to_role_id": "4",
  //       "message": "ping",
  //       "type": "onopen"
  //     }
  //     wx.sendSocketMessage({
  //       data: JSON.stringify(mCmd),
  //       success: function(res) {
  //         console.log("sendSocketMessage 成功", res)
  //       },
  //       fail: function(res) {
  //         console.log("sendSocketMessage 失败")
  //       }
  //     })

  //   })

  //   //将计时器赋值给setInter
  //   var ping = setInterval(function() {
  //     if (!that.globalData.is_socket) {
  //       clearInterval(ping)
  //     }

  //     var mCmd = {
  //       "pid": 1,
  //       "from_uid": wx.getStorageSync("uid"),
  //       "to_uid": "",
  //       "from_role_id": wx.getStorageSync("role_id"),
  //       "to_role_id": "4",
  //       "message": "ping",
  //       "type": "ping"
  //     }
  //     wx.sendSocketMessage({
  //       data: JSON.stringify(mCmd),
  //       success: function(res) {},
  //       fail: function(res) {
  //         console.log("sendSocketMessage ping失败")
  //       }
  //     })
  //   }, 10000);
  // },

  // 接收到消息进行解析操作。
  // socketOperation: function(msgList) {
  //   // console.log("all_Socket_data",JSON.parse(msgList.data))
  //   var wsJson = JSON.parse(msgList.data)
  //   if (wsJson.code == 40001) {
  //     switch (wsJson.data.type) {
  //       case "rob":
  //         this.globalData.rabRoomSuccessMsg.push(wsJson.data.lists[0])
  //         this.globalData.robpop();
  //         console.log(this.globalData.rabRoomSuccessMsg)
  //         break;
  //       case "ping":
  //         // console.log(wsJson)
  //         break;
  //     }
  //   }
  // },
  // // 判断抢房消息队列，主动打开对应页面抢房成功弹窗
  // openPop: function() {
  //   if (this.globalData.rabRoomSuccessMsg.length!=0)
  //   {
  //     this.globalData.robpop();
  //   }

  // },

  // //统一发送消息
  // sendSocketMessage: function(msg) {
  //   var mCmd = {
  //     "from_uid": wx.getStorageSync('uid'),
  //     "to_uid": "",
  //     "message": "onopen",
  //     "type": "onopen",
  //     "from_role_id": wx.getStorageSync("role_id"),
  //     "to_role_id": "4",
  //   }
  //   that.globalData.socket1.send({
  //     data: JSON.stringify(mCmd),
  //     success: function(res) {
  //       console.log("sendSocketMessage 成功", res)
  //     },
  //     fail: function(res) {
  //       console.log("sendSocketMessage 失败")
  //     }
  //   })
  // },

  globalData: {
    robpop: '',
    rabRoomSuccessMsg: [],
    is_socket: true,
    is_ai_first: false,
    hasLogin: false,
    openid: null,
    pid: 1,
    domain: 'http://face.zhianinvest.com/', //电子开盘 appID:wx3f1d3e5dde6cb883 个人appID:wx01b6e002ce17a99d 智爱研发appID:wx36c2919000bcaf0e
    wws: "ws://120.25.82.65:9501",
    socket1: null,
    util: util,
  },



})