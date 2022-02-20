// pages/shach/shach.js
import { requestGet, ShachUrl, ShUrl, XinxiURL } from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 1,
        pageIndex: 0,
        shach: [],
        value: "",
        datass: [],
        listss: [],
        slidesId: [{
            id: ""
        }]

    },
    onLoad: function(options) {
        this.word()
    },
    getlist(e) {
        console.log(e);
        let song = e.currentTarget.dataset.song;
        let id = song.id
        let slidesId = JSON.stringify(this.data.slidesId)
        wx.navigateTo({
            url: "/pages/music/music?id=" + id + "&slidesId=" + slidesId
        })
    },
    getli(e) {
        let song = e.currentTarget.dataset.song;
        let id = song.id
        wx.navigateTo({
            url: "/pages/zhubo_x/zhubo_x?id=" + id
        })
    },
    // 输入框的值改变了就会触发的事件
    headleinput(e) {
        console.log(e);
        // 获取输入框的值
        let { value } = e.detail
        console.log(value);
        this.setData({
            value
        })
        if (e.detail) {
            this.setData({
                shach: []
            })
        }
        // 判断值是否合法
        if (!value.trim()) {
            return;
        }
        this.qsearch(value)
        this.getXinxiData(value)
    },
    but(e) {
        console.log(e.currentTarget.dataset.text);
        this.shach(e.currentTarget.dataset.text);
        this.setData({
            value: e.currentTarget.dataset.text
        })
    },
    // 发送请求获取搜索数据
    async qsearch(request) {
        // ?q=%E8%90%BD&is_teacher=&offset=1&speaker_id=0&rows=10
        const res = await requestGet(ShachUrl, { q: request, offset: this.data.pageIndex, rows: 10 })
        this.setData({
            shach: res.data
        })
        console.log(res.data);
    },
    // ?offset=0&speaker_id=0&tag=%E5%BF%AB%E4%B9%90&rows=10
    async shach(datas) {
        // ?q=%E8%90%BD&is_teacher=&offset=1&speaker_id=0&rows=10
        const res = await requestGet(ShUrl, { q: datas, offset: this.data.pageIndex, rows: 10 })
        this.setData({
            value: datas,
            shach: res.data
        })
        console.log(res.data);
    },
    cancel() {
        this.setData({
            value: "",
            shach: [],
        })
    },
    // http://bapi.xinli001.com/fm2/hot_tag_list.json/?flag=1&offset=1&rows=10
    async word() {
        // ?q=%E8%90%BD&is_teacher=&offset=1&speaker_id=0&rows=10
        const res = await requestGet('http://bapi.xinli001.com/fm2/hot_tag_list.json/?flag=1&offset=1&rows=10')
        this.setData({
            datass: res.data
        })
        console.log(res.data);
    },
    async getXinxiData(value) {
        // http://yiapi.xinli001.com/fm/diantai-new-list.json?offset=0&limit=10
        const result = await requestGet(XinxiURL, { offset: this.data.pageIndex, limit: 50 })
        console.log(result.data[1].user.nickname.indexOf(value));
        for (let i = 0; i < result.data.length; i++) {
            if (result.data[i].user.nickname.indexOf(value) == 1) {
                this.setData({
                    listss: result.data[i]
                });
                console.log(result.data[i]);
            }
        }
        console.log(this.data.listss);
    },
})