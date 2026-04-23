<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'
import { useRouter } from 'vue-router'
import { mainStore } from '@/stores/main'
import { useAsyncAction } from '@/composables/useAsyncAction'
import LoadingButton from '@/components/LoadingButton.vue'
import { COLLECTIONS } from '@/data/collections'

const router = useRouter()
const store = mainStore()
const { t } = useI18n()
const { isLoading, run } = useAsyncAction()

useHead({
  link: [{ rel: 'canonical', href: 'https://idontknowwhattowatch.com/' }]
})

async function findMovie() {
  await run(async () => {
    const newSearchSessionUuid = await store.createSearchSession()
    router.push({ name: 'search_session', params: { uuid: newSearchSessionUuid } })
  })
}
</script>

<template>
  <main class="main-flex">
    <div class="main-flex-content">
      <div class="subtitle">{{ t('home.subtitle') }}</div>
      <h1 class="title">{{ t('home.title') }}</h1>
      <div class="tagline">{{ t('home.tagline') }}</div>
      <div class="cta-wrapper">
        <LoadingButton variant="cta" :loading="isLoading" role="link" @click="findMovie">
          {{ t('home.ctaLabel') }}
          <i class="fa-solid fa-arrow-right"></i>
        </LoadingButton>
      </div>

    </div>

    <details class="collections">
      <summary class="collections-summary">{{ t('home.collectionsTitle') }}</summary>
      <nav class="collections-content" aria-label="Movie collections">
        <template v-for="(collection, i) in COLLECTIONS" :key="collection.slug">
          <RouterLink
            :to="{ name: 'collection', params: { slug: collection.slug } }"
            class="collection-link"
          >{{ collection.title }}</RouterLink><span v-if="i < COLLECTIONS.length - 1" class="separator"> · </span>
        </template>
      </nav>
    </details>
  </main>
</template>

<style scoped>
.main-flex {
  flex-direction: column;
}

.main-flex-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.cta-wrapper {
  text-align: right;
}

.title {
  font-weight: bold;
  font-size: 3em;
  margin-bottom: 20px;
}

.subtitle {
  text-transform: uppercase;
  font-weight: bold;
  color: var(--color-secondary);
}

.tagline {
  font-style: italic;
  margin-bottom: 30px;
}

.collections {
  margin-top: auto;
  padding: 20px;
  max-width: 700px;
  text-align: center;
}

.collections-summary {
  font-size: 0.8em;
  text-transform: uppercase;
  font-weight: bold;
  color: var(--color-secondary);
  cursor: pointer;
  list-style: none;
}

.collections-summary::-webkit-details-marker {
  display: none;
}

.collections-summary::marker {
  content: '';
}

.collections-content {
  margin-top: 12px;
  font-size: 0.8em;
  line-height: 1.8;
}

.separator {
  color: var(--color-text-dark-1, #999);
}

.collection-link {
  text-decoration: none;
  color: var(--color-text-dark-1, #999);
  transition: color 0.15s;
}

.collection-link:hover {
  color: var(--color-secondary);
}
</style>
