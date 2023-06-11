<template>
  <div>
    <table class="w-full">
      <thead>
        <tr>
          <th></th>
          <th class="py-3"><span class="flex">Full Name</span></th>
          <th class="py-3"><span class="flex">Action</span></th>
        </tr>
      </thead>
      <tbody v-if="usersList.length > 0">
        <tr v-for="(user, index) in usersList" :key="index" class="odd:bg-gray-100 rounded-md">
          <td class="p-3 rounded-l-md">
            <img
              :src="user.avatar"
              :alt="user.first_name"
              class="w-12 h-12 rounded-full object-cover"
            />
          </td>
          <td class="lg:w-4/5">{{ user.first_name }} {{ user.last_name }}</td>
          <td class="rounded-r-lg">
            <button>
              <router-link :to="{ name: 'edit', params: { id: user.id } }">
                <EditIcon />
              </router-link>
            </button>
            <button class="ml-1">
              <DeleteIcon @click="$emit('delete-element', user)" />
            </button>
          </td>
        </tr>
      </tbody>
      <tbody v-if="usersList.length === 0">
        <span>Table is empty</span>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import DeleteIcon from '../components/Icons/DeleteIcon.vue'
import EditIcon from '../components/Icons/EditIcon.vue'

defineProps({
  usersList: Object
})
</script>

<style scoped>
.element {
  border-radius: 12px;
}
.element:nth-child(even) {
  background: gray;
}
</style>
