import { timestampFormat } from '@/utils/time.js'
const articleList = {
  name: 'article-list',
  template:
    'article[class="article-list]>article-item%item in articles%[:article="item]'
}
const articleItem = {
  name: 'article-item',
  template:
    'div[class="card-container]>div[class="card-content]>img-box+note-tips[:article="article]'
}
const imgBox = {
  name: 'img-box',
  template:
    'div[class="img-box]>img[src="https://picsum.photos/1440/900/?random=$math$]',
  data() {
    return {
      math: Math.random().toString().substr(3)
    }
  }
}

const noteTips = {
  name: 'note-tips',
  template:
    'div[class="abstract]>(div[class="note-tips]>(i[class="iconfont icon-time-circle]+h6[class="font-regular]{ 创建时间：$article.createtime:time$ -- 修改时间：$article.modifiedtime:time$}))+(a@click.stop=nav:article@[href="javascript:;,class="title]>h2{$article.title$})+div[class="markdown-body,style="padding: 0;]^article.abstract:markdown^+div[class="category-nav]>(div[class="level-item]>i[class="iconfont icon-folder]+a[href="javascript:;]@click.stop=navCategory:article@{$article.category$})+div[class="level-item]>i[class="iconfont icon-tags]+span>tags-link%item in article.tags%[:tag="item]',
  methods: {
    nav(article) {
      this.$router.navTo('./detail.html', {
        id: article.article_id
      })
    },
    navCategory(article) {
      const target = './category.html'
      this.$router.navTo(target, {
        id: article.category_id
      })
    },
    time(val) {
      return timestampFormat(val)
    },
    markdown(val) {
      const content = window.markdownItIntegrated.render(val)
      return content
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

export default [imgBox, noteTips, tagsLink, articleItem, articleList]
