<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <router-link to="/" custom v-slot="{ navigate }">
      <button @click="navigate" role="link" class="btn btn-logo">
        IDKWTW
      </button>
    </router-link>
  </header>

  <RouterView />
</template>

<style scoped>
</style>
