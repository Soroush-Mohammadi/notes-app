<template>
  <div class="bg-indigo-600 text-white rounded-xl p-3 min-h-[150px]">
    <h1 class="text-xl my-2">
      {{ props.title }}
    </h1>
    <p class="my-2">{{ props.body }}</p>
    <span class="my-2">{{ props.date }}</span>
  </div>
</template>

<script setup>
const props = defineProps(['title', 'body', 'date'])
</script>
