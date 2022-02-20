import { requestGet, CategoryesURL, ShopDetailURL } from "../../utils/request.js";

Page({
    data: {
        categoryes: [],
        pageIndex: 0,
        id: null,
        catego: [],
        comments: [],
        comme: []
    },
    onLoad: function(options) {
        this.id = options.user_id
        this.getCategoryData();
        this.getShopdetailData();
    },
    onReady: function() {

    },
    async getCategoryData() {
        const result = await requestGet(CategoryesURL + '?user_id=' + this.id);
        this.setData({
            categoryes: result.data,
        });
        this.setData({
            catego: this.data.categoryes.info
        })
    },
    async getShopdetailData() {
        const result = await requestGet(ShopDetailURL + '?user_id=' + this.id);
        this.setData({
            comments: result.data,
        });
        this.setData({
            comme: this.data.comments.rate_list
        })
    },
})