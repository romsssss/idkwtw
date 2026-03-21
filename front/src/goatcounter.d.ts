interface GoatCounter {
  count(vars?: { path?: string; title?: string; referrer?: string; event?: boolean }): void
}

interface Window {
  goatcounter?: GoatCounter
}
