// pages/savepic/savepic.js
Page({
  /* 页面的初始数据*/
  data: {
    FontSize: 50,
    RTap: 0,
    max: 0,
    isHidden: 0,
    LeftBar: [
      { key: 'L1', tap: 'L1Tap', text: '年', value: 0, style: 'border-radius:0rpx' },
      { key: 'L2', tap: 'L1Tap', text: '月', value: 0, style: 'border-radius:0rpx' },
      { key: 'L3', tap: 'L1Tap', text: '日', value: 0, style: 'border-radius:0rpx' },
      { key: 'L4', tap: 'L1Tap', text: '晴', value: 0, style: 'border-radius:0rpx' },
      { key: 'L5', tap: 'L1Tap', text: ',', value: 0, style: 'border-radius:0rpx' },
      { key: 'L6', tap: 'L1Tap', text: '↲', value: 0, style: 'border-radius:0rpx' },
      { key: '=', tap: 'L1Tap', text: "==", value: 0, style: 'border-radius:0rpx' },
      { key: '+', tap: 'L2Tap', text: '+', value: 0, style: 'border-radius:30rpx' },
      { key: '-', tap: 'L2Tap', text: '-', value: 0, style: 'border-radius:30rpx' },
      { key: 'B', tap: 'L3Tap', text: "B", value: 0, style: 'border-radius:60rpx;font-weight:bold' },
      { key: 'I', tap: 'L3Tap', text: "/", value: 0, style: 'border-radius:60rpx' },
    ],
  },
  /*方块字体*/
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
  /*+-*/
  L2Tap: function (e) {
    var tapkey = e.target.dataset.key
    if (tapkey == '+') {
      var _fontsize = this.data.FontSize + 5
    }
    else {
      var _fontsize = this.data.FontSize - 5
    }
    this.setData({
      FontSize: _fontsize
    })
    this.setText()
  },
  /*圆形按钮*/
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
    for (var i = 9; i < this.data.LeftBar.length; i++) {
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
    var text1 = this.data.month + '月' + this.data.day + '日,'
    /*显示年*/
    if (this.data.LeftBar[0].value) {
      text1 = this.data.year + '年' + this.data.month + '月' + this.data.day + '日,'
    }
    /*显示月*/
    if (this.data.LeftBar[1].value) {
      text1 = text1.replace('年', '/')
      text1 = text1.replace('月', '/')
      text1 = text1.replace('日', '')
    }
    /*是否显示日期*/
    if (this.data.LeftBar[2].value) {
      text1 = ''
    }
    var text2 = text1 + this.data.weather + ',';
    if (this.data.LeftBar[3].value) {
      text2 = ''
    }
    /*是否显示逗号*/
    if (this.data.LeftBar[4].value) {
      text2 = text2.replace(/,/g, ' ')
    }
    var inputTxet = text2 + this.data.text
    /*新起一行*/
    if (this.data.LeftBar[5].value) {
      inputTxet = text2.slice(0, text2.length - 1) + '\n' + this.data.text
    }
    /*居中显示*/
    this.setData({
      center: this.data.LeftBar[6].value
    })
    /*分解文本*/
    var textSplit = inputTxet.split("")
    this.setData({
      textArr: []
    })
    /*换行*/
    this.setData({
      max: 0,
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
        max: this.data.max + 1,
        ['textArr[' + j + '][' + k + '].value']: textSplit[i],
        ['textArr[' + j + '][' + k + '].pos']: j + '.' + k,
        ['textArr[' + j + '][' + k + '].index']: j.toString() + k.toString()
      })
    }
    console.log(this.data.textArr)
  },
  /* 生命周期函数--监听页面显示*/
  onShow: function () {
    var info = wx.getSystemInfoSync()
    this.setData({
      year: wx.getStorageSync('year'),
      month: wx.getStorageSync('month'),
      day: wx.getStorageSync('day'),
      weather: wx.getStorageSync('weather'),
      text: wx.getStorageSync('text'),
      src: wx.getStorageSync('src'),
      LBarHeight: info.windowHeight - 50
    });
    this.setText();
  },
  /*返回预览*/
  backSavePic: function () {
    this.setData({
      isHidden: 0,
      canvas: 'left:999px'
    })
  },
  /*绘制画布*/
  getImage: function () {
    const that = this
    var ctx = wx.createCanvasContext('myCanvas')
    ctx.drawImage(that.data.src, 0, 0, 250, 200)
    /*字号*/
    ctx.setFontSize(that.data.FontSize / 2)
    ctx.setTextBaseline('top')
    console.log(that.data.textArr)
    if (that.data.textArr.length == 0) {
      ctx.draw(false)
      that.setData({
        isHidden: 1,
        canvas: 'height:' + 200 + 'px;left:0'
      })
      return
    }
    /*文本循环*/
    let promise = new Promise(function (resolve, reject) {
      var cur = 0
      var textDivTop = that.data.textDivTop
      var textDivLeft = that.data.textDivLeft
      for (var i = 0; i < that.data.textArr.length; i++) {
        var textDiv = '#textDiv' + i
        wx.createSelectorQuery().select(textDiv).boundingClientRect(function (rect) {
          var m = rect.dataset.key
          for (var j = 0; j < that.data.textArr[m].length; j++) {
            var itemDiv = '#itemDiv' + m + j
            wx.createSelectorQuery().select(itemDiv).boundingClientRect(function (rect) {
              var n = Number(rect.dataset.key.split('.')[1])
              cur += 1
              let Bold = ''
              let Italic = ''
              ctx.font = that.data.FontSize / 2 + 'px sans-serif'
              if (that.data.textArr[m][n].B == 1) {
                Bold = 'bold '
              }
              if (that.data.textArr[m][n].I == 1) {
                Italic = 'italic '
              }
              ctx.font = Italic + Bold + that.data.FontSize / 2 + 'px sans-serif'
              ctx.fillText(that.data.textArr[m][n].value, rect.left - textDivLeft, rect.top - textDivTop + 190)
              if (cur == that.data.max) {
                var canvasH = rect.top + rect.height - 10
                that.setData({
                  canvas: 'height:' + canvasH + 'px'
                })
                resolve(canvasH)
              }
            }).exec()
          }
        }).exec()
      }
    })
    promise.then(function (canvasH) {
      ctx.draw(false)
      that.setData({
        isHidden: 1,
        canvas: 'height:' + canvasH + 'px;left:0'
      })
    })
  },
  /*保存至相册*/
  saveImageToPhone: function () {
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      fileType: 'jpg',
      /*生成图片成功*/
      success: (res) => {
        console.log(res.tempFilePath)
        /*保存到手机相册*/
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: (res) => {
            console.log(res)
          },
          fail: (err) => {
          }
        })
      }
    })
  },
  /*分享到朋友圈*/
  shareImage: function () {
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      fileType: 'jpg',
      /*生成图片成功*/
      success: (res) => {
        console.log(res.tempFilePath)
        wx.previewImage({
          current: res.tempFilePath,
          urls: [res.tempFilePath]
        })
      }
    })
  },
  onShareAppMessage: function () {
    return {
      path: 'pages/index/index',
      imageUrl: '../../image/1.png'
    }
  },
  /* 生命周期函数--监听页面初次渲染完成*/
  onReady: function () {
    /*获取第一行文字的位置*/
    const that = this
    wx.createSelectorQuery().select('#textDiv0').boundingClientRect(function (rect) {
      that.setData({
        textDivTop: rect.top,
        textDivLeft: rect.left
      })
    }).exec()
  },
})