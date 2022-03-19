// pages/register.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        items:[],
        mainActiveIndex: 0,
        activeId: null,
        currentDate: new Date().getTime(),
        minDate: new Date().getTime(),
        formatter(type, value) {
          if (type === 'year') {
            return `${value}年`;
          }
          if (type === 'month') {
            return `${value}月`;
          }
          return value;
        },
        show: false,
    },
    showPopup() {
      this.setData({ show: true });
    },
  
    onClose() {
      this.setData({ show: false });
    },
    onInput(event) {
      this.setData({
        currentDate: event.detail,
      });
      console.log(event)
      this.onClose();
      let id = this.data.activeId;
      let time = this.data.currentDate;
      wx.navigateTo({
        url: '/pages/register/register?id='+id+'&time='+time,
      })
    },
    onClickNav({ detail = {} }) {
        var that = this;
        var index = detail.index;
        var id = this.data.items[index].id;
        wx.request({
          url: 'http://127.0.0.1/dep/major/'+id,
          success:function (res){
            var children = [];
            res.data.forEach(element => {
                var item = {"text":element.name,
                        "id":element.depId,};
                children.push(item)
                ;
            });
            var v = 'items['+index+'].children';
            that.setData({[v]:children});
          },
          fail:function (res){
        }
        })
        this.setData({
          mainActiveIndex: detail.index || 0,
        });
      },
    
      onClickItem({ detail = {} }) {
        const activeId = this.data.activeId === detail.id ? null : detail.id;
        this.setData({ activeId });
        this.showPopup();
        console.log(activeId);
      },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.request({
          url: 'http://127.0.0.1/dep/major',
          success:function (res){
            var items = [];
            res.data.forEach(element => {
                var item = {"text":element.name,
                        "id":element.depId,
                        "children":[]};
                items.push(item)
                ;
            });
            that.setData({'items':items});
            wx.request({
                url: 'http://127.0.0.1/dep/major/1',
                success:function (res2){
                  var children = [];
                  res2.data.forEach(element => {
                      var item = {"text":element.name,"id":element.depId};
                      children.push(item);
                  });
                  that.setData({'items[0].children':children});
                },
                fail:function (res){
              }
              })
          },
          fail:function (res){
        }
        })
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