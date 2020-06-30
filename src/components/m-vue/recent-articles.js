export default {
  name: 'recent-articles',
  template: 'a@click=nav:a@%item in b%{$item$}+test-a',
  data() {
    return {
      a: 1,
      b: [1, 2, 3]
    }
  },
  methods: {
    nav(a, e) {
      console.log(a, e)
    }
  }
}
