// pages/register.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    depts: [],
    mainActiveIndex: 0,
    activeId: null,
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    show: false,
    winHight: 0,
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      }
      if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //初始化选择器高度
    this.setData({
      winHight: wx.getSystemInfoSync().windowHeight
    });
    this.handleDeptList();
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
  //显示日期选择框
  showCalendar() {
    this.setData({
      show: true
    });
  },
  //关闭日期选择框
  closeCalendar() {
    this.setData({
      show: false
    });
  },

  //跳转到医生的预约安排查询页面
  toArrangement(event) {
    this.setData({
      currentDate: event.detail,
    });
    this.closeCalendar();
    let id = this.data.activeId;
    let date = this.data.currentDate;
    wx.navigateTo({
      url: '/pages/register/arrange-list?id=' + id + '&date=' + date,
    })
  },
  /**
   * 选择一级部门
   */
  onClickNav({
    detail = {}
  }) {
    this.setData({
      mainActiveIndex: detail.index || 0,
    });
  },
  /**
   * 选择具体部门
   */
  onClickItem({
    detail = {}
  }) {
    this.setData({
      activeId: detail.id
    });
    this.showCalendar();
  },
  //初始化部门数据
  handleDeptList(){
    var that = this;
    let cookie = app.getToken();
    wx.request({
      url: 'http://127.0.0.1/dept/list',
      method: 'Post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': cookie
      },
      success: function (res) {
        if (res.statusCode == 200 && res.data != null)
          console.log(res.data[0].children);
        res.data[0].children.forEach(element => {
          element.id = element.deptId;
          element.text = element.deptName;
          element.children.forEach(e => {
            e.id = e.deptId;
            e.text = e.deptName;
          })
        })
        that.setData({
          'depts': res.data[0].children
        });
      },
      fail: function (res) {
        Dialog.alert({
          title: '提示',
          message: '网络繁忙,稍后再试',
        }).then(() => {
          // on close
          wx.navigateBack();
        });
      }
    })
  }
})