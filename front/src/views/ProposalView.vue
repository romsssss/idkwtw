<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { mainStore } from "@/stores/main";
import { proposalRejectedFeedback, proposalAlreadySeenFeedback } from '@/models/proposal.model';

const router = useRouter();
const route = useRoute();
const store = mainStore();

let proposalUuid = route.params.uuid as string;
const proposal = computed(() => store.getProposalByUuid(proposalUuid));
const title = computed(() => store.getTitleByTconst(proposal.value?.tconst));
const searchSession = computed(() => store.getSearchSessionByUuid(proposal.value?.search_session_uuid));

onMounted(async () => {
  setVideoEmbedMode()
  await fetchData()
})

onUnmounted(() => {
  unsetVideoEmbedMode()
})

const youtubeEmbedUrl = computed(() => {
  if (title.value?.video?.site !== 'youtube' || !title.value?.video?.key) {
    return undefined;
  }

  let url = new URL(`https://www.youtube-nocookie.com/embed/${title.value.video.key}`)
  url.searchParams.append('autoplay', '1');
  url.searchParams.append('loop', '1');
  url.searchParams.append('controls', '0');
  url.searchParams.append('modestbranding', '1');
  url.searchParams.append('rel', '0');

  return url
})

function setVideoEmbedMode() {
  document.documentElement.classList.add('video-embed-mode');
  document.getElementById("app")?.classList.add('video-embed-mode');
  document.getElementsByTagName('header')[0]?.classList.add('video-embed-mode');
}

function unsetVideoEmbedMode() {
  document.documentElement.classList.remove('video-embed-mode')
  document.getElementById("app")?.classList.remove('video-embed-mode');
  document.getElementsByTagName('header')[0]?.classList.remove('video-embed-mode');
}

async function fetchData() {
  if(!proposal.value && proposalUuid) { await store.fetchProposal(proposalUuid); }
  if(!title.value && proposal.value?.tconst) { await store.fetchTitle(proposal.value.tconst); }
  if(!searchSession.value && proposal.value?.search_session_uuid) { await store.fetchSearchSession(proposal.value.search_session_uuid); }
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
  <main class="video-embed-mode">
    <iframe
      class="iframe-video-embed video-embed-mode"
      width="100%"
      height="100%"
      marginheight="0"
      marginwidth="0"
      scrolling="auto"
      frameborder="0"
      :src="youtubeEmbedUrl?.toString()"
      title="Trailer"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen>
    </iframe>

    <div class="title-infos">
      <h2>{{ title?.primary_title }}</h2>
      <h3>
        {{ title?.start_year }}
        <span v-if="title?.runtime_minutes">- {{ title?.runtime_minutes }}min</span>
      </h3>
    </div>

    <div class="proposal-actions">
      <div v-if="proposal?.accepted">
        🎉
      </div>
      <div v-else-if="proposal?.already_seen">
        <div>I've already seen it...</div>
        <button v-for="feedback in proposalAlreadySeenFeedback" :key="feedback" @click="alreadySeenFeedback(feedback)">
          {{ feedback }}
        </button>
      </div>
      <div v-else-if="proposal?.accepted === false">
        <div>Nope, show me something else...</div>
        <button v-for="feedback in proposalRejectedFeedback" :key="feedback" @click="rejectFeeback(feedback)">
          {{ feedback }}
        </button>
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
.iframe-video-embed {
 display: block;
 width: 100%;
 border: none;
 overflow-y: auto;
 overflow-x: hidden;
}

.title-infos {
  border: 2px solid white;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 30px;
}

.proposal-actions {
  border: 2px solid white;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 30px;
}
</style>
