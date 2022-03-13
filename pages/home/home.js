// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: [1,2,3,4,5,6,7,8],
    text: "1.【评分标准】页可以查看不同年龄段的评分标准，通过首页选择对应的性别、类别和年龄。2.【单项成绩】页包含了详细的单项打分情况及成绩雷达图，直观地看出自己的弱项和强项。",
    animation: null,
    timer: null,
    duration: 0,
    textWidth: 0,
    wrapWidth: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.initAnimation(this.data.text)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.destroyTimer()
    this.setData({
     timer: null
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.destroyTimer()
    this.setData({
     timer: null
    })
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
   * 点击导航
   */
  navClick(event){
    console.log(JSON.stringify(event))
    let index = event.currentTarget.dataset['index'];
    let title = event.currentTarget.dataset['title'];
    wx.request({
      url: 'http://14.215.177.39',
      method:'GET',
      success: function (res) {
        // console.log(res.data)
        console.log("index",index)
        console.log("title",title)
      }
    })
    // console.log("index",index)
    // console.log("title",title)
  },
  destroyTimer() {
    if (this.data.timer) {
     clearTimeout(this.data.timer);
    }
   },
    /**
  * 开启公告字幕滚动动画
  * @param {String} text 公告内容
  * @return {[type]} 
  */
 initAnimation(text) {
  let that = this
  this.data.duration = 15000
  this.data.animation = wx.createAnimation({
   duration: this.data.duration,
   timingFunction: 'linear'  
  })
  let query = wx.createSelectorQuery()
  query.select('.content-box').boundingClientRect()
  query.select('#text').boundingClientRect()
  query.exec((rect) => {
   that.setData({
    wrapWidth: rect[0].width,
    textWidth: rect[1].width
   }, () => {
    this.startAnimation()
   })
  })
 },
 // 定时器动画
 startAnimation() {
  //reset
  // this.data.animation.option.transition.duration = 0
  const resetAnimation = this.data.animation.translateX(this.data.wrapWidth).step({ duration: 0 })
  this.setData({
   animationData: resetAnimation.export()
  })
  // this.data.animation.option.transition.duration = this.data.duration
  const animationData = this.data.animation.translateX(-this.data.textWidth).step({ duration: this.data.duration })
  setTimeout(() => {
   this.setData({
    animationData: animationData.export()
   })
  }, 100)
  const timer = setTimeout(() => {
   this.startAnimation()
  }, this.data.duration)
  this.setData({
   timer
  })
 },
})