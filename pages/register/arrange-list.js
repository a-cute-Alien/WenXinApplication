// pages/register/register.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    deptId: 0,
    arrangeTimestamp: new Date().getTime(),
    activeName: -1,
    doctorList: [],
  },
  onChange(event) {
    this.setData({
      activeName: event.detail,
    });
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let deptId = options.id;
    let arrangeTimestamp = options.date;
    this.setData({
      deptId: deptId,
      arrangeTimestamp: arrangeTimestamp
    });
    this.handleGetArrangeDoctor();
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
    this.setData({
      doctorList:[],
      activeName: -1,
    });
    var options = {id:this.data.deptId,date:this.data.arrangeTimestamp};
    this.onLoad(options);
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
  handleRegister(e) {
    Toast.loading({
      message: '预约中...',
      forbidClick: true,
    });
    var that = this;
    let arrangeId = e.currentTarget.dataset.arrangeid;
    let cookie = app.getToken();
    console.log(e);
    wx.request({
      url: 'http://127.0.0.1/register/add/',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': cookie
      },
      data:{
        arrangeId: arrangeId
      },
      success(res) {
        Toast.clear();
        if (res.statusCode == 200) {
          Dialog.alert({
            title: '提示',
            message: '预约成功',
          }).then(() => {
            // 跳转到挂号查询
            wx.redirectTo({
              url: '/pages/register/register-list',
            })
          });
        } else {
          Dialog.alert({
            title: '提示',
            message: '预约失败,请不要重复预约或稍后再试',
          }).then(() => {
            // 刷新记录
            that.onPullDownRefresh();
          });
        }
      },
      fail(res) {
        Toast.clear();
        Dialog.alert({
          title: '提示',
          message: '网络异常,稍后再试',
        }).then(() => {
          // 跳转到挂号查询
          wx.switchTab({
            url: '/pages/home/home',
          })
        });
      }
    })
  },
  handleGetArrangeDoctor(){
    var that = this;
    let cookie = app.getToken();
    wx.request({
      url: 'http://127.0.0.1/arrange/user',
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': cookie
      },
      data:{
        deptId:that.data.deptId,
        arrangeTimestamp:that.data.arrangeTimestamp
      },
      success: function (res) {
        if(res.statusCode == 200 && res.data!=null&&res.data.length>0){
          that.setData({
            doctorList: res.data
          });
          console.log(res.data);
        }else if (res.statusCode == 404 || res.data.length == 0) {
          Dialog.alert({
            title: '提示',
            message: '当前时间段没有可预约医生，请更换时间或稍后再试',
          }).then(() => {
            wx.navigateBack();
          });
        }
      },
      fail: function (res) {
        Dialog.alert({
          title: '提示',
          message: '网络异常,稍后再试',
        }).then(() => {
          wx.navigateBack();
        });
      }
    });
  },
  handleGetArrangeList(event) {
    console.log('展开' + event.detail);
    let doctor_index = event.detail;
    var that = this;
    let doctorList = this.data.doctorList;
    let arrangeTimestamp = this.data.arrangeTimestamp;
    let cookie = app.getToken();
    if (doctorList[doctor_index].arrangeList == null||doctorList[doctor_index].arrangeList.length==0) {
      wx.request({
        url: 'http://127.0.0.1/arrange/list',
        method:'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'cookie': cookie
        },
        data:{
          userId:doctorList[doctor_index].userId,
          arrangeTimestamp:arrangeTimestamp
        },
        success: function (res) {
          console.log(res.data);
          if(res.statusCode == 200 && res.data.length > 0){
            let arrangeListStr = 'doctorList[' + doctor_index + '].arrangeList';
            that.setData({
              [arrangeListStr]: res.data
            });
          }else if (res.statusCode == 404 || res.data.length == 0) {
            Dialog.alert({
              title: '提示',
              message: '数据异常，请刷新后再试',
            }).then(() => {
              that.onPullDownRefresh();
            });
          }
        },
        fail: function (res) {
          Dialog.alert({
            title: '提示',
            message: '网络繁忙请稍后再试',
          }).then(() => {
            wx.navigateBack();
          });
        }
      })
    }
  },
})