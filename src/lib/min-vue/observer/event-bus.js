export default class EventBus {
  constructor() {
    this.events = {}
  }
  on(key, cb, self = null) {
    this.events[key] = {
      handler: cb,
      self: self
    }
  }
  off(key) {
    delete this.events[key]
  }
  emit(key, ...args) {
    if (this.events[key]) {
      const { handler, self } = this.events[key]
      handler.apply(self, args)
    }
  }
}
