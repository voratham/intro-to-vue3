const app = Vue.createApp({
  data() {
    return {
      cart: 0,
      brand: "Vue",
      product: "Socks",
      selectedVariant: 0,
      onSale: true,
      details: ["50% cotton", "30% wool", "20% polyester"],
      sizes: ["S", "M", "L", "XL"],
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
          quantity: 0,
        },
      ],
    };
  },
  methods: {
    addToCart() {
      this.cart += 1;
    },
    removeToCart() {
      if (this.cart === 0) return;
      this.cart -= 1;
    },
    updateVariant(index) {
      this.selectedVariant = index;
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
  },
});
