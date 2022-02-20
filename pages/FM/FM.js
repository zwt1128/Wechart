const app = getApp();
import { requestGet, category } from "../../utils/request";
import Toast from "../../components/vant/toast/toast";

// pages/FM/FM.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        slides: [],
        uu: [],
        id: null,
        pageIndex: 1,
        list: [],
        //骨架的状态
        loading: true,
        slidesId: [{
            id: ""
        }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            id: options.id,
        });
        this.getSlidesData();
        this.id = options.id;
        // console.log(this.id)


    },
    /* 跳转页吗 */
    getlist(even) {
        console.log(even);
        let song = even.currentTarget.dataset.song;
        let id = song.id
        let slidesId = JSON.stringify(this.data.slidesId)
        console.log(song, id, slidesId)
        wx.navigateTo({
            url: "/pages/music/music?id=" + id + "&slidesId=" + slidesId
        })
    },
    async getSlidesData() {
        Toast.loading({
            duration: 0,
            message: "加载中...",
            forbidClick: true,
            loadingType: "spinner",
            selector: '#van-toast',
        });
        //?category_id=1&offset=0&limit=10&key=046b6a2a43dc6ff6e770255f57328f89
        const result = await requestGet(`${category}?category_id=${this.pageIndex}&offset=0&limit=10&key=046b6a2a43dc6ff6e770255f57328f89`, { category_id: this.data.pageIndex });
        //console.log(result);
        //console.log(result.data);
        this.setData({
            slides: result.data,
            list: [...this.data.list, ...result.data],
            loading: false
        });
        var slidesId = {
            id: ""
        }
        var slidesIds = []
        console.log(slidesIds)
        for (var i = 0; i < this.data.slides.length; i++) {
            slidesId = {
                id: this.data.slides[i].id
            }
            slidesIds[i] = slidesId
        }
        this.setData({
            slidesId: slidesIds
        })
        console.log("9999", this.data.slides, slidesId, slidesIds)
    },
    //每一次页面触底执行onReachBottom方法  让pageIndex+1
    onReachBottom: function() {
        this.setData({
            pageIndex: ++this.data.pageIndex,
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