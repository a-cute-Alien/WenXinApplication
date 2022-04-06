// pages/register/list.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
var util = require('../../utils/util')
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        registerList: [],
    },
    format(status) {
        var value = "error";
        switch (status) {
            case '0':
                value = "待付款";break;
            case '1':
                value = "待诊断";break;
            case '2':
                value = "已完成";break;
            default:
                break;
        }
        return value;
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        Toast.loading({
            message: '查询中...',
            forbidClick: true,
          });
        var that = this;
        let cookie = app.getToken();
        wx.request({
            url: 'http://127.0.0.1/register/list',
            method: 'Post',
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'cookie': cookie
            },
            success(res) {
                console.log(res);
                if (res.statusCode == 200 && res.data.length > 0) {
                    // res.data.forEach(element => {
                    //     element.status = that.format(element.status);
                    // });
                    that.setData({
                        registerList: res.data
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