// pages/savepic/savepic.js
Page({
  /* 页面的初始数据*/
  data: {
    FontSize: 50,
    RTap: 0,
    LeftBar: [
      { key: 'L1', tap: 'L1Tap', text: '年', value: 0, style: 'border-radius:0rpx' },
      { key: 'L2', tap: 'L1Tap', text: '月', value: 0, style: 'border-radius:0rpx' },
      { key: 'L3', tap: 'L1Tap', text: ',', value: 0, style: 'border-radius:0rpx' },
      { key: 'L4', tap: 'L1Tap', text: '↲', value: 0, style: 'border-radius:0rpx' },
      { key: '=', tap: 'L1Tap', text: "==", value: 0, style: 'border-radius:0rpx' },
      { key: 'L5', tap: 'L2Tap', text: '+', value: 0, style: 'border-radius:30rpx' },
      { key: 'L6', tap: 'L2Tap', text: '-', value: 0, style: 'border-radius:30rpx' },
      { key: 'B', tap: 'L3Tap', text: "B", value: 0, style: 'border-radius:60rpx;font-weight:bold' },
      { key: 'I', tap: 'L3Tap', text: "/", value: 0, style: 'border-radius:60rpx' },
      { key: 'U', tap: 'L3Tap', text: "U", value: 0, style: 'border-radius:60rpx;text-decoration-line: underline' },
    ],
  },
  L1Tap: function (e) {
    var index = e.target.dataset.id
    var str = 'LeftBar[' + index + '].value'
    var value = this.data.LeftBar[index].value
    if (value) {
      this.setData({
        [str]: 0
      })
    }
    else {
      this.setData({
        [str]: 1
      })
    }
    this.setText()
  },
  L2Tap: function (e) {
    var tapkey = e.target.dataset.key
    if (tapkey == 'L5') {
      var _fontsize = this.data.FontSize + 5
    }
    else {
      var _fontsize = this.data.FontSize - 5
    }
    this.setData({
      FontSize: _fontsize
    })
  },
  L3Tap: function (e) {
    var tapkey = e.target.dataset.key
    if (this.data.RTap == tapkey) {
      this.setData({
        RTap: 0
      })
    }
    else {
      this.setData({
        RTap: tapkey
      })
    }
    for (var i = 7; i < this.data.LeftBar.length; i++) {
      if (this.data.LeftBar[i].key == tapkey & this.data.LeftBar[i].value == 0) {
        this.setData({
          ['LeftBar[' + i + '].value']: 1
        })
      }
      else {
        this.setData({
          ['LeftBar[' + i + '].value']: 0
        })
      }
    }
  },
  textTap: function (e) {
    if (this.data.RTap == 0) {
      return
    }
    else {
      var pos = e.target.dataset.key.split(".")
      var pos1 = Number(pos[0])
      var pos2 = Number(pos[1])
      if (this.data.textArr[pos1][pos2][this.data.RTap] == 1) {
        this.setData({
          ['textArr[' + pos1 + '][' + pos2 + '].' + this.data.RTap]: 0
        })
      }
      else {
        this.setData({
          ['textArr[' + pos1 + '][' + pos2 + '].' + this.data.RTap]: 1
        })
      }
    }
    var str = ''
    if (this.data.textArr[pos1][pos2]['B']) {
      var str = str + 'font-weight:bold;'
    }
    if (this.data.textArr[pos1][pos2]['U']) {
      var str = str + 'text-decoration-line:underline;'
    }
    if (this.data.textArr[pos1][pos2]['I']) {
      var str = str + 'font-style:italic;'
    }
    this.setData({
      ['textArr[' + pos1 + '][' + pos2 + '].' + 'style']: str
    })
  },
  textBoxTap: function (e) {
    console.log(e)
    if (this.data.RTap == 0) {
      return
    }
    else if (this.data.RTap == '=') {
      var key = e.currentTarget.dataset.key
      if (this.data.textArr[key][0].class == 1) {
        this.setData({
          ['textArr[' + key + '][0].' + 'class']: 0
        })
      }
      else {
        this.setData({
          ['textArr[' + key + '][0].' + 'class']: 1
        })
      }
    }
  },
  /*设置文本*/
  setText: function () {
    var text1 = this.data.month + '月' + this.data.day + '日'
    /*显示年*/
    if (this.data.LeftBar[0].value) {
      text1 = this.data.year + '年' + this.data.month + '月' + this.data.day + '日'
    }
    /*显示月*/
    if (this.data.LeftBar[1].value) {
      text1 = text1.replace('年', '/')
      text1 = text1.replace('月', '/')
      text1 = text1.replace('日', '')
    }
    var text2 = text1 + ',' + this.data.weather + ',';
    /*天气逗号*/
    if (this.data.LeftBar[2].value) {
      text2 = text1 + '  ' + this.data.weather + '  '
    }
    var inputTxet = text2 + this.data.text
    /*新起一行*/
    if (this.data.LeftBar[3].value) {
      inputTxet = text2.slice(0, text2.length - 1) + '\n' + this.data.text
    }
    /*居中显示*/
    this.setData({
      center: this.data.LeftBar[4].value
    })
    var textSplit = inputTxet.split("")
    this.setData({
      textArr: []
    })
    for (var i = 0, j = 0, k = 0, isNew = 0; i < textSplit.length; i++ , k++) {
      if (textSplit[i] == '\n') {
        if (isNew == 1) {
          j += 1
          isNew = 0
        }
        k = -1
        continue
      }
      isNew = 1
      this.setData({
        ['textArr[' + j + '][' + k + '].value']: textSplit[i],
        ['textArr[' + j + '][' + k + '].pos']: j + '.' + k
      })
    }
    console.log(this.data.textArr)
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
  /* 用户点击右上角分享*/
  onShareAppMessage: function () {

  }
})