export default {
  text(el, value) {
    el.textContent = typeof value === 'undefined' ? '' : value
  },

  html(el, children) {
    el.innerHTML = ''
    el.appendChild(children)
  }
}
