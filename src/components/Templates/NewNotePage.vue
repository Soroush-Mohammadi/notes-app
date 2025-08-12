<template>
  <div class="h-screen p-4 flex flex-col gap-y-3">
    <div>
      <new-note-header @saveNote="OnSaveNote" :noteChanged="noteHasChanged" />
    </div>
    <div class="flex flex-col gap-y-2">
      <input
        type="text"
        class="outline-none text-2xl border-b border-gray-400 py-2"
        placeholder="Title"
        v-model="editedNote.title"
      />
      <input
        type="text"
        placeholder="category"
        class="outline-none text-2xl border-b border-gray-400 py-2"
        v-model="editedNote.category"
      />
    </div>
    <div class="flex gap-x-3">
      <span> {{ editedNote.date }} | {{ editedNote.time }}</span>
      <span>|</span>
      <span>{{ charCount }} characters</span>
    </div>
    <textarea
      class="w-full outline-none resize-none text-xl"
      placeholder="Start typing"
      v-model="editedNote.body"
    ></textarea>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from 'vue'

import NewNoteHeader from '../Molecules/NewNoteHeader.vue'
import { useRoute } from 'vue-router'
import { useRandomId } from '@/composable/useRandomId'
import { useNoteStore } from '@/stores/notes'
import { useRouter } from 'vue-router'

const noteStore = useNoteStore()
const currentDate = computed(() => new Date().toISOString().split('T')[0])
const currentTime = computed(() =>
  new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }),
)
const charCount = computed(() => editedNote.body?.length || 0)

const editedNote = reactive({
  title: '',
  body: '',
  category: '',
  date: '',
  time: '',
  id: null,
})

const route = useRoute()
const router = useRouter()

const isEditting = computed(() => !!route.params.id)
const orginalNote = computed(() => {
  return isEditting.value ? noteStore.findById(route.params.id) : null
})

const noteHasChanged = computed(() => {
  if (!orginalNote.value) {
    return editedNote.title !== '' || editedNote.body !== '' || editedNote.category !== ''
  }

  return (
    editedNote.title !== orginalNote.value.title ||
    editedNote.body !== orginalNote.value.body ||
    editedNote.category !== orginalNote.value.category
  )
})

//new
const { generateId } = useRandomId()

watch(
  orginalNote,
  (val) => {
    if (val) {
      Object.assign(editedNote, {
        title: val.title,
        body: val.body,
        category: val.category,
        date: val.date,
        time: val.time,
        id: val.id,
      })
    } else {
      Object.assign(editedNote, {
        title: '',
        body: '',
        category: '',
        date: currentDate.value,
        time: currentTime.value,
        id: generateId(),
      })
    }
  },
  { immediate: true },
)

const OnSaveNote = () => {
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
