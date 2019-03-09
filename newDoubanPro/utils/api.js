const BASE_URL = "https://douban.uieee.com";

// 正在上映的电影 get请求, 参数city , start, count
const NOW_SHOWING = BASE_URL + "/v2/movie/in_theaters";
// 即将上映的电影 get请求, 参数start, count
const COMING_SOON = BASE_URL + "/v2/movie/coming_soon";
// 新片榜电影 
const NEW_MOVIES = BASE_URL + "/v2/movie/new_movies";
// 豆瓣top250电影榜
const TOP250 = BASE_URL + "/v2/movie/top250";
// 电影条目信息
const DETAIL = BASE_URL + "/v2/movie/subject/";
// 封装请求
const get = ({
    url,
    data
}) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url,
            data,
            header: {
                'content-type': 'json'
            },
            success: (res) => {
                resolve(res)
            },
            fail: (erro) => {
                reject(erro);
            },
            complate() {

            }
        })
    })
}

const post = () => {

}


module.exports = {
    BASE_URL,
    NOW_SHOWING,
    COMING_SOON,
    NEW_MOVIES,
    TOP250,
    DETAIL,
    get
}