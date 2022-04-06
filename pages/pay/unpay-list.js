// pages/pay/pay-list.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        unpayList: [],
        checkList: [],
        allChecked: false,
        totalPrice: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.handleGetUnpayList();
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
     * 全选
     */
    onSelectAll() {
        if(this.data.allChecked==false){
            let selectList = [];
            for (let i = 0; i < this.data.unpayList.length; i++) {
                selectList.push(i+"");
            }
            this.setData({
                checkList: selectList,
                allChecked:true
            });
        }else{
            this.setData({
                checkList: [],
                allChecked:false
            });
        }
        this.computeTotalPrice();
    },
    computeTotalPrice(){
        let sum = 0;
        for (let i = 0; i < this.data.checkList.length; i++) {
            sum+=this.data.unpayList[this.data.checkList[i]].money;
        }
        this.setData({
            totalPrice:sum*100
        });
    },
    /**
     * 单选
     */
    onSelect(event) {
        console.log(event);
        this.setData({
            checkList: event.detail,
        });
        if (this.data.checkList.length == this.data.unpayList.length) {
            this.setData({
                allChecked: true,
            });
        }
        this.computeTotalPrice();
    },
    /**
     * 获取未缴费列表
     */
    handleGetUnpayList() {
        var that = this;
        let cookie = app.getToken();
        wx.request({
            url: 'http://127.0.0.1/pay/unpay/list',
            method: 'Post',
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'cookie': cookie
            },
            success(res) {
                console.log(res);
                if (res.statusCode == 200 && res.data.length > 0) {
                    that.setData({
                        unpayList: res.data
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
    handlePay(){
        
    }
})