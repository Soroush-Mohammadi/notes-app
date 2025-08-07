<template>
  <div class="relative w-full h-10">
    <input
      type="text"
      id="input"
      class="bg-indigo-400 rounded-full w-full h-11 pl-10"
      placeholder="search notes"
      v-model="searchQuery"
    />
    <Icon
      icon="material-symbols:search-rounded"
      width="24"
      height="24"
      style="color: #fff"
      class="absolute top-3 left-3"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Icon } from '@iconify/vue'

import { useNoteStore } from '@/stores/notes'

const searchQuery = ref('')

const noteStore = useNoteStore()

watch(searchQuery, (newQuery) => {
  noteStore.setSearchQuery(newQuery)
})
</script>
