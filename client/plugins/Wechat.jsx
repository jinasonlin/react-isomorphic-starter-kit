
import { fetchJson } from '../fetch'
import loadJS from '../loadJS'

let isReady = false

export const config = (options) => {
  const { debug, jsApiList, ready } = options

  loadJS('//res.wx.qq.com/open/js/jweixin-1.0.0.js', () => {
    fetchJson({
      // url: `http://wechat.zhongan.com/Dev_8XUA0HY/open/lijingzhao/index.php?r=ajax/jsSign`,
      url: `/api/wechat/open/index.php?r=ajax/jsSign`,
      // url: `//wechat.zhongan.com/open/index.php?r=ajax/jsSign`,
      // mode: 'cors',
      type: 'post',
      data: {
        gzh: 'zaHealth',
        url: location.href
      },
      success: (data) => {
        const result = data.result
        wx.config({
          debug: debug || __DEBUG__,
          appId: result.appid,
          timestamp: result.timestamp,
          nonceStr: result.noncestr,
          signature: result.signature,
          jsApiList: jsApiList,
          fail: (res) => {
            alert(JSON.stringify(res))
          }
        })

        wx.ready(() => {
          isReady = true
        })
      }
    })
  })
}

export const ready = (func) => {
  setTimeout(() => {
    if (isReady) {
      func && func(wx)
    } else {
      ready(func)
    }
  }, 0)
}

