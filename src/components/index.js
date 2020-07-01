import MVue from '@/lib/min-vue/index.js'

import navStatistics from './m-vue/nav-statistics.js'
import { recentArticles, recentArticlesChild } from './m-vue/recent-articles.js'

MVue.Component(navStatistics)
MVue.Component(recentArticlesChild)
MVue.Component(recentArticles)

export default MVue
