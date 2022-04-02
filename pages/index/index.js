// pages/home/home.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    background: [1, 2, 3, 4, 5, 6, 7, 8],
    text: " 欢迎前往我医院就诊，请注意佩戴口罩。",
    selected: 0,
    isLogin:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //检查微信服务器的用户登陆状态
    wx.checkSession({
      //成功不做处理
      success: (res) => {
        console.log("微信服务器登陆状态验证成功");
      },
      //失败清除本地登陆凭证，重新登陆
      fail: (res) => {
        console.log("微信服务器登陆状态验证失败,正在重新登陆");
        wx.removeStorageSync('uuid');
        this.handWXleLogin();
      },
    })
    //登陆
    this.handWXleLogin();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // wx.stopPullDownRefresh()

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 点击导航
   */
  navClick(event) {
    let index = event.currentTarget.dataset['index'];
    let title = event.currentTarget.dataset['title'];
    console.log("index", index)
    console.log("title", title)
  },
  /**
   * 处理登陆流程
   */
  handWXleLogin() {
    let that = this;
    let cookie = app.getToken(); //取出Cookie
    //登陆 发送 res.code 到后台换取 openId, sessionKey, unionId
    wx.login({
      success: res => {
        //服务器登陆登陆
        wx.request({
          url: 'http://127.0.0.1/login',
          method: 'post',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': cookie
          },
          data: {
            'js_code': res.code
          },
          success: function (res2) {
            if (res2.statusCode == 200) {
              if (res2.header['Set-Cookie'] != null) {
                var set_cookie = res2.header['Set-Cookie'];
                var end = set_cookie.indexOf(";");
                var token = set_cookie.substr(0, end);
                app.setToken(token);
              }
              that.setData({isLogin:true});
              that.handleNotice();
              console.log("登陆成功")
            } else {
              app.removeToken();
              console.log("Token异常正在退出小程序");
              Dialog.confirm({
                  title: '网络异常',
                  message: '是否刷新',
                })
                .then(() => {
                  that.onLoad();
                }).catch(() => {
                  wx.exitMiniProgram({
                    success: (res) => {
                      console.log(res)
                    },
                  });
                });;
            }
          },
          fail: function (res2) {
            console.log("网络异常正在退出小程序");
            Dialog.alert({
                title: '网络异常',
                message: '正在退出小程序',
              })
              .then(() => {
                wx.exitMiniProgram({
                  success: (res) => {
                    console.log(res)
                  },
                });
              });
          }
        })
      }
    })
  },
  /**
   * 功能页面跳转
   */
  navigateTo: function (e) {
    this.setData({
      selected: e.currentTarget.dataset.id
    })
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
    this.setData({
      selected: 0
    });
  },
  /**
   * 更新提示框
   */
  handleNotice() {
    var that = this;
    let cookie = app.getToken();
    wx.request({
      url: 'http://127.0.0.1/notice/newest',
      method: 'Post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': cookie
      },
      success: function (res) {
        if(res.data!=null){
          that.setData({
            text: res.data.noticeTitle + " << " + res.data.noticeContent + ">>"
          });    
          console.log("公告更新成功");
        }
      }
    })
  }
})