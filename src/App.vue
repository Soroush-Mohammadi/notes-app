<template>
  <div class="flex flex-col border border-indigo-800 p-2" id="app-wrapper">
    <header class="my-2" v-if="!hideLayout">
      <page-title-bar :title="pageTitle" />
      <search-box />
    </header>
    <main class="my-4 flex flex-col gap-4 relative">
      <RouterView />
    </main>
    <footer v-if="!hideLayout">
      <app-footer />
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import { useRoute } from 'vue-router'
import { RouterView } from 'vue-router'

import PageTitleBar from './components/Atoms/PageTitleBar.vue'
import SearchBox from './components/Molecules/SearchBox.vue'
import AppFooter from './components/Templates/AppFooter.vue'

const route = useRoute()
// const router = useRouter()

const pageTitle = computed(() => route.meta.title || '')
const hideLayout = computed(() => route.meta.hideLayout === true)
</script>
