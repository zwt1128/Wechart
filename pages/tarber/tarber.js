import { requestGet, TarberURL } from "../../utils/request.js";
Page({
    data: {
        urls: [
            'http://zhishistatic.fhd001.com/imgFile/1000.jpg',
            'http://zhishistatic.fhd001.com/imgFile/333.jpg',
            'http://zhishistatic.fhd001.com/imgFile/888.jpg',
            'http://zhishistatic.fhd001.com/imgFile/444.jpg',
        ],
        btns: ['最新', '热门'],
        active: 0,
        classifyId: null,
        pageIndex: 1,
        tabe: [],
        list: [],
        lists: []
    },
    onLoad: function(options) {
        this.data.classifyId = options.classifyId
        this.getTarberData();
        this.getTarbersData();
    },
    change: function(e) {
        this.setData({
            active: e.currentTarget.dataset.index
        })
    },
    onReady: function() {},
    async getTarberData() {
        const result = await requestGet(`https://zhishi.fhd001.com/classifyQ/getQuestionsByClassifyIdAndOrder.do?token=QVRJQ1kxTmlXak1ITUZVdkJudFZNRlpuVlRNQlpBRnZValphTUZkbVVHY0dOd2R6&classifyId=${this.data.classifyId}&order=0`);
        this.setData({
            tabe: result.data,
        });
        this.setData({
            list: this.data.tabe.list
        })
    },
    async getTarbersData() {
        const user = await requestGet(`https://zhishi.fhd001.com/classifyQ/getQuestionsByClassifyIdAndOrder.do?token=QVRJQ1kxTmlXak1ITUZVdkJudFZNRlpuVlRNQlpBRnZValphTUZkbVVHY0dOd2R6&classifyId=${this.data.classifyId}&order=1`);
        this.setData({
            tabe: user.data,
        });
        this.setData({
            lists: this.data.tabe.list
        })
    },
    onReachBottom: function() {
        this.setData({
            pageIndex: ++this.data.pageIndex,
        });
        this.getTarberData();
        this.getTarbersData();
    },
})