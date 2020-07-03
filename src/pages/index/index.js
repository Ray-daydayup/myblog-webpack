import '@/styles/base.less'
import '@/styles/grid.less'
import '@/styles/iconfont.css'
import '@/styles/markdown.less'
import '@/styles/index.less'
import '@/utils/rem.js'
import '@/utils/fixed.js'

import MVue from '@/components/index'
import router from '@/utils/router.js'
import articleComponents from './article-list.js'
import loadMore from './load-more.js'
import {
  getCount,
  getArticleList,
  getTagList,
  getCategories
} from '@/api/index.js'

MVue.router = router

articleComponents.forEach((item) => {
  MVue.Component(item)
})
MVue.Component(loadMore)
const mVue = new MVue({
  el: '#app',
  data: {
    flag: {
      tag: 'tag',
      category: 'category'
    },
    pages: {
      text: '获取更多',
      currentPage: 0,
      pageSize: 5,
      more: true
    },
    count: {},
    recentArticles: [],
    categories: [],
    tags: [],
    articles: []
  },
  created() {
    this.getCount()
    this.getRecentArticles()
    this.getCategories()
    this.getTags()
    this.getArticles()
    this.$event.on('load-more', this.getArticles, this)
  },
  methods: {
    loadMore() {
      console.log('出发了', this.flag)
    },
    async getCount() {
      const res = await getCount()
      if (res.flag) {
        this.count = res.data
      }
    },
    async getArticles() {
      if (!this.pages.more) {
        return
      }
      this.pages.currentPage++
      const res = await getArticleList(
        this.pages.currentPage,
        this.pages.pageSize,
        true,
        { articleState: 1 }
      )
      if (res.flag) {
        if (res.data.length < this.pages.pageSize) {
          this.pages.more = false
          this.pages.text = '没有更多了'
        }
        this.articles.push(...res.data)
      }
    },
    async getRecentArticles() {
      const res = await getArticleList(1, 10, false, { articleState: 1 })
      if (res.flag) {
        this.recentArticles = res.data
      }
    },
    async getCategories() {
      const res = await getCategories()
      if (res.flag) {
        this.categories = res.data
      }
    },
    async getTags() {
      const res = await getTagList()
      if (res.flag) {
        this.tags = res.data
      }
    }
  }
})
mVue.render(() => {
  document.querySelector('#mask').style.display = 'none'
})
