import '@/styles/base.less'
import '@/styles/grid.less'
import '@/styles/iconfont.css'
import '@/styles/index.less'
import '@/lib/rem.js'

import MVue from '@/components/index'
import { getCount, getArticleList, getTagList } from '@/api/index.js'

setTimeout(() => {
  document.querySelector('#mask').style.display = 'none'
}, 1000)
const mVue = new MVue({
  el: '#app',
  data: {
    count: {},
    recentArticles: []
  },
  created() {
    this.getCount()
    this.getRecentArticles()
    getTagList()
  },
  methods: {
    async getCount() {
      const res = await getCount()
      if (res.flag) {
        this.count = res.data
      }
    },
    async getRecentArticles() {
      const res = await getArticleList(1, 5)
      if (res.flag) {
        this.recentArticles = res.data
      }
    }
  }
})
mVue.render()
