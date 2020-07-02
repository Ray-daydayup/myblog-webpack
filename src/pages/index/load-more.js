export default {
  name: 'load-more',
  template:
    'div[class="card-container]>div[class="card-content get-more]>a@click=test@[href="javascript:;]{$pages.text$}',
  methods: {
    test() {
      console.log(this.pages)
      // this.fn()
    }
  }
}
