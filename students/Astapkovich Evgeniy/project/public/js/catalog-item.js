Vue.component('catalog-item', {
    template: `
            <div class="product-item">
                <img :src="image" alt="Image">
                <div class="desc">
                    <h3>{{ item.product_name }}</h3>
                    <p>{{ item.price }} р.</p>
                    <button class="buy-btn" @click="$root.$refs.cart.addProduct(item)">Купить</button>
                </div>
            </div>
    `,
    props: {
        image: {
            type: String,
            default: () => 'https://placehold.it/200x150'
        },
        item: {
            type: Object,
            default: () => ({})
        }
    }
})