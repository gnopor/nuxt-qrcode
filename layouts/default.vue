<template>
  <v-app>
    <v-app-bar app> </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
