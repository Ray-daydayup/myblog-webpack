import '@/styles/base.less'
import '@/styles/grid.less'
import '@/styles/iconfont.css'
import '@/utils/rem.js'
import '@/utils/fixed.js'

import MVue from '@/components/index'
import router from '@/utils/router.js'
import {
  getCount,
  getArticleList,
  getTagList,
  getCategories
} from '@/api/index.js'

MVue.router = router

const mVue = new MVue({
  el: '#app',
  data: {
    flag: {
      tag: 'tag',
      category: 'category'
    },
    page: '分类',
    count: {},
    tipText: '',
    recentArticles: [],
    searchArticles: [],
    categories: [],
    tags: []
  },
  created() {
    this.getCount()
    this.getRecentArticles()
    this.getCategories()
    this.getTags()
    this.getSearchArticles()
    this.$event.on('search-list', this.getSearchArticles, this)
  },
  methods: {
    async getSearchArticles(id) {
      let option = { articleState: 1 }
      if (id) {
        option.categoryId = Number(id)
      } else {
        const params = this.$router.params
        if (params) {
          option.categoryId = Number(params.id)
        }
      }
      const res = await getArticleList(1, 100, false, option)
      if (res.flag) {
        this.searchArticles = res.data
        this.tipText = ''
        if (res.data.length === 0) {
          this.tipText = '没有找到该分类的文章'
        }
      }
    },
    async getCount() {
      const res = await getCount()
      if (res.flag) {
        this.count = res.data
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
