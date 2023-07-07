<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { mainStore } from "@/stores/main";


const router = useRouter();
const route = useRoute();
const store = mainStore();

let proposalUuid = route.params.uuid;
const proposal = computed(() => store.getProposalByUuid(proposalUuid));
const title = computed(() => store.getTitleByTconst(proposal.value?.tconst));
const searchSession = computed(() => store.getSearchSessionByUuid(proposal.value?.search_session_uuid));

// import { storeToRefs } from 'pinia'
// const { getProposalByUuid } = storeToRefs(store)
// // {{ getProposalByUuid(proposalUuid) }}

onMounted(async () => {
  await fetchData()
})

async function fetchData() {
  await store.fetchProposal(proposalUuid);
  await store.fetchTitle(proposal.value?.tconst);
  await store.fetchSearchSession(proposal.value?.search_session_uuid);
}

async function accept() {
  await store.updateProposal(proposal.value?.uuid, { accepted: true } )
  await store.updateSearchSession(searchSession.value?.uuid, { tconst_chosen: title.value?.tconst } )
}

async function reject() {
  await store.updateProposal(proposal.value?.uuid, { accepted: false } )
}

async function rejectFeeback(feedback: string) {
  await store.updateProposal(proposal.value?.uuid, { rejected_feedback: feedback } )
  await createNewProposal();
}

async function alreadySeen() {
  await store.updateProposal(proposal.value?.uuid, { already_seen: true, accepted: false } )
}

async function alreadySeenFeedback(feedback: string) {
  await store.updateProposal(proposal.value?.uuid, { already_seen_feedback: feedback } )
  await createNewProposal();
}

async function createNewProposal() {
  const newProposalUuid = await store.createProposal(searchSession.value?.uuid);
  await router.push({ name: 'proposal', params: { uuid: newProposalUuid }})
  router.go(0) // force page reload
}
</script>

<template>
  <main>
    <h2>Search Session</h2>
    {{ searchSession }}

    <h2>Proposal</h2>
    {{ proposal }}

    <h2>Title</h2>
    {{ title }}

    <div class="actions">
      <div v-if="proposal?.accepted">
        🎉
      </div>
      <div v-else-if="proposal?.already_seen">
        <div>I've already seen it...</div>
        <button @click="alreadySeenFeedback('liked')">...and I liked it</button><br />
        <button @click="alreadySeenFeedback('disliked')">...and I disliked it</button><br />
        <button @click="alreadySeenFeedback('do_not_remember')">...and I don't remember</button><br />
      </div>
      <div v-else-if="proposal?.accepted === false">
        <div>Nope, show me something else...</div>
        <button @click="rejectFeeback('too_long')">...this one is too long</button><br />
        <button @click="rejectFeeback('too_old')">...this one is too old</button><br />
        <button @click="rejectFeeback('too_violent')">...this one is too violent</button><br />
        <button @click="rejectFeeback('too_scary')">...this one is too scary</button><br />
        <button @click="createNewProposal">...don't know why but no</button><br />
      </div>
      <div v-else>
        <button @click="accept">That's the one !</button><br />
        <button @click="reject">Nope, show me something else</button><br />
        <button @click="alreadySeen">I've already seen it</button><br />
      </div>
    </div>
  </main>
</template>

<style scoped>
</style>
