// pages/list/list.js
import { requestGet, ListURL } from '../../utils/request'
import Toast from '../../components/vant/toast/toast';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        pageIndex: 0,
        lists: [],
        tid: null,
        // 判断主播是否被关注
        isCollect: false,
        // 挂架的状态
        loading: true,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function() {
        let pages = getCurrentPages();
        let currentpage = pages[pages.length - 1];
        let options = currentpage.options
        this.id = options.id
        this.data.tid = options.id
        this.getListData()


    },
    async getListData() {

        //每次加载页面的时候 加载提示
        Toast.loading({
            duration: 0, //一直提示加载中
            message: '加载中...',
            forbidClick: true,
            loadingType: 'spinner',
            selector: '#van-toast',
        });
        const result = await requestGet(ListURL, { offset: this.data.pageIndex, limit: 200 });
        this.setData({
            list: [...this.data.list, ...result.data],
            loading: false,

        });
        this.setData({
            tid: this.data.tid
        });
        for (let i = 0; i < result.data.length; i++) {
            if (this.id === result.data[i].diantai.user.id) {
                this.setData({
                    lists: result.data[i]
                });
            }
        }

        // 获取缓存中的数据
        let collect = wx.getStorageSync('collect') || []
            // 判断当前主播是否被关注
        let isCollect = collect.some(v => v.diantai.user.id === this.data.tid)
        this.setData({
                isCollect,
            })
            // 拿到数据之后就可以关闭加载提示
        Toast.clear();
        console.log(this.data.lists.diantai.user.id);
    },
    // 点击关注
    handleCollect() {
        let isCollect = false
            // 获取缓存中的数据
        let collect = wx.getStorageSync('collect') || []
            // 判断当前主播是否被关注
        let index = collect.findIndex(v => v.diantai.user.id === this.data.tid)
        console.log(index);
        // 当index=-1的时候表示已经收藏过了
        if (index !== -1) {
            collect.splice(index, 1)
            isCollect = false
            wx.showToast({
                title: '取消成功',
                icon: 'success',
                mask: true
            });
        } else {
            collect.push(this.data.lists)
            isCollect = true
            wx.showToast({
                title: '关注成功',
                icon: 'success',
                mask: true
            });
        }
        // 把数据存入缓存中
        wx.setStorageSync('collect', collect)
            // 修改data中的属性
        this.setData({
            isCollect
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        this.setData({
            pageIndex: this.data.pageIndex + 200
        })
        this.getListData()
        console.log(this.data.pageIndex);
    },

    // 下拉刷新
    onPullDownRefresh() {
        // 下拉刷新页面变1  同时清空list   重新加载数据
        this.setData({
            pageIndex: 0,
            list: []
        })

        // 重新加载数据  await会返回一个Promise 当异步任务有了结果之后就停止下拉刷新
        this.getListData().then(() => {
            wx.stopPullDownRefresh()
        })
    },
})