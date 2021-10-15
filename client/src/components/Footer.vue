<template>
  <v-footer padless>
    <v-col class="text-center footer">
      {{ new Date().getFullYear() }} — <strong>ZenCode</strong>
      <v-icon>mdi-code-braces-box</v-icon>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style>
.footer {
  background: rgba(104, 104, 104, 0.178);
  color: rgb(34, 34, 34);
}
</style>
