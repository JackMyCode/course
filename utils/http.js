/**
 *   封装http  请求方法
 */
import login from "../pages/auth/login";

// const apiUrl = 'https://course.ahbsh.top/';
const apiUrl = 'https://api.course.ahbsh.top/';
// const apiUrl = 'http://192.168.0.103:8080';
export const http = (params) => {
    let portUrl = params.url;
    let re = /https/;
    if (!re.test(portUrl)) {
        portUrl = apiUrl + params.url
    }
    return new Promise((resolve, reject) => {
        uni.getNetworkType({
            success: res => {
                let network = res.networkType;
                if (network == '4g' || network == '3g' || network == 'wifi' || network == '2g') {
                    uni.request({
                        url: portUrl,
                        data: params.data,
                        header: params.header || {
                            'Content-Type': 'application/json',
                            "X-Access-Token": wx.getStorageSync("token")
                        },
                        method: params.method || "POST", //默认post 请求
                        success: res => {

                            if (res.statusCode == 200) {
                                resolve(res)
                            } else if (res.statusCode == 500) {
                                uni.clearStorageSync();
                                uni.navigateTo({
                                    url: '/pages/auth/login'
                                });
                            }
                            uni.hideLoading();
                        },
                        fail: function (e) {
                            uni.showModal({
                                'title': '提示',
                                'content': '检测网络异常,请稍后重试~',
                                'showCancel' : false
                            })
                            reject(e);
                            uni.hideLoading();
                        }
                    })
                } else {
                    uni.showModal({
                        'title': '提示',
                        'content': '检测网络异常,请稍后重试~',
                        'showCancel' : false
                    })
                    resolve({
                        data: {
                            "code": 404,
                            "message": "网络飞走啦~"
                        }
                    });
                }
            },
            fail: function (err) {
                uni.showModal({
                    'title': '提示',
                    'content': '检测网络异常,请稍后重试~',
                    'showCancel' : false
                })
                resolve({
                    data: {
                        "code": 404,
                        "message": "检测网络异常,请稍后重试~"
                    }
                });
            }
        })
    })
}

// 单次上传图片
export const httpAvater = (params) => {
    return new Promise((resolve, reject) => {
        uni.getNetworkType({
            success: res => {
                let network = res.networkType;
                if (network == '4g' || network == '3g' || network == 'wifi' || network == '2g') {
                    uni.showLoading();
                    uni.uploadFile({
                        url: apiUrl + params.url,
                        filePath: params.data,
                        name: 'file',
                        formData: {
                            biz: params.type
                        },
                        success: (res) => {
                            uni.hideLoading();
                            if (res.statusCode == 200) {
                                let str = res.data;
                                let obj = JSON.parse(str);
                                let filUrl = obj.message
                                resolve(filUrl);

                            } else {

                            }

                        },
                        fail: function (e) {
                            reject(e);
                            uni.hideLoading();
                        }
                    })
                } else {
                    resolve({
                        data: {
                            "code": 404,
                            "message": "网络飞走啦~"
                        }
                    });
                }
            },
            fail: function (err) {
                resolve({
                    data: {
                        "code": 404,
                        "message": "检测网络异常,请稍后重试~"
                    }
                });
            }
        })
    })
}
