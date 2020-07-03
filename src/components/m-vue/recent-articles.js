export const recentArticles = {
  name: 'recent-articles',
  template: 'div>recent-articles-child%item in articles%[:article="item]'
}

export const recentArticlesChild = {
  name: 'recent-articles-child',
  template: 'a@click.stop=nav:article@{$article.title$}[href="javascript:;]',
  methods: {
    nav(article) {
      this.$router.navTo('./detail.html', {
        id: article.article_id
      })
    }
  }
}
