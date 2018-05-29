// pages/savepic/savepic.js
Page({
  /* 页面的初始数据*/
  data: {
    fontsize: 60,
    LeftBar: [
      { key: 'L1', tap: 'L1Tap', text: '年', value:1},
      { key: 'L2', tap: 'L1Tap', text: '/' },
      { key: 'L3', tap: 'L1Tap', text: ',' },
      { key: 'L4', tap: 'L1Tap', text: '↲' },
      { key: 'L5', tap: 'L2Tap', text: '+' },
      { key: 'L6', tap: 'L2Tap', text: '-' },
      { key: 'L7', tap: 'L1Tap', text: "B" },
    ],
  },
  L1Tap: function (e) {
    var tapkey = e.target.dataset.key
    if (this.data[tapkey]) {
      this.setData({
        [tapkey]: 0
      })
    }
    else {
      this.setData({
        [tapkey]: 1
      })
    }
    this.setText()
  },
  L2Tap: function (e) {
    var tap = e.target.dataset.key
    if (tap == 'L5') {
      var _fontsize = this.data.fontsize + 5

    }
    else {
      var _fontsize = this.data.fontsize - 5
    }
    this.setData({
      fontsize: _fontsize
    })
    console.log(this.data.fontsize)
  },
  /*生命周期函数--监听页面加载*/
  onLoad: function (options) {

  },
  /* 生命周期函数--监听页面初次渲染完成*/
  onReady: function () {

  },
  setText: function () {
    var text1 = this.data.month + '月' + this.data.day + '日'
    if (this.data.L1) {
      text1 = this.data.year + '年' + this.data.month + '月' + this.data.day + '日'
    }
    if (this.data.L2) {
      text1 = text1.replace('年', '/')
      text1 = text1.replace('月', '/')
      text1 = text1.replace('日', '')
    }
    var text2 = text1 + ',' + this.data.weather + ',';
    if (this.data.L3) {
      text2 = text1 + '  ' + this.data.weather + '  '
    }
    var inputTxet = text2 + this.data.text
    if (this.data.L4) {
      inputTxet = text2.slice(0, text2.length - 1)
      this.setData({
        textSplit2: this.data.text.split("")
      })
    }
    this.setData({
      textSplit: inputTxet.split("")
    })
    console.log(this.data.textSplit);
  },
  /* 生命周期函数--监听页面显示*/
  onShow: function () {
    this.setData({
      year: wx.getStorageSync('year'),
      month: wx.getStorageSync('month'),
      day: wx.getStorageSync('day'),
      weather: wx.getStorageSync('weather'),
      text: wx.getStorageSync('text'),
    });
    this.setText();
  },
  /* 生命周期函数--监听页面隐藏*/
  onHide: function () {

  },
  /* 生命周期函数--监听页面卸载*/
  onUnload: function () {

  },
  /* 页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function () {

  },
  /* 页面上拉触底事件的处理函数*/
  onReachBottom: function () {

  },
  /* 用户点击右上角分享*/
  onShareAppMessage: function () {

  }
})