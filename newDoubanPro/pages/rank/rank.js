const API = require("../../utils/api");

// pages/rank/rank.js
let app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankFilms: [],
    index: null,
    title: "",
    isShow: false,
    end: false
  },
  // 请求正在上映电影接口
  request({
    url,
    data
  }) {
    API.get({
        url,
        data
      })
      .then((res) => {
        // console.log("我是start起点", data.start);
        if (res.statusCode !== 0) {
          let rankFilms = data.start ? [...this.data.rankFilms, ...res.data.subjects] : res.data.subjects
          this.setData({
            rankFilms
          });
          // console.log("我是rankFilms", this.data.rankFilms);
          console.log(res.data.total);
          console.log(this.data.rankFilms);
          wx.hideLoading();
          wx.stopPullDownRefresh();
          if(this.data.rankFilms.length >= res.data.total){
            this.setData({
              end: true,
              isShow: false
            });
          }
        }
      })
      .catch(erro => {
        console.log(erro);
      })
  },
  // 页面初始化加载请求数据方式
  beginRes(flog, index) {
    // 判断请求
    if (index == 0) {
      this.request({
        url: API.NOW_SHOWING,
        data: {
          start: flog ? 0 : this.data.rankFilms.length,
          count: 10,
          city: "郑州"
        }
      });
      this.data.index = index;
      console.log(this.data.index);
    } else if (index == 1) {
      this.request({
        url: API.COMING_SOON,
        data: {
          start: flog ? 0 : this.data.rankFilms.length,
          count: 10
        }
      });
      this.data.index = index;
    } else if (index == 2) {
      this.request({
        url: API.NEW_MOVIES,
        data: {
          start: flog ? 0 : this.data.rankFilms.length,
          count: 10
        }
      });
      this.data.index = index;
    } else {
      this.request({
        url: API.TOP250,
        data: {
          start: flog ? 0 : this.data.rankFilms.length,
          count: 10
        }
      });
      // this.data.index = index;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    console.log(options.index);
    // 修改标题
    this.setData({
      title: options.title
    });
    // let index = options.index
    this.beginRes(true, options.index);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.title
    });
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
    this.beginRes(true, this.data.index);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      isShow: true
    })
    console.log(this.data.isShow);
    console.log("上啦触发啦");
    this.beginRes(false, this.data.index);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})