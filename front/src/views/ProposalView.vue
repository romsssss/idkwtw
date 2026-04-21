<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { onMounted, onUnmounted, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { mainStore } from '@/stores/main'
import { proposalRejectedFeedback, proposalAlreadySeenFeedback } from '@/models/proposal.model'
import { useAsyncAction } from '@/composables/useAsyncAction'

const router = useRouter()
const route = useRoute()
const store = mainStore()
const { t } = useI18n()
const { isLoading, run } = useAsyncAction()

const proposalUuid = computed(() => route.params.uuid as string)
const proposal = computed(() => store.getProposalByUuid(proposalUuid.value))
const title = computed(() => store.getTitleByTconst(proposal.value?.tconst))
const searchSession = computed(() => store.getSearchSessionByUuid(proposal.value?.search_session_uuid))

const state = computed(() => {
  if (proposal.value?.accepted) return 'accepted'
  if (proposal.value?.already_seen) return 'alreadySeen'
  if (proposal.value?.accepted === false) return 'rejected'
  return 'choosing'
})

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

async function accept() {
  await run(async () => {
    await store.updateProposal(proposal.value?.uuid, { accepted: true })
    await store.updateSearchSession(searchSession.value?.uuid, { tconst_chosen: title.value?.tconst })
    window.location.href = imdbUrl.value.toString()
  })
}

async function reject() {
  await run(async () => {
    await store.updateProposal(proposal.value?.uuid, { accepted: false })
  })
}

async function rejectFeeback(feedback: string) {
  await run(async () => {
    await store.updateProposal(proposal.value?.uuid, { rejected_feedback: feedback })
    await createNewProposal()
  })
}

async function alreadySeen() {
  await run(async () => {
    await store.updateProposal(proposal.value?.uuid, { already_seen: true, accepted: false })
  })
}

async function alreadySeenFeedback(feedback: string) {
  await run(async () => {
    await store.updateProposal(proposal.value?.uuid, { already_seen_feedback: feedback })
    await createNewProposal()
  })
}

async function createNewProposal() {
  const newProposalUuid = await store.createProposal(searchSession.value?.uuid)
  await router.push({ name: 'proposal', params: { uuid: newProposalUuid } })
}
</script>

<template>
  <main class="proposal-screen video-embed-mode">
    <iframe
      class="trailer video-embed-mode"
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

    <div class="top-scrim" />
    <div class="bottom-scrim">
      <div class="bottom-content">
        <div class="title-block">
          <div class="genres">{{ title?.genres.join(', ') }}</div>
          <h2 class="title">{{ title?.primary_title }}</h2>
          <h3 class="meta">
            {{ title?.start_year }}
            <span v-if="title?.runtime_minutes"> · {{ title?.runtime_minutes }}min</span>
          </h3>
        </div>

        <div class="actions">
          <div v-if="state === 'choosing'" class="main-row">
            <button class="btn-v2-secondary" :class="{ 'btn-loading': isLoading }" :disabled="isLoading" @click="alreadySeen">
              <i class="fa-solid fa-eye"></i> {{ t('proposal.seenItAlready') }}
            </button>
            <button class="btn-v2-secondary" :class="{ 'btn-loading': isLoading }" :disabled="isLoading" @click="reject">
              <i class="fa-solid fa-forward"></i> {{ t('proposal.skip') }}
            </button>
            <button class="btn-v2-primary" :class="{ 'btn-loading': isLoading }" :disabled="isLoading" @click="accept">
              <i class="fa-solid fa-play"></i> {{ t('proposal.watchNow') }}
            </button>
          </div>

          <div v-else-if="state === 'rejected'" class="feedback">
            <div class="feedback-label">{{ t('proposal.skippingWhy') }}</div>
            <div class="feedback-row">
              <button
                v-for="feedback in proposalRejectedFeedback"
                :key="feedback"
                class="btn-v2-pill"
                :class="{ 'btn-loading': isLoading }"
                :disabled="isLoading"
                @click="rejectFeeback(feedback)"
              >
                {{ t(`proposal.rejectedFeedback.${feedback}`) }}
              </button>
              <button class="btn-v2-pill" :class="{ 'btn-loading': isLoading }" :disabled="isLoading" @click="createNewProposal">
                {{ t('proposal.just_skip') }}
              </button>
            </div>
          </div>

          <div v-else-if="state === 'alreadySeen'" class="feedback">
            <div class="feedback-label">{{ t('proposal.seenItHowWasIt') }}</div>
            <div class="feedback-row">
              <button
                v-for="feedback in proposalAlreadySeenFeedback"
                :key="feedback"
                class="btn-v2-pill"
                :class="{ 'btn-loading': isLoading }"
                :disabled="isLoading"
                @click="alreadySeenFeedback(feedback)"
              >
                {{ t(`proposal.alreadySeenFeedback.${feedback}`) }}
              </button>
            </div>
          </div>

          <div v-else-if="state === 'accepted'" class="accepted">
            <span class="celebrate">🎉</span>
            <span>{{ t('proposal.openingImdb') }}</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.proposal-screen { background: #000; overflow: hidden; position: relative; }
.trailer { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }

.top-scrim {
  position: absolute; inset: 0 0 auto 0; height: 140px;
  background: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%);
  pointer-events: none; z-index: 3;
}

.bottom-scrim {
  position: absolute; left: 0; right: 0; bottom: 0;
  padding: 80px 40px 36px;
  background: linear-gradient(to top,
    rgba(0,0,0,0.85) 0%,
    rgba(0,0,0,0.6) 50%,
    rgba(0,0,0,0) 100%);
  z-index: 5;
}
.bottom-content {
  display: flex; align-items: flex-end; justify-content: space-between;
  gap: 40px; max-width: 1400px; margin: 0 auto;
}
.title-block { flex: 0 1 auto; max-width: 42%; }
.title-block .genres { font-size: 0.8em; font-style: italic; color: #D0D0D0; margin-bottom: 2px; }
.title-block .title { font-size: 2.4em; font-weight: 700; margin: 0 0 4px; line-height: 1.1; }
.title-block .meta { color: #D0D0D0; font-size: 0.95em; font-weight: 400; }

.actions { flex: 0 0 auto; display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }
.main-row { display: flex; gap: 10px; }

/* button variants */
.btn-v2-primary, .btn-v2-secondary, .btn-v2-pill {
  font-family: inherit; font-size: 0.95em; cursor: pointer;
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 22px; border-radius: 4px;
  border: 1px solid rgba(255,255,255,0.25);
  background: rgba(20,18,16,0.55); color: #fff;
  backdrop-filter: blur(8px);
  transition: background 0.15s, border-color 0.15s, transform 0.08s;
}
.btn-v2-secondary:hover { background: rgba(40,36,32,0.8); border-color: rgba(255,255,255,0.45); }
.btn-v2-secondary:active { transform: scale(0.97); }

.btn-v2-primary {
  background: var(--color-secondary); border-color: var(--color-secondary);
  font-weight: 600; padding: 12px 28px;
}
.btn-v2-primary:hover { background: #c32a0f; border-color: #c32a0f; }
.btn-v2-primary:active { transform: scale(0.97); }

.btn-v2-pill {
  padding: 9px 16px; font-size: 0.88em;
}
.btn-v2-pill:hover { background: rgba(40,36,32,0.8); border-color: rgba(255,255,255,0.45); }
.btn-v2-pill:active { transform: scale(0.97); }
.pill-ghost { border-color: rgba(255,255,255,0.1); color: #D0D0D0; }
.pill-ghost:hover { color: #fff; background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.3); }

.feedback { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }
.feedback-label {
  font-size: 0.75em; letter-spacing: 1.2px; color: #D0D0D0;
  text-transform: uppercase; font-weight: 600;
}
.feedback-row { display: flex; gap: 8px; flex-wrap: wrap; justify-content: flex-end; }

.accepted {
  display: inline-flex; align-items: center; gap: 12px;
  padding: 14px 24px; border-radius: 4px;
  background: rgba(20,18,16,0.55); border: 1px solid rgba(255,255,255,0.25);
  font-size: 0.95em; color: #fff; backdrop-filter: blur(8px);
}
.accepted .celebrate { font-size: 1.4em; }

/* mobile */
@media (max-width: 640px) {
  .bottom-scrim { padding: 48px 16px 20px; }
  .bottom-content { flex-direction: column; align-items: stretch; gap: 20px; }
  .title-block { max-width: 100%; }
  .title-block .title { font-size: 1.7em; }
  .actions { align-items: stretch; width: 100%; }
  .main-row { flex-direction: column-reverse; gap: 8px; }
  .main-row .btn-v2-primary,
  .main-row .btn-v2-secondary { width: 100%; justify-content: center; padding: 14px 18px; }
  .feedback { align-items: stretch; }
  .feedback-label { text-align: left; }
  .feedback-row { justify-content: flex-start; }
  .feedback-row .btn-v2-pill { flex: 1 1 calc(50% - 4px); justify-content: center; min-width: 0; }
  .accepted { justify-content: center; width: 100%; }
}
</style>
