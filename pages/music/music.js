import { requestGet, ClassUrl, music, per, requestPost, fmcomment } from "../../utils/request";
import Toast from "../../components/vant/toast/toast";
// pages/music/music.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        slides: [],
        uu: [],
        id: null,
        index: null,
        penlun: [],
        pageIndex: 0,
        list: [],
        isPlay: false,
        //骨架的状态
        loading: true,
        show: false,
        slidesId: [],
        number: null,
        inputVal: [],
        user_id: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options);
        this.setData({
            id: options.id,
            slidesId: options.slidesId
        });
        this.id = options.id;
        this.slidesIds = JSON.parse(options.slidesId);
        const slidesId = []
        for (let i = 0; i < this.slidesIds.length; i++) {
            slidesId[i] = this.slidesIds[i].id

        }
        this.setData({
            slidesId: slidesId
        })
        this.slidesId = slidesId;
        console.log("id", slidesId, options.slidesId, this.id)
        this.getPinlun();
        this.getSlidesData();
        this.panduan()
    },
    /* 播放器 */
    handleMusicPlay() {
        let isPlay = !this.data.isPlay;
        this.setData({
            isPlay
        })
    },
    /*  */
    panduan: function() {
        console.log("slidesId", this.data.slidesId);
        var number = this.data.slidesId.indexOf(this.data.id);
        console.log(number, "number")
        this.setData({
            number: number
        })
        this.number = number
    },
    async getSlidesData() {
        //?id=99389004&key=046b6a2a43dc6ff6e770255f57328f89
        const result = await requestGet(`${ music}?id=${this.id}&key=046b6a2a43dc6ff6e770255f57328f8`);
        //console.log("播放器", result)
        this.setData({
            slides: result.data,
        });
        wx.setNavigationBarTitle({
            title: this.data.slides.title
        })
        console.log(this.data.slides);
    },

    // async getSlidesData() {
    //     //?id=99389004&key=046b6a2a43dc6ff6e770255f57328f89
    //     const result = await requestGet(`${ music}?id=${this.id}&key=046b6a2a43dc6ff6e770255f57328f8`);
    //     //console.log("播放器", result)
    //     this.setData({
    //         slides: result.data,
    //     });
    //     wx.setNavigationBarTitle({
    //         title: this.data.slides.title
    //     })
    //     console.log(this.data.slides);
    // },
    onReady: function(e) {
        this.audioCtx = wx.createAudioContext('myAudio')
    },

    /* 播放按钮 */
    audioPlay: function() {
        if (this.data.isPlay) {
            this.audioCtx.pause()

        } else {
            this.audioCtx.play()
        }
    },
    // audioPause: function() {
    //     this.audioCtx.pause()
    // },
    audio14: function() {
        this.audioCtx.seek()
    },
    audioStart: function() {
        this.audioCtx.seek(0)
    },
    top: function() {
        this.number = this.number - 1;
        this.id = this.data.slidesId[this.number];
        console.log(this.id, this.number)
        this.getSlidesData();
        this.isPlay = false;
        this.getPinlun()


    },
    next: function() {
        this.number = this.number + 1;
        this.id = this.data.slidesId[this.number];
        console.log(this.id, this.number)
        this.getSlidesData()
        this.audioPlay()
        this.isPlay = false
        this.getPinlun()
    },

    /* 评论遮罩 */
    onClickShow: function() {
        // console.log("xxx")
        this.setData({ show: true });
    },

    onClickHide: function() {
        this.setData({ show: false });
    },

    noop: function() {},
    so_diantai: function(even) {
        let id = even.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/zhubo_x/zhubo_x?id=" + id
        })
    },





    /* 评论区 */
    async getPinlun() {
        Toast.loading({
            duration: 0,
            message: "加载中...",
            forbidClick: true,
            loadingType: "spinner",
            selector: '#van-toast',
        });
        //?offset=0&broadcast_id=99389004&limit=10&key=046b6a2a43dc6ff6e770255f57328f89
        const pree = await requestGet(`${per}?offset=${this. pageIndex}&broadcast_id=${this.id}&limit=10&key=046b6a2a43dc6ff6e770255f57328f89`, { offset: this.data.pageIndex });
        //每次请求结束之后隐藏Toast
        //console.log("aaa", this.data)
        //console.log("ccc", pree)
        Toast.clear();
        this.setData({
            penlun: pree.data,
            list: [...this.data.list, ...pree.data],
            loading: false
        });
    },
    //fm评论
    async postDiantaiComment() {
        var result = await requestPost(fmcomment, {
            "broadcast_id": this.id,
            "reply_object_id": 0,
            "key": "046b6a2a43dc6ff6e770255f57328f89",
            "content": this.inputVal,
            "token": "b845588abcf58804c99d289584cd6068"
        })
        console.log(result, "开始留言");
        var lists = this.data.penlun;
        lists.push({
            content: this.data.inputVal

        });
        //更新
        this.setData({
            penlun: lists,
            inputVal: "",
        });
        this.getPinlun()
    },

    // 留言功能
    changeInputValue(ev) {
        this.setData({
            inputVal: ev.detail.value
        })
        this.inputVal = this.data.inputVal;
        // console.log(ev)
    },


    //每一次页面触底执行onReachBottom方法  让pageIndex+1
    onReachBottom: function() {
        this.setData({
            pageIndex: ++this.data.pageIndex,
        });
        // console.log("index", this.data.pageIndex);
        this.getPinlun();
    },
    onPullDownRefresh: function() {
        this.setData({
            pageIndex: 1,
            list: [],

        });
        //当异步任务有了结果之后，就可以停止下拉刷新
        // this.getPinlun().then(() => {
        //     wx.stopPullDownRefresh();
        // });

    },


})