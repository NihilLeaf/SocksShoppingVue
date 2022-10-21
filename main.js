var eventBus = new Vue()

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

            <product-tabs :reviews="reviews"></product-tabs>

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
        ],
        reviews: []
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
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
    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
    }
})

Vue.component('product-review', {
    template: `
    <form class="form" @submit.prevent="onSubmit">

    <p v-if="errors.length">
        <b>Please correct the error(s):</b>
        <ul>
            <li v-for="error in errors"> {{error}} </li>
        </ul>
    </p>

    <p>
        <label>Name: </label>
        <input id="name" class="input-review" placeholder="Name" v-model="name"></input>
    </p>
    <p>
        <label>Review: </label>
        <textarea id="review" class="input-review" placeholder="Review this product" v-model="review"></textarea>
    </p>
    <p>
        <label>Rating: </label>
        <select class="select" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>
    </p>

    <p>
        <input class="submit" type="submit" value="submit"></input>
    </p>

    </form>
    `,
    data(){
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                eventBus.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
            }
            else {
                if (!this.name) this.errors.push('Name Required')
                if (!this.review) this.errors.push('Review Required')
                if (!this.rating) this.errors.push('Rating Required')
            }
        }
    }
})

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: `

        <div>
        <div class="tabDiv">
        <span :class="{activeTab: selectedTab === tab}" class="tab" v-for="(tab, index) in tabs" :key="index"
        @click="selectedTab = tab">{{tab}}</span>
        </div>
        <div class="reviewsList" v-show="selectedTab === 'Reviews'">
            <h2>Reviews: </h2>
            <p v-if="reviews.length==0">No reviews yet</p>
            <ul reviewUl>
                <li v-for="review in reviews">
                <p>User: {{review.name}}</p>
                <p>Review: {{review.review}}</p>
                <p>Rating: {{review.rating}}</p>
                </li>
            </ul>
        </div>
        <product-review v-show="selectedTab === 'Make a Review'"></product-review>
        </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: 'Review'
        }
    }

})

let app = new Vue({
    el: '#app',
    data: {
        premiun: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        }
    }
})