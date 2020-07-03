import '@/styles/iconfont.css'
import '@/styles/markdown.less'
import '@/styles/base.less'
import '@/styles/grid.less'
import '@/styles/detail.less'
import '@/utils/rem.js'
import '@/utils/fixed.js'

import MVue from '@/components/index'
import router from '@/utils/router.js'
import {
  getCount,
  getArticleList,
  getTagList,
  getCategories,
  getArticleById
} from '@/api/index.js'

MVue.router = router

markdownRender(4, window.markdownItIntegrated)
async function markdownRender(id, markdown) {
  const markdownBody = document.querySelector('#markdownBody')
  const res = await getArticleById(id)
  if (res.flag) {
    MVue.Event.emit('update-article', res.data)
    const content = res.data.content
    markdownBody.innerHTML = markdown.render(content)
    document.querySelector('#mask').style.display = 'none'
  }
}

const mVue = new MVue({
  el: '#app',
  data: {
    flag: {
      tag: 'tag',
      category: 'category'
    },
    count: {},
    recentArticles: [],
    categories: [],
    tags: [],
    article: {}
  },
  created() {
    this.getCount()
    this.getRecentArticles()
    this.getCategories()
    this.getTags()
    this.$event.on('update-article', this.setArticle, this)
  },
  methods: {
    setArticle(article) {
      this.article = article
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
mVue.render()
