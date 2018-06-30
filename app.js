//app.js
App({
  serverUrl: "http://172.22.139.3:8081",
  userInfo: null, 

  setGlobalUserInfo: function (user) {
    wx.setStorageSync("userInfo", user);
  },

  getGlobalUserInfo: function (user) {
    return wx.getStorageSync("userInfo");
  },
})