import { ref } from 'vue'

export function useAsyncAction() {
  const isLoading = ref(false)

  async function run(action: () => Promise<void>) {
    if (isLoading.value) return
    isLoading.value = true
    try {
      await action()
    } finally {
      isLoading.value = false
    }
  }

  return { isLoading, run }
}
