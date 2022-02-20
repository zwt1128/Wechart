export function requestGet(url, data) {
    return new Promise((reslove, reject) => {
        wx.request({
            //请求地址
            url: url,
            //请求方式
            method: "get",
            //请求参数
            data: data,
            //设置请求头  如果发送的是post请求，一定要添加请求的content-type
            header: {
                "content-type": "application/json",
            },
            //请求返回结果的数据类型
            dataType: "json",
            //请求回调
            success: ({ statusCode, data }) => {
                if (statusCode === 200) {
                    reslove(data);
                } else {
                    reject("服务器响应出错");
                }
            },
            // 请求失败执行的回调函数
            fail: function(err) {
                reject(err)
            },
            // 接口调用结束的回调函数（调用成功、失败都会执行）
            complete: function(res) {},
        });
    });
}
export function requestPost(url, data) {
    return new Promise((reslove, reject) => {
        wx.request({
            //请求地址
            url: url,
            //请求方式
            method: "post",
            //请求参数
            data: data,
            //设置请求头  如果发送的是post请求，一定要添加请求的content-type
            header: {
                "content-type": "application/json",
            },
            //请求返回结果的数据类型
            dataType: "json",
            //请求回调
            success: ({ statusCode, data }) => {
                if (statusCode === 200) {
                    reslove(data);
                } else {
                    reject("服务器响应出错");
                }
            },
            // 请求失败执行的回调函数
            fail: function(err) {
                reject(err)
            },
            // 接口调用结束的回调函数（调用成功、失败都会执行）
            complete: function(res) {},
        });
    });
}
export var XinxiURL = "http://yiapi.xinli001.com/fm/diantai-new-list.json" //get请求
export var ListURL = "http://yiapi.xinli001.com/fm/newfm-list.json" //get请求
export var ClassUrl = "http://yiapi.xinli001.com/fm/category-jiemu-list.json?" //get请求
export var ShachUrl = "https://bapi.xinli001.com/fm2/broadcast_list.json/" //get请求
export var ShUrl = "http://bapi.xinli001.com/fm2/broadcast_list.json/" //get请求
export var commUrl = "http://yiapi.xinli001.com/fm/forum-thread-list.json" //get请求
export var pinglunUrl = "http://yiapi.xinli001.com/fm/forum-comment-list.json" //get请求
export var disUrl = "http://yiapi.xinli001.com/fm/post-forum-comment.json" //get请求
export var fabuUrl = "http://yiapi.xinli001.com/fm/post-forum-thread.json" //get请求



export var SlidesURL = "https://locally.uieee.com/categories"
export var CategoryesURL = "https://m.xinli001.com/new-qingsu/qingting-index"
export var CategoryshopsURL = "https://m.xinli001.com/new-qingsu/qingting-list"
export var ShopDetailURL = "https://m.xinli001.com/new-qingsu/rate-list"
export var TarberURL = "https://zhishi.fhd001.com/classifyQ/getQuestionsByClassifyIdAndOrder"


export var SlideURL = "http://bapi.xinli001.com/fm2/broadcast_list.json/?offset=0&speaker_id=0&tag=%E6%8A%91%E9%83%81%E7%97%87%E6%98%AF%E6%9D%A1%E9%BB%91%E7%8B%97&rows=10&key=046b6a2a43dc6ff6e770255f57328f89" //GET请求
export var Found = "http://yiapi.xinli001.com/fm/newfm-list.json"


export var zhuobox_h = "http://yiapi.xinli001.com/fm/diantai-comment.json"
export var zhuboxlei = "http://yiapi.xinli001.com/fm/diantai-comment-list.json" //FM播放-主播详情-留言列表
export var more_diantai = "http://yiapi.xinli001.com/fm/diantai-page.json?key=046b6a2a43dc6ff6e770255f57328f89" //更多电台  
export var zhubojiemu = "http://yiapi.xinli001.com/fm/diantai-jiemu-list.json" //电台详情--节目列表 
export var per = "http://yiapi.xinli001.com/fm/comment-latest-list.json" //歌单评论  get http://yiapi.xinli001.com/fm/comment-latest-list.json?offset=0&broadcast_id=99389004&limit=10&key=046b6a2a43dc6ff6e770255f57328f89
export var category = "http://yiapi.xinli001.com/fm/category-jiemu-list.json" // FM文章 GET请求
export var zhubo = "http://yiapi.xinli001.com/fm/diantai-new-list.json" //更多电台更多主播  get http://yiapi.xinli001.com/fm/diantai-new-list.json?offset=0&limit=10&key=046b6a2a43dc6ff6e770255f57328f89
export var zhuoxiangqing = "http://yiapi.xinli001.com/fm/diantai-detai.json" //电台详情
export var music = "http://yiapi.xinli001.com/fm/broadcast-detail.json" // 播放页http://yiapi.xinli001.com/fm/broadcast-detail.json?id=99389004&key=046b6a2a43dc6ff6e770255f57328f89
export var fmcomment = "http://yiapi.xinli001.com/fm/post-comment.json" //fm评论
export var diantcomment = "http://yiapi.xinli001.com/fm/diantai-comment.json" //电台评论