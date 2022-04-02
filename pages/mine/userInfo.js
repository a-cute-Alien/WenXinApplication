// pages/user/info.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: "",
        id: null,
        phone: null,
        sex: "0",
        canSubmit: false,
        errorId: "",
        errorPhone: "",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.handleGetInfo();
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
    onChangeId(event) {
        this.setData({
            canSubmit: false
        });
        var code = event.detail;
        var city = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江 ",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北 ",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏 ",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外 "
        };
        var tip = "";
        var pass = true;

        if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
            tip = "身份证号格式错误";
            pass = false;
        } else if (!city[code.substr(0, 2)]) {
            tip = "地址编码错误";
            pass = false;
        } else {
            //18位身份证需要验证最后一位校验位
            if (code.length == 18) {
                code = code.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                //校验位
                var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++) {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                var last = parity[sum % 11];
                if (parity[sum % 11] != code[17]) {
                    tip = "校验位错误";
                    pass = false;
                }
            }
        }
        this.setData({
            errorId: tip,
        });
        //检查是否可以提交
        if (this.data.name != "" && this.data.id != null && this.data.phone != null && this.data.errorId == "" && this.data.errorPhone == "") {
            this.setData({
                canSubmit: true
            });
        }
    },
    onChangePhone(event) {
        this.setData({
            canSubmit: false
        });
        var code = event.detail;
        var tip = "";
        if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(code)) {
            tip = "无效的手机号码";
        }
        this.setData({
            errorPhone: tip
        });
        //检查是否可以提交
        if (this.data.name != "" && this.data.id != null && this.data.phone != null && this.data.errorId == "" && this.data.errorPhone == "") {
            this.setData({
                canSubmit: true
            });
        }
    },
    handleReset() {
        this.setData({
            name: null,
            id: null,
            phone: null,
            sex: "0",
        })
    },
    handleSubmit() {
        var user = {};
        user.id = this.data.id;
        user.name = this.data.name;
        user.sex = this.data.sex;
        user.phone = this.data.phone;
        var json = JSON.stringify(user);
        let cookie = app.getToken();
        wx.request({
            url: 'http://127.0.0.1/user/update',
            method: 'POST',
            data: {
                "id": this.data.id,
                "name": this.data.name,
                "sex": this.data.sex,
                "phone": this.data.phone,
            },
            header: {
                'content-type': 'application/json;charset=utf-8;',
                'cookie': cookie
            },
            success: function (res) {
                wx.switchTab({
                    url: '/pages/me/me',
                    success: function (e) {
                        var page = getCurrentPages().pop();
                        if (page == undefined || page == null) return;
                        page.onLoad();
                    }
                })
            },
            fail: function (res) {
                wx.showToast({
                    title: '错误',
                    icon: '网络繁忙,稍后再试',
                    duration: 2000
                })
                wx.navigateBack();
            }
        })
    },
    handleGetInfo() {
        var that = this;
        let cookie = app.getToken();
        wx.request({
            url: 'http://127.0.0.1/user/info',
            method: 'Post',
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'cookie': cookie
            },
            success: function (res) {
                console.log(res);
                if (res.statusCode == 200 && res.data.name != null && res.data.id != null) {
                    res.data.id = res.data.id.replace(/^(.{6})(?:\d+)(.{4})$/, "$1********$2");
                    that.setData({
                        name: res.data.name,
                        id: res.data.id,
                        sex: res.data.sex,
                        phone: res.data.phone,
                        canSubmit: true
                    });
                }
            },
            fail: function (res) {
                wx.showToast({
                    title: '错误',
                    icon: '网络繁忙,稍后再试',
                    duration: 2000
                })
                wx.navigateBack();
            }
        })
    }
})