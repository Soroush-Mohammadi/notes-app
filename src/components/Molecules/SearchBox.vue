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
import { ref, watch, computed } from 'vue'
import { Icon } from '@iconify/vue'

import { useNoteStore } from '@/stores/notes'
import { useTaskStore } from '@/stores/tasks'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

const route = useRoute()
const searchQuery = ref('')

const taskStore = useTaskStore()
const path = computed(() => route.path)

const { query } = storeToRefs(taskStore)
const noteStore = useNoteStore()

watch(searchQuery, (newQuery) => {
  if (path.value === '/') {
    noteStore.setSearchQuery(newQuery)
  } else {
    query.value = newQuery
  }
})
</script>
