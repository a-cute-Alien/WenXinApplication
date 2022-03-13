// me/me.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        clockInTitle:"打卡",
        overInfo:1,  // 已完善的资料
        allInfo:4,   // 全部的资料
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 移除 tabBar 某一项右上角的文本
        wx.removeTabBarBadge({
            index:3
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
        wx.stopPullDownRefresh()
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
     * 个人主页
     */
    homeClick: function(){
        wx.showModal({
            title: '提示',
            content: '提示内容？',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    /**
     * 打卡事件
     */
    clockInClick: function(){
        if(this.data.clockInTitle == '打卡'){
            this.setData({
                clockInTitle: "已打卡"
            })
            this.showToastSuccess('打卡成功');
        }else{
            this.showToastSuccess('已经打过了');
        }
    },

    /**
     * 完善资料事件
     */
    infoClick: function(){
        console.log("this.overInfo--"+this.overInfo)
        console.log("this.clockInTitle--"+this.clockInTitle)
        if(this.data.overInfo >= this.data.allInfo){
            this.showToastSuccess('资料全部完成啦');
        }else{
            // this.overInfo = this.data.overInfo + 1
            this.data.overInfo += 1
            this.setData({
                overInfo: this.data.overInfo
            })
            if(this.data.overInfo == this.data.allInfo){
                this.showToastSuccess('资料全部完成啦');
            }
        }
    },
    showToastSuccess: function(title){
        wx.showToast({
            title: title,
            icon: 'success',
            duration: 2000
        })
    },
    /**
     * 旅行照片浏览
     */
    cameraClick: function(){
        wx.chooseImage({
            count: 9,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success (res) {
                const tempFilePaths = res.tempFilePaths  

                wx.previewImage({
                    current: tempFilePaths[0], // 当前显示图片的http链接
                    urls: tempFilePaths // 需要预览的图片http链接列表
                })
            }
        })
    }
})