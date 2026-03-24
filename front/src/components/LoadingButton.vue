<script setup lang="ts">
defineProps<{
  loading?: boolean
  variant?: 'cta' | 'option'
}>()
</script>

<template>
  <button
    class="btn"
    :class="[variant ? `btn-${variant}` : '', { 'btn-loading': loading }]"
    :disabled="loading"
  >
    <slot />
  </button>
</template>
