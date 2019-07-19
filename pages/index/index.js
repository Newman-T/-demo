// pages/prize/prize.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: "../../image/gobg.png",
    wechat: "../../image/wechat.png",
    quan: "../../image/quan.png",
    code: "E7AI98",
    inputValue: "",
    maskHidden: false,
    name: "",
    touxiang: "",
    code: "E7A93C",
    sWidth: 750,
    sHeight: 320,
  },
  //获取输入框的值
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  //点击提交按钮
  btnclick: function () {
    var text = this.data.inputValue
    wx.showToast({
      title: text,
      icon: 'none',
      duration: 2000
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getUserInfo({
      success: res => {
        console.log(res.userInfo, "huoqudao le ")
        this.setData({
          name: res.userInfo.nickName,
        })
        wx.downloadFile({
          url: res.userInfo.avatarUrl, //仅为示例，并非真实的资源
          success: function (res) {
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            if (res.statusCode === 200) {
              console.log(res, "reererererer")
              that.setData({
                touxiang: res.tempFilePath
              })
            }
          }
        })
      }
    })

  },
  //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  createNewImg: function () {
    var that = this;
    var context = wx.createCanvasContext('mycanvas');
    context.setFillStyle("#ffe200")
    context.fillRect(0, 0, 375, 667)
    var path = "/image/gobg.png";
    //将模板图片绘制到canvas,在开发工具中drawImage()函数有问题，不显示图片
    //不知道是什么原因，手机环境能正常显示
    context.drawImage(path, 0, 0, 375, 183);
    var path1 = "https://www.zhiailife.com/uploads/article/2018/11/22/5bf648fcd4809.jpg";
    // var path1 = "/image/tx.png";
    console.log(that.data.touxiang)
    console.log(path1, "path1")
    //将模板图片绘制到canvas,在开发工具中drawImage()函数有问题，不显示图片
    var path2 = "/image/txquan.png";
    var path3 = "/image/heise.png";
    var path4 = "/image/wenziBg.png";
    var path5 = "/image/wenxin.png";
    // context.drawImage(path2, 126, 186, 120, 120);
    //不知道是什么原因，手机环境能正常显示
    // context.save(); // 保存当前context的状态

    var name = that.data.name;
    //绘制名字
    context.setFontSize(24);
    context.setFillStyle('#333333');
    context.setTextAlign('center');
    context.fillText(name, 185, 340);
    context.stroke();
    //绘制一起吃面标语
    context.setFontSize(14);
    context.setFillStyle('#333333');
    context.setTextAlign('center');
    context.fillText("邀请你一起去吃面", 185, 370);
    context.stroke();
    //绘制验证码背景
    context.drawImage(path3, 48, 390, 280, 84);
    //绘制code码
    context.setFontSize(40);
    context.setFillStyle('#ffe200');
    context.setTextAlign('center');
    context.fillText(that.data.code, 185, 435);
    context.stroke();
    //绘制左下角文字背景图
    context.drawImage(path4, 25, 520, 184, 82);
    context.setFontSize(12);
    context.setFillStyle('#333');
    context.setTextAlign('left');
    context.fillText("进入小程序输入朋友的邀请", 35, 540);
    context.stroke();
    context.setFontSize(12);
    context.setFillStyle('#333');
    context.setTextAlign('left');
    context.fillText("码，朋友和你各自获得通用", 35, 560);
    context.stroke();
    context.setFontSize(12);
    context.setFillStyle('#333');
    context.setTextAlign('left');
    context.fillText("优惠券1张哦~", 35, 580);
    context.stroke();
    //绘制右下角扫码提示语
    context.drawImage(path5, 248, 578, 90, 25);
    //绘制头像
    context.arc(186, 246, 50, 0, 2 * Math.PI) //画出圆
    context.strokeStyle = "#000";
    context.clip(); //裁剪上面的圆形
    context.drawImage(path1, 136, 196, 100, 100); // 在刚刚裁剪的园上画图
    context.draw();
    //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'mycanvas',
        success: function (res) {
          var tempFilePath = res.tempFilePath;
          that.setData({
            imagePath: tempFilePath,
            canvasHidden: true
          });
        },
        fail: function (res) {
          console.log(res);
        }
      });
    }, 200);
  },
  createNewImg2: function () {
    var that = this;
    var context = wx.createCanvasContext('mycanvas');

    //画布属性
    context.setFillStyle("#fff");
    context.fillRect(0, 0, 375, 1067);
    //标题
    // context.setFontSize(24)
    context.setFillStyle('#111');
    context.setLineWidth(20);
    context.font = 'Microsoft YaHei bold 24px sans-serif';
    context.fillText('备战圣诞，红包雨来袭！', 20, 60);
    //图片
    context.setShadow(0, 2, 4, 'rgba(0,0,0,0.08)');
    roundImage(context, 8, "https://www.zhiailife.com/uploads/article/2018/11/22/5bf648fcd4809.jpg", 0, 0, that.sWidth, that.sHeight ,20, 93 ,335, 240 ,'#000');
    // roundImage(context, 8, "https://www.zhiailife.com/uploads/house/2017/10/13/59e078f52b77b.jpg", 0, 0, that.sWidth, that.sHeight ,20, 113 ,335, 240 ,'#000')
    //截止时间
    // context.setFontSize(18)
    context.setFillStyle('#111');
    context.font = 'Microsoft YaHei bold 18px sans-serif';
    context.fillText('截止时间', 20, 373);

    context.font = 'Microsoft YaHei normal 16px sans-serif';
    context.fillText('2019-02-23 19:00 至 2019-06-30 20:00', 20, 403);

    //活动地址
    context.font = 'Microsoft YaHei bold 18px sans-serif';
    context.fillText('活动地址', 20, 468);

    context.font = 'Microsoft YaHei normal 16px sans-serif';
    context.fillText('中国山东省青岛市开平路533号', 20, 501);

    //活动规则
    context.font = 'Microsoft YaHei bold 18px sans-serif';
    context.fillText('活动规则', 20, 563);

    context.font = 'Microsoft YaHei normal 16px sans-serif';
    context.fillText('2015年2月9日，一直对今年春节红包玩法三缄其口的微信终于公开了红包新玩法。 据悉，微信将联合各类商家推出春节“摇红包”活动，将送出金额超过5元的现金红包以及超过30亿卡券红包，其中单个最大红包金额为4999元。 首轮春节“摇红包”活动将于2月12日晚上正式开启，当晚将派送2500万个现金红包。用户需要升级微信至刚刚更新的6.1.1版本，打开微信“摇一摇”页面。 央视春晚还将与微信合作，在春晚直播过程中，微信将红包分成“品牌包时段”和“零点随机”两类。“品牌包时段”由大企业买断某时间段内的所有红包费用，所有用户抢到的该时段内的红包只显示该企业的信息。“零点随机”则是由多家小企业共同投入资金在零点发红包。 ', 20, 596);

    // var path = "/image/gobg.png";
    // //将模板图片绘制到canvas,在开发工具中drawImage()函数有问题，不显示图片
    // //不知道是什么原因，手机环境能正常显示
    // // context.drawImage(path, 0, 0, 375, 183);
    // var path1 = "/image/tx.png";
    // console.log(that.data.touxiang)
    // console.log(path1, "path1")
    // //将模板图片绘制到canvas,在开发工具中drawImage()函数有问题，不显示图片
    // var path2 = "/image/txquan.png";
    // var path3 = "/image/heise.png";
    // var path4 = "/image/wenziBg.png";
    // var path5 = "/image/wenxin.png";
    // context.drawImage(path2, 126, 186, 120, 120);
    // //不知道是什么原因，手机环境能正常显示
    // // context.save(); // 保存当前context的状态

    // var name = that.data.name;


    // context.setFontSize(20)
    // context.setFillStyle('#333333');
    // context.fillText('Hello', 20, 20)
    // context.fillText('MINA', 100, 100)
    // context.fillText('MINA', 200, 1000)
    // context.stroke();

    // //绘制名字
    // context.setFontSize(24);
    // context.setFillStyle('#333333');
    // context.setTextAlign('center');
    // context.fillText('MINA22', 185, 340);
    // context.stroke();
    // //绘制一起吃面标语
    // context.setFontSize(14);
    // context.setFillStyle('#333333');
    // context.setTextAlign('center');
    // context.fillText("邀请你一起去吃面", 185, 370);
    // context.stroke();
    // //绘制验证码背景
    // context.drawImage(path3, 48, 390, 280, 84);
    // //绘制code码
    // context.setFontSize(40);
    // context.setFillStyle('#ffe200');
    // context.setTextAlign('center');
    // context.fillText(that.data.code, 185, 435);
    // context.stroke();
    // //绘制左下角文字背景图
    // context.drawImage(path4, 25, 520, 184, 82);
    // context.setFontSize(12);
    // context.setFillStyle('#333');
    // context.setTextAlign('left');
    // context.fillText("进入小程序输入朋友的邀请", 35, 540);
    // context.stroke();
    // context.setFontSize(12);
    // context.setFillStyle('#333');
    // context.setTextAlign('left');
    // context.fillText("码，朋友和你各自获得通用", 35, 560);
    // context.stroke();
    // context.setFontSize(12);
    // context.setFillStyle('#333');
    // context.setTextAlign('left');
    // context.fillText("优惠券1张哦~", 35, 580);
    // context.stroke();
    // //绘制右下角扫码提示语
    // context.drawImage(path5, 248, 578, 90, 25);
    // //绘制头像
    // context.arc(186, 246, 50, 0, 2 * Math.PI) //画出圆
    // context.strokeStyle = "#ffe200";
    // context.clip(); //裁剪上面的圆形
    // context.drawImage(path1, 136, 196, 100, 100); // 在刚刚裁剪的园上画图
    context.draw();
    //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'mycanvas',
        success: function (res) {
          var tempFilePath = res.tempFilePath;
          that.setData({
            imagePath: tempFilePath,
            canvasHidden: true
          });
        },
        fail: function (res) {
          console.log(res);
        }
      });
    }, 200);
  },
  //点击保存到相册
  baocun: function () {
    var that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.imagePath,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#333',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              /* 该隐藏的隐藏 */
              that.setData({
                maskHidden: false
              })
            }
          }, fail: function (res) {
            console.log(11111)
          }
        })
      }
    })
  },
  //点击生成
  formSubmit: function (e) {
    var that = this;
    this.setData({
      maskHidden: false
    });
    wx.showToast({
      title: '装逼中...',
      icon: 'loading',
      duration: 1000
    });
    setTimeout(function () {
      wx.hideToast()
      that.createNewImg2();
      that.setData({
        maskHidden: true
      });
    }, 1000)
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
    var that = this;
    wx.getImageInfo({
      src: 'https://www.zhiailife.com/uploads/article/2018/11/22/5bf648fcd4809.jpg',
      // src: 'https://www.zhiailife.com/uploads/house/2017/10/13/59e078f52b77b.jpg',
      success(res) {
        that.setData({
          sWidth: res.width,
          sHeigh: res.height
        })
        console.log(res.width)
        console.log(res.height)
      }
    })
    wx.getUserInfo({
      success: res => {
        console.log(res.userInfo, "huoqudao le ")
        this.setData({
          name: res.userInfo.nickName,
        })
        wx.downloadFile({
          url: res.userInfo.avatarUrl, //仅为示例，并非真实的资源
          success: function (res) {
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            if (res.statusCode === 200) {
              console.log(res, "reererererer")
              that.setData({
                touxiang: res.tempFilePath
              })
            }
          }
        })
      }
    })
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
  onShareAppMessage: function (res) {
    return {
      title: "这个是我分享出来的东西",
      success: function (res) {
        console.log(res, "转发成功")
      },
      fail: function (res) {
        console.log(res, "转发失败")
      }
    }
  }
})

//圆形图片
const circleImage = (context, path, x, y, r) => {
  let d = 2 * r;
  let cx = x + r;
  let cy = y + r;

  context.save();
  context.beginPath();
  context.arc(cx, cy, r, 0, 2 * Math.PI);
  context.fill();
  context.clip();
  context.drawImage(path, x, y, d, d);
  context.restore();
};

//圆角图片
const roundImage = (context, r, path, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight, c) => {
  context.save();
  roundRect(context, dx, dy, dWidth, dHeight, r, c);
  context.fill();
  context.clip();
  context.drawImage(path, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  context.restore();
};

//圆角矩形
const roundRect = (context, x, y, w, h, r, c = 'transparent') => {
  if (w < 2 * r) { r = w / 2; }
  if (h < 2 * r) { r = h / 2; }

  context.beginPath();
  context.fillStyle = c;

  context.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5);
  context.moveTo(x + r, y);
  context.lineTo(x + w - r, y);
  context.lineTo(x + w, y + r);

  context.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2);
  context.lineTo(x + w, y + h - r);
  context.lineTo(x + w - r, y + h);

  context.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5);
  context.lineTo(x + r, y + h);
  context.lineTo(x, y + h - r);

  context.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI);
  context.lineTo(x, y + r);
  context.lineTo(x + r, y);

  context.fill();
  context.closePath();
};

//多行文本溢出
const drawTextOverflow = (context, text, maxWidth, maxRow, font, color, lineHeight, x, y) => {
  let arr = [];
  let temp = '';
  let row = [];

  text = text.replace(/[\r\n]/g, ''); // 去除回车换行符
  arr = text.split('');

  context.font = font;  // 注意：一定要先设置字号，否则会出现文本变形
  context.fillStyle = color;

  if (context.measureText(text).width <= maxWidth) {
    row.push(text);
  } else {
    for (let i = 0; i < arr.length; i++) {
      // 超出最大行数且字符有剩余，添加...
      if (row.length == maxRow && i < arr.length - 1) {
        row[row.length - 1] += '...';
        break;
      }

      // 字符换行计算
      if (context.measureText(temp).width < maxWidth) {
        temp += arr[i];

        // 遍历到最后一位字符
        if (i === arr.length - 1) {
          row.push(temp);
        }
      } else {
        i--;  // 防止字符丢失
        row.push(temp);
        temp = '';
      }
    }
  }

  // 绘制文本
  for (let i = 0; i < row.length; i++) {
    context.fillText(row[i], x, y + i * lineHeight, maxWidth);
  }

  return row.length * lineHeight;  // 返回文本高度
};