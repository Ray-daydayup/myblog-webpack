export default {
  name: 'test-a',
  template: 'a@click=nav:a@%item in b%{$a$}',
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
