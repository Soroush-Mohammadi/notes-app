<template>
  <div
    class="max-w-3/4 flex flex-col justify-between p-4 h-3/4 m-auto gap-2 bg-indigo-100 rounded-md"
  >
    <div class="row">
      <VueDatePicker v-model="date" timePickerInline />
    </div>
    <div class="row text-red-500 text-center">
      <h1>Please select a date</h1>
    </div>
    <div class="row flex gap-2 mt-2">
      <button class="bg-indigo-600 w-full h-10 text-white ronded-md" @click="selectDate">
        select
      </button>
      <button
        class="w-full border text-indigo-500 border-indigo-500 h-10 rounded-md"
        @click="closeDatePicker"
      >
        cancel
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const selectedDate = ref('')
const selectedTime = ref('')
const date = ref()

const emit = defineEmits(['close-datePicker', 'send-date'])
const closeDatePicker = () => emit('close-datePicker')

const selectDate = () => {
  if (date.value instanceof Date) {
    selectedDate.value = date.value.toLocaleDateString()
    selectedTime.value = date.value.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })

    console.log('Date', selectedDate.value)
    console.log('Date', selectedTime.value)
    emit('close-datePicker')
    emit('send-date', {
      date: selectedDate.value,
      time: selectedTime.value,
    })
  }
}
</script>
