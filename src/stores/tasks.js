import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTaskStore = defineStore('tasks', () => {
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

  const incompletedTasks = computed(() => tasks.value.filter((task) => task.isCompleted == false))
  const completedTasks = computed(() => tasks.value.filter((task) => task.isCompleted == true))

  const findTaskbyId = (id) => {
    return tasks.value.find((task) => task.id == id)
  }

  const updateTask = (updatedTask) => {
    const index = tasks.value.findIndex((t) => t.id === updatedTask.id)
    if (index !== -1) {
      tasks.value[index] = { ...updatedTask }
    }
  }

  const addTask = (task) => {
    tasks.value.push(task)
  }

  const query = ref('')

  const searchTasks = computed(() => {
    const q = query.value.trim().toLowerCase()
    return tasks.value.filter((task) => task.title.toLowerCase().includes(q))
  })

  return {
    tasks,
    incompletedTasks,
    completedTasks,
    findTaskbyId,
    updateTask,
    addTask,
    query,
    searchTasks,
  }
})
