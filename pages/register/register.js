// pages/register/register.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
      id:0,
      time:0,
      activeName:0,
      doctors:[]
    },
    onChange(event) {
      this.setData({
        activeName: event.detail,
      });
      console.log("this.data.activeName");
      console.log(this.data.activeName);
    },
    onOpen(event) {
      console.log('展开'+event.detail);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.setData({id:options.id,time:options.time});
      var that = this;
      wx.request({
        url: 'http://127.0.0.1/doctor/dep/'+that.data.id,
        success:function(res){
          console.log(res.data);
          that.setData({doctors:res.data});
          console.log(that.data.doctors);
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

    }
})