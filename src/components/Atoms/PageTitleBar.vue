<template>
  <div class="text-3xl p-4">
    <h1>
      {{ props.title }}
    </h1>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
})
</script>
