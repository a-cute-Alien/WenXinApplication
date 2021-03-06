//app.js

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // // 获取用户信息 检查授权
    // wx.getSetting({
    //   success: res => {
    //     let authlogin = res.authSetting['scope.userInfo'];
    //     if (authlogin){
    //       wx.authorize({
    //         scope: 'scope.userInfo',
    //       })
    //     }
    //     if (authlogin) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       // wx.getUserInfo({
    //       //   success: res => {
    //       //     // 可以将 res 发送给后台解码出 unionId
    //       //     this.globalData.userInfo = res.userInfo
    //       //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //       //     // 所以此处加入 callback 以防止这种情况
    //       //     if (this.userInfoReadyCallback) {
    //       //       this.userInfoReadyCallback(res)
    //       //     }
    //       //   }
    //       // })
    //     }
    //   }
    // })
  },
  onShow (options) {
    // Do something when show.
    // 显示 tabBar 某一项的右上角的红点
    
    // wx.showTabBarRedDot({
    //   index:0
    // })

    // 为 tabBar 某一项的右上角添加文本
    // wx.setTabBarBadge({
    //   index:1,
    //   // text:''
    // })

  },
  globalData: {
    userInfo: null
  },
  getToken(){
    return wx.getStorageSync('user');
  },
  setToken(token){
    wx.setStorageSync('user', token);
  },
  removeToken(token){
    wx.removeStorageSync('user');
  }
})