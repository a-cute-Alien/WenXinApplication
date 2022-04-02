// // <!-- 公告 -->
// // <view class='notice'>
// //     <image class='icon' src="/static/icon/喇叭.svg"></image>
// //     <text class='font30' style="color: red;"> 公告:</text>
// //     <view class="notice-box">
// //         <view class="left-text"></view>
// //         <view class='content-box'>
// //             <view class='content-text' animation="{{animationData}}"><text id="text">{{text}}</text></view>
// //         </view>
// //         <view class="right-text"></view>
// //    </view>
// // </view> 

// // data: {

// //     text: " 欢迎前往我医院就诊，请注意佩戴口罩。",
// //     animation: null,
// //     timer: null,
// //     duration: 0,
// //     textWidth: 0,
// //     wrapWidth: 0
// //   }


// destroyTimer() {
//     if (this.data.timer) {
//         clearTimeout(this.data.timer);
//     }
// }
// /**
//  * 开启公告字幕滚动动画
//  * @param {String} text 公告内容
//  * @return {[type]} 
//  */
// initAnimation(text) {
//     let that = this
//     this.data.duration = 15000
//     this.data.animation = wx.createAnimation({
//         duration: this.data.duration,
//         timingFunction: 'linear'
//     })
//     let query = wx.createSelectorQuery()
//     query.select('.content-box').boundingClientRect()
//     query.select('#text').boundingClientRect()
//     query.exec((rect) => {
//         that.setData({
//             wrapWidth: rect[0].width,
//             textWidth: rect[1].width
//         }, () => {
//             this.startAnimation()
//         })
//     })
// }
// // 定时器动画
// startAnimation() {
//     //reset
//     // this.data.animation.option.transition.duration = 0
//     const resetAnimation = this.data.animation.translateX(this.data.wrapWidth).step({
//         duration: 0
//     })
//     this.setData({
//         animationData: resetAnimation.export()
//     })
//     // this.data.animation.option.transition.duration = this.data.duration
//     const animationData = this.data.animation.translateX(-this.data.textWidth).step({
//         duration: this.data.duration
//     })
//     setTimeout(() => {
//         this.setData({
//             animationData: animationData.export()
//         })
//     }, 100)
//     const timer = setTimeout(() => {
//         this.startAnimation()
//     }, this.data.duration)
//     this.setData({
//         timer
//     })
// }

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {
//     this.destroyTimer()
//     this.setData({
//       timer: null
//     })
//   }
//     /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {
//     this.initAnimation(this.data.text)
//   }