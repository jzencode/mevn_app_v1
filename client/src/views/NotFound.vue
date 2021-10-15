<template>
  <v-container>
    <div class="notFound">
      <h1>Not Found</h1>
      <p>
        Oops! we couldn't find that. Go back
        <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
      </p>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'notFound',
  data() {
    return {};
  },
};
</script>

<style scoped>
.notFound {
  text-align: center;
}
</style>
