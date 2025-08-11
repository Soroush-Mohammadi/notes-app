<template>
  <div class="grid grid-rows-5 min-h-screen sm:max-h-screen md:grid-cols-2 md:grid-rows-5">
    <router-link v-for="note in noteStore.filterNotes" :key="note.id" :to="`/notes/${note.id}`">
      <note-item :title="note.title" :body="note.body" :date="note.date" class="cursor-pointer" />
    </router-link>
  </div>
</template>

<script setup>
import NoteItem from '../Molecules/NoteItem.vue'

import { useNoteStore } from '@/stores/notes'

const noteStore = useNoteStore()
</script>
