import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import type { ViteSSGOptions } from 'vite-ssg'
import { COLLECTION_SLUGS } from './src/data/collections'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    passWithNoTests: true
  },
  ssgOptions: {
    script: 'async',
    includedRoutes(paths) {
      return [
        ...paths.filter((p) => !p.includes(':slug')),
        ...COLLECTION_SLUGS.map((s) => `/movies/${s}`)
      ]
    }
  } satisfies ViteSSGOptions
})
