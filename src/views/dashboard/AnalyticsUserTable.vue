<script lang="ts">
import { User } from '@/types/user';
import moment from "moment";

export default defineComponent({
  name: "user-table",

  setup() {
    const page = ref<number>(1);
    const itemsPerPage = ref<number>(10);

    const headers = [
      {
        title: 'Id',
        key: 'id',
      },
      {
        title: 'Email',
        key: 'email',
      },
      {
        title: "Created at",
        key: "createdAt"
      },
      {
        title: "Updated at",
        key: "updatedAt"
      }
    ]

    const userData: User[] = [
      {
        id: 1,
        email: 'gslixby0@abc.net.au',
        createdAt: new Date().toString(),
        updatedAt: new Date().toString()
      },
      {
        id: 2,
        email: 'hredmore1@imgur.com',
        createdAt: new Date().toString(),
        updatedAt: new Date().toString()
      },
      {
        id: 3,
        email: 'msicely2@who.int',
        createdAt: new Date().toString(),
        updatedAt: new Date().toString()
      },
      {
        id: 4,
        email: 'crisby3@wordpress.com',
        createdAt: new Date().toString(),
        updatedAt: new Date().toString()
      },
      {
        id: 5,
        email: 'mhurran4@yahoo.co.jp',
        createdAt: new Date().toString(),
        updatedAt: new Date().toString()
      },
      {
        id: 6,
        email: 'shalstead5@shinystat.com',
        createdAt: new Date().toString(),
        updatedAt: new Date().toString()
      },
      {
        id: 7,
        email: 'bgallemore6@boston.com',
        createdAt: new Date().toString(),
        updatedAt: new Date().toString()
      },
      {
        id: 8,
        email: 'kliger7@vinaora.com',
        createdAt: new Date().toString(),
        updatedAt: new Date().toString()
      },
    ];


    const pageCount = computed(() => Math.ceil(userData.length / itemsPerPage.value));

    const resolveUserRoleVariant = (role: string) => {
      const roleLowerCase = role.toLowerCase()

      if (roleLowerCase === 'subscriber') return { color: 'success', icon: 'ri-user-line' }
      if (roleLowerCase === 'author') return { color: 'error', icon: 'ri-computer-line' }
      if (roleLowerCase === 'maintainer') return { color: 'info', icon: 'ri-pie-chart-line' }
      if (roleLowerCase === 'editor') return { color: 'warning', icon: 'ri-edit-box-line' }
      if (roleLowerCase === 'admin') return { color: 'primary', icon: 'ri-vip-crown-line' }

      return { color: 'success', icon: 'ri-user-line' }
    }

    const resolveUserStatusVariant = (stat: string) => {
      const statLowerCase = stat.toLowerCase()
      if (statLowerCase === 'pending') return 'warning'
      if (statLowerCase === 'active') return 'success'
      if (statLowerCase === 'inactive') return 'secondary'

      return 'primary'
    }

    return {
      headers,
      userData,
      resolveUserRoleVariant,
      resolveUserStatusVariant,
      moment,
      page,
      itemsPerPage,
      pageCount
    }
  }
})


</script>

<template>
  <VCard>
    <VDataTable v-model:page="page" :headers="headers" :items="userData" :items-per-page="itemsPerPage" item-value="id"
      class="text-no-wrap">
      <template #item.id="{ item }">
        <div class="text-capitalize text-high-emphasis">{{ item.id }}</div>
      </template>
      <template #item.email="{ item }">
        <div class="text-capitalize text-high-emphasis">{{ item.email }}</div>
      </template>
      <template #item.createdAt="{ item }">
        <div class="text-capitalize text-high-emphasis">{{ moment(new Date(item.createdAt)).format("DD/MM/YYYY HH:mm") }}
        </div>
      </template>
      <template #item.updatedAt="{ item }">
        <div class="text-capitalize text-high-emphasis">{{ moment(new Date(item.updatedAt)).format("DD/MM/YYYY HH:mm") }}
        </div>
      </template>

      <!-- <template #bottom /> -->
      <template v-slot:bottom>
        <div class="text-center py-3 px-3 d-flex justify-end">
          <VPagination v-model="page" :length="pageCount"></VPagination>
        </div>
      </template>
    </VDataTable>
  </VCard>
</template>
