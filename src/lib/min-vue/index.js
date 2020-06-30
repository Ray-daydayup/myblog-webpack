import observe from './observer/index'
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
    Object.assign(this, methods)
    created && created.call(this)
    if (el) {
      this.elSelector = el
      // this.render()
    }
  }
  static Component(options) {
    const { name, template } = options
    const component = new Component(name, template)
    if (!MVue.Components[name]) {
      MVue.Components[name] = { options, component }
    }
  }
  render() {
    const elSelector = this.elSelector
    const app = document.querySelector(elSelector)
    Object.keys(MVue.Components).forEach((name) => {
      const els = app.querySelectorAll(name)
      if (els.length > 0) {
        const { options, component } = MVue.Components[name]
        els.forEach((element) => {
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
  }
}
MVue.Components = {}
