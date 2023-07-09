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
  <main class="main-flex">
    <div class="main-flex-content">
      <h1 class="title">I Don't Know What To Watch</h1>
      <p class="subtext">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <div class="cta-wrapper">
        <button class="btn btn-cta" role="link" @click="findMovie">
          Find a movie <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.cta-wrapper {
  text-align: right;
}

.title {
  font-weight: bold;
  font-size: 3em;
  margin-bottom: 20px;
}

.subtext {
  font-style: italic;
  margin-bottom: 30px;
}
</style>
