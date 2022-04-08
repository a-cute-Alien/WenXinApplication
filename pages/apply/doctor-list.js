// pages/apply/doctor-list.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        deptId: 0,
        doctorList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.deptId != null) {
            this.setData({
                deptId: options.deptId
            });
        }
        this.handleDoctorList();
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
    handleDoctorList() {
        var that = this;
        let cookie = app.getToken();
        wx.request({
            url: 'http://127.0.0.1/user/dept',
            method: 'Post',
            data: {
                deptId: this.data.deptId
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'cookie': cookie
            },
            success: function (res) {
                if (res.statusCode == 200 && res.data != null) {
                    that.setData({
                        doctorList: res.data
                    });
                } else {
                    Dialog.alert({
                        title: '提示',
                        message: '网络繁忙,稍后再试',
                    }).then(() => {
                        // on close
                        wx.navigateBack();
                    });
                }
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
    },
    handleApply(e) {
        let userId = e.currentTarget.dataset.userid;
        Dialog.confirm({
            title: '提示',
            message: '是否要提交住院申请',
        }).then(() => {
            var that = this;
            let cookie = app.getToken();
            wx.request({
                url: 'http://127.0.0.1/apply/add',
                method: 'Post',
                data: {
                    'userId': userId
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'cookie': cookie
                },
                success: function (res) {
                    if (res.statusCode == 200 && res.data != null) {
                        Toast.success('申请成功');
                        setTimeout(function(){
                            wx.navigateBack()
                        }, 2000);
                    } else {
                        Toast.fail('申请失败');
                        setTimeout(function(){
                            wx.navigateBack()
                        }, 2000);
                    }
                },
                fail: function (res) {
                    Toast.fail('网络异常,稍后再试');
                    wx.navigateBack();
                }
            })
        }).catch(() => {
            wx.navigateBack();
        });
    }
})