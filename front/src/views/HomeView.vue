<script setup lang="ts">
import { useRouter } from 'vue-router'
import { mainStore } from "@/stores/main";

const router = useRouter();
const store = mainStore();

async function findMovie() {
  const newSearchSessionUuid = await store.createSearchSession();
  router.push({ name: 'search_session', params: { uuid: newSearchSessionUuid }})
}
</script>

<template>
  <main>
      <h1>I Don't Know What To Watch</h1>
      <button @click="findMovie" role="link">Find a movie</button>
  </main>
</template>

<style scoped>
</style>
