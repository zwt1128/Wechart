import { requestGet, SlidesURL, CategoryshopsURL } from "../../utils/request.js";
import Toast from "../../components/vant/toast/toast";

Page({
    data: {
        slides: [],
        btns: ['热门', '最新'],
        active: 0,
        categoryshop: [],
        pageIndex: 0,
        categoryshops: [],
        loading: true,
    },
    onLoad() {
        this.getSlidesData();
        this.getCategoryShopData();
        this.getCategoryShopsData();
    },
    async getSlidesData() {
        const result = await requestGet(SlidesURL);
        this.setData({
            slides: result,
        });
    },
    change: function(e) {

        this.setData({
            active: e.currentTarget.dataset.index
        })
    },
    async getCategoryShopData() {
        Toast.loading({
            duration: 0,
            message: "加载中...",
            forbidClick: true,
            loadingType: "spinner",
            selector: '#van-toast',
        });
        const result = await requestGet(CategoryshopsURL, { gender: this.data.pageIndex, page: 1 });
        Toast.clear();
        this.setData({
            categoryshop: [...this.data.categoryshop, ...result.data],
            loading: false
        });
    },

    async getCategoryShopsData() {
        Toast.loading({
            duration: 0,
            message: "加载中...",
            forbidClick: true,
            loadingType: "spinner",
            selector: '#van-toast',
        });
        const result = await requestGet(CategoryshopsURL, { gender: this.data.pageIndex, page: 2 });
        Toast.clear();
        this.setData({
            categoryshops: [...this.data.categoryshops, ...result.data],
            loading: false
        });
    },

    onReady: function() {

    },

    onSearch(e) {
        //console.log("要搜索的内容是", e.detail);
    },

    onPullDownRefresh: function() {
        this.setData({
            pageIndex: 0,
            categoryshop: [],
            categoryshops: [],
        });
        this.getCategoryShopData().then(() => {
            wx.stopPullDownRefresh();
        });
        this.getCategoryShopsData().then(() => {
            wx.stopPullDownRefresh();
        });
    },

    onReachBottom: function() {
        this.setData({
            pageIndex: ++this.data.pageIndex
        })
        this.getCategoryShopData();

    },

})