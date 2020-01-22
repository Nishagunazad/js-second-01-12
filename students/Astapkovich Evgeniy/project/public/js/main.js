
let app = new Vue ({
  el: '#app',
  methods: {
    getJSON: function (url) {
      return fetch (url)
              .then (d => d.json())
    },
  }
})