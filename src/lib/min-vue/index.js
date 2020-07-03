import observe from './observer/index'
import EventBus from './observer/event-bus'
import Component from './compile/index'
import { convertNamingFormat, proxyProps, proxy } from './utils/index'

export default class MVue {
  constructor(options) {
    const { el, data, methods, created } = options
    if (data) {
      this.data = typeof data === 'function' ? data() : data
      proxy(this.data, this)
      observe(this.data)
    }
    this.$event = MVue.Event
    if (MVue.router) {
      this.$router = MVue.router
    }
    Object.assign(this, methods)
    // created访问不到props
    created && created.call(this)
    if (el) {
      this.elSelector = el
    }
  }
  static async Component(options) {
    const { name, template } = options
    const component = new Component(name, template)
    if (!MVue.Components[name]) {
      MVue.Components[name] = { options, component }
    }
  }
  async render(callback) {
    const elSelector = this.elSelector
    const app = document.querySelector(elSelector)
    Object.keys(MVue.Components).forEach((name) => {
      const els = app.querySelectorAll(name)
      if (els.length > 0) {
        const { options, component } = MVue.Components[name]
        // 异步渲染
        els.forEach(async (element) => {
          const mVue = new MVue(options)
          if (element.attributes.length > 0) {
            const attributes = [...element.attributes]
            attributes.forEach((item) => {
              proxyProps({
                cMVue: mVue,
                mVue: this,
                key: convertNamingFormat(item.localName.slice(1)),
                exp: item.nodeValue
              })
            })
          }
          element.parentNode.replaceChild(
            component.createComponent(mVue),
            element
          )
        })
      }
    })
    if (callback) {
      callback()
    }
  }
}
MVue.Components = {}
MVue.Event = new EventBus()
