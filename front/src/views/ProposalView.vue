<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { onMounted, onUnmounted, computed, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { mainStore } from '@/stores/main'
import { proposalRejectedFeedback, proposalAlreadySeenFeedback } from '@/models/proposal.model'

const router = useRouter()
const route = useRoute()
const store = mainStore()
const { t } = useI18n()

const proposalUuid = computed(() => route.params.uuid as string)
const proposal = computed(() => store.getProposalByUuid(proposalUuid.value))
const title = computed(() => store.getTitleByTconst(proposal.value?.tconst))
const searchSession = computed(() => store.getSearchSessionByUuid(proposal.value?.search_session_uuid))

onMounted(async () => {
  setVideoEmbedMode()
  await fetchData()
})

onUnmounted(() => {
  unsetVideoEmbedMode()
})

const youtubeEmbedUrl = computed(() => {
  if (title.value?.video?.site !== 'youtube' || !title.value?.video?.key) {
    return undefined
  }

  const url = new URL(`https://www.youtube-nocookie.com/embed/${title.value.video.key}`)
  url.searchParams.append('autoplay', '1')
  url.searchParams.append('loop', '1')
  url.searchParams.append('controls', '0')
  url.searchParams.append('modestbranding', '1')
  url.searchParams.append('rel', '0')

  return url
})

const imdbUrl = computed(() => {
  const url = new URL(`https://www.imdb.com/title/${title.value?.tconst}`)

  return url
})

function setVideoEmbedMode() {
  document.documentElement.classList.add('video-embed-mode')
  document.getElementById('app')?.classList.add('video-embed-mode')
  document.getElementsByTagName('header')[0]?.classList.add('video-embed-mode')
}

function unsetVideoEmbedMode() {
  document.documentElement.classList.remove('video-embed-mode')
  document.getElementById('app')?.classList.remove('video-embed-mode')
  document.getElementsByTagName('header')[0]?.classList.remove('video-embed-mode')
}

async function fetchData() {
  if (proposalUuid.value) {
    await store.fetchProposal(proposalUuid.value)
  }
  if (!title.value && proposal.value?.tconst) {
    await store.fetchTitle(proposal.value.tconst)
  }
  if (!searchSession.value && proposal.value?.search_session_uuid) {
    await store.fetchSearchSession(proposal.value.search_session_uuid)
  }
}

watch(proposalUuid, () => fetchData())

const isLoading = ref(false)

async function accept() {
  if (isLoading.value) return
  isLoading.value = true
  try {
    await store.updateProposal(proposal.value?.uuid, { accepted: true })
    await store.updateSearchSession(searchSession.value?.uuid, { tconst_chosen: title.value?.tconst })
    window.location.href = imdbUrl.value.toString()
  } finally {
    isLoading.value = false
  }
}

async function reject() {
  if (isLoading.value) return
  isLoading.value = true
  try {
    await store.updateProposal(proposal.value?.uuid, { accepted: false })
  } finally {
    isLoading.value = false
  }
}

async function rejectFeeback(feedback: string) {
  if (isLoading.value) return
  isLoading.value = true
  try {
    await store.updateProposal(proposal.value?.uuid, { rejected_feedback: feedback })
    await createNewProposal()
  } finally {
    isLoading.value = false
  }
}

async function alreadySeen() {
  if (isLoading.value) return
  isLoading.value = true
  try {
    await store.updateProposal(proposal.value?.uuid, { already_seen: true, accepted: false })
  } finally {
    isLoading.value = false
  }
}

async function alreadySeenFeedback(feedback: string) {
  if (isLoading.value) return
  isLoading.value = true
  try {
    await store.updateProposal(proposal.value?.uuid, { already_seen_feedback: feedback })
    await createNewProposal()
  } finally {
    isLoading.value = false
  }
}

async function createNewProposal() {
  const newProposalUuid = await store.createProposal(searchSession.value?.uuid)
  await router.push({ name: 'proposal', params: { uuid: newProposalUuid } })
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
      allowfullscreen
    >
    </iframe>

    <div class="title-infos">
      <div class="title-genres">{{ title?.genres.join(', ') }}</div>
      <h2 class="title">{{ title?.primary_title }}</h2>
      <h3 class="subtitle">
        {{ title?.start_year }}
        <span v-if="title?.runtime_minutes">- {{ title?.runtime_minutes }}min</span>
      </h3>
    </div>

    <div class="proposal-actions">
      <div v-if="proposal?.accepted">🎉</div>
      <div v-else-if="proposal?.already_seen">
        <div class="secondary-action-title">{{ t('proposal.seenItAlready') }}</div>
        <button
          v-for="feedback in proposalAlreadySeenFeedback"
          :key="feedback"
          class="btn btn-option"
          :class="{ 'btn-loading': isLoading }"
          :disabled="isLoading"
          @click="alreadySeenFeedback(feedback)"
        >
          {{ t(`proposal.alreadySeenFeedback.${feedback}`) }}
        </button>
      </div>
      <div v-else-if="proposal?.accepted === false">
        <div class="secondary-action-title">{{ t('proposal.skip') }}</div>
        <button
          v-for="feedback in proposalRejectedFeedback"
          :key="feedback"
          class="btn btn-option"
          :class="{ 'btn-loading': isLoading }"
          :disabled="isLoading"
          @click="rejectFeeback(feedback)"
        >
          {{ t(`proposal.rejectedFeedback.${feedback}`) }}
        </button>
        <button class="btn btn-option" :class="{ 'btn-loading': isLoading }" :disabled="isLoading" @click="createNewProposal">
          {{ t('proposal.just_skip') }}
        </button>
      </div>
      <div v-else class="main-actions">
        <button class="btn btn-option uppercase" :class="{ 'btn-loading': isLoading }" :disabled="isLoading" @click="accept">{{ t('proposal.watchNow') }}</button>
        <button class="btn btn-option uppercase" :class="{ 'btn-loading': isLoading }" :disabled="isLoading" @click="reject">{{ t('proposal.skip') }}</button>
        <button class="btn btn-option uppercase" :class="{ 'btn-loading': isLoading }" :disabled="isLoading" @click="alreadySeen">{{ t('proposal.seenItAlready') }}</button>
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
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px 30px 50px 30px;
}

.title-genres {
  font-size: 0.8em;
  font-style: italic;
  color: var(--color-text-dark-1);
}
.title {
  font-size: 2em;
}
.subtitle {
  font-size: 1em;
  color: var(--color-text-dark-1);
}

.proposal-actions {
  position: absolute;
  top: 100px;
  right: 0;
  padding: 10px 30px 10px 30px;
  text-align: right;
}

.secondary-action-title {
  text-align: center;
  text-decoration: underline;
  text-transform: uppercase;
}

.uppercase {
  text-transform: uppercase;
}
</style>
