// pages/savepic/savepic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /*点击文本获得文字*/
  textTap: function (e) {
    console.log(e.currentTarget)
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
    this.setData({
      year: wx.getStorageSync('year'),
      month: wx.getStorageSync('month'),
      day: wx.getStorageSync('day'),
      weather: wx.getStorageSync('weather'),
      text: wx.getStorageSync('text'),
    });
    var inputTxet = this.data.year + '年' + this.data.month + '月' + this.data.day + '日，' + this.data.weather + '，' + this.data.text;
    console.log(inputTxet);
    this.setData({
      textSplit: inputTxet.split("")
    })
    console.log(this.data.textSplit);
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