let app = getApp()
module.exports = {
  get(apiUrl, yes, error) {
    let sessionkey = wx.getStorageSync('sessionkey')
    wx.request({
      url: apiUrl,
      header: {
        'Content-Type': 'json',
        pid: 1,
        sessionkey: sessionkey,
      },
      success: yes,
      fail: error
    })
  },
  post(apiUrl, params, yes, error) {
    let sessionkey = wx.getStorageSync('sessionkey')
    wx.request({
      url: apiUrl,
      data: params,
      method: "POST",
      header: {
        'Content-Type': 'json',
        sessionkey: sessionkey,
      },
      success: yes,
      fail: error
    })
  },
  // 增加Session的过期判断
  post1(apiUrl, params, yes, error) {
    var that = this
    var user = wx.getStorageSync('user') || {};
    var sessionkey = wx.getStorageSync('sessionkey') || null;
    if (!user.openid || !sessionkey || (user.expires_in < Date.parse(new Date()) / 1000)) {
      wx.login({
        success: function (data) {
          wx.request({
            url: app.globalData.domain + 'api/base/onLogin',
            header: {
              role: '1',
              usertype: '5'
            },
            data: {
              code: data.code
            },
            success: function (res) {
              console.log('拉取openid成功666661', res)
              if (res.data.code == 40001) {
                var data = res.data.data
                // 是否登录判断
                if (data.uinfo.name) {
                  wx.setStorageSync('hasLogin', true)
                  // wx.setStorageSync('role_id', data.uinfo.role_id)
                  // wx.setStorageSync('uid', data.uinfo.uid)
                } else {
                  wx.setStorageSync('hasLogin', false)
                  // wx.setStorageSync('role_id', 0)
                }
                app.globalData.openid = data.uinfo.openid
                wx.setStorageSync('user', data.uinfo)
                wx.setStorageSync('sessionkey', data.sessionKey)
                that.post1(apiUrl, params, yes, error)
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
    } else {
      // session_key 未过期，并且在本生命周期一直有效
      let sessionkey = wx.getStorageSync('sessionkey')
      wx.request({
        url: apiUrl,
        data: params,
        method: "POST",
        header: {
          'Content-Type': 'json',
          sessionkey: sessionkey,
          role: '1',
        },
        success: yes,
        fail: error
      })
    }
  },
  // 增加Session的过期判断
  get1(apiUrl, params, yes, error) {

    var that = this
    var user = wx.getStorageSync('user') || {};
    var sessionkey = wx.getStorageSync('sessionkey') || null;
    if (!user.openid || !sessionkey || (user.expires_in < Date.parse(new Date()) / 1000)) {
      wx.login({
        success: function (data) {
          wx.request({
            url: app.globalData.domain + 'api/base/onLogin',
            header: {
              role: '1',
              usertype: '5'
            },
            data: {
              code: data.code
            },
            success: function (res) {
              console.log('拉取openid成功666661', res)
              if (res.data.code == 40001) {
                var data = res.data.data
                // 是否登录判断
                if (data.uinfo.name) {
                  wx.setStorageSync('hasLogin', true)
                } else {
                  wx.setStorageSync('hasLogin', false)
                }
                app.globalData.openid = data.uinfo.openid
                wx.setStorageSync('user', data.uinfo)
                wx.setStorageSync('sessionkey', data.sessionKey)
                that.get1(apiUrl, params, yes, error)
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
    } else {
      // session_key 未过期，并且在本生命周期一直有效
      let sessionkey = wx.getStorageSync('sessionkey')
      wx.request({
        url: apiUrl,
        data: params,
        method: "GET",
        header: {
          role: '1',
          'Content-Type': 'json',
          sessionkey: sessionkey,
        },
        success: yes,
        fail: error
      })
    }
  },
}