export const recentArticles = {
  name: 'recent-articles',
  template: 'div>recent-articles-child%item in articles%[:article="item]'
}

export const recentArticlesChild = {
  name: 'recent-articles-child',
  template: 'a@click.stop=nav:article@{$article.title$}[href="javascript:;]',
  methods: {
    nav(a, e) {
      console.log(a, e)
    }
  }
}
