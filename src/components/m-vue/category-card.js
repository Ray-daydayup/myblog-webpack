export const categoryCard = {
  name: 'category-card',
  template:
    'div>category-card-child%item in categories%[:category="item,:flag="flag]'
}

export const categoryCardChild = {
  name: 'category-card-child',
  template: 'a@click.stop=nav:category@{$category.name$}[href="javascript:;]',
  methods: {
    nav(a, e) {
      console.log(this.flag)
      console.log(a, e)
    }
  }
}
