import MVue from '@/lib/min-vue/index.js'

import navStatistics from './m-vue/nav-statistics.js'
import { recentArticles, recentArticlesChild } from './m-vue/recent-articles.js'
import { categoryCard, categoryCardChild } from './m-vue/category-card.js'

MVue.Component(navStatistics)
MVue.Component(recentArticlesChild)
MVue.Component(recentArticles)
MVue.Component(categoryCardChild)
MVue.Component(categoryCard)

export default MVue
