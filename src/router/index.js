import { createRouter, createWebHistory } from 'vue-router'
import ListView from '../views/ListView.vue'
import UserParent from '../views/UserParent.vue'
import Edit from '../views/EditView.vue'
import Add from '../views/AddNew.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/user',
      component: UserParent,
      children: [
        {
          path: '/',
          name: 'user',
          component: ListView
        },
        {
          path: '/edit/:id',
          name: 'edit',
          component: Edit
        }
      ]
    },
    {
      path: '/add',
      name: 'add',
      component: Add
    }
  ]
})

export default router
