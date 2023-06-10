<template>
  <Transition>
    <BaseModal v-if="openModal">
      <div class="flex items-center justify-center h-full w-full">
        <div class="bg-white p-4 flex flex-col">
          <span>Do you really want to remove the ?</span>
          <span>{{ userForDelete.first_name }} {{ userForDelete.last_name }}</span>
          <div class="flex gap-2 mt-2">
            <button @click="closeModal" type="">No</button>
            <button @click="deleteUser" type="">Yes</button>
          </div>
        </div>
      </div>
    </BaseModal>
  </Transition>

  <div class="container block mx-auto py-4 px-4 xl:px-0 xl:py-16">
    <div class="mb-4">
      <BaseHeading> Add User </BaseHeading>

      <div class="bg-white px-4 py-10 rounded-md shadow-md mt-8">
        <div class="flex justify-between">
          <InputDefault isIcon placeholder="Search for users..." class="xl:min-w-[500px]" />
          <router-link :to="{ name: 'add' }">
            <ButtonDefault :addUser="true">Add user</ButtonDefault>
          </router-link>
        </div>
        <div class="mt-6 border-t pt-10">
          <MainTable :usersList="usersList" @usun-element="usun($event)" />
        </div>
      </div>
    </div>

    <BasePagination
      @change-page="changePage($event)"
      @minus-page="minusPage($event)"
      @plus-page="plusPage($event)"
      :totalPages="totalPages"
    />
  </div>
</template>

<script setup>
import MainTable from '../components/MainTable.vue'
import InputDefault from '../components/InputDefault.vue'
import BasePagination from '../components/BasePagination.vue'
import ButtonDefault from '../components/ButtonDefault.vue'
import BaseHeading from '../components/BaseHeading.vue'
import BaseModal from '../components/BaseModal.vue'

import { reactive, ref, computed } from 'vue'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseHeadingVue from '../components/BaseHeading.vue'

let usersList = ref([])
const openModal = ref(false)
const isLoader = ref(false)
const activePage = ref(1)
const perPage = ref(8)
const totalPages = ref(0)
const router = useRouter()
const route = useRoute().params.id
const userForDelete = ref(0)

const getData = async () => {
  await fetch(`https://reqres.in/api/users?page=${activePage.value}&per_page=${perPage.value}`)
    .then((res) => res.json())
    .then((data) => {
      usersList.value = data.data
      totalPages.value = data.total_pages
    })
    .catch((err) => {
      console.log(err)
    })
  router.push({ path: '/', query: { page: activePage.value } })
}

const usun = (usun) => {
  userForDelete.value = usun
  openModal.value = true
}

const deleteUser = () => {
  console.log(userForDelete.value)
  fetch(`https://reqres.in/api/users/${userForDelete.value.id}`, {
    method: 'DELETE'
  })
    .then((res) => res)
    .then((res) => console.log(res))
  openModal.value = false
  getData()
}

const changePage = (item) => {
  activePage.value = item

  getData()
}

const minusPage = (item) => {
  activePage.value = activePage.value - 1
  if (activePage.value <= 0) {
    activePage.value = 1
  }
  getData()
}

const plusPage = (item) => {
  activePage.value = activePage.value + 1

  getData()
}

const closeModal = () => {
  openModal.value = false
}

onMounted(() => {
  const page = useRouter().currentRoute.value.query.page

  if (page <= 0) {
    activePage.value = 1
  } else if (page === undefined) {
    activePage.value = 1
  } else {
    activePage.value = page
  }

  getData()
})
</script>
