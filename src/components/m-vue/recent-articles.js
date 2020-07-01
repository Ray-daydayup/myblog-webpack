export const recentArticles = {
  name: 'recent-articles',
  template: 'div>recent-articles-child%item in articles%[:article="item]'
}

export const recentArticlesChild = {
  name: 'recent-articles-child',
  template: 'a@click=nav:article@{$article.title$}',
  methods: {
    nav(a, e) {
      console.log(a, e)
    }
  }
}
