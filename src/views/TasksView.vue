<template>
  <div v-if="!foundTasks.length">
    <task-items-wrapper :tasks="incompletedTasks" @open-task="onOpenTask" />
    <task-items-wrapper :tasks="completedTasks" @open-task="onOpenTask" />
  </div>
  <div>
    <task-items-wrapper :tasks="foundTasks" @open-task="onOpenTask" />
  </div>

  <add-button @open-modal="onOpenModal" />
  <Teleport to="#app-wrapper">
    <new-task-page v-if="modal" @close-modal="onCloseModal" :taskId="taskId" />
  </Teleport>
</template>

<script setup>
import { computed, ref } from 'vue'

import TaskItemsWrapper from '@/components/Organisms/TaskItemsWrapper.vue'
import AddButton from '@/components/Atoms/AddButton.vue'
import NewTaskPage from '@/components/Templates/NewTaskPage.vue'
import { useTaskStore } from '@/stores/tasks'

//new

const modal = ref(false)

const taskStore = useTaskStore()
const incompletedTasks = computed(() => taskStore.incompletedTasks)
const completedTasks = computed(() => taskStore.completedTasks)

const taskId = ref(null)
const onOpenModal = () => {
  taskId.value = null
  modal.value = true
}
const onCloseModal = () => (modal.value = false)
const onOpenTask = (id) => {
  taskId.value = id
  modal.value = true
}

const foundTasks = computed(() => {
  if (!taskStore.query) return []
  return taskStore.searchTasks
})
</script>
