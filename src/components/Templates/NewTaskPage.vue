<template>
  <div class="fixed inset-0 bg-black/50 z-55 flex justify-center items-center" @click="closeModal">
    <div
      v-if="!datePicker"
      class="min-w-[420px] h-60 bg-white grid grid-rows-[1fr_auto_auto] rounded-md p-2"
      @click.stop
    >
      <div class="row flex gap-4 p-4 items-start">
        <input
          type="checkbox"
          v-model="task.isCompleted"
          class="size-6 cursor-pointer rounded-md border-indigo-200 mt-1"
        />
        <textarea
          class="w-full min-h-30 text-md outline-0 border-indigo-300 bg-indigo-100 resize-none rounded-md p-2"
          placeholder="Enter new task here"
          v-model="task.title"
        ></textarea>
      </div>
      <div v-if="error" class="row text-center bg-red-100">
        <span class="text-red-800 text-sm mx-4 text-center px-2">Title required</span>
      </div>
      <div class="row flex px-4 mt-2 gap-1">
        <div
          class="flex items-center gap-x-2 cursor-pointer bg-indigo-400 rounded-md px-2 py-1"
          @click="openDatePicker"
          v-if="!task.date?.length && !task.time?.length"
        >
          <icon
            icon="material-symbols-light:timer-outline-rounded"
            style="color: black"
            height="20"
            width="20"
          />
          <span class="text-sm">set reminder</span>
        </div>
        <div
          class="flex items-center gap-x-2 cursor-pointer bg-indigo-400 rounded-md px-2 py-1"
          v-if="task.date?.length && task.time?.length"
        >
          <icon
            icon="material-symbols-light:timer-outline-rounded"
            style="color: black"
            height="20"
            width="20"
          />
          <div class="flex items-center gap-x-3" v-if="task.date?.length && task.time?.length">
            <span class="text-sm">{{ task.date }} | {{ task.time }}</span>
            <button @click="removeDate">
              <icon
                icon="material-symbols:close"
                style="color: black"
                height="20"
                width="20"
                class="cursor-pointer"
              />
            </button>
          </div>
        </div>
        <div class="ml-auto">
          <button
            class="text-md text-white bg-indigo-600 px-2 rounded-sm cursor-pointer"
            @click="createTask"
          >
            Done
          </button>
        </div>
      </div>
    </div>
    <div v-if="datePicker" class="min-w-[480px]">
      <date-picker @close-datePicker="onCloseDatePicker" @click.stop @send-date="onSendDate" />
    </div>
  </div>
</template>

<script setup>
import { onUnmounted, reactive, ref, watch, computed } from 'vue'
import { Icon } from '@iconify/vue'

import DatePicker from '../Molecules/DatePicker.vue'
import { useTaskStore } from '@/stores/tasks'
import { useRandomId } from '@/composable/useRandomId'

const props = defineProps({
  taskId: {
    type: [Number, String],
    defaults: null,
  },
})

const task = reactive({
  id: '',
  title: '',
  date: '',
  time: '',
  isCompleted: false,
  status: '',
})

const taskStore = useTaskStore()
const originalTask = computed(() => (props.taskId ? taskStore.findTaskbyId(props.taskId) : null))
const isTaskChanged = () => {
  return JSON.stringify(task) !== JSON.stringify(originalTask.value)
}

const defaults = {
  id: '',
  title: '',
  date: '',
  time: '',
  isCompleted: false,
  status: '',
}

watch(
  () => props.taskId,
  (id) => {
    if (id) {
      Object.assign(task, id ? taskStore.findTaskbyId(id) : { ...defaults })
    }
  },
  {
    immediate: true,
  },
)

onUnmounted(() => {
  Object.assign(task, { ...defaults })
  emit('closeModal')
})

const error = ref(false)
const removeError = () => setTimeout(() => (error.value = false), 2000)

const datePicker = ref(false)
const openDatePicker = () => (datePicker.value = true)
const onCloseDatePicker = () => (datePicker.value = false)

const emit = defineEmits(['closeModal'])
const closeModal = () => emit('closeModal')

const onSendDate = (val) => {
  task.date = val.date
  task.time = val.time
}

const removeDate = () => {
  task.date = ''
  task.time = ''
}

const { generateId } = useRandomId()

const createTask = () => {
  if (props.taskId) {
    if (isTaskChanged() && task.title.trim()) {
      taskStore.updateTask({ ...task })

      emit('closeModal')
    } else {
      error.value = true
      removeError()
    }
  } else {
    if (task.title.trim()) {
      task.id = generateId()
      taskStore.addTask({ ...task })
      console.log(task.id)
      emit('closeModal')
    } else {
      error.value = true
      removeError()
    }
  }
}
</script>
