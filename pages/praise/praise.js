// pages/praise/praise.js
Page({
    data: {
        heart:"♥",
        praiseData:[],
    },
    onLoad: function (options) {
        this.getPraise() 
    },
   async getPraise(){
       const result = await  wx.request({
           url: 'http://bapi.xinli001.com/fm2/favorite_list.json/?offset=0&user_id=1004261911&rows=10&key=046b6a2a43dc6ff6e770255f57328f89',
           data: {},
           header: {'content-type':'application/json'},
           method: 'GET',
           dataType: 'json',
           responseType: 'text',
           success: (result)=>{
               this.setData({
                 praiseData:result.data.data
               })
               console.log(result);           
           },
           fail: ()=>{},
           complete: ()=>{}
       });
     },
     onReady: function (e) {
        // 使用 wx.createAudioContext 获取 audio 上下文 context
        this.audioCtx = wx.createAudioContext('myAudio')
      },

})