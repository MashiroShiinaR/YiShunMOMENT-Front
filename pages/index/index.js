const app = getApp()

Page({
  data: {
    // 用于分页的属性
    totalPage: 1,
    page: 1,
    vidoeList: [],

    screenWidth: 350,
    serverUrl: ""

  },

  onLoad: function(params) {
    var me = this;
    var screenWidth = wx.getSystemInfoSync().screenWidth;
    me.setData({
      screenWidth: screenWidth,
    });

    // 获取当前的分页数
    var page = me.data.page;
    me.getAllVideoList(page);
  },

  getAllVideoList: function (page) {
    var me = this;
    var serverUrl = app.serverUrl;
    wx.showLoading({
      title: '请等待，加载中...',
    });

    wx.request({
      url: serverUrl + '/video/showAll?page=' + page,
      method: "POST",
      success: function (res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        
        console.log(res.data);

        // 判断当前页page是否是第一页，如果是第一页，设置videoList为空
        if (page === 1) {
          me.setData({
            videoList: []
          });
        }
          var videoList = res.data.data.rows;
          var newVideoList = me.data.videoList;

          me.setData({
            videoList: newVideoList.concat(videoList),
            page: page,
            totalPage: res.data.data.total,
            serverUrl: serverUrl
          });
      }
    })
  },

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    this.getAllVideoList(1, 0);
  },

  onReachBottom: function () {
    var me = this;
    var currentPage = me.data.page;
    var totalPage = me.data.totalPage;
    // 判断当前页数和总页数是否相等，如果相等无需查询

    if (currentPage === totalPage) {
      wx.showToast({
        title: '已经没有视频啦！',
        icon: "none"
      })
      return;
    }

    var page = currentPage + 1;

    me.getAllVideoList(page, 0);
  },

  showVideoInfo: function (e) {
    var me = this;
    var videoList = me.data.videoList;
    var arrindex = e.target.dataset.arrindex;
    var videoInfo = JSON.stringify(videoList[arrindex]);

    wx.redirectTo({
      url: '../videoinfo/videoinfo?videoInfo=' + videoInfo
    })
  }

})