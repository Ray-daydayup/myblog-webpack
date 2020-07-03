import { timestampFormat } from '@/utils/time.js'
const noteTips = {
  name: 'note-tips',
  template:
    'div[class="abstract]>(div[class="note-tips]>(i[class="iconfont icon-time-circle]+h6[class="font-regular]{ 创建时间：$article.createtime:time$ -- 修改时间：$article.modifiedtime:time$}))+(a[href="javascript:;,class="title]>h2{$article.title$})+div[class="category-nav]>(div[class="level-item]>i[class="iconfont icon-folder]+a[href="javascript:;]@click.stop=navCategory:article@{$article.category$})+div[class="level-item]>i[class="iconfont icon-tags]+span>tags-link%item in article.tags%[:tag="item]',
  methods: {
    navCategory(article) {
      const target = './category.html'
      this.$router.navTo(target, {
        id: article.category_id
      })
    },
    time(val) {
      return timestampFormat(val)
    }
  }
}

const tagsLink = {
  name: 'tags-link',
  template: 'a[href="javascript:;]@click.stop=navTag:tag@{$tag.name$}',
  methods: {
    navTag(tag) {
      const target = './tag.html'
      this.$router.navTo(target, {
        id: tag.tagId
      })
    }
  }
}

export default [noteTips, tagsLink]
