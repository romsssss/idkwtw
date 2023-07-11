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
const genres = {
  'Drama': { label: 'Drama', icon: 'fa-masks-theater'},
  'Documentary': { label: 'Documentary', icon: 'fa-paw'},
  'Comedy': { label: 'Comedy', icon: 'fa-face-grin-tears'},
  'Romance': { label: 'Romance', icon: 'fa-heart'},
  'Crime': { label: 'Crime', icon: 'fa-user-secret'},
  'Action': { label: 'Action', icon: 'fa-solid fa-user-ninja'},
  'Thriller': { label: 'Thriller', icon: 'fa-face-flushed'},
  'Adventure': { label: 'Adventure', icon: 'fa-hat-wizard'},
  'Biography': { label: 'Biography', icon: 'fa-book'},
  'Family': { label: 'Family', icon: 'fa-people-roof'},
  'History': { label: 'History', icon: 'fa-scroll'},
  'Music': { label: 'Music', icon: 'fa-music'},
  'Mystery': { label: 'Mystery', icon: 'fa-magnifying-glass'},
  'Horror': { label: 'Horror', icon: 'fa-ghost'},
  'Fantasy': { label: 'Fantasy', icon: 'fa-dragon'},
  'War': { label: 'War', icon: 'fa-person-military-rifle'},
  'Musical': { label: 'Musical', icon: 'fa-music'},
  'Animation': { label: 'Animation', icon: 'fa-palette'},
  'Sport': { label: 'Sport', icon: 'fa-futbol'},
  'Sci-Fi': { label: 'Sci-Fi', icon: 'fa-robot'},
  'Western': { label: 'Western', icon: 'fa-hat-cowboy'}
}

const publics = {
  'alone': { label: 'By myself' },
  'date': { label: 'With my date' },
  'partner': { label: 'With my partner' },
  'kids': { label: 'With kids' },
  'friends': { label: 'With friends' },
  'family': { label: 'With family or relatives' }
}

onMounted(async () => {
  await fetchData()
})

async function fetchData() {
  if(!searchSession.value) { await store.fetchSearchSession(searchSessionUuid) }
}

async function savePublic(item: string) {
  await store.updateSearchSession(searchSession.value?.uuid, { public: item } )
}

async function saveGenres() {
  const selectedGenresCheckboxes = document.querySelectorAll('input[name="genres"]:checked');
  const selectedGenres = [...selectedGenresCheckboxes].map((genre) => (genre as HTMLInputElement).value)
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
      <h2 class="title">Who are you watching with ?</h2>
      <div class="subtitle"></div>
      <div class="form-container">
        <div v-for="item in searchSessionPublics" :key="item" class="option-wrapper-full-width">
          <div class="option">
            <label :for="item">
              <span>{{ publics[item].label }}</span>
              <input type="radio" name="public" :id="item" :value="item" :checked="searchSession?.public === item" @change="savePublic(item)"/>
              <i class="fa-solid fa-check"></i>
            </label>
          </div>
        </div>
      </div>
      <div class="cta-wrapper">
        <button class="btn btn-cta" role="link" @click="setMode('genres')">
          Next <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
    <div v-if="mode === 'genres'" class="main-flex-content">
      <h2 class="title">What kind of film are you in ?</h2>
      <div class="subtitle">Multiple answers are possible</div>
      <div class="form-container">
        <div v-for="genre in genres" :key="genre.label" class="option-wrapper-half-width">
          <div class="option">
            <label :for="genre.label">
              <span>
                <i v-if="genre.icon" class="fa-solid" :class="genre.icon"></i>
                {{ genre.label }}
              </span>
              <input type="checkbox" name="genres" :id="genre.label" :value="genre.label" :checked="searchSession?.genres && searchSession?.genres.includes(genre.label)" @change="saveGenres()">
              <i class="fa-solid fa-check"></i>
            </label>
          </div>
        </div>
      </div>
      <div class="cta-wrapper">
        <button class="btn btn-cta" role="link" @click="startProposals">
          Start searching <i class="fa-solid fa-arrow-right"></i>
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

  .option {
    border-radius: 4px;
    border: 0.5px solid var(--color-text-dark-1);
    margin: 5px 5px;
  }
  .option label {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    padding: 10px;
  }

  .option label:has(input[type=checkbox]:checked), .option label:has(input[type=radio]:checked) {
    background-color: var(--color-secondary);
  }

  .option label input[type=checkbox], .option label input[type=radio] {
    display: none;
  }
  .option label input[type=checkbox] + .fa-check, .option label input[type=radio] + .fa-check {
    display: none;
  }

  .option label input[type=checkbox]:checked + .fa-check, .option label input[type=radio]:checked + .fa-check {
    display: var(--fa-display,inline-block);
  }

  .option label .fa-solid {
    margin-right: 5px;
  }
  .cta-wrapper {
    text-align: center;
  }
</style>
