<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { onMounted, onUnmounted, computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mainStore } from '@/stores/main'
import { useAsyncAction } from '@/composables/useAsyncAction'
import type { WatchProvider } from '@/models/watch_provider.model'

const route = useRoute()
const router = useRouter()
const store = mainStore()
const { t } = useI18n()
const { isLoading, run } = useAsyncAction()

const proposalUuid = computed(() => route.params.uuid as string)
// Optional ?region=FR override, mainly to test other regions in local dev where
// the Vercel geo header is absent. Forwarded to the API, which lets it win.
const regionOverride = computed(() => (route.query.region as string) || undefined)
const proposal = computed(() => store.getProposalByUuid(proposalUuid.value))
const title = computed(() => store.getTitleByTconst(proposal.value?.tconst))
const searchSession = computed(() => store.getSearchSessionByUuid(proposal.value?.search_session_uuid))

const providersEntry = computed(() => store.getWatchProvidersByTconst(title.value?.tconst))
const providers = computed(() => providersEntry.value?.data ?? null)
const providersLoading = ref(true)
const posterUrl = computed(() => providers.value?.poster_url ?? null)
const synopsis = computed(() => providers.value?.overview ?? null)

// Merge rent + buy into a single "rent or buy" list, de-duplicated by provider
// (many providers offer both), since TMDB exposes no prices to differentiate them.
const rentOrBuy = computed<WatchProvider[]>(() => {
  if (!providers.value) return []
  const seen = new Set<number>()
  return [...providers.value.rent, ...providers.value.buy].filter((p) => {
    if (seen.has(p.provider_id)) return false
    seen.add(p.provider_id)
    return true
  })
})

const hasProviders = computed(
  () => !!providers.value && (providers.value.flatrate.length > 0 || rentOrBuy.value.length > 0)
)

const cardState = computed(() => {
  if (providersLoading.value) return 'loading'
  if (providersEntry.value?.error) return 'error'
  return hasProviders.value ? 'ready' : 'empty'
})

// Local wall-clock time the movie would end if started now, rounded up to the
// next 5 minutes so it reads as a friendly estimate rather than a false precise.
const finishTime = computed(() => {
  const minutes = title.value?.runtime_minutes
  if (!minutes) return null
  const step = 5 * 60000
  const end = new Date(Math.ceil((Date.now() + minutes * 60000) / step) * step)
  return end.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
})

const imdbUrl = computed(() => `https://www.imdb.com/title/${title.value?.tconst}`)

function formatRuntime(minutes: number | undefined): string {
  if (!minutes) return ''
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}

// ISO 3166-1 alpha-2 country code -> flag emoji (regional indicator symbols).
function regionFlag(code: string | undefined): string {
  if (!code || code.length !== 2) return ''
  return String.fromCodePoint(...[...code.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65))
}

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
  if (proposalUuid.value && !proposal.value) {
    await store.fetchProposal(proposalUuid.value)
  }
  if (!title.value && proposal.value?.tconst) {
    await store.fetchTitle(proposal.value.tconst)
  }
  if (!searchSession.value && proposal.value?.search_session_uuid) {
    await store.fetchSearchSession(proposal.value.search_session_uuid)
  }
  if (title.value?.tconst) {
    providersLoading.value = true
    await store.fetchWatchProviders(title.value.tconst, regionOverride.value)
    providersLoading.value = false
  }
}

async function findAnother() {
  await run(async () => {
    const newProposalUuid = await store.createProposal(searchSession.value?.uuid)
    await router.push({ name: 'proposal', params: { uuid: newProposalUuid } })
  })
}

onMounted(async () => {
  setVideoEmbedMode()
  await fetchData()
})

onUnmounted(() => {
  unsetVideoEmbedMode()
})
</script>

<template>
  <main class="watch-screen">
    <div
      class="backdrop"
      :class="{ 'backdrop--poster': posterUrl }"
      :style="posterUrl ? { backgroundImage: `url(${posterUrl})` } : undefined"
    ></div>
    <div class="backdrop-scrim"></div>

    <section class="panel">
      <div class="panel-inner">
        <div class="hero reveal">
          <div class="poster-frame">
            <img v-if="posterUrl" class="poster" :src="posterUrl" :alt="title?.primary_title" />
            <div v-else class="poster poster--placeholder">🎬</div>
          </div>

          <div class="head-text">
            <p class="eyebrow">{{ t('watch.eyebrow') }}</p>
            <div v-if="title?.genres?.length" class="genres">{{ title.genres.join(' · ') }}</div>
            <h1 class="title">{{ title?.primary_title }}</h1>
            <div class="meta">
              <span v-if="title?.start_year">{{ title.start_year }}</span>
              <span v-if="title?.runtime_minutes" class="dot">·</span>
              <span v-if="title?.runtime_minutes">{{ formatRuntime(title.runtime_minutes) }}</span>
              <span v-if="title?.average_rating" class="dot">·</span>
              <span v-if="title?.average_rating" class="rating">★ {{ title.average_rating }}</span>
            </div>
            <div v-if="finishTime" class="finish">
              <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.6">
                <circle cx="8" cy="8" r="6.4" />
                <path d="M8 4.6V8l2.4 1.6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              {{ t('watch.finishBy', { time: finishTime }) }}
            </div>
          </div>
          <p v-if="synopsis" class="synopsis">{{ synopsis }}</p>
        </div>

        <div class="watch-card reveal reveal--2">
          <div class="watch-head">
            <h2>{{ t('watch.whereToWatch') }}</h2>
            <span v-if="cardState === 'ready' && providers?.region" class="region">
              {{ regionFlag(providers.region) }} {{ providers.region }}
            </span>
          </div>

          <div v-if="cardState === 'loading'" class="watch-status">
            <span class="spinner" aria-hidden="true"></span>{{ t('watch.loading') }}
          </div>

          <div v-else-if="cardState === 'error'" class="watch-status muted">{{ t('watch.loadError') }}</div>

          <template v-else-if="cardState === 'ready'">
            <div v-if="providers?.flatrate.length" class="prov-group">
              <span class="prov-label">{{ t('watch.stream') }}</span>
              <div class="prov-row">
                <a
                  v-for="p in providers.flatrate"
                  :key="'f' + p.provider_id"
                  class="prov"
                  :href="providers.link ?? imdbUrl"
                  target="_blank"
                  rel="noopener"
                >
                  <img class="prov-logo" :src="p.logo_url" :alt="p.provider_name" loading="lazy" />
                  <span class="prov-meta">
                    <span class="prov-name">{{ p.provider_name }}</span>
                    <span class="prov-price sub">{{ t('watch.subscription') }}</span>
                  </span>
                </a>
              </div>
            </div>

            <div v-if="rentOrBuy.length" class="prov-group">
              <span class="prov-label">{{ t('watch.rentOrBuy') }}</span>
              <div class="prov-row">
                <a
                  v-for="p in rentOrBuy"
                  :key="'r' + p.provider_id"
                  class="prov"
                  :href="providers?.link ?? imdbUrl"
                  target="_blank"
                  rel="noopener"
                >
                  <img class="prov-logo" :src="p.logo_url" :alt="p.provider_name" loading="lazy" />
                  <span class="prov-meta">
                    <span class="prov-name">{{ p.provider_name }}</span>
                  </span>
                </a>
              </div>
            </div>
          </template>

          <div v-else class="watch-status muted">
            {{ t('watch.unavailable') }}
            <span v-if="providers?.region" class="region-inline">
              ({{ regionFlag(providers.region) }} {{ providers.region }})
            </span>
          </div>
        </div>

        <div class="subrow reveal reveal--3">
          <button class="link-ghost" :disabled="isLoading" @click="findAnother">
            ↺ {{ t('watch.findAnother') }}
          </button>
          <a class="link-ghost imdb" :href="imdbUrl" target="_blank" rel="noopener">
            {{ t('watch.imdbDetails') }} ↗
          </a>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.watch-screen {
  position: relative;
  min-height: 100vh;
  /* The global stylesheet makes <main> a fixed-height internal scroll container
     (height:100%; overflow:auto). That leaves the absolute header pinned on top
     while content scrolls under it. Opt this page out so the document scrolls
     and the header scrolls away with the content. */
  height: auto;
  overflow: visible;
  background: #05070a;
}

/* ambient blurred poster (or gradient fallback) fills the viewport */
.backdrop {
  position: fixed;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(120% 90% at 72% 18%, rgba(255, 138, 47, 0.22), transparent 55%),
    radial-gradient(140% 120% at 18% 88%, rgba(28, 96, 128, 0.35), transparent 60%),
    linear-gradient(200deg, #16212b 0%, #0a0d12 60%, #05070a 100%);
}
.backdrop--poster {
  background-size: cover;
  background-position: center;
  filter: blur(42px) brightness(0.5) saturate(1.15);
  transform: scale(1.18);
}
.backdrop-scrim {
  position: fixed;
  inset: 0;
  z-index: 1;
  background:
    radial-gradient(90% 70% at 50% 45%, rgba(0, 0, 0, 0.25), transparent 70%),
    linear-gradient(to bottom, rgba(5, 7, 10, 0.75) 0%, rgba(5, 7, 10, 0.55) 45%, rgba(5, 7, 10, 0.9) 100%);
}

.panel {
  position: relative;
  z-index: 5;
  min-height: 100vh;
  display: flex;
  align-items: center;
  /* Center when the content fits, but fall back to top-aligned (respecting the
     header padding) when it's taller than the viewport, so nothing hides under
     the fixed header and the whole page stays scrollable. */
  align-items: safe center;
  justify-content: center;
  padding: 92px 28px 48px;
}
.panel-inner {
  width: 100%;
  max-width: 760px;
  display: flex;
  flex-direction: column;
  gap: 26px;
}

/* ---- hero: poster + details ---- */
/* Poster spans both rows so the synopsis sits under the title (col 2) on wide
   screens; on mobile the synopsis drops to a full-width row below the poster. */
.hero {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 30px;
  row-gap: 16px;
  align-items: start;
}
.poster-frame {
  grid-column: 1;
  grid-row: 1 / span 2;
}
.head-text {
  grid-column: 2;
  grid-row: 1;
}
.poster {
  display: block;
  width: 210px;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 24px 60px -20px rgba(0, 0, 0, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: #1a1a1f;
  animation: poster-in 0.5s ease both;
}
.poster--placeholder {
  display: grid;
  place-items: center;
  font-size: 3em;
}
.head-text {
  min-width: 0;
  padding-top: 4px;
}

.eyebrow {
  font-size: 0.72em;
  font-weight: 600;
  letter-spacing: 1.6px;
  text-transform: uppercase;
  color: var(--color-secondary);
  margin-bottom: 10px;
}
.genres {
  font-size: 0.74em;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #a2a0a8;
  margin-bottom: 4px;
}
.title {
  font-size: clamp(1.9em, 4.5vw, 2.7em);
  font-weight: 700;
  line-height: 1.06;
  margin: 0 0 10px;
  text-wrap: balance;
}
.meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  color: #d0d0d0;
  font-size: 0.95em;
}
.meta .dot {
  color: #7d7d7d;
}
.meta .rating {
  color: #f4d15b;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.finish {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: 14px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(36, 213, 180, 0.1);
  border: 1px solid rgba(36, 213, 180, 0.32);
  color: var(--color-tertiary);
  font-size: 0.82em;
  font-weight: 500;
}

.synopsis {
  grid-column: 2;
  grid-row: 2;
  color: #c9c7cf;
  font-size: 0.95em;
  line-height: 1.6;
  max-width: 54ch;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ---- where to watch ---- */
.watch-card {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(10px);
  padding: 18px 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.watch-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
}
.watch-head h2 {
  font-size: 0.82em;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #efedf2;
}
.region {
  font-size: 0.82em;
  color: #b8b6be;
  white-space: nowrap;
}

.prov-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.prov-label {
  font-size: 0.72em;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: #a2a0a8;
}
.prov-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.prov {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px 8px 8px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.02);
  text-decoration: none;
  color: #fff;
  transition: border-color 0.15s, background 0.15s, transform 0.08s;
}
.prov:hover {
  border-color: rgba(255, 255, 255, 0.45);
  background: rgba(255, 255, 255, 0.07);
  transform: translateY(-1px);
}
.prov:active {
  transform: translateY(0);
}
.prov:focus-visible,
.link-ghost:focus-visible {
  outline: 2px solid var(--color-tertiary);
  outline-offset: 3px;
  border-radius: 6px;
}
.prov-logo {
  width: 36px;
  height: 36px;
  flex: none;
  border-radius: 8px;
  object-fit: cover;
  background: #222;
}
.prov-meta {
  display: flex;
  flex-direction: column;
  line-height: 1.25;
}
.prov-name {
  font-size: 0.9em;
  font-weight: 500;
}
.prov-price {
  font-size: 0.78em;
  color: #a2a0a8;
}
.prov-price.sub {
  color: var(--color-tertiary);
}

.watch-status {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9em;
  color: #d0d0d0;
  padding: 4px 0;
}
.watch-status.muted {
  color: #a2a0a8;
}
.region-inline {
  color: #7d7d7d;
}
.spinner {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.25);
  border-top-color: #fff;
  animation: spin 0.7s linear infinite;
}

.subrow {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.link-ghost {
  font-family: inherit;
  font-size: 0.9em;
  color: #d7d5da;
  background: none;
  border: 0;
  padding: 6px 0;
  cursor: pointer;
  text-decoration: none;
}
.link-ghost:hover {
  color: #fff;
}
.link-ghost:disabled {
  opacity: 0.5;
  cursor: default;
}
.link-ghost.imdb {
  color: #a2a0a8;
  font-size: 0.82em;
}
.link-ghost.imdb:hover {
  color: #f4d15b;
}

/* ---- motion ---- */
.reveal {
  animation: rise 0.5s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}
.reveal--2 {
  animation-delay: 0.08s;
}
.reveal--3 {
  animation-delay: 0.14s;
}
@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes poster-in {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 640px) {
  .panel {
    align-items: flex-start;
    padding: 104px 16px 28px;
  }
  .hero {
    column-gap: 16px;
    row-gap: 14px;
  }
  /* poster no longer spans; synopsis drops to a full-width row below */
  .poster-frame {
    grid-row: 1;
  }
  .synopsis {
    grid-column: 1 / -1;
    grid-row: 2;
    -webkit-line-clamp: 4;
  }
  .poster {
    width: 112px;
    border-radius: 10px;
  }
  .title {
    margin-bottom: 8px;
  }
  .finish {
    margin-top: 10px;
  }
  .prov {
    flex: 1 1 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal,
  .poster {
    animation: none;
  }
}
</style>
