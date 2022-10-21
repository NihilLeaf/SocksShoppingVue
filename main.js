Vue.component('product', {
    props: {
        premiun: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
            <div class="product-image">
                <img v-bind:src="image" alt="Green Socks">
            </div>
            <div class="product-info">
                <h1>{{title}}</h1>
                <p v-show="inStock">In Stock</p>
                <p v-show="!inStock" :class="{ outOfStock: !inStock } ">Out of Stock</p>
                <p>Shiping: {{shiping}}</p>

                <ul class="details">
                    <li v-for="detail in details">{{detail}}</li>
                </ul>

                <div class="variants" v-for="(variant, index) in variants" :key="variant.variantId" id="color-box" v-bind:style="{ backgroundColor: variant.variantColor }" @mouseover="updateProduct(index)">
                </div>

                <button class="cart-button" v-on:click="addToCart" :disabled="!inStock" :class="{ disableButton: !inStock }">Add to cart</button>

            </div>
        </div>
    `,
    data() {
        return {
        brand: 'Vue Mastery',
        product: 'Socks',
        selectedVariant: 0,
        details: ['80% cotton', '20% polyester', 'Gender-Natural'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: './img/vmSocks-green-onWhite.jpg',
                variantQuantanty: 10

            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: './img/vmSocks-blue-onWhite.jpg',
                variantQuantanty: 0
            }
        ]
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart')
        },
        updateProduct(index) {
            this.selectedVariant = index
            console.log(index)
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantanty
        },
        shiping() {
            if (this.premiun) {
                return 'Free'
            }
            else {
                return '$2.00'
            }
        }
    }
})

let app = new Vue({
    el: '#app',
    data: {
        premiun: true,
        cart: 0
    },
    methods: {
        updateCart() {
            this.cart += 1
        }
    }
})