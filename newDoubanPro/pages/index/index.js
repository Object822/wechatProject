const API = require("../../utils/api.js")
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    subjects: [],
    allRank: null,
    coming_soon: null,
    new_movies: null,
    top_250: null
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
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
        if (res.statusCode !== 0) {
          if (res.data.title == "正在上映的电影-郑州") {
            this.setData({
              allRank: res.data,
            });
            console.log(this.data.allRank);
          } else if (res.data.title == "即将上映的电影") {
            this.setData({
              coming_soon: res.data,
            });
            console.log(this.data.coming_soon);
          } else if (res.data.title == "豆瓣电影新片榜") {
            this.setData({
              new_movies: res.data,
            });
            console.log(this.data.new_movies);
          } else {
            this.setData({
              top_250: res.data,
            });
            console.log(this.data.top_250);
          }
          if (this.data.allRank && this.data.coming_soon && this.data.new_movies && this.data.top_250) {
            this.data.subjects.push(this.data.allRank, this.data.coming_soon, this.data.new_movies, this.data.top_250);
            this.setData({
              subjects: this.data.subjects
            })
            app.globalData.subjects = this.data.subjects;
            console.log(app.globalData.subjects);
            wx.hideLoading();
            wx.stopPullDownRefresh();
          }
        }
      })
      .catch(erro => {
        console.log(erro);
      })
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中',
    })
    // 调用正在上映电影
    this.request({
      url: API.NOW_SHOWING,
      data: {
        start: 0,
        count: 8,
        city: "郑州"
      }
    });
    // 请求即将上映电
    this.request({
      url: API.COMING_SOON,
      data: {
        start: 0,
        count: 8
      }
    });
    // 请求新片榜
    this.request({
      url: API.NEW_MOVIES,
      data: {
        start: 0,
        count: 12
      }
    });
    // 请求top250电影
    this.request({
      url: API.TOP250,
      data: {
        start: 0,
        count: 8
      }
    });
  },
})