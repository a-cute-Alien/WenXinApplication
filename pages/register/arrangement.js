// pages/register/register.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({
    /**
     * 页面的初始数据
     */
    data: {
      id:1,
      date:new Date().getTime(),
      activeName:-1,
      doctors:[],
    },
    onChange(event) {
      this.setData({
        activeName: event.detail,
      });
    },
    onOpen(event) {
      console.log('展开'+event.detail);
      let index = event.detail;
      let doctors = this.data.doctors;
      let date = this.data.date;
      var that = this;
      if(doctors[index].registers==null){
        let s = 'doctors['+index+'].registers';
        wx.request({
          url: 'http://127.0.0.1/doctor_register/id/'+doctors[index].doctorId+'/date/'+date,
          success:function(res){
            console.log(res.data);
            if(res.statusCode==404){
              Dialog.alert({
                title: '提示',
                message: '网络繁忙请稍后再试',
              }).then(() => {
                // on close
                wx.navigateBack();
              });
            }
            that.setData({[s]:res.data});
          },
          fail:function(res){
              Dialog.alert({
                title: '提示',
                message: '网络繁忙请稍后再试',
              }).then(() => {
                // on close
                wx.navigateBack();
              });
          }
        })
      }
      console.log(this.data.doctors[index]);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      let depId = options.id;
      let date = options.date;
      this.setData({id:depId,date:date});
      var that = this;
      wx.request({
        url: 'http://127.0.0.1/doctor/dep/'+depId+'/date/'+date,
        success:function(res){
          that.setData({doctors:res.data});
          console.log(res.data);
          if(res.statusCode==404||that.data.doctors.length==0){
            Dialog.alert({
              title: '提示',
              message: '当前时间段没有可预约医生，请更换时间或稍后再试',
            }).then(() => {
              wx.navigateBack();
            });
          }
        },
        fail:function(res){
          Dialog.alert({
            title: '提示',
            message: '当前时间段没有可预约医生，请更换时间或稍后再试',
          }).then(() => {
            wx.navigateBack();
          });
        }
      });
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
      var options = new Object();
      options.id = this.data.id;
      options.date=this.data.date;
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
    register(e){
      Toast.loading({
        message: '预约中...',
        forbidClick: true,
      });
      let id = e.currentTarget.dataset.id;
      let cookie = wx.getStorageSync('uuid');
      wx.request({
        url: 'http://127.0.0.1/register/record/'+id,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'cookie': cookie
        },
        success (res) {
          Toast.clear();
          if(res.statusCode==200){
            Dialog.alert({
              title: '提示',
              message: '预约成功',
            }).then(() => {
              // 跳转到挂号查询
              wx.switchTab({
                url: '/pages/home/home',
              })
            });
          }else{
            Dialog.alert({
              title: '提示',
              message: '预约失败,稍后再试',
            }).then(() => {
              // 刷新记录
              var options = new Object();
              options.id = this.data.id;
              options.date=this.data.date;
              this.onLoad(options);
            });
          }
        },
        fail(res){
          Toast.clear();
          Dialog.alert({
            title: '提示',
            message: '预约失败,稍后再试',
          }).then(() => {
            // 跳转到挂号查询
            wx.switchTab({
              url: '/pages/home/home',
            })
          });
        }
      })
    },
})


