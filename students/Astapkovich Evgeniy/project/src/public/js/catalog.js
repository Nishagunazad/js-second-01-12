import item from './catalog-item'

let catalog = {
    components: {item},
    template: `
        <div class="products">
            <item v-for="prod of filtered" :key="prod.id_product" :item="prod"></item>
        </div>`,
    data () {
        return {
            // url: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json',
            url: '/catalog',
            items: [],
            filtered: [],
        }
    },

    methods: {
        filter(searchString) {
            let reg = new RegExp(searchString, 'i');
            this.filtered = this.items.filter(item => reg.test(item.product_name));
        }
    },
    mounted() {
        this.$parent.getReq(this.url)
            .then (data => {
                this.items = data;
                this.filtered = data;
            })
    }
}

export default catalog;