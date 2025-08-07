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
          :checked="false"
          class="size-6 cursor-pointer rounded-md border-indigo-200 mt-1"
        />
        <textarea
          class="size-full text-md outline-0 border-indigo-300 bg-indigo-100 resize-none rounded-md p-2"
          placeholder="Enter new task here"
        ></textarea>
      </div>
      <div class="row text-center">
        <span class="text-red-800 text-md mx-4 text-center px-2">Error</span>
      </div>
      <div class="row flex px-4 mt-2 gap-1">
        <div
          class="flex items-center gap-x-2 cursor-pointer bg-indigo-400 rounded-md px-2 py-1"
          @click="openDatePicker"
        >
          <icon
            icon="material-symbols-light:timer-outline-rounded"
            style="color: black"
            height="20"
            width="20"
          />
          <span class="text-sm">set reminder</span>
        </div>
        <div class="flex items-center gap-x-2 cursor-pointer bg-indigo-400 rounded-md px-2 py-1">
          <icon
            icon="material-symbols-light:timer-outline-rounded"
            style="color: black"
            height="20"
            width="20"
          />
          <div class="flex items-center gap-x-3">
            <span class="text-sm">date | time</span>
            <button>
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
          <button class="text-md text-white bg-indigo-600 px-2 rounded-sm cursor-pointer">
            Done
          </button>
        </div>
      </div>
    </div>
    <div v-if="datePicker" class="min-w-[480px]">
      <date-picker @close-datePicker="onCloseDatePicker" @click.stop />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

import DatePicker from '../Molecules/DatePicker.vue'

const datePicker = ref(false)
const openDatePicker = () => (datePicker.value = true)
const onCloseDatePicker = () => (datePicker.value = false)

const emit = defineEmits(['closeModal'])
const closeModal = () => emit('closeModal')
</script>
