<template>
  <div class="flex items-center justify-between gap-4 bg-indigo-600 rounded-xl p-2">
    <input
      type="checkbox"
      class="w-6"
      :checked="isCompleted"
      @click.stop
      @change="toggleCompleted($event)"
    />
    <div class="flex-1">
      <h1 class="text-xl text-white font-black">{{ props.title }}</h1>
      <ul class="text-gray-400 flex gap-3 text-md">
        <li>{{ props.date }}</li>
        <li>{{ props.time }}</li>
        <li>{{ props.status }}</li>
      </ul>
    </div>
    <div class="m-auto">
      <Icon
        icon="material-symbols:timer-outline-rounded"
        width="30"
        height="30"
        style="color: #fff"
      />
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

import { computed } from 'vue'

import { useTaskStore } from '@/stores/tasks'

const props = defineProps(['id', 'title', 'date', 'time', 'isCompleted'])
const isCompleted = computed(() => props.isCompleted)
const taskStore = useTaskStore()

const toggleCompleted = (event) => {
  const task = taskStore.findTaskbyId(props.id)
  task.isCompleted = event.target.checked
}
</script>
