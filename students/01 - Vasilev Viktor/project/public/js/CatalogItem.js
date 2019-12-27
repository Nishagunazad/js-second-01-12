Vue.component ('catalog-item', {
	template: `
		<div class="product-item">
			<img :src="image" alt="Some img">
	    <div class="desc">
	      <h3>{{ product.product_name }}</h3>
	      <p>{{ product.price }} $</p>
	      <button class="buy-btn"
	              @click="buyButtonHandler(product)"
	      >Купить</button>
	    </div>
    </div>
	`,
	props: ['product'],
	data() {
		return {
			image: 'https://placehold.it/200x150',
		};
	},
	methods: {
		buyButtonHandler(product) {
			const cart = this.$root.$refs.headercomp.$refs.cart;
			const currentItem = cart.getCurrentCartItem(product);
			currentItem ? cart.updateCartItem(currentItem, currentItem.quantity + 1) : cart.addProductToCart(product);
		},
	},
});
