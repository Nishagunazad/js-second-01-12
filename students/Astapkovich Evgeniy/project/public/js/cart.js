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
            return {sum, qua};
        }
    },

    methods: {
        addProduct(product) {
            this.$parent.getJSON(this.addURL)
              .then(ans => {
                if (ans.result === 1) {
                  let find = this.items.find(item => item.id_product === product.id_product)
      
                  if (find) {
                    find.quantity++
                  } else {
                    this.items.push(Object.assign({}, product, { quantity: 1 }))
                  }
                }
              })
        },

        delProduct (product) {
            this.$parent.getJSON (this.delURL)
                  .then( ans => {
                    if (ans.result) {
                      let find = this.items.find (item => item.id_product === product.id_product)
      
                      if (find.quantity > 1) {
                        find.quantity--
                      } else {
                        this.items.splice (this.items.indexOf(find), 1)
                      }
                    }
                  })
        }
    },
    
    mounted() {
        this.$parent.getJSON(this.url)
            .then((data) => {
                this.items = data.contents;
            })
    }
})