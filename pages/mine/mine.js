// me/me.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    userInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.handleGetInfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // wx.stopPullDownRefresh()
    this.onLoad();
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
  //删除用户信息
  logout() {
    var that = this;
    Dialog.confirm({
        title: '提示',
        message: '确认是否要注销用户信息',
      })
      .then(() => {
        // on confirm
        let cookie = wx.getStorageSync('uuid'); //取出Cookie
        wx.request({
          url: 'http://127.0.0.1/logout',
          method: 'post',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': cookie
          },
          success: function (res) {
            that.setData({
              isLogin: false
            });
          },
          fail: function (res) {}
        })
      })
      .catch(() => {
        // on cancel
        //   this.setData({ show: false });
      });
  },
  navigateTo: function (e) {
    console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  handleGetInfo(){
    var that = this;
    let cookie = app.getToken();
    wx.request({
      url: 'http://127.0.0.1/user/info',
      method: 'Post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': cookie
      },
      success: function (res) {
        if (res.statusCode == 200) {
          console.log("获取用户信息成功");
          if (res.data.name != null && res.data.id != null) {
            res.data.id = res.data.id.replace(/^(.{6})(?:\d+)(.{4})$/, "$1********$2");
            console.log("更新用户信息成功");
            that.setData({
              userInfo: res.data
            });
            that.setData({
              isLogin: true
            });
          }
        }
      },
      fail: function (res) {

      }
    })
  }
})