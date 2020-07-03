export const categoryCard = {
  name: 'category-card',
  template:
    'div>category-card-child%item in categories%[:category="item,:flag="flag]'
}

export const categoryCardChild = {
  name: 'category-card-child',
  template: 'a@click.stop=nav:category@{$category.name$}[href="javascript:;]',
  methods: {
    nav(a) {
      let target = './category.html'
      if (this.flag === 'tag') {
        target = './tag.html'
      }
      this.$router.navTo(target, {
        id: a.id
      })
    }
  }
}
