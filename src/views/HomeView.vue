<template>
  <nav-menu />
  <NoteItemsWrapper />
  <add-button />
</template>

<script setup>
import NavMenu from '@/components/Molecules/NavMenu.vue'
import NoteItemsWrapper from '@/components/Organisms/NoteItemsWrapper.vue'
import AddButton from '@/components/Atoms/AddButton.vue'

import { useNoteStore } from '@/stores/notes'

const noteStore = useNoteStore()
</script>
