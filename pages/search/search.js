import { requestGet, CategoryshopsURL } from "../../utils/request.js";
Page({
    data: {
        isFocus: false,
        inpValue: '',
        qingting: [],
        value: '',
        data: [],
        datass: []
    },
    TimeId: 1,
    onLoad() {
        this.qingting_list()
    },
    handleInput(e) {
        const { value } = e.detail;
        this.setData({
            value: e.detail.value
        })
        if (!value.trim()) {
            return;
        }
        clearTimeout(this.TimeId);
        this.TimeId = setTimeout(() => {
            this.qingting_list(value);
        }, 1000)
        this.setData({
            isFocus: true
        })
        this.qingting_list(value)
    },
    search() {
        this.qingting(this.data.value)
    },
    async qingting_list() {
        const res = await requestGet('https://m.xinli001.com/new-qingsu/qingting-list');

        this.setData({
            qingting: res.data
        })
    },
    handleCancel() {
        this.setData({
            inpValue: "",
            isFocus: false,
            datass: []
        })
    },
    qingting(datas) {
        this.setData({
            datass: [],
            data: [],
            value: ""
        })
        console.log(this.data.qingting[19].categorys);
        console.log(this.data.qingting[19].categorys.indexOf(datas));
        for (let i = 0; i < 20; i++) {
            if (this.data.qingting[i].categorys.indexOf(datas) !== -1) {
                this.setData({
                    data: this.data.qingting[i]
                })
                this.data.datass[this.data.datass.length] = this.data.qingting[i]
            }
        }
        this.setData({
            datass: this.data.datass
        })
    }


})