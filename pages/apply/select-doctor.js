// pages/apply/select- doctor.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        depts: [],
        mainActiveIndex: 0,
        activeId: null,
        winHight: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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
        wx.navigateTo({
          url: '/pages/apply/doctor-list?deptId='+this.data.activeId,
        })
        
    },
    //初始化部门数据
    handleDeptList() {
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