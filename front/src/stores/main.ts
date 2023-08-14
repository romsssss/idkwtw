import { defineStore } from 'pinia'
import type { SearchSession } from '@/models/search_session.model'
import type { Proposal } from '@/models/proposal.model'
import type { Title } from '@/models/title.model'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export const mainStore = defineStore('main_store', {
  state: () => ({
    searchSessions: [] as SearchSession[],
    proposals: [] as Proposal[],
    titles: [] as Title[]
  }),
  getters: {
    getSearchSessionByUuid: (state) => {
      return (uuid: string | undefined) => state.searchSessions.find((searchSession) => searchSession.uuid === uuid)
    },
    getProposalByUuid: (state) => {
      return (uuid: string | undefined) => state.proposals.find((proposal) => proposal.uuid === uuid)
    },
    getTitleByTconst: (state) => {
      return (tconst: string | undefined) => state.titles.find((title) => title.tconst === tconst)
    }
  },
  actions: {
    async fetchTitle(tconst: string) {
      const response = await fetch(`${apiBaseUrl}/titles/${tconst}`)
      const title = (await response.json()) as unknown as Title

      const index = this.titles.findIndex((title) => title.tconst === tconst)

      if (index === -1) {
        this.$patch((state) => {
          state.titles.push(title)
        })
      } else {
        this.$patch((state) => {
          state.titles[index] = title
        })
      }
    },
    async fetchProposal(uuid: string) {
      const response = await fetch(`${apiBaseUrl}/proposals/${uuid}`)
      const proposal = (await response.json()) as unknown as Proposal

      const index = this.proposals.findIndex((proposal) => proposal.uuid === uuid)

      if (index === -1) {
        this.$patch((state) => {
          state.proposals.push(proposal)
        })
      } else {
        this.$patch((state) => {
          state.proposals[index] = proposal
        })
      }
    },
    async fetchSearchSession(uuid: string) {
      const response = await fetch(`${apiBaseUrl}/search_sessions/${uuid}`)
      const searchSession = (await response.json()) as unknown as SearchSession

      const index = this.searchSessions.findIndex((searchSession) => searchSession.uuid === uuid)

      if (index === -1) {
        this.$patch((state) => {
          state.searchSessions.push(searchSession)
        })
      } else {
        this.$patch((state) => {
          state.searchSessions[index] = searchSession
        })
      }
    },
    async createSearchSession() {
      const response = await fetch(`${apiBaseUrl}/search_sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const searchSession = (await response.json()) as unknown as SearchSession

      this.$patch((state) => {
        state.searchSessions.push(searchSession)
      })

      return searchSession.uuid
    },
    async updateSearchSession(uuid: string | undefined, data: object) {
      const response = await fetch(`${apiBaseUrl}/search_sessions/${uuid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const searchSession = (await response.json()) as unknown as SearchSession

      const index = this.searchSessions.findIndex((searchSession) => searchSession.uuid === uuid)

      if (index === -1) {
        this.$patch((state) => {
          state.searchSessions.push(searchSession)
        })
      } else {
        this.$patch((state) => {
          state.searchSessions[index] = searchSession
        })
      }
    },
    async createProposal(searchSessionUuid: string | undefined) {
      if (!searchSessionUuid) {
        return null
      }

      const url = `${apiBaseUrl}/proposals?` + new URLSearchParams({ search_session_uuid: searchSessionUuid })
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const proposal = (await response.json()) as unknown as Proposal

      this.$patch((state) => {
        state.proposals.push(proposal)
      })

      return proposal.uuid
    },
    async updateProposal(uuid: string | undefined, data: object) {
      const response = await fetch(`${apiBaseUrl}/proposals/${uuid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const proposal = (await response.json()) as unknown as Proposal

      const index = this.proposals.findIndex((proposal) => proposal.uuid === uuid)

      if (index === -1) {
        this.$patch((state) => {
          state.proposals.push(proposal)
        })
      } else {
        this.$patch((state) => {
          state.proposals[index] = proposal
        })
      }
    }
  }
})
