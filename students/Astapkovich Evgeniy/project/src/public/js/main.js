import cart from './cart';
import catalog from './catalog';
import filtercomp from './filter';

let app = {
  el: '#app',
  components: {
    cart, catalog, filtercomp
  },
  methods: {
    getReq (url) {
      return fetch (url)
        .then (d => d.json())
    },

    postReq(url, data) {
      return fetch (url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then (d => d.json())
    },

    putReq(url, data) {
      return fetch (url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then (d => d.json())
    },

    deleteReq(url) {
      return fetch (url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then (d => d.json())
    }
  }
}

export default app;