<template>
  <div class="flex gap-1">
    <button
      @click="$emit('minus-page')"
      class="px-2 py-1 border border-gray-300 rounded-l-lg bg-white"
    >
      <LeftIcon />
    </button>
    <button
      class="px-2 py-1 border border-gray-300 text-sm"
      :class="
        router.currentRoute.value.query.page == item
          ? 'bg-green-600 text-white'
          : 'bg-white text-green-600'
      "
      @click="$emit('change-page', item)"
      v-for="(item, index) in totalPages"
      :key="index"
    >
      {{ item }}
    </button>
    <button
      @click="$emit('plus-page')"
      class="px-2 py-1 border border-gray-300 rounded-r-lg bg-white"
    >
      <RightIcon />
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import LeftIcon from '../components/Icons/LeftIcon.vue'
import RightIcon from '../components/Icons/RightIcon.vue'

const router = useRouter()

defineProps({
  totalPages: Number
})
</script>
