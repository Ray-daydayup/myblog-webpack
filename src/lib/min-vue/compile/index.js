import { parsePath } from '../utils/index'
import Watcher from '../observer/watcher.js'
import MVue from '../index.js'
import updater from '../compile/updater'

import { ElementCompiler, ComponentCompiler } from './compiler.js'

export default class Component {
  constructor(name, str) {
    this.name = name
    this.str = str
    this.mVue = null
  }
  createComponent(mVue) {
    this.mVue = mVue
    const fragment = this.createFragment(this.str)
    this.mVue = null
    return fragment
  }
  createFragment(string) {
    let str = string
    const operators = []
    const pointers = []
    const fragment = document.createDocumentFragment()
    let pointer = fragment
    pointers.push(pointer)
    while (str !== '') {
      const firstCharacter = str[0]
      if (/[a-z]/.test(firstCharacter)) {
        const elStr = str.match(/[^>+()]+/)[0]
        str = str.replace(elStr, '')
        console.log()
        const el = createElements(elStr, this.mVue, pointer)
        calculate(el)
      } else {
        str = str.replace(firstCharacter, '')
        operators.push(firstCharacter)
        if (firstCharacter === '(') {
          const partFragment = document.createDocumentFragment()
          pointers.push(pointer)
          pointer = partFragment
          pointers.push(pointer)
        }
        if (firstCharacter === ')') {
          operators.pop()
          const part = pointers.pop()
          pointer = pointers.pop()
          calculate(part)
        }
      }
    }
    return fragment

    function calculate(element) {
      let template = null
      if (element.toString().indexOf('DocumentFragment') !== -1) {
        template = element.children[element.children.length - 1]
      }
      if (operators.length === 0) {
        pointer.appendChild(element)
        if (template) {
          pointer.appendChild(template)
          pointer = template
        } else {
          pointer = element
        }
        return
      }
      const preOperator = operators[operators.length - 1]
      if (preOperator === '>' || preOperator === '(') {
        pointer.appendChild(element)
        if (template) {
          pointer.appendChild(template)
          pointer = template
        } else {
          pointer = element
        }
        operators.pop()
      }
      if (preOperator === '+') {
        pointer.parentNode.appendChild(element)

        if (template) {
          pointer.parentNode.appendChild(template)
          pointer = template
        } else {
          pointer = element
        }
        operators.pop()
      }
    }
  }
}
// let i = 0
/**
 * 列表渲染只能渲染组件而且外面必须有包裹，即它前面的运算符为 '>'
 * @param  {...any} args elStr mVue pointer
 */
function createElements(...args) {
  const [str, mVue, pointer] = args
  // console.log(str)

  const tagName = str.match(/(\w|-)+/)[0]
  if (MVue.Components[tagName]) {
    const directiveMatched = str.match(/%(.+?)\%/)
    if (directiveMatched) {
      const [itemExp, parentExp] = directiveMatched[1].split(' in ')
      new Watcher(mVue, parentExp, (newVal, oldVal) => {
        updater.html(pointer, cycleBind(str, mVue, tagName, itemExp, parentExp))
      })
      return cycleBind(str, mVue, tagName, itemExp, parentExp)
    }
    return new ComponentCompiler(mVue, str, tagName).init()
  }

  return new ElementCompiler(mVue, str, tagName).init()
}

function cycleBind(...args) {
  const [str, mVue, tagName, itemExp, parentExp] = args
  const fragment = document.createDocumentFragment()
  const propsMatched = str.match(/\[(.+?)\]/)
  if (!propsMatched) {
    return fragment
  }

  const getter = parsePath(parentExp)
  const val = getter.call(mVue, mVue)
  if (!Array.isArray(val)) {
    return fragment
  }

  for (let i = 0; i < val.length; i++) {
    const newExp = parentExp + '.' + i
    let props = propsMatched[0].replace(itemExp, newExp)
    const newElStr = str.replace(propsMatched[0], props)
    fragment.appendChild(new ComponentCompiler(mVue, newElStr, tagName).init())
  }
  return fragment
}
