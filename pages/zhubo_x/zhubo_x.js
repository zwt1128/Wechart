import { requestGet, zhuoxiangqing, zhubojiemu, zhuboxlei, requestPost, diantcomment, zhuobox_h } from "../../utils/request";
import Toast from "../../components/vant/toast/toast";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: [],
        slides: [],
        pageIndex: 0,
        list: [],
        //骨架的状态
        loading: true,
        liuyan: [],
        msgData: [],
        inputVal: null,
        show: false,
        slidesId: [{
            id: ""
        }],
        isC: false,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            id: options.id,
            // index: options.slides,
        });
        console.log("id", options.id)
        this.id = options.id;
        this.getSlidesData();
        this.getCategoryData();
        this.getCategoryliyan()
    },

    /* 电台详情 */
    async getCategoryData() {
        // console.log("this", this);
        //http://yiapi.xinli001.com/fm/diantai-detai.json?id=921&key=046b6a2a43dc6ff6e770255f57328f89
        const result = await requestGet(`${zhuoxiangqing}?id=${this.id}&key=046b6a2a43dc6ff6e770255f57328f89`);
        console.log("详情", result);
        this.setData({
            slides: result.data,
        });
        console.log(this.data.slides);
         // 获取缓存中的数据
         let collectt = wx.getStorageSync('collectt') || []
         // 判断当前主播是否被关注
     let isC = collectt.some(v => v.user.id === this.data.slides.user.id)
     this.setData({
         isC,
     })
    },

    /* 歌单 */
    async getSlidesData() {
        Toast.loading({
            duration: 0,
            message: "加载中...",
            forbidClick: true,
            loadingType: "spinner",
            selector: '#van-toast',
        });
        //?offset=0&limit=10&diantai_id=921&key=046b6a2a43dc6ff6e770255f57328f89
        const jiemu = await requestGet(`${zhubojiemu}?offset=${this.data.pageIndex}&limit=10&diantai_id=${this.id}&key=046b6a2a43dc6ff6e770255f57328f89`, { offset: this.data.pageIndex });
        //每次请求结束之后隐藏Toast
        console.log("歌单", jiemu)
        Toast.clear();
        this.setData({
            jiemuli: jiemu.data,
            list: [...this.data.list, ...jiemu.data],
            loading: false
        });

        var slidesId = {
            id: ""
        }
        var slidesIds = []
        console.log(slidesIds)
        for (var i = 0; i < this.data.list.length; i++) {
            slidesId = {
                id: this.data.list[i].id
            }
            slidesIds[i] = slidesId
        }
        this.setData({
            slidesId: slidesIds
        })
        console.log("9999", this.data.slides, slidesId, slidesIds)
    },
    handleC(){
        let isC = false
        // 获取缓存中的数据
    let collectt = wx.getStorageSync('collectt') || []
        // 判断当前主播是否被关注
        console.log(this.data.id);
    let index = collectt.findIndex(v => v.user.id === this.data.slides.user.id)
    console.log(index);
    // 当index=-1的时候表示已经收藏过了
    if (index !== -1) {
        collectt.splice(index, 1)
        isC = false
        wx.showToast({
            title: '取消成功',
            icon: 'success',
            mask: true
        });
    } else {
        collectt.push(this.data.slides)
        isC = true
        wx.showToast({
            title: '关注成功',
            icon: 'success',
            mask: true
        });
    }
    // 把数据存入缓存中
    wx.setStorageSync('collectt', collectt)
        // 修改data中的属性
    this.setData({
        isC
    })
    },
    /* 留言板 */
    async getCategoryliyan() {
        console.log("thislll", this);
        //?offset=0&limit=10&diantai_id=921&key=046b6a2a43dc6ff6e770255f57328f89
        const resultt = await requestGet(`${zhuboxlei}?offset=0&limit=10&diantai_id=${this.id}&key=046b6a2a43dc6ff6e770255f57328f89`)
            // const resultt = await requestGet(`${zhuboxlei}?offset=${this.data.pageIndex}&limit=10&diantai_id=${this.id}&key=046b6a2a43dc6ff6e770255f57328f89`, { offset: this.data.pageIndex });
        console.log("留言板", resultt);
        this.setData({
            liuyan: resultt.data,
            list: [...this.data.list, ...resultt.data],
            loading: false
        });
    },


    tozhuan: function(even) {
        let lists = even.currentTarget.dataset.list;
        let id = lists.id
        let slidesId = JSON.stringify(this.data.slidesId)
        wx.navigateTo({
            url: "/pages/music/music?id=" + id + "&slidesId=" + slidesId
        })
        console.log(id)
    },
    /* 评论电台 */
    async postDiantaiComment() {
        var result = await requestPost(zhuobox_h, {
            "diantai_id": this.id,
            "reply_object_id": 3009990,
            "key": "046b6a2a43dc6ff6e770255f57328f89",
            "content": "好",
            "token": "b845588abcf58804c99d289584cd6068"
        })
        wx.startPullDownRefresh()
        console.log(result, "评论回复");
        var list = this.data.liuyan;
        list.push({
            content: this.data.inputVal

        });
        //更新
        this.setData({
            liuyan: list,
            inputVal: "",
        });
        this.getCategoryliyan()
    },

    // 留言功能
    changeInputValue(ev) {
        this.setData({
            inputVal: ev.detail.value
        })
        this.inputVal = this.data.inputVal;
        // console.log(ev)
    },
    //评论回复
    async posthuifuComment() {
        var result = await requestPost(diantcomment, {
            "diantai_id": this.id,
            "reply_object_id": 0,
            "key": "046b6a2a43dc6ff6e770255f57328f89",
            "content": this.inputVal,
            "token": "b845588abcf58804c99d289584cd6068"
        })
    },
    //弹出层
    showPopup() {
        console.log("弹出层开始")
        this.setData({ show: true });
    },

    onClose() {
        this.setData({ show: false });
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