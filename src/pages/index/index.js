import '@/styles/base.less'
import '@/styles/grid.less'
import '@/styles/iconfont.css'
import '@/styles/index.less'
import '@/lib/rem.js'

import MVue from '@/components/index'
import articleComponents from './article-list.js'
import loadMore from './load-more.js'
import {
  getCount,
  getArticleList,
  getTagList,
  getCategories
} from '@/api/index.js'

articleComponents.forEach((item) => {
  MVue.Component(item)
})
MVue.Component(loadMore)
const mVue = new MVue({
  el: '#app',
  data: {
    flag: {
      tag: 1,
      category: 2
    },
    pages: {
      text: '获取更多',
      currentPage: 0,
      pageSize: 1,
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
  },
  methods: {
    loadMore() {
      console.log()
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
      const res = await getArticleList(
        this.pages.currentPage + 1,
        this.pages.pageSize,
        true
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
      const res = await getArticleList(1, 5)
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
