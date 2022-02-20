// pages/commun/commun.js
import { requestGet, commUrl } from '../../utils/request'
import Toast from '../../components/vant/toast/toast';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        comm: [],
        pageIndex: 0,
        new: []
    },

    onLoad: function(options) {
        this.commData()
        this.newData()
    },


    async commData() {
        //每次加载页面的时候 加载提示
        Toast.loading({
            duration: 0, //一直提示加载中
            message: '加载中...',
            forbidClick: true,
            loadingType: 'spinner',
            selector: '#van-toast',
        });
        // ?flag=0&offset=0&limit=10&type=1
        const res = await requestGet(commUrl, { offset: this.data.pageIndex, rows: 10, type: 1 })
        this.setData({
                comm: [...this.data.comm, ...res.data]
            })
            // 拿到数据之后就可以关闭加载提示
        Toast.clear();
        console.log(res.data);
    },
    async newData() {
        //每次加载页面的时候 加载提示
        Toast.loading({
            duration: 0, //一直提示加载中
            message: '加载中...',
            forbidClick: true,
            loadingType: 'spinner',
            selector: '#van-toast',
        });
        // ?flag=0&offset=0&limit=10&type=1
        const res = await requestGet(commUrl, { offset: this.data.pageIndex, rows: 10, type: 3 })
        this.setData({
                new: [...this.data.new, ...res.data]
            })
            // 拿到数据之后就可以关闭加载提示
        Toast.clear();
    },
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        this.setData({
            pageIndex: this.data.pageIndex + 10
        })
        this.commData()
        this.newData()
        console.log(this.data.pageIndex);
    },

    // 下拉刷新
    onPullDownRefresh() {
        // 下拉刷新页面变1  同时清空list   重新加载数据
        this.setData({
            pageIndex: 0,
            comm: []
        })

        // 重新加载数据  await会返回一个Promise 当异步任务有了结果之后就停止下拉刷新
        this.commData().then(() => {
            wx.stopPullDownRefresh()
        })
    },
})