const searchList = {
  name: 'search-list',
  template:
    'div[class="card-container]>div[class="card-content category-card recent-articles]>h5{$text$}+div>recent-articles-child%item in articles%[:article="item]'
}

const linksBox = {
  name: 'links-box',
  template:
    'div[class="card-container]>div[class="card-content tags-card]>h4{$page$}+div@click=click@>links%item in items%[:tag="item]',
  methods: {
    click(e) {
      if (e.target.tagName === 'A') {
        this.$event.emit('search-list', e.target.dataset.id)
        const links = e.target.parentNode.querySelectorAll('a')
        links.forEach((item) => {
          item.classList.remove('current')
        })
        e.target.classList.add('current')
      } else {
        return
      }
    }
  }
}
const links = {
  name: 'links',
  template: 'a[href="javascript:;,data-id="$tag.id$]{$tag.name$}'
}

export default [links, searchList, linksBox]
