// pages/pinglun/pinglun.js
import { requestGet, requestPost, pinglunUrl, commUrl, disUrl } from '../../utils/request'
import Toast from '../../components/vant/toast/toast';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pinglun: [],
        id: null,
        pageIndex: 0,
        comm: [],
        dis: [],
        datas: "",
        message_id: null,
        isshow: false,
        Index: 10,
        isColl: false,
        lists: [],
        pid: 0,
        ping: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.data.message_id = options.id
        this.data.id = options.id
        this.setData({
            id: options.id
        })
        this.pinglunData()
        this.commData()
        console.log(this.data.id);
    },
    disData(e) {
        this.setData({
            datas: e.detail.value,
            isshow: true
        })
        console.log(this.data.isshow);
    },
    // 回车触发事件
    search() {
        console.log(this.data.datas);
        this.setData({
            isshow: false
        })
        console.log(this.data.isshow);
        this.dissData(this.data.datas, this.data.message_id, this.data.pid)

    },
    // 要回复的id
    dismess(e) {
        this.data.message_id = e.currentTarget.dataset.text
        console.log(e.currentTarget.dataset.text);
        this.setData({
            isshow: true,
            pid: e.currentTarget.dataset.text
        })
    },
    aa(e) {
        console.log(e);
    },
    async pinglunData(request) {
        //每次加载页面的时候 加载提示
        Toast.loading({
            duration: 0, //一直提示加载中
            message: '加载中...',
            forbidClick: true,
            loadingType: 'spinner',
            selector: '#van-toast',
        });
        // ?post_id=6273&offset=0&limit=10
        const res = await requestGet(pinglunUrl, { post_id: this.data.id, offset: this.data.pageIndex, rows: 10 })
        this.setData({
                pinglun: [...this.data.pinglun, ...res.data],
                ping: [...this.data.pinglun, ...res.data],
            })
            // 拿到数据之后就可以关闭加载提示
        Toast.clear();
        console.log(this.data.pinglun);
        console.log(this.data.ping);
    },
    async commData() {
        const res = await requestGet(commUrl, { offset: this.data.pageIndex, limit: 100, type: 1 })
        this.setData({
            comm: res.data
        })
        console.log(this.data.comm[0].id);
        for (let i = 0; i < this.data.comm.length; i++) {
            if (this.data.id == this.data.comm[i].id) {
                this.data.lists = this.data.comm[i]
            }
        }
        console.log(this.data.lists);

        // 获取缓存中的数据
        let collect = wx.getStorageSync('collect') || []
            // 判断当前主播是否被关注
        let isCollect = collect.some(v => v.id === this.data.id)
        this.setData({
            isCollect,
        })
        console.log(this.data.comm);
    },
    // flag&post_id=697&reply_user_id=1&content=12312321&token=b845588abcf58804c99d289584cd6068
    async dissData(mess, idd, pid) {
        const res = await requestPost(`http://yiapi.xinli001.com/fm/post-forum-comment.json?flag=0&post_id=${idd}&content=${mess}&reply_user_id=${pid}&token=b845588abcf58804c99d289584cd6068`)
            // const res = await requestGet(disUrl, { flag: 0, post_id: this.data.id, reply_user_id: 1, content: mess, token: b845588abcf58804c99d289584cd6068 })

        if (pid == 0) {
            this.data.pinglun.unshift(res.data)
            this.setData({
                dis: res,
                pinglun: this.data.pinglun,
            })
        } else {
            this.data.ping.unshift(res.data)
            this.setData({
                dis: res,
                ping: this.data.ping
            })
        }

        if (this.data.dis.message == "评论成功") {
            wx.showToast({
                title: '发布成功',
                icon: 'success',
                mask: true
            });
            this.setData({
                dis: [],
                datas: "",
                message_id: null,
                pid: 0
            })
        } else {
            wx.showToast({
                title: '发布太频繁',
                icon: 'error',
                mask: true
            });
            this.setData({
                dis: [],
                datas: "",
                message_id: null,
                pid: 0
            })
        }

        console.log(res);
        console.log(this.data.pinglun);
        console.log(this.data.message_id);
    },
    // 点击关注
    handleColl() {
        let isColl = false
            // 获取缓存中的数据
        let colle = wx.getStorageSync('colle') || []
            // 判断当前主播是否被关注
        let index = colle.findIndex(v => v.id === this.data.id)
        console.log(index);
        // 当index=-1的时候表示已经收藏过了
        if (index !== -1) {
            colle.splice(index, 1)
            isColl = false
            wx.showToast({
                title: '取消成功',
                icon: 'success',
                mask: true
            });
        } else {
            colle.push(this.data.lists)
            isColl = true
            wx.showToast({
                title: '关注成功',
                icon: 'success',
                mask: true
            });
        }
        // 把数据存入缓存中
        wx.setStorageSync('colle', colle)
            // 修改data中的属性
        this.setData({
            isColl
        })
    },


    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        this.setData({
            pageIndex: this.data.pageIndex + 10,
        })
        this.pinglunData()
        console.log(this.data.pageIndex);
    },

    // 下拉刷新
    onPullDownRefresh() {
        // 下拉刷新页面变1  同时清空list   重新加载数据
        this.setData({
            pageIndex: 0,
            pinglun: []
        })

        // 重新加载数据  await会返回一个Promise 当异步任务有了结果之后就停止下拉刷新
        this.pinglunData().then(() => {
            wx.stopPullDownRefresh()
        })
    },
})