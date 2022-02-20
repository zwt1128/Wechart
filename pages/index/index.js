// 获取应用实例
const app = getApp();
import {
    requestGet,
    SlidesURL,
    Found
} from "../../utils/request";

import Toast from '../../components/vant/toast/toast';

Page({
    data: {
        slides: [],
        founds: [],
        index: 0,
        currentIndex: 0,
        currentIndex1: 0,
        currentIndex2: 0,
        slidesId: [{
            id: ""
        }],
        imgList: [{
                img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.MXkAJ0QFmeokbGMZHgRv8QHaHW?w=164&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7"
            },
            {
                img: "https://c-ssl.duitang.com/uploads/blog/202101/20/20210120021629_0d04f.jpeg"
            },
            {
                img: "https://c-ssl.duitang.com/uploads/item/202001/30/20200130160650_eemik.png"
            },
            {
                img: "https://img.38xf.com/uploads/20180611/a97850731c2aca8847fc5eb5feca1812.jpg"
            },
            {
                img: "https://pic2.zhimg.com/v2-9f2b856a192704d988752795588346ed_r.jpg"
            },
        ],
    },

    changeSwiper: function(e) {
        this.setData({
            currentIndex: e.detail.current
        })
    },
    changeSwiper1: function(e) {
        this.setData({
            currentIndex1: e.detail.current
        })
    },

    onLoad() {
        this.getSlidesData();
        this.Founds();

    },
    async getSlidesData() {
        const result = await requestGet(SlidesURL);
        this.setData({
            slides: result.data
        });
    },


    // 发现
    async Founds() {
        Toast.loading({
            duration: 0, //一直提示加载中
            message: '加载中...',
            forbidClick: true,
            loadingType: 'spinner',
            selector: '#van-toast',
        });


        // ? offset = 0 & limit = 10 & key = 046 b6a2a43dc6ff6e770255f57328f89
        const result = await requestGet(Found, {
            offset: this.data.index,
            limit: 20
        })
        this.setData({
            founds: [...this.data.founds, ...result.data]
        });
        Toast.clear();
        console.log(this.data.founds);
    },

    getlist: function(e) {
        console.log(e);
        let song = e.currentTarget.dataset.song;
        let id = song.id
        let slidesId = JSON.stringify(this.data.slidesId)
        console.log(song, id, slidesId)
        wx.navigateTo({
            url: "/pages/music/music?id=" + id + "&slidesId=" + slidesId
        })
    },

    onReachBottom: function() {
        this.setData({
            index: this.data.index + 20
        })
        this.Founds()
        console.log(this.data.index);
    },
    //回到顶部
    goTop: function(e) { // 一键回到顶部
        if (wx.pageScrollTo) {
            wx.pageScrollTo({
                scrollTop: 0
            })
        } else {
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
            })
        }
    },
});