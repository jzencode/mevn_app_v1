import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard';
import Products from '../views/Products';
import Product from '../views/Product';
import AddProduct from '../views/AddProduct';
import EditProduct from '../views/EditProduct';
import NotFound from '../views/NotFound';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
  },
  {
    path: '/product/list',
    name: 'products',
    component: Products,
  },
  {
    path: '/product/list/:id',
    name: 'product',
    component: Product,
  },
  {
    path: '/product/create',
    name: 'addProduct',
    component: AddProduct,
  },
  {
    path: '/product/edit/:id',
    name: 'editProduct',
    component: EditProduct,
  },
  {
    path: '*',
    name: 'notFound',
    component: NotFound ,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});


export default router;
