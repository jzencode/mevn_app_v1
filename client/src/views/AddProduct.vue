<template>
  <v-container>
    <h1>Add Product</h1>
    <v-breadcrumbs class="bcrumbs" :items="breadcrumbs">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item :href="item.href" :disabled="item.disabled">
          <span :style="`color:${item.color}`">
            {{ item.text }}
          </span>
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>

    <v-card class="v-card-add" elevation-1>
      <h3>Add New Product</h3>
      <v-divider></v-divider>

      <!-- inputs -->
      <v-card elevation-2>
        <v-form
          ref="form"
          @submit.prevent="submitForm"
          enctype="multipart/form-data"
        >
          <div class="inputs">
            <div>
              <v-text-field
                v-model="product.name"
                label="Product Name"
                clearable
                :rules="rules"
              ></v-text-field>
            </div>
            <div>
              <v-autocomplete
                v-model="product.category"
                :items="category"
                label="Category"
                :rules="rules"
              >
              </v-autocomplete>
            </div>
            
            <div>
              <v-text-field
                v-model="product.brand"
                label="Brand Name"
                clearable
                :rules="rules"
              ></v-text-field>
            </div>
            <div>
              <v-text-field
                v-model="product.unit"
                label="Unit Size"
                clearable
                :rules="rules"
              ></v-text-field>
            </div>
            <div>
              <v-text-field
                v-model="product.price"
                type="number"
                step="0.01"
                min="0"
                label="Price"
                clearable
                :rules="[...rules, ...rulesNegative]"
                @input="compute"
              ></v-text-field>
            </div>
            <div>
              <v-text-field
                v-model="product.qty"
                type="number"
                min="0"
                pattern="\d*"
                label="Quantity"
                clearable
                :rules="[...rules, ...rulesNegative]"
                @input="compute"
              ></v-text-field>
            </div>
            <div>
              <v-autocomplete
                v-model="product.status"
                :items="status"
                label="Status"
                :rules="rules"
              >
              </v-autocomplete>
            </div>
            <div>
              <v-file-input
                @change="selectFile"
                :rules="rules"
                show-size
                counter
                multiple
                label="Select Image"
              ></v-file-input>
            </div>
            <div>
              <v-text-field
                v-model="product.discountPerc"
                type="number"
                min="0"
                label="Discount(%)"
                clearable
                :rules="[...rules, ...rulesNegative]"
                @input="compute"
              ></v-text-field>
            </div>
            <div>
              <v-text-field
                v-model="product.discountPrice"
                type="number"
                min="0"
                label="Discount Price"
                :readonly="true"
                class="disabled"
              ></v-text-field>
            </div>
            <div>
              <v-text-field
                v-model="product.total"
                type="number"
                min="0"
                label="Total"
                :readonly="true"
                class="disabled"
              ></v-text-field>
            </div>
            <div>
              <v-text-field
                v-model="product.netPrice"
                type="number"
                min="0"
                label="Net Price"
                :readonly="true"
                class="disabled"
              ></v-text-field>
            </div>
          </div>
          <div class="button action">
            <v-btn type="submit" color="success">Save</v-btn>
            <v-btn :to="{ name: 'products' }" color="secondary">Cancel</v-btn>
          </div>
        </v-form>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
import API from '../api';

export default {
  name: 'addProduct',
  data() {
    return {
      breadcrumbs: [
        { text: 'Dashboard', disabled: false, href: '/', color: 'black' },
        {
          text: 'Products',
          disabled: false,
          href: '/product/list',
          color: 'black',
        },
        { text: 'Add Product', disabled: true, href: '', color: '#F57C00' },
      ],
      category: ['Fruits', 'Veggies', 'Meat', 'Fish', 'Dairy'],
      status: [
        'Active',
        'Pending',
        'Shipping',
        'In Progress',
        'Delivered',
        'Cancelled',
      ],
      rules: [(value) => !!value || 'This field is required!'],
      rulesNegative: [value => value >= 0 || 'It has to be >= 0'],
      product: {
        name: '',
        category: '',
        brand: '',
        unit: '',
        price: '',
        qty: '1',
        image: '',
        status: 'Active',
        discountPerc: '0',
        discountPrice: '',
        total: '',
        netPrice: '',
      },
      image: '',
    };
  },
  methods: {
    selectFile(file) {
      this.image = file[0];
    },
    async submitForm() {
      const formData = new FormData();
      formData.append('image', this.image);
      formData.append('name', this.product.name);
      formData.append('category', this.product.category);
      formData.append('brand', this.product.brand);
      formData.append('unit', this.product.unit);
      formData.append('price', this.product.price);
      formData.append('qty', this.product.qty);
      formData.append('status', this.product.status);
      formData.append('discountPerc', this.product.discountPerc);
      formData.append('discountPrice', this.product.discountPrice);
      formData.append('total', this.product.total);
      formData.append('netPrice', this.product.netPrice);
      if (this.$refs.form.validate()) {
        const res = await API.addProduct(formData);
        this.$router.push({
          name: 'products',
          params: { message: res.message },
        });
      }
    },
    compute() {
      this.product.total = this.product.price;
      this.product.qty = Math.floor(this.product.qty);
      this.product.total = this.product.qty * this.product.total
      this.product.netPrice = (this.product.total - (this.product.total * this.product.discountPerc / 100)).toFixed(2);
      this.product.discountPrice = ((this.product.total * this.product.discountPerc) / 100).toFixed(2);
      
    },
  },
};
</script>

<style scoped>

.inputs {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.inputs div {
  padding: 10px 0;
  min-width: 250px;
}

::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
