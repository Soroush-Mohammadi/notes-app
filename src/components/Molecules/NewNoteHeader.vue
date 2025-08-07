<template>
  <div class="flex justify-between">
    <button @click="router.push({ name: 'home' })">
      <icon
        icon="material-symbols:arrow-left-alt-rounded"
        height="35"
        width="35"
        style="color: black"
      />
    </button>
    <button v-if="noteChanged" @click="saveNote">
      <icon icon="material-symbols:check" height="35" width="35" style="color: black" />
    </button>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  noteChanged: Boolean,
})

const emit = defineEmits(['saveNote'])

const saveNote = () => emit('saveNote')
</script>
