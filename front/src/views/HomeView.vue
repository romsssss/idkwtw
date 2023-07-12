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
      <div class="subtitle">{{ $t("home.subtitle") }}</div>
      <h1 class="title">{{ $t("home.title") }}</h1>
      <div class="tagline">{{ $t("home.tagline") }}</div>
      <div class="cta-wrapper">
        <button class="btn btn-cta" role="link" @click="findMovie">
          {{ $t("home.ctaLabel") }}
          <i class="fa-solid fa-arrow-right"></i>
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

.subtitle{
  text-transform: uppercase;
  font-weight: bold;
  color: var(--color-secondary);
}

.tagline {
  font-style: italic;
  margin-bottom: 30px;
}
</style>
