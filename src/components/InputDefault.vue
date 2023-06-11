<template>
  <div class="flex flex-col">
    <label :for="`base-input-${id}`" class="block mb-1 text-sm font-medium text-black">
      <slot />
    </label>
    <div
      class="flex items-center px-3 overflow-hidden text-sm border border-gray-300 rounded-md focus-within:border-accent focus-within:ring-1 focus-within:ring-accent"
    >
      <input
        :id="`base-input-${id}`"
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        class="block w-full placeholder-gray-400 focus:outline-none py-[7px] shadow-sm bg-transparent appearance-none"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <SearchIcon v-if="isIcon" />
    </div>
  </div>
</template>
<script setup>
import SearchIcon from '../components/Icons/SearchIcon.vue'
defineProps({
  modelValue: String,
  modelModifiers: Object,
  id: Number,
  type: String,
  placeholder: String,
  isIcon: Boolean,
  validation: Boolean
})
</script>
