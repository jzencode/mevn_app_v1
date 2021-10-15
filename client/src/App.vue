<template>
  <v-app id="inspire">
    <v-navigation-drawer dark v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            ZenCode
          </v-list-item-title>
          <v-list-item-subtitle>
            MEVN Full Stack App
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list flat>
        <v-list-item
          v-for="(item, i) in menu2"
          :key="i"
          :to="item.link"
          link
          color="orange darken-2"
        >
          <v-list-item-icon>
            <v-icon v-text="item.action"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group
          v-for="item in menu3"
          :key="item.title"
          :prepend-icon="item.action"
          no-action
          color="orange darken-2"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.items"
            :key="child.title"
            :to="child.link"
            link
          >
            <v-list-item-content>
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar dark app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>CRUD Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import Footer from './components/Footer.vue';

export default {
  components: {
    Footer,
  },
  data: () => ({
    drawer: null,
    menu2: [{ action: 'mdi-gauge', title: 'Dashboard', link: '/' }],
    menu3: [
      {
        action: 'mdi-store',
        title: 'Products',
        items: [
          { title: 'All Products', link: '/product/list' },
          { title: 'Add Product', link: '/product/create' },
        ],
      },
    ],
  }),
};
</script>

<style>
h1 {
  font-weight: 400;
  margin-bottom: 15px;
}

h2,
h3 {
  padding: 10px 0;
  font-weight: 400;
}

.bcrumbs {
  font-size: 12px;
  background: #65b1942a;
}

a {
  text-decoration: none;
}

img {
  height: 40px;
  width: 40px;
}

.button {
  padding: 15px 0;
}

.action .v-btn {
  margin-left: 1rem;
}

.v-data-table {
  margin-bottom: 20px;
}

.disabled {
  pointer-events: none;
}

.v-card-add {
  margin: 15px 0;
}

h3 {
  padding-left: 1rem;
}

/* @media only screen and (max-width: 600px) {
  body {
    min-height: 100vh;
  }
}

@media only screen and (min-width: 600px) {
  body {
    min-height: 100vh;
  }
} */
</style>
