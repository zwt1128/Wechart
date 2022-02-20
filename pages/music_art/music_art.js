import { requestGet, zhubo } from "../../utils/request";
import Toast from "../../components/vant/toast/toast";

// pages/music_art/music_art.js



Page({
    /**
     * 页面的初始数据
     */
    data: {
        id: null,
        pageIndex: 0,
        list: [],
        //骨架的状态
        loading: true,

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.id = options.id;
        this.diantai_id = options.diantai;
        this.getSlidesData();
        console.log("options", options.id)
    },

    async getSlidesData() {
        Toast.loading({
            duration: 0,
            message: "加载中...",
            forbidClick: true,
            loadingType: "spinner",
            selector: '#van-toast',
        });
        //http://yiapi.xinli001.com/fm/diantai-new-list.json?offset=0&limit=10&key=046b6a2a43dc6ff6e770255f57328f89"
        const result = await requestGet(`${zhubo}?offset =${this. pageIndex} & limit = 10 & key = 046 b6a2a43dc6ff6e770255f57328f89`, { offset: this.data.pageIndex });
        console.log("xxxx", result.data);
        console.log("list", this.data.pageIndex);
        Toast.clear();
        this.setData({
            zhubo: result.data,
            list: [...this.data.list, ...result.data],
            loading: false
        })
    },
    onReachBottom: function() {
        this.setData({
            pageIndex: this.data.pageIndex + 5,
        });
        console.log("index", this.data.pageIndex);
        this.getSlidesData();
    },
    onPullDownRefresh: function() {
        this.setData({
            pageIndex: 1,
            list: []
        });
        //当异步任务有了结果之后，就可以停止下拉刷新
        this.getSlidesData().then(() => {
            wx.stopPullDownRefresh();
        });
    },

})