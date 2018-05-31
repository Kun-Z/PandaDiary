// pages/index/index.js
const date = new Date()
Page({
  /*页面的初始数据*/
  data: {
    isHidden: true,
    currentTxetLen: 0,
    weather: '灭霸晴',
    weatherKey: ['晴', '烈日', '灭霸晴', '阴', '雨'],
    max: 500,
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    textArea: '',
    src:'../../image/1.png',
  },
  /*选择日期*/
  bindChange: function (e) {
    var str = e.detail.value;
    var val = str.split('-');
    this.setData({
      year: val[0],
      month: val[1],
      day: val[2],
    })
  },
  /*点击天气框*/
  weatherInput: function (e) {
    this.setData({
      isHidden: false
    })
  },
  /*天气标签点击*/
  weatherKeyTap: function (e) {
    this.setData({
      isHidden: true,
      weather: e.target.dataset.key
    })
  },
  /*离开天气框*/
  weatherOff: function (e) {
    this.setData({
      isHidden: true,
    });
    var input = e.detail.value;
    if (input) {
      return
    }
    this.setData({
      weather: '灭霸晴'
    });
  },
  /*离开日记框*/
  textOff: function (e) {
    var text = e.detail.value;
    this.setData({
      textArea: text
    });
  },
  /*日记字数*/
  textInput: function (e) {
    var text = e.detail.value;
    var len = parseInt(text.length);
    this.setData({
      currentTxetLen: len
    });
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.setStorageSync('year', this.data.year);
    wx.setStorageSync('month', this.data.month);
    wx.setStorageSync('day', this.data.day);
    wx.setStorageSync('weather', this.data.weather);
    wx.setStorageSync('text', this.data.textArea);
    wx.setStorageSync('src', this.data.src);
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
    return {
      path: 'pages/index/index',
      imageUrl: '../../image/1.png'
    }
  },
})