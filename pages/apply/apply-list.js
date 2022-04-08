// pages/apply/apply-list.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        applyList:[],
        status:"-1"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        if(options.status!=null){
            this.setData({status:options.status})
        }
        this.handleApplyList();
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
    handleApplyList(){
        Toast.loading({
            message: '查询中...',
            forbidClick: true,
          });
        var that = this;
        let cookie = app.getToken();
        wx.request({
            url: 'http://127.0.0.1/apply/list',
            method: 'Post',
            data:{
                status:this.data.status
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'cookie': cookie
            },
            success(res) {
                console.log(res);
                if (res.statusCode == 200 && res.data.length > 0) {
                    that.setData({
                        applyList: res.data
                    });
                } else {
                    Dialog.alert({
                        title: '提示',
                        message: '暂无记录或网络异常,请稍后再试',
                    }).then(() => {
                        // 刷新记录
                        wx.navigateBack();
                    });
                }
            }
        })
    },
    
})