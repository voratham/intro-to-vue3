app.component("product-display", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template: /*html*/ `<div class="product-display">
  <div class="product-container">
    <div class="product-image">
      <a :href="image">
        <img :class="[ !inStock ?  'out-of-stock-img' : '' ]" :src="image" alt="sock-image" />
      </a>
    </div>
    <div class="product-info">
      <h1>{{ title }}</h1>
      <p v-if="inStock > 10">In Stock</p> 
      <p v-else-if="inStock <= 10 && inStock > 0">Almost sold out!</p>
      <p v-else>Out of Stock</p>

      <p>Shipping: {{ shipping }}</p>
      <product-details :details="details"></product-details>
      <p>Variants</p>
      <ul>
        <li style="display:inline-block; margin-left: 1rem;" v-for="(variant,index) in variants" :key="variant.id"
          @mouseover="updateVariant(index)">
          <span>
            <div class="color-circle" :style="{backgroundColor: variant.color}"></div>
          </span>
        </li>
      </ul>
      <div style="display:flex;flex-direction:row;">
        <button style="flex:1;" class="button" v-on:click="addToCart" :class="{disabledButton : !inStock }" :disabled="!inStock">Add to Cart</button>
        <button style="flex:1;" class="button" v-on:click="removeToCart">Remove order</button>
      </div>
    </div>
  </div>
  <review-list v-if="reviews.length > 0" :reviews="reviews"></review-list>
  <review-form @review-submitted="addReview"></review-form>
</div>`,
  data() {
    return {
      cart: 0,
      brand: "Vue",
      product: "Socks",
      selectedVariant: 0,
      onSale: true,
      details: ["50% cotton", "30% wool", "20% polyester"],
      variants: [
        {
          id: 1,
          color: "green",
          image: "./assets/images/socks_green.jpg",
          quantity: 50,
        },
        {
          id: 2,
          color: "blue",
          image: "./assets/images/socks_blue.jpg",
          quantity: 10,
        },
      ],
      reviews: [],
    };
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].id);
    },
    removeToCart() {
      this.$emit("remove-to-cart", this.variants[this.selectedVariant].id);
    },
    updateVariant(index) {
      this.selectedVariant = index;
    },
    addReview(review) {
      this.reviews.push(review);
    },
  },
  computed: {
    title() {
      return `${this.brand} ${this.product} ${this.onSale ? "is on sale" : ""}`;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity;
    },
    shipping() {
      if (this.premium) {
        return "Free";
      } else {
        return 50;
      }
    },
  },
});
