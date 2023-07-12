<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <router-link v-slot="{ navigate }" to="/" custom>
      <button role="link" class="btn btn-logo" @click="navigate">IDKWTW</button>
    </router-link>
  </header>

  <RouterView />
</template>

<style scoped></style>
