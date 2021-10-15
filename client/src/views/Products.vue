<template>
  <v-container>
    <h1>Products</h1>
    <v-breadcrumbs class="bcrumbs" :items="breadcrumbs">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item :href="item.href" :disabled="item.disabled">
          <span :style="`color:${item.color}`">
            {{ item.text }}
          </span>
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>

    <div class="button">
      <v-btn color="primary" :to="{ name: 'addProduct' }">
        Add Product
      </v-btn>
    </div>
    <Alert />
    <v-card class="elevation-2">
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="products"
        :search="search"
        :header-props="{ sortIcon: null }"
      >
        <template
          v-for="header in headers.filter((header) =>
            header.hasOwnProperty('formatter')
          )"
          v-slot:[`item.${header.value}`]="{ header, value }"
        >
          {{ header.formatter(value) }}
        </template>

        <template v-slot:item.image="{ item }">
          <img :src="`/${item.image}`" />
        </template>

        <template v-slot:item.status="{ item }">
          <v-chip :color="getColor(item.status)">
            <span class="white--text">{{ item.status }}</span>
          </v-chip>
        </template>

        <template v-slot:item.index="{ index }">
          {{ index + 1 }}
        </template>

        <template v-slot:item.action="{ item }">
          <v-icon class="px-1" @click="editProduct(item._id)">
            mdi-pencil
          </v-icon>

          <v-icon class="px-1" @click="deleteProduct(item._id)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import API from '../api';

export default {
  components: {
    Alert: () => import('../components/Alert.vue'),
  },
  name: 'products',
  data() {
    return {
      products: [],
      search: '',
      headers: [
        { text: '#', value: 'index' },
        { text: 'Image', value: 'image' },
        { text: 'Name', value: 'name', width: '180px' },
        { text: 'Category', value: 'category' },
        { text: 'Brand', value: 'brand', width: '100px' },
        { text: 'Unit', value: 'unit', width: '80px' },
        { text: 'Price', value: 'price', formatter: this.formatCurrency },
        { text: 'Qty', value: 'qty' },
        {
          text: 'Discount(%)',
          value: 'discountPerc',
          formatter: this.formatPerc,
        },
        {
          text: 'Discount',
          value: 'discountPrice',
          formatter: this.formatCurrency,
        },
        { text: 'Total', value: 'total', formatter: this.formatCurrency },
        {
          text: 'Net Price',
          value: 'netPrice',
          formatter: this.formatCurrency,
        },
        { text: 'Status', value: 'status' },
        { text: 'Action', value: 'action', sortable: false, width: '100px' },
      ],
      breadcrumbs: [
        { text: 'Dashboard', disabled: false, href: '/', color: 'black' },
        { text: 'Products', disabled: true, href: '', color: '#F57C00' },
      ],
    };
  },
  methods: {
    formatCurrency(value) {
      return '$' + value;
    },
    formatPerc(value) {
      return value + '%';
    },
    getColor(status) {
      if (status === 'Active') return 'blue';
      if (status === 'Pending') return 'grey';
      if (status === 'In Progress') return 'orange';
      if (status === 'Shipping') return 'purple';
      if (status === 'Delivered') return 'green';
      if (status === 'Cancelled') return 'red';
    },
    editProduct(id) {
      this.$router.push({ name: 'editProduct', params: { id: id } });
      // console.log(id);
    },
    async deleteProduct(id) {
      if (confirm('Do you really want to delete?')) {
        await API.removeProduct(id);
        this.products = await API.getAllProducts();
      }
    },
  },

  async created() {
    this.products = await API.getAllProducts();
  },
};
</script>

<style scoped></style>
