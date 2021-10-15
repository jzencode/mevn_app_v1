<template>
  <v-container>
    <h1>Product</h1>
    <v-breadcrumbs class="bcrumbs" :items="breadcrumbs">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item :href="item.href" :disabled="item.disabled">
          <span :style="`color:${item.color}`">
            {{ item.text }}
          </span>
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>

    <v-text-field v-model="product.name"> </v-text-field>
  </v-container>
</template>

<script>
import API from '../api';

export default {
  name: 'product',
  data() {
    return {
      product: {},
      breadcrumbs: [
        { text: 'Dashboard', disabled: false, href: '/', color: 'black' },
        {
          text: 'Products',
          disabled: false,
          href: '/product/list',
          color: 'black',
        },
        { text: 'Product', disabled: true, color: '#F57C00' },
      ],
    };
  },
  async beforeRouteEnter(to, from, next) {
    try {
      const res = await API.getProductByID(to.params.id);
      next((vm) => {
        vm.product = res;
      });
    } catch (error) {
      next({ name: 'notFound', params: { '0': to.path } });
    }
  },
  // async created() {
  // },
};
</script>
