<template>
  <DefaultLayout>
    <div class="flex flex-col w-full">
      <BaseHeading> Edit User </BaseHeading>
      <form @submit.prevent="updateDetails">
        <div class="flex flex-col xl:flex-row w-full gap-6 mt-8">
          <div class="w-full xl:w-3/4 bg-white xl:min-h-[378px] rounded-md shadow-md">
            <div class="p-6 flex flex-col justify-between h-full">
              <div class="flex flex-col justify-between h-full">
                <div class="flex flex-col xl:flex-row w-full gap-6">
                  <InputDefault
                    :id="1"
                    placeholder="name"
                    :validation="validationName"
                    class="xl:w-1/2"
                    v-model="name"
                    >First name</InputDefault
                  >
                  <InputDefault
                    :id="2"
                    placeholder="surname"
                    :validation="validationSurname"
                    class="xl:w-1/2"
                    v-model="surname"
                    >Last Name</InputDefault
                  >
                </div>
                <div class="mt-4 xl:mt-0">
                  <ButtonDefault :update="true" type="submit">Add User</ButtonDefault>
                </div>
              </div>
            </div>
          </div>
          <div
            class="w-full xl:w-1/4 bg-white flex items-center flex-col justify-center p-4 rounded-md shadow-md"
          >
            <img
              :src="image"
              alt="user-img"
              class="w-[150px] h-[150px] border-2 border-gray-300 rounded-full object-cover"
            />

            <InputDefault v-if="photoInput" v-model="image" class="mt-4" />

            <button
              @click="photoInput = !photoInput"
              type="button"
              class="border rounded border-gray-500 w-full mt-[90px] flex items-center justify-center gap-3"
            >
              <PhotoIcon />
              <span class="text-gray-500">change photo</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </DefaultLayout>
</template>

<script setup>
import InputDefault from '../components/InputDefault.vue'
import ButtonDefault from '../components/ButtonDefault.vue'
import BaseHeading from '../components/BaseHeading.vue'
import PhotoIcon from '../components/Icons/PhotoIcon.vue'
import DefaultLayout from '../layouts/Default.vue'

import { reactive, ref } from 'vue'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const name = ref('')
const surname = ref('')
const image = ref('https://img.freepik.com/free-icon/user_318-159711.jpg')
const photoInput = ref(false)
const route = useRoute()
const router = useRouter()
const validationName = ref(false)
const validationSurname = ref(false)

let userData = ref([])

const id = useRoute().params.id
const getData = async () => {
  await fetch(`https://reqres.in/api/users/${id}`)
    .then((res) => res.json())
    .then((data) => {
      userData.value = data
      name.value = data.data.first_name
      surname.value = data.data.last_name
      image.value = data.data.avatar
    })
    .catch((err) => {
      console.log(err)
    })
}

const updateDetails = () => {
  const formData = {
    first_name: name.value,
    last_name: surname.value,
    avatar: image.value === '' ? userData.value.data.avatar : image.value
  }

  if (name.value != '' && surname.value != '') {
    validationName.value = false
    validationSurname.value = false
    fetch(`https://reqres.in/api/users/${route.params.id}`, {
      method: 'PUT',
      body: formData.value
    })
      .then((res) => res)
      .then((res) => {
        console.log(res)
        setTimeout(() => {
          router.push({ path: '/' })
        }, '1000')
      })
      .catch((err) => {
        console.log(err)
      })
  } else if (name.value != '' && surname.value === '') {
    validationName.value = false
    validationSurname.value = true
  } else if (name.value === '' && surname.value != '') {
    validationName.value = true
    validationSurname.value = false
  } else {
    validationName.value = true
    validationSurname.value = true
  }
}

onMounted(() => {
  getData()
})
</script>
