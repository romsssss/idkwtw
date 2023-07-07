<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <router-link to="/" custom v-slot="{ navigate }">
      <button @click="navigate" role="link">IDKWTW</button>
    </router-link>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  border: 1px solid red;
}

main {
  border: 1px solid green;
}
</style>
