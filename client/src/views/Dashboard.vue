<template>
  <v-container>
    <h1>Dashboard</h1>
    <v-breadcrumbs class="bcrumbs" :items="breadcrumbs">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item :href="item.href" :disabled="item.disabled">
          <span :style="`color:${item.color}`">
            {{ item.text }}
          </span>
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
  </v-container>
</template>

<script>
export default {
  name: 'dashboard',
  data() {
    return {
      breadcrumbs: [
        { text: 'Dashboard', disabled: true, href: '', color: '#F57C00' },
      ],
    };
  },
};
</script>

<style scoped></style>
