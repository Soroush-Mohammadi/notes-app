<template>
  <div class="h-screen p-4 flex flex-col gap-y-3">
    <div>
      <new-note-header @saveNote="onSaveNote" :noteChanged="noteHasChanged" />
    </div>
    <div class="flex flex-col gap-y-2">
      <input
        type="text"
        class="outline-none text-2xl border-b border-gray-300 py-2"
        placeholder="Title"
        v-model="editedNote.title"
      />
      <input
        type="text"
        placeholder="category"
        class="outline-none text-2xl border-b border-gray-300 py-2"
        v-model="editedNote.category"
      />
    </div>
    <div class="flex gap-x-3">
      <span>{{ editedNote.date }} | {{ editedNote.time }}</span>
      <span>|</span>
      <span>{{ charCount }} characters</span>
    </div>
    <textarea class="w-full outline-none resize-none text-xl" v-model="editedNote.body"> </textarea>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useNoteStore } from '@/stores/notes'
import { useRandomId } from '@/composable/useRandomId'

import NewNoteHeader from '../Molecules/NewNoteHeader.vue'

import { computed, watch, reactive } from 'vue'

const editedNote = reactive({
  title: '',
  category: '',
  body: '',
  date: '',
  time: '',
  id: null,
})

const currentDate = computed(() => new Date().toISOString().split('T')[0])
const currentTime = computed(() =>
  new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }),
)

const route = useRoute()
const router = useRouter()
const noteStore = useNoteStore()
const isEditting = computed(() => !!route.params.id)
const originalNote = computed(() => {
  return isEditting.value ? noteStore.findById(route.params.id) : null
})

const { generateId } = useRandomId()

watch(
  originalNote,
  (val) => {
    if (val) {
      editedNote.title = val.title
      editedNote.date = currentDate.value
      editedNote.body = val.body
      editedNote.category = val.category
      editedNote.time = currentTime.value
      editedNote.id = val.id
    } else {
      editedNote.title = ''
      editedNote.date = currentDate.value
      editedNote.body = ''
      editedNote.category = ''
      editedNote.time = currentTime.value
      editedNote.id = generateId()
    }
  },
  { immediate: true },
)

const noteHasChanged = computed(() => {
  if (!originalNote.value) {
    return editedNote.title !== '' || editedNote.body !== '' || editedNote.category !== ''
  }
  return (
    editedNote.title !== originalNote.value.title ||
    editedNote.body !== originalNote.value.body ||
    editedNote.category !== originalNote.value.category
  )
})

const charCount = computed(() => editedNote.body?.length || 0)
console.log('route.params.id:', route.params.id)
console.log('isEditting:', isEditting.value)

const onSaveNote = () => {
  if (isEditting.value) {
    noteStore.updateNote(route.params.id, {
      title: editedNote.title,
      category: editedNote.category,
      body: editedNote.body,
      date: currentDate.value,
      id: editedNote.id,
    })
  } else {
    noteStore.addNote({
      title: editedNote.title,
      category: editedNote.category,
      body: editedNote.body,
      date: editedNote.date,
      id: editedNote.id,
      time: editedNote.time,
    })
  }

  router.push({ name: 'home' })
}
</script>
