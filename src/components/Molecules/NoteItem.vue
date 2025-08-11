<template>
  <div
    class="bg-indigo-600 text-white rounded-xl p-3 text-xs max-h-30 sm:max-h-40 md:max-w-60 md:text-sm"
  >
    <h1 class="my-2">
      {{ props.title }}
    </h1>
    <p class="my-2">{{ props.body }}</p>
    <span class="my-2">{{ props.date }}</span>
  </div>
</template>

<script setup>
const props = defineProps(['title', 'body', 'date'])
</script>
