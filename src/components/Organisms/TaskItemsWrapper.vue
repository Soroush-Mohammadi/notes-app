<template>
  <div class="grid grid-rows-5 gap-2 max-h-screen">
    <task-item
      v-for="task in tasks"
      :key="task.id"
      :id="task.id"
      :title="task.title"
      :date="task.date"
      :time="task.time"
      :isCompleted="task.isCompleted"
    />
  </div>
</template>

<script setup>
import TaskItem from '../Molecules/TaskItem.vue'
const props = defineProps(['tasks'])
</script>
