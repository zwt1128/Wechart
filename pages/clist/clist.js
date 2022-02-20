// pages/clist/clist.js
import { requestGet, ClassUrl } from '../../utils/request'
import Toast from '../../components/vant/toast/toast';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        Class: [],
        pageIndex: 0,
        category_id: null,
        slidesId: [{
            id: ""
        }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.data.category_id = options.category_id

        this.getClassData();
    },
    getlist(e) {
        console.log(e);
        let song = e.currentTarget.dataset.song;
        let id = song.id
        let slidesId = JSON.stringify(this.data.slidesId)
        console.log(song, id, slidesId)
        wx.navigateTo({
            url: "/pages/music/music?id=" + id + "&slidesId=" + slidesId
        })
    },
    async getClassData() {
        //每次加载页面的时候 加载提示
        Toast.loading({
            duration: 0, //一直提示加载中
            message: '加载中...',
            forbidClick: true,
            loadingType: 'spinner',
            selector: '#van-toast',
        });
        // ?category_id=1&offset=0&limit=10
        const result = await requestGet(ClassUrl, { category_id: this.data.category_id, offset: this.data.pageIndex, limit: 10 })
        this.setData({
            Class: [...this.data.Class, ...result.data],
        })
        console.log(this.data.Class);
        // var slidesId = {
        //     id: ""
        // }
        // var slidesIds = []
        // console.log(slidesIds)
        // for (var i = 0; i < this.data.Class.length; i++) {
        //     slidesId = {
        //         id: this.data.Class[i].id
        //     }
        //     slidesIds[i] = slidesId
        // }
        // this.setData({
        //     slidesId: slidesIds
        // })
        console.log(this.data.slidesId);
        // 拿到数据之后就可以关闭加载提示
        Toast.clear();

    },

    onReachBottom: function() {
        this.setData({
            pageIndex: this.data.pageIndex + 10,
        })
        this.getClassData()
    },
    // 下拉刷新
    onPullDownRefresh() {
        // 下拉刷新页面变1  同时清空list   重新加载数据
        this.setData({
            pageIndex: 0,
            Class: []
        })

        // 重新加载数据  await会返回一个Promise 当异步任务有了结果之后就停止下拉刷新
        this.getClassData().then(() => {
            wx.stopPullDownRefresh()
        })
    },

})