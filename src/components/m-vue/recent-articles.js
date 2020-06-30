export default {
  name: 'recent-articles',
  template: 'a@click=nav:a@%item in b%{$item$}+nav-statistics[:count="count]',
  data() {
    return {
      a: 1,
      b: [1, 2, 3],
      count: {
        articleCount: 0,
        tagCount: 0,
        categoryCount: 100
      }
    }
  },
  methods: {
    nav(a, e) {
      this.count = {
        articleCount: 10,
        tagCount: 0,
        categoryCount: 100
      }
    }
  }
}
