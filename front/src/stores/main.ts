import { defineStore } from "pinia";

type SearchSessionPublics = 'alone' | 'date' | 'partner' | 'kids' | 'friends' | 'family';
type ProposalRejectedFeedback = 'too_long' | 'too_old' | 'too_violent' | 'too_scary';
type ProposalAlreadySeenFeedback = 'liked' | 'disliked' | 'do_not_remember';

interface SearchSession {
  uuid: string,
  public: SearchSessionPublics | null,
  genres: string[],
  tconst_chosen: string | null
}

interface Proposal {
  uuid: string,
  search_session_uuid: string,
  tconst: string,
  accepted: boolean | null,
  rejected_feedback: ProposalRejectedFeedback | null,
  already_seen: boolean | null,
  already_seen_feedback: ProposalAlreadySeenFeedback | null
}

interface Title {
  tconst: string,
  title_type: string,
  primary_title: string,
  original_title: string,
  is_adult: boolean,
  start_year: number,
  end_year: number,
  runtime_minutes: number,
  genres: string[],
  average_rating: number,
  num_votes: number,
  video: Video,
}

interface Video {
  uuid: string,
  name: string,
  type: string,
  site: string,
  key: string,
  size: number,
  official: boolean,
  iso_639_1: string,
  iso_3166_1: string,
  published_at: string,
}

const apiBaseUrl = 'http://127.0.0.1:3000'

export const mainStore = defineStore("main_store", {
  state: () => ({
      searchSessions: [] as SearchSession[],
      proposals: [] as Proposal[],
      titles: [] as Title[],
  }),
  getters: {
    getSearchSessionByUuid: (state) => {
      return (uuid) => state.searchSessions.find(searchSession => searchSession.uuid === uuid)
    },
    getProposalByUuid: (state) => {
      return (uuid) => state.proposals.find(proposal => proposal.uuid === uuid)
    },
    getTitleByTconst: (state) => {
      return (tconst) => state.titles.find(title => title.tconst === tconst)
    }
  },
  actions: {
    async fetchTitle(tconst) {
      const response = await fetch(`${apiBaseUrl}/titles/${tconst}`)
      const title = await response.json() as unknown as Title;

      const index = this.titles.findIndex(title => title.tconst === tconst);

      if (index === -1) {
        this.$patch((state) => {
          state.titles.push(title);
        })
      } else {
        this.$patch((state) => {
          state.titles[index] = title;
        })
      }
    },
    async fetchProposal(uuid) {
      const response = await fetch(`${apiBaseUrl}/proposals/${uuid}`)
      const proposal = await response.json() as unknown as Proposal;

      const index = this.proposals.findIndex(proposal => proposal.uuid === uuid);

      if (index === -1) {
        this.$patch((state) => {
          state.proposals.push(proposal);
        })
      } else {
        this.$patch((state) => {
          state.proposals[index] = proposal;
        })
      }
    },
    async fetchSearchSession(uuid) {
      const response = await fetch(`${apiBaseUrl}/search_sessions/${uuid}`)
      const searchSession = await response.json() as unknown as SearchSession;

      const index = this.searchSessions.findIndex(searchSession => searchSession.uuid === uuid);

      if (index === -1) {
        this.$patch((state) => {
          state.searchSessions.push(searchSession);
        })
      } else {
        this.$patch((state) => {
          state.searchSessions[index] = searchSession;
        })
      }
    },
    async createSearchSession() {
      const response = await fetch(`${apiBaseUrl}/search_sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const searchSession = await response.json() as unknown as SearchSession;

      this.$patch((state) => {
        state.searchSessions.push(searchSession)
      })

      return searchSession.uuid;
    },
    async updateSearchSession(uuid, data) {
      const response = await fetch(`${apiBaseUrl}/search_sessions/${uuid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const searchSession = await response.json() as unknown as SearchSession;

      const index = this.searchSessions.findIndex(searchSession => searchSession.uuid === uuid);

      if (index === -1) {
        this.$patch((state) => {
          state.searchSessions.push(searchSession);
        })
      } else {
        this.$patch((state) => {
          state.searchSessions[index] = searchSession;
        })
      }
    },
    async createProposal(searchSessionUuid) {
      const url = `${apiBaseUrl}/proposals?` + new URLSearchParams({ 'search_session_uuid': searchSessionUuid })
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const proposal = await response.json() as unknown as Proposal;

      this.$patch((state) => {
        state.proposals.push(proposal)
      })

      return proposal.uuid;
    },
    async updateProposal(uuid, data) {
      const response = await fetch(`${apiBaseUrl}/proposals/${uuid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const proposal = await response.json() as unknown as SearchSession;

      const index = this.proposals.findIndex(proposal => proposal.uuid === uuid);

      if (index === -1) {
        this.$patch((state) => {
          state.proposals.push(proposal);
        })
      } else {
        this.$patch((state) => {
          state.proposals[index] = proposal;
        })
      }
    },
  }
})
