export default class Dep {
  constructor() {
    this.subs = []
  }
  addSub(sub) {
    this.subs.push(sub)
  }
  notify(isArrayMethod = false) {
    this.subs.forEach(function (sub) {
      sub.update(isArrayMethod)
    })
  }
}

Dep.target = null
