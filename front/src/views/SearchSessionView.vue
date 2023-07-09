<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { mainStore } from "@/stores/main";
import { searchSessionPublics } from '@/models/search_session.model';

const router = useRouter();
const route = useRoute();
const store = mainStore();

const mode = ref('public');

const searchSessionUuid = route.params.uuid as string;
const searchSession = computed(() => store.getSearchSessionByUuid(searchSessionUuid));

const genres = ['Drama', 'Documentary', 'Comedy', 'Romance', 'Crime', 'Action', 'Thriller', 'Adventure', 'Biography', 'Family', 'History', 'Music', 'Mystery', 'Horror', 'Fantasy', 'War', 'Musical', 'Animation', 'Sport', 'Sci-Fi', 'Western']

onMounted(async () => {
  await fetchData()
})

async function fetchData() {
  if(!searchSession.value) { await store.fetchSearchSession(searchSessionUuid) }
}

async function savePublic(item: string) {
  await store.updateSearchSession(searchSession.value?.uuid, { public: item } )
  setMode('genres')
}

async function saveGenres() {
  const selectedGenresCheckboxes = document.querySelectorAll('input[name="genres"]:checked');
  const selectedGenres = [...selectedGenresCheckboxes].map((genre) => (genre as HTMLInputElement).value)
  console.log(selectedGenres)
  await store.updateSearchSession(searchSession.value?.uuid, { genres: selectedGenres } )
}

async function startProposals() {
  const newProposalUuid = await store.createProposal(searchSession.value?.uuid);
  router.push({ name: 'proposal', params: { uuid: newProposalUuid }})
}

function setMode(m: string) {
  mode.value = m
}
</script>

<template>
  <main class="main-flex">
    <div v-if="mode === 'public'" class="main-flex-content">
      <h2>Who are you watching with ?</h2>
      <div>
        <div v-for="item in searchSessionPublics" :key="item">
          <input type="radio" name="public" :id="item" :value="item" :checked="searchSession?.public === item" @change="savePublic(item)"/>
          <label :for="item">{{ item }}</label>
        </div>
        <button @click="setMode('genres')">Skip</button>
      </div>
    </div>
    <div v-if="mode === 'genres'" class="main-flex-content">
      <h2>What kind of film are you in ?</h2>
      <div>
        <div v-for="item in genres" :key="item">
          <input type="checkbox" name="genres" :id="item" :value="item" :checked="searchSession?.genres && searchSession?.genres.includes(item)" @change="saveGenres()">
          <label :for="item">{{ item }}</label>
        </div>
        <button @click="startProposals">Start searching</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
</style>
