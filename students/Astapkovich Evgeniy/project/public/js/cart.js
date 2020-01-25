Vue.component('cart', {
  template: `
            <div class="cart-wrapper">        
                <button class="btn-cart" @click="isVisibleCart = !isVisibleCart" type="button">Корзина</button>
                <div class="cart-block" v-show="isVisibleCart">
                    <div v-show="cartIsEmpty">
                        Корзина пуста...
                    </div>
                    <cart-item v-for="prod of items" :key="prod.id_product" :item="prod"></cart-item>
                    <p v-show="!cartIsEmpty">Всего товаров: {{ getSum.qua }}</p>
                    <p v-show="!cartIsEmpty">Общая стоимость: {{ getSum.sum }} руб.</p>
                </div>
            </div>`,
  data() {
    return {
      // url: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json',
      url: '/cart',
      addURL: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/addToBasket.json',
      delURL: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/deleteFromBasket.json',
      items: [],
      isVisibleCart: false
    }
  },

  computed: {
    cartIsEmpty() {
      return !Boolean(this.items.length)
    },

    getSum() {
      let sum = 0;
      let qua = 0;
      this.items.forEach(el => {
        sum += el.price * el.quantity;
        qua += el.quantity;
      });
      return { sum, qua };
    }
  },

  methods: {
    addProduct(product) {
      let find = this.items.find(item => item.id_product === product.id_product)
      if (find) {
        this.$parent.putReq('/cart' + product.id_product, {q: 1})
          .then((d) => {
            d.result ? find.quantity++ : console.log('error')
          })
        
      } else {
        let p = Object.assign({}, product, { quantity: 1});
        this.$parent.postReq('/cart', p)
          .then (this.items.push(p))
          .catch(err => console.log(err))
        
      }
    },

    delProduct(product) {
      let find = this.items.find(item => item.id_product === product.id_product)
      if (find.quantity > 1) {
        this.$parent.putReq('/cart' + product.id_product, {q: -1})
          .then((d) => {
            d.result ? find.quantity-- : console.log('error')
          })
        
      } else {
        this.$parent.deleteReq('/cart' + product.id_product)
          .then (this.items.splice(this.items.indexOf(product), 1))
          .catch(err => console.log(err))
      }
    }
  },

  mounted() {
    this.$parent.getReq(this.url)
      .then((data) => {
        this.items = data.contents;
      })
  }
})