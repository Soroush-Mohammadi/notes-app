<template>
  <task-items-wrapper :tasks="incompletedTasks" />
  <task-items-wrapper :tasks="completedTasks" />
  <add-button @open-modal="onOpenModal" />
  <Teleport to="#app-wrapper">
    <new-task-page v-if="modal" @close-modal="onCloseModal" />
  </Teleport>
</template>

<script setup>
import { computed, ref } from 'vue'

import TaskItemsWrapper from '@/components/Organisms/TaskItemsWrapper.vue'
import AddButton from '@/components/Atoms/AddButton.vue'
import NewTaskPage from '@/components/Templates/NewTaskPage.vue'

const incompletedTasks = computed(() => tasks.value.filter((task) => task.isCompleted == false))
const completedTasks = computed(() => tasks.value.filter((task) => task.isCompleted == true))

const modal = ref(false)

const onOpenModal = () => (modal.value = true)
const onCloseModal = () => (modal.value = false)

const tasks = ref([
  {
    id: 'task-1',
    title: 'Check emails',
    date: '06/01/2023',
    time: '13:00',
    isCompleted: false,
    status: 'Expired',
  },
  {
    id: 'task-2',
    title: 'Daily Exercise',
    date: '06/01/2023',
    time: '15:00',
    isCompleted: false,
    status: 'Expired',
  },

  {
    id: 'task-3',
    title: 'Reading Books',
    date: '06/01/2023',
    time: '13:00',
    isCompleted: true,
    status: 'Expired',
  },
  {
    id: 'task-4',
    title: 'Go Shopping',
    date: '06/01/2023',
    time: '15:00',
    isCompleted: true,
    status: 'Expired',
  },
])
</script>
