// pages/bootPage/bootPage.js
const API = require("../../utils/api");
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bootPages: [],
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // 发送请求
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
          // console.log(res);
          this.setData({
            bootPages: res.data
          })
          console.log(this.data.bootPages);
        }
      })
      .catch(res => {
        console.log(res);
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用请求电影条目信息方法
    this.request({
      url: API.NOW_SHOWING,
      data: {
        start: 0,
        count: 3
      }
    });
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