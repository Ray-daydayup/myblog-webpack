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
    'div[class="abstract]>(div[class="note-tips]>(i[class="iconfont icon-time-circle]+h6[class="font-regular]{ 创建时间：$article.createtime:time$ -- 修改时间：$article.modifiedtime:time$}))+(a@click.stop=nav:article@[href="javascript:;,class="title]>h2{$article.title$})+div{$article.abstract$}+div[class="category-nav]>(div[class="level-item]>i[class="iconfont icon-folder]+a[href="javascript:;]@click.stop=navCategory:article@{$article.category$})+div[class="level-item]>i[class="iconfont icon-tags]+span>tags-link%item in article.tags%[:tag="item]',
  methods: {
    nav(article) {
      console.log(article)
    },
    navCategory(article) {
      console.log(article.category_id)
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
      console.log(tag)
    }
  }
}

export default [imgBox, noteTips, tagsLink, articleItem, articleList]
