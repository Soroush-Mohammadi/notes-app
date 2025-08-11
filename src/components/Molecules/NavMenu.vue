<template>
  <ul class="flex justify-between">
    <li
      v-for="cat in categories"
      :key="cat.id"
      class="text-xs px-4 py-2 cursor-pointer rounded-lg sm:text-base"
      @click="selectCategory(cat.name)"
      :class="{ 'bg-indigo-400 text-white': selectedCategory === cat.name }"
    >
      {{ cat.name }}
    </li>
  </ul>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

import { useNoteStore } from '@/stores/notes'

const categories = ref([
  { name: 'All', id: 1 },
  { name: 'books', id: 2 },
  { name: 'projects', id: 3 },
  { name: 'uncategorized', id: 4 },
])

const noteStore = useNoteStore()
const category = ref('')

const selectCategory = (cat) => (category.value = cat)

const selectedCategory = computed(() =>
  category.value === '' ? categories.value[0].name : category.value,
)

watch(
  selectedCategory,
  (newCategory) => {
    noteStore.setCategory(newCategory)
  },
  { immediate: true },
)
</script>
