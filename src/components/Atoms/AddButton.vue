<template>
  <button
    class="absolute cursor-pointer bottom-20 right-6 w-14 h-14 bg-indigo-600 text-white text-3xl rounded-full"
    @click="createNew"
  >
    +
  </button>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const emit = defineEmits(['openModal'])

const router = useRouter()
const route = useRoute()

const createNew = () => {
  if (route.fullPath === '/') {
    router.push({ name: 'newNote' })
  } else {
    emit('openModal')
  }
}
</script>
