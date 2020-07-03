import MVue from '@/lib/min-vue/index.js'

import navStatistics from './m-vue/nav-statistics.js'
import { recentArticles, recentArticlesChild } from './m-vue/recent-articles.js'
import { categoryCard, categoryCardChild } from './m-vue/category-card.js'
import searchList from './m-vue/search-list.js'

const components = [
  ...searchList,
  navStatistics,
  recentArticlesChild,
  recentArticles,
  categoryCardChild,
  categoryCard
]

components.forEach((item) => {
  MVue.Component(item)
})

export default MVue
