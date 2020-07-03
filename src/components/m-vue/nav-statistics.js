export default {
  name: 'nav-statistics',
  template:
    'nav[class="row nav-statistics]>(a[href="./index.html,class="col-4-sm]>h6[class="font-regular]{文章}+h2[class="font-regular]{$count.articleCount$})+(a[href="./category.html,class="col-4-sm]>h6[class="font-regular]{分类}+h2[class="font-regular]{$count.categoryCount$})+(a[href="./tag.html,class="col-4-sm]>h6[class="font-regular]{标签}+h2[class="font-regular]{$count.tagCount$})'
}
