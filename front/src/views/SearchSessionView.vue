<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { mainStore } from "@/stores/main";

const router = useRouter();
const route = useRoute();
const store = mainStore();

const searchSessionUuid = route.params.uuid as string;
const searchSession = computed(() => store.getSearchSessionByUuid(searchSessionUuid));
const SearchSessionPublics = ['alone', 'date', 'partner', 'kids', 'friends', 'family']

onMounted(async () => {
  await fetchData()
})

async function fetchData() {
  if(!searchSession.value) { await store.fetchSearchSession(searchSessionUuid) }
}

async function savePublic(item: string) {
  await store.updateSearchSession(searchSession.value?.uuid, { public: item } )
}

async function startProposals() {
  const newProposalUuid = await store.createProposal(searchSession.value?.uuid);
  router.push({ name: 'proposal', params: { uuid: newProposalUuid }})
}
</script>

<template>
  <main>
    <h2>Who are you watching with ?</h2>
    <div>
      {{ searchSession }}
    </div>
    <div>
      <button v-for="item in SearchSessionPublics" :key="item" @click="savePublic(item)">
        {{ item }}
      </button>
      <br />
      <button @click="startProposals">Search Proposal</button>
    </div>
  </main>
</template>

<style scoped>
</style>
