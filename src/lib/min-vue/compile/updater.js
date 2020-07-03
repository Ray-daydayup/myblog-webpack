export default {
  text(el, value) {
    el.textContent = typeof value === 'undefined' ? '' : value
  },
  innerHtml(el, value) {
    el.innerHTML = typeof value === 'undefined' ? '' : value
  },
  html(el, children) {
    el.innerHTML = ''
    el.appendChild(children)
  }
}
