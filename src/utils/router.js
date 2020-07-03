/**
 * 获取跳转的目标路径
 * @param {String} url 路径
 * @param {Object} params 路径中的参数
 */
function getUrl(url, params) {
  let target = url
  if (params) {
    const paramArr = Object.keys(params).map((key) => `${key}=${params[key]}`)
    target = target + '?' + paramArr.join('&')
  }
  return target
}

function getParams(search) {
  if (!search) {
    return null
  }
  const params = {}
  const queryStr = search.substr(1)
  queryStr.split('&').forEach((item) => {
    setParams(...item.split('='))
  })
  return params

  function setParams(key, val) {
    params[key] = val
  }
}

class Router {
  constructor(window) {
    this.window = window
    this.location = window.location
    this.params = getParams(window.location.search)
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new this(window)
    }
    return this.instance
  }
  navTo(url, params) {
    if (!url) {
      return
    }
    const target = getUrl(url, params)
    this.location.href = target
  }
  open(url, params) {
    if (!url) {
      return
    }
    const target = getUrl(url, params)
    this.window.open(target)
  }
}
Router.instance = null
export default Router.getInstance()
