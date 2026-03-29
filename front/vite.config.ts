import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

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
  // @ts-expect-error vite-ssg options are not in standard Vite UserConfig
  ssgOptions: {
    script: 'async',
    includedRoutes(paths: string[]) {
      const collectionSlugs = [
        'feel-good-movies', 'date-night-movies', 'scary-movies-for-date-night',
        'movies-to-watch-alone-at-night', 'movies-to-watch-with-friends',
        'movies-to-watch-with-kids', 'movies-to-watch-with-family',
        'movies-for-couples', 'mind-bending-movies', 'movies-that-make-you-cry',
        'movies-that-make-you-think', 'cozy-movies-for-rainy-days',
        'epic-movies-to-watch', 'movies-to-watch-with-girlfriend',
        'movies-to-watch-with-boyfriend'
      ]
      return [
        ...paths.filter((p) => !p.includes(':slug')),
        ...collectionSlugs.map((s) => `/movies/${s}`)
      ]
    }
  }
})
