<script lang="ts">
import ArticleDetailDialog from '@/components/Dialog/Article/ArticleDetailDialog.vue'
import CreateArticleDialog from '@/components/Dialog/Article/CreateArticleDialog.vue'
import UpdateArticleDialog from '@/components/Dialog/Article/UpdateArticleDialog.vue'
import ConfirmDialog from '@/components/Dialog/ConfirmDialog.vue'
import { useArticleStore } from '@/stores/articles'
import { Article } from '@/types/article'
import moment from 'moment'

const initArticleDetail: Article = {
  id: '',
  title: '',
  body: '',
  createdAt: '',
  updatedAt: '',
  likeCount: 0,
}

export default defineComponent({
  name: 'articles-table',
  components: {
    CreateArticleDialog,
    ConfirmDialog,
    UpdateArticleDialog,
    ArticleDetailDialog,
  },

  setup() {
    const articleStore = useArticleStore()
    const page = ref<number>(1)
    const itemsPerPage = ref<number>(10)
    const idArticleDelete = ref<number | string>('')
    const articleUpdate = ref<Article | null>(null)
    const articleDetail = ref<Article | null>(initArticleDetail)

    const headers = [
      { title: 'Id', key: 'id' },
      //   { title: 'User', key: 'userId' },
      { title: 'Title', key: 'title' },
      // { title: 'Body', key: 'body' },
      { title: 'Like count', key: 'likeCount' },
      { title: 'Created at', key: 'createdAt' },
      { title: 'Updated at', key: 'updatedAt' },
      { title: 'Actions', key: 'actions' },
    ]

    const pageCount = computed(() => Math.ceil(articleStore.articlesList.length / itemsPerPage.value))

    const handleConfirm = () => {
      articleStore.removeArticle(idArticleDelete.value)
      idArticleDelete.value = ''
    }

    return {
      headers,
      moment,
      page,
      itemsPerPage,
      pageCount,
      articleStore,
      idArticleDelete,
      handleConfirm,
      articleUpdate,
      articleDetail,
      initArticleDetail,
    }
  },
})
</script>

<template>
  <div class="d-flex justify-end mb-4">
    <CreateArticleDialog />
  </div>
  <VCard>
    <VDataTable
      v-model:page="page"
      :headers="headers"
      :items="articleStore.articlesList"
      :items-per-page="itemsPerPage"
      item-value="id"
      class="text-no-wrap"
    >
      <!-- id -->
      <template #item.id="{ item }">
        <div class="text-capitalize text-high-emphasis">{{ item.id }}</div>
      </template>
      <!-- title -->
      <template #item.title="{ item }">
        <div class="text-capitalize text-high-emphasis">
          <button @click="articleDetail = item">
            {{ item.title }}
          </button>
        </div>
      </template>
      <!-- like count -->
      <template #item.likeCount="{ item }">
        <div class="text-capitalize text-high-emphasis">
          {{ item.likeCount }}
        </div>
      </template>
      <!-- createdAt -->
      <template #item.createdAt="{ item }">
        <div class="text-capitalize text-high-emphasis">
          {{ moment(new Date(item.createdAt)).format('DD/MM/YYYY HH:mm') }}
        </div>
      </template>
      <!-- updatedAt -->
      <template #item.updatedAt="{ item }">
        <div class="text-capitalize text-high-emphasis">
          {{ moment(new Date(item.updatedAt)).format('DD/MM/YYYY HH:mm') }}
        </div>
      </template>

      <!-- actions -->
      <template #item.actions="{ item }">
        <div class="d-flex align-center gap-1">
          <VBtn
            icon="ri-edit-line"
            size="small"
            variant="text"
            color="none"
            @click="() => (articleUpdate = item)"
          >
          </VBtn>
          <VBtn
            icon="ri-delete-bin-line"
            size="small"
            variant="text"
            color="none"
            @click="() => (idArticleDelete = item.id)"
          >
          </VBtn>
        </div>
      </template>

      <template v-slot:bottom>
        <div class="text-center py-3 px-3 d-flex justify-end">
          <VPagination
            v-model="page"
            :length="pageCount"
          ></VPagination>
        </div>
      </template>
    </VDataTable>
  </VCard>

  <ConfirmDialog
    title="Are you sure you want to delete?"
    :open="!!idArticleDelete"
    @cancel="() => (idArticleDelete = '')"
    @confirm="handleConfirm"
  />

  <UpdateArticleDialog
    v-if="!!articleUpdate"
    :open="!!articleUpdate"
    :data="(articleUpdate as Article)"
    @close="() => (articleUpdate = null)"
  />

  <ArticleDetailDialog
    :open="!!articleDetail?.id"
    :data="(articleDetail as Article)"
    @close="() => (articleDetail = initArticleDetail)"
  />
</template>
