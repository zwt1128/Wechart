// pages/disscus/disscus.js
import { requestGet, requestPost, fabuURL } from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        datas: null,
        tit: null,
        dis: []
    },
    headleinput(e) {
        console.log(e);
        this.setData({
            datas: e.detail.value
        })
    },
    titleinput(e) {
        this.setData({
            tit: e.detail.value
        })
    },
    fabuData(e) {
        console.log(e);
        this.dissData(this.data.tit, this.data.datas)
    },
    async dissData(title, con) {
        const res = await requestPost(`http://yiapi.xinli001.com/fm/post-forum-thread.json?title=${title}&content=${con}&token=b845588abcf58804c99d289584cd6068&flag=0`)
        console.log(res);
        // const res = await requestGet(disUrl, { flag: 0, post_id: this.data.id, reply_user_id: 1, content: mess, token: b845588abcf58804c99d289584cd6068 })
        this.setData({
            dis: res,
        })
        if (this.data.dis.message == "发布成功") {
            wx.showToast({
                title: '发布成功',
                icon: 'success',
                mask: true,
                success: function() {
                    wx.navigateTo({
                        url: '/pages/commun/commun',
                    });
                },
            });
            this.setData({
                dis: [],
                datas: ""
            })

        } else {
            wx.showToast({
                title: '发布太频繁',
                icon: 'error',
                mask: true
            });
        }
    },

})