import './assets/main.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const messages = {
  en: {
    general: {
      next: 'Next'
    },
    home: {
      title: "I Don't Know What To Watch",
      subtitle: 'Movie recommendation engine',
      tagline:
        "You can't find anyththing to watch tonight ? Answer 2 simple questions and the engine will start showing you movie trailers !",
      ctaLabel: 'Find a movie'
    },
    searchSession: {
      public: {
        title: 'Who are you watching with ?',
        label: {
          alone: 'By myself',
          date: 'With a date',
          partner: 'With my partner',
          kids: 'With kids',
          friends: 'With friends',
          family: 'With family or relatives'
        }
      },
      genres: {
        title: 'What kind of film are you in ?',
        subtitle: 'Multiple answers are possible',
        label: {
          Drama: 'Drama',
          Documentary: 'Documentary',
          Comedy: 'Comedy',
          Romance: 'Romance',
          Crime: 'Crime',
          Action: 'Action',
          Thriller: 'Thriller',
          Adventure: 'Adventure',
          Biography: 'Biography',
          Family: 'Family',
          History: 'History',
          Music: 'Music',
          Mystery: 'Mystery',
          Horror: 'Horror',
          Fantasy: 'Fantasy',
          War: 'War',
          Musical: 'Musical',
          Animation: 'Animation',
          Sport: 'Sport',
          'Sci-Fi': 'Sci-Fi',
          Western: 'Western'
        },
        icon: {
          Drama: 'fa-masks-theater',
          Documentary: 'fa-paw',
          Comedy: 'fa-face-grin-tears',
          Romance: 'fa-heart',
          Crime: 'fa-user-secret',
          Action: 'fa-solid fa-user-ninja',
          Thriller: 'fa-face-flushed',
          Adventure: 'fa-hat-wizard',
          Biography: 'fa-book',
          Family: 'fa-people-roof',
          History: 'fa-scroll',
          Music: 'fa-music',
          Mystery: 'fa-magnifying-glass',
          Horror: 'fa-ghost',
          Fantasy: 'fa-dragon',
          War: 'fa-person-military-rifle',
          Musical: 'fa-music',
          Animation: 'fa-palette',
          Sport: 'fa-futbol',
          'Sci-Fi': 'fa-robot',
          Western: 'fa-hat-cowboy'
        }
      },
      startSearching: 'Start searching'
    },
    proposal: {
      skip: 'Skip',
      watchNow: 'Watch now',
      seenItAlready: 'Seen it already',
      just_skip: 'Just skip',
      alreadySeenFeedback: {
        liked: 'Liked it',
        disliked: "Dind't like it",
        do_not_remember: "Don't remember"
      },
      rejectedFeedback: {
        too_long: 'Too long',
        too_old: 'Too old',
        too_violent: 'Too violent',
        too_scary: 'Too scary'
      }
    }
  }
}

const app = createApp(App)
const pinia = createPinia()
const i18n = createI18n({ locale: 'en', allowComposition: true, messages })

app.use(pinia)
app.use(i18n)
app.use(router)

app.mount('#app')
