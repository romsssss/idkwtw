<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { mainStore } from '@/stores/main'
import { searchSessionPublics } from '@/models/search_session.model'

const router = useRouter()
const route = useRoute()
const store = mainStore()

const mode = ref('public')

const searchSessionUuid = route.params.uuid as string
const searchSession = computed(() => store.getSearchSessionByUuid(searchSessionUuid))
const genres = [
  'Drama',
  'Documentary',
  'Comedy',
  'Romance',
  'Crime',
  'Action',
  'Thriller',
  'Adventure',
  'Biography',
  'Family',
  'History',
  'Music',
  'Mystery',
  'Horror',
  'Fantasy',
  'War',
  'Musical',
  'Animation',
  'Sport',
  'Sci-Fi',
  'Western'
]

onMounted(async () => {
  await fetchData()
})

async function fetchData() {
  if (!searchSession.value) {
    await store.fetchSearchSession(searchSessionUuid)
  }
}

async function savePublic(item: string) {
  await store.updateSearchSession(searchSession.value?.uuid, { public: item })
}

async function saveGenres() {
  const selectedGenresCheckboxes = document.querySelectorAll('input[name="genres"]:checked')
  const selectedGenres = [...selectedGenresCheckboxes].map((genre) => (genre as HTMLInputElement).value)
  await store.updateSearchSession(searchSession.value?.uuid, { genres: selectedGenres })
}

async function startProposals() {
  const newProposalUuid = await store.createProposal(searchSession.value?.uuid)
  router.push({ name: 'proposal', params: { uuid: newProposalUuid } })
}

function setMode(m: string) {
  mode.value = m
}
</script>

<template>
  <main class="main-flex">
    <div v-if="mode === 'public'" class="main-flex-content">
      <h2 class="title">
        {{ $t('searchSession.public.title') }}
      </h2>
      <div class="subtitle"></div>
      <div class="form-container">
        <div v-for="item in searchSessionPublics" :key="item" class="option-wrapper-full-width">
          <div class="btn btn-option">
            <label :for="item">
              <span>{{ $t(`searchSession.public.label.${item}`) }}</span>
              <input
                :id="item"
                type="radio"
                name="public"
                :value="item"
                :checked="searchSession?.public === item"
                @change="savePublic(item)"
              />
              <i class="fa-solid fa-check"></i>
            </label>
          </div>
        </div>
      </div>
      <div class="cta-wrapper">
        <button class="btn btn-cta" role="link" @click="setMode('genres')">
          {{ $t('general.next') }}
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>

    <div v-if="mode === 'genres'" class="main-flex-content">
      <h2 class="title">
        {{ $t('searchSession.genres.title') }}
      </h2>
      <div class="subtitle">
        {{ $t('searchSession.genres.subtitle') }}
      </div>
      <div class="form-container">
        <div v-for="genre in genres" :key="genre" class="option-wrapper-half-width">
          <div class="btn btn-option">
            <label :for="genre">
              <span>
                <i
                  v-if="$t(`searchSession.genres.icon.${genre}`)"
                  class="fa-solid"
                  :class="$t(`searchSession.genres.icon.${genre}`)"
                ></i>
                {{ $t(`searchSession.genres.label.${genre}`) }}
              </span>
              <input
                :id="genre"
                type="checkbox"
                name="genres"
                :value="genre"
                :checked="searchSession?.genres && searchSession?.genres.includes(genre)"
                @change="saveGenres()"
              />
              <i class="fa-solid fa-check"></i>
            </label>
          </div>
        </div>
      </div>
      <div class="cta-wrapper">
        <button class="btn btn-cta" role="link" @click="startProposals">
          {{ $t('searchSession.startSearching') }}
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.subtitle {
  margin-bottom: 20px;
  font-size: 0.9em;
  color: var(--color-text-dark-1);
}
.form-container {
  display: flex;
  /* justify-content: center; */
  flex-wrap: wrap;
  margin-bottom: 30px;
}
.option-wrapper-half-width {
  flex: 50%;
  flex-grow: 0;
}

.option-wrapper-full-width {
  flex: 100%;
  flex-grow: 0;
}
.cta-wrapper {
  text-align: center;
}
</style>
