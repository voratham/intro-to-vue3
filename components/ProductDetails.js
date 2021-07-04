app.component("product-details", {
  props: {
    details: {
      type: Array,
      required: true,
    },
  },
  template: /*html*/ `
  <p>Description</p>
      <ul>
        <li v-for="detail in details" :key="detail">{{ detail}}</li>
    </ul>
  `,
});
