<template>
  <v-alert
    :value="alert"
    border="left"
    type="success"
    transition="fade-transition"
    v-if="this.$route.params.message"
  >
    {{ this.$route.params.message }}
  </v-alert>
</template>

<script>
export default {
  data() {
    return {
      alert: true,
    };
  },
  created() {
    setTimeout(() => {
      this.alert = false;
    }, 5000);
  },
};
</script>
