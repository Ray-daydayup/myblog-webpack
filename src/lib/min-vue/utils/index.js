/**
 * Define a property.
 */
export function def(...args) {
  const [obj, key, val, enumerable = false] = args
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: enumerable,
    writable: true,
    configurable: true
  })
}

/**
 * 比较两个对象是否相等
 */
export function isEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}
/**
 * 获取变量路径
 * @param {String} expPath 变量路径
 */
export function parsePath(expPath) {
  let path = expPath
  if (path.indexOf('[')) {
    path = path.replace(/\[/g, '.')
    path = path.replace(/\]/g, '.')
    if (/\.$/.test(path)) {
      path = path.slice(0, path.length - 1)
    }
    if (/\.\./.test(path)) {
      path = path.replace('..', '.')
    }
  }
  const bailRE = /[^\w.$]/
  if (bailRE.test(path)) {
    return
  }
  // console.log(expPath, 'here')
  const segments = path.split('.')
  return function (object) {
    let obj = object
    for (let i = 0; i < segments.length; i++) {
      if (typeof obj === 'undefined') return ''
      let exp = segments[i]
      obj = obj[exp]
    }
    if (typeof obj === 'undefined') return ''
    return obj
  }
}

export function proxyProps(option) {
  const { cMVue, mVue, key, exp } = option
  Object.defineProperty(cMVue, key, {
    configurable: false,
    enumerable: true,
    get: function () {
      const getter = parsePath(exp)
      const val = getter.call(mVue, mVue)
      return val
    }
  })
}

export function convertNamingFormat(name) {
  let key = name
  if (/-/.test(key)) {
    const keyArr = key.split('-')
    for (let i = 1; i < keyArr.length; i++) {
      const element = keyArr[i]
      keyArr[i] = element.replace(element[0], element[0].toUpperCase())
    }
    key = keyArr.join('')
  }
  return key
}

export function proxy(data, mVue) {
  const me = mVue
  // console.log(Object.keys(data))
  Object.keys(data).forEach(function (key) {
    Object.defineProperty(me, key, {
      configurable: false,
      enumerable: true,
      get: function () {
        return me.data[key]
      },
      set: function (newVal) {
        me.data[key] = newVal
      }
    })
  })
}
