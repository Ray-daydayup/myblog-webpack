export default {
  name: 'load-more',
  template:
    'div[class="card-container]>div[class="card-content get-more]>a@click=loadMore@[href="javascript:;]{$pages.text$}',
  methods: {
    loadMore() {
      this.$event.emit('load-more')
    }
  }
}
