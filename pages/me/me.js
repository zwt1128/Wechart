Page({
    data: {
        words: ["登录体验更多>"],
        userInfo: [],
        isLogin: false,
        token: []
    },
    handleContact(e) {
        console.log(e.detail);
    },
    onLoad() {
        console.log(this.data.isLogin);
    },
    onShow() {
        var token = wx.getStorageSync('token')
        var isLogin = wx.getStorageSync('isLogin')
        this.setData({
            token,
            isLogin
        })
        this.panduan(isLogin, token)
    },
    handleAdd() {
        let isLogin = false
        var token = wx.getStorageSync('token')
        console.log(token);
        console.log(this.data.isLogin);
        if (!isLogin) {
            this.setData({
                isLogin: true,
            })
            console.log(this.data.isLogin);
            wx.getUserProfile({
                desc: '用于完善会员资料',
                success: (res) => {
                    //用户授权登录
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true,
                        token: res.userInfo
                    })
                    console.log(res);
                    //将数据缓存到本地
                    wx.setStorageSync('token', res.userInfo)
                    wx.setStorageSync('isLogin', true)

                },
                fail: (err) => {},
                complete: () => {}
            })

        }

    },
    panduan(isLogin, token) {
        if (!token) {
            this.setData({
                isLogin: false,
                token: []
            })
        }
    }
})