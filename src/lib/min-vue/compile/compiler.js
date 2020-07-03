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
    this.htmlMatched = str.match(/\^(.+?)\^/)
    this.eventMatched = str.match(/@(.+?)\@/)
  }
  init() {
    this.props()
    this.el.textContent = this.text(true)
    const inHtml = this.innerHtml(true)
    if (inHtml) {
      this.el.innerHTML = inHtml
    }
    this.event()
    return this.el
  }
  props() {
    if (this.propsMatched && /="/.test(this.propsMatched[1])) {
      this.propsMatched[1].split(',').forEach((item) => {
        let [key, exp] = item.split('="')
        if (/\$/.test(exp)) {
          let textContent = exp
          const expMatched = textContent.match(/\$(.+?)\$/g)
          if (expMatched) {
            expMatched.forEach((item) => {
              const exp = item.slice(1, item.length - 1)
              const getter = parsePath(exp)
              const val = getter.call(this.mVue, this.mVue)
              textContent = textContent.replace(item, val)
            })
            exp = textContent
          }
        }
        this.el.setAttribute(key, exp)
      })
    }
  }
  text(isFirst = false) {
    if (this.textMatched) {
      let textContent = this.textMatched[1]
      const expMatched = textContent.match(/\$(.+?)\$/g)
      if (expMatched) {
        expMatched.forEach((item) => {
          let exp = item.slice(1, item.length - 1)
          let fn = null
          if (/:/.test(exp)) {
            ;[exp, fn] = exp.split(':')
          }
          if (isFirst) {
            new Watcher(this.mVue, exp, (newVal, oldVal) => {
              updater.text(this.el, this.text())
            })
          }
          const getter = parsePath(exp)
          let val = getter.call(this.mVue, this.mVue)
          if (fn) {
            val = this.mVue[fn](val)
          }
          textContent = textContent.replace(item, val)
        })
      }
      return textContent
    }
  }
  innerHtml(isFirst = false) {
    let val = ''
    if (this.htmlMatched) {
      let exp = this.htmlMatched[1]
      let fn = null
      if (/:/.test(exp)) {
        ;[exp, fn] = exp.split(':')
      }
      if (isFirst) {
        new Watcher(this.mVue, exp, (newVal, oldVal) => {
          updater.innerHtml(this.el, this.innerHtml())
        })
      }
      const getter = parsePath(exp)
      val = getter.call(this.mVue, this.mVue)
      if (fn) {
        val = this.mVue[fn](val)
      }
    }
    return val
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
      const mVue = this.mVue
      this.el.addEventListener(eventName, function (e) {
        // 引用类型，必须新建，否则参数会越来越多
        const newParams = params.map((item) => {
          if (mVue[item]) {
            const getter = parsePath(item)
            return getter.call(mVue, mVue)
          }
          return item
        })
        newParams.push(e)
        mVue[fn](...newParams)
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
