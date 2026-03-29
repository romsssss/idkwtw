<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHead, useSeoMeta } from '@unhead/vue'
import { mainStore } from '@/stores/main'
import { useAsyncAction } from '@/composables/useAsyncAction'
import LoadingButton from '@/components/LoadingButton.vue'
import { COLLECTION_BY_SLUG } from '@/data/collections'

const route = useRoute()
const router = useRouter()
const store = mainStore()
const { isLoading, run } = useAsyncAction()

const collection = computed(() => COLLECTION_BY_SLUG[route.params.slug as string])

useHead({
  title: computed(() => collection.value?.seoTitle ?? "I Don't Know What To Watch")
})
useSeoMeta({
  description: computed(() => collection.value?.metaDescription ?? '')
})

async function startSession() {
  await run(async () => {
    const uuid = await store.createSearchSession()
    await store.updateSearchSession(uuid, {
      public: collection.value.scenario,
      genres: collection.value.genres
    })
    const proposalUuid = await store.createProposal(uuid)
    router.push({ name: 'proposal', params: { uuid: proposalUuid } })
  })
}
</script>

<template>
  <main v-if="collection" class="collection-main">
    <div class="collection-content">
      <div class="collection-hero">
        <h1 class="title">{{ collection.title }}</h1>
        <p class="description">{{ collection.description }}</p>
      </div>

      <div v-if="collection.movies.length > 0" class="movie-grid">
        <a
          v-for="movie in collection.movies"
          :key="movie.tconst"
          :href="`https://www.imdb.com/title/${movie.tconst}/`"
          target="_blank"
          rel="noopener noreferrer"
          class="movie-card"
        >
          <div class="movie-poster">
            <img
              v-if="movie.posterUrl"
              :src="movie.posterUrl"
              :alt="movie.primary_title"
              loading="lazy"
            />
            <div v-else class="movie-poster-placeholder">
              <span>{{ movie.primary_title }}</span>
            </div>
          </div>
          <div class="movie-info">
            <span class="movie-title">{{ movie.primary_title }}</span>
            <span class="movie-meta">
              {{ movie.start_year }}
              <template v-if="movie.director">&nbsp;·&nbsp;{{ movie.director }}</template>
            </span>
            <p v-if="movie.plot" class="movie-plot">{{ movie.plot }}</p>
          </div>
        </a>
      </div>

      <div class="collection-cta">
        <LoadingButton variant="cta" :loading="isLoading" @click="startSession">
          {{ collection.ctaLabel }}
          <i class="fa-solid fa-arrow-right"></i>
        </LoadingButton>
      </div>

      <nav class="related-collections" aria-label="More collections">
        <span class="related-label">You might also like:</span>
        <RouterLink
          v-for="slug in collection.related"
          :key="slug"
          :to="{ name: 'collection', params: { slug } }"
          class="related-link"
        >
          {{ COLLECTION_BY_SLUG[slug]?.title ?? slug }}
        </RouterLink>
      </nav>
    </div>
  </main>
</template>

<style scoped>
.collection-main {
  --color-text-dark-1: #D0D0D0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.collection-content {
  width: 100%;
  max-width: 1200px;
  padding: 30px 20px;
}

.collection-hero,
.collection-cta {
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.collection-hero {
  text-align: center;
  margin-bottom: 32px;
}

.title {
  font-size: 1.6em;
  margin-bottom: 12px;
}

.description {
  color: var(--color-text-dark-1);
  font-size: 1em;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 48px;
}

@media (max-width: 900px) {
  .movie-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 600px) {
  .movie-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.collection-cta {
  text-align: center;
  padding: 32px 0;
  margin-bottom: 56px;
}

.movie-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s;
}

.movie-card:hover {
  transform: scale(1.03);
}

.movie-card:hover .movie-poster img {
  filter: brightness(1.1);
}

.movie-poster {
  aspect-ratio: 2 / 3;
  border-radius: 6px;
  overflow: hidden;
  background: var(--color-background-soft);
}

.movie-poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.movie-poster-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  text-align: center;
  font-size: 0.85em;
  color: var(--color-text-dark-1);
}

.movie-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.movie-title {
  font-size: 0.95em;
  font-weight: 600;
  line-height: 1.3;
}

.movie-meta {
  font-size: 0.85em;
  color: var(--color-text-dark-1);
}

.movie-plot {
  font-size: 0.85em;
  color: var(--color-text-dark-1);
  line-height: 1.4;
  margin: 0;
}

.related-collections {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 0.9em;
}

.related-label {
  color: var(--color-text-dark-1);
}

.related-link {
  padding: 6px 14px;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  text-decoration: none;
  color: inherit;
  transition: background 0.15s;
}

.related-link:hover {
  background: var(--color-background-soft);
}
</style>
