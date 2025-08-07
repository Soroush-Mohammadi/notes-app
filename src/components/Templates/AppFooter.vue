<template>
  <div class="flex justify-around h-30 items-center bg-indigo-400">
    <RouterLink to="/" class="text-center">
      <Icon
        icon="material-symbols:text-snippet"
        width="50"
        height="50"
        class="cursor-pointer"
        style="color: black"
      />
      <h1 class="text-black">Notes</h1>
    </RouterLink>
    <RouterLink to="/tasks" class="text-center">
      <Icon
        icon="material-symbols:check-box-rounded"
        width="50"
        height="50"
        class="cursor-pointer"
        style="color: black"
      />
      <h1 class="text-black">Tasks</h1>
    </RouterLink>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
</script>
