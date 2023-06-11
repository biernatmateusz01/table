<template>
  <button
    v-if="addUser"
    :type="type"
    class="px-6 py-3 bg-green-600 rounded-full flex items-center text-white"
  >
    <PlusIcon />
    <span class="ml-3 text-sm font-bold"><slot /></span>
  </button>
  <button v-if="update" :type="type" class="bg-green-700 text-white text-sm rounded px-5 py-3">
    <slot />
  </button>
</template>

<script setup>
import PlusIcon from '../components/Icons/PlusIcon.vue'

defineProps({
  addUser: Boolean,
  update: Boolean,
  type: String
})
</script>
