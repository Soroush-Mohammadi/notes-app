import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TasksView from '@/views/TasksView.vue'
import NewNotePage from '@/components/Templates/NewNotePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Notes',
      },
    },

    {
      path: '/notes/new',
      name: 'newNote',
      component: NewNotePage,
      meta: {
        hideLayout: true,
      },
    },

    {
      path: '/notes/:id',
      name: 'note-view',
      component: NewNotePage,
      meta: {
        hideLayout: true,
      },
    },

    {
      path: '/tasks',
      name: 'tasks',
      component: TasksView,
      meta: {
        title: 'Tasks',
      },
    },
  ],
})

export default router
