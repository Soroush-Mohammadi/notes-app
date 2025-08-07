import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useNoteStore = defineStore('notes', () => {
  const notes = ref([
    {
      id: 1,
      title: 'Project Note 1',
      date: '2025-07-10',
      body: 'Details about project note 1.',
      category: 'uncategorized',
      time: '06:03',
    },
    {
      id: 2,
      title: 'Project Note 2',
      date: '2025-07-11',
      body: 'Details about project note 2.',
      category: 'books',
      time: '03:12',
    },
    {
      id: 3,
      title: 'Project Note 3',
      date: '2025-07-10',
      body: 'Details about project note 3.',
      category: 'projects',
      time: '05:04',
    },
    {
      id: 4,
      title: 'Project Note 4',
      date: '2025-07-11',
      body: 'Details about project note 4.',
      category: 'books',
      time: '07:42',
    },
  ])

  const searchQuery = ref('')
  const selectCatgegory = ref('')

  const setSearchQuery = (searchItem) => (searchQuery.value = searchItem)
  const setCategory = (category) => (selectCatgegory.value = category)

  const filterNotes = computed(() => {
    let filtered = notes.value

    const q = searchQuery.value.toLowerCase()

    if (q !== '') {
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(q) ||
          note.body.toLowerCase().includes(q) ||
          note.category.toLowerCase().includes(q),
      )
    }

    if (selectCatgegory.value && selectCatgegory.value !== 'All') {
      filtered = filtered.filter((note) => note.category === selectCatgegory.value)
    }

    return filtered
  })

  const findById = (id) => {
    return notes.value.find((note) => note.id == id)
  }

  const updateNote = (id, updatedFields) => {
    const index = notes.value.findIndex((n) => n.id === parseInt(id))
    if (index !== -1) {
      notes.value[index] = { ...notes.value[index], ...updatedFields }
    }
  }

  const addNote = (newNote) => {
    notes.value.push(newNote)
  }

  watch(
    () => notes,
    (val) => console.log(val),
  )

  return { notes, setSearchQuery, setCategory, filterNotes, findById, updateNote, addNote }
})
