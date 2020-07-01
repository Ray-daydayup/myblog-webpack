import { parsePath, proxyProps, convertNamingFormat } from '../utils/index'
import Watcher from '../observer/watcher.js'
import MVue from '../index.js'
import updater from '../compile/updater'

export class ElementCompiler {
  constructor(mVue, str, tagName) {
    this.el = document.createElement(tagName)
    this.mVue = mVue
    this.propsMatched = str.match(/\[(.+?)\]/)
    this.textMatched = str.match(/\{(.+?)\}/)
    this.eventMatched = str.match(/@(.+?)\@/)
  }
  init() {
    this.props()
    this.el.textContent = this.text(true)
    this.event()
    return this.el
  }
  props() {
    if (this.propsMatched && /="/.test(this.propsMatched[1])) {
      this.propsMatched[1].split(',').forEach((item) => {
        const [key, exp] = item.split('="')
        if (/:/.test(key)) {
          console.log(key)
        } else {
          this.el.setAttribute(key, exp)
        }
      })
    }
  }
  text(isFirst = false) {
    if (this.textMatched) {
      let textContent = this.textMatched[1]
      const expMatched = textContent.match(/\$(.+?)\$/g)
      if (expMatched) {
        expMatched.forEach((item) => {
          const exp = item.slice(1, item.length - 1)
          if (isFirst) {
            new Watcher(this.mVue, exp, (newVal, oldVal) => {
              updater.text(this.el, this.text())
            })
          }
          const getter = parsePath(exp)
          const val = getter.call(this.mVue, this.mVue)
          textContent = textContent.replace(item, val)
        })
      }
      return textContent
    }
  }
  event() {
    if (this.eventMatched) {
      let [eventName, fn] = this.eventMatched[1].split('=')
      let isStop = false
      let params = []
      // 判断是否阻止事件冒泡
      if (/\./.test(eventName)) {
        eventName = eventName.split('.')[0]
        isStop = true
      }
      if (/:/.test(fn)) {
        ;[fn, ...params] = fn.split(':')
      }
      this.el.addEventListener(eventName, (e) => {
        params = params.map((item) => {
          if (this.mVue[item]) {
            const getter = parsePath(item)
            return getter.call(this.mVue, this.mVue)
          }
          return item
        })
        params.push(e)
        this.mVue[fn](...params)
        if (isStop) {
          e.stopPropagation()
        }
        e.preventDefault()
      })
    }
  }
}

export class ComponentCompiler {
  constructor(mVue, str, tagName) {
    this.tagName = tagName
    // this.el = el
    this.mVue = mVue
    this.propsMatched = str.match(/\[(.+?)\]/)
  }
  init() {
    const { options, component } = MVue.Components[this.tagName]
    const mVue = new MVue(options)
    if (this.propsMatched) {
      this.propsMatched[1].split(',').forEach((item) => {
        const [key, exp] = item.split('="')
        if (/:/.test(key)) {
          proxyProps({
            cMVue: mVue,
            mVue: this.mVue,
            key: convertNamingFormat(key.slice(1)),
            exp: exp
          })
        }
      })
    }
    return component.createComponent(mVue)
  }
}