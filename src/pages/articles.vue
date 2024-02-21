<script lang="ts">
import ArticlesTable from '@/views/dashboard/ArticlesTable.vue'

export default defineComponent({
  name: 'articles',
  components: {
    ArticlesTable,
  },
  setup() {
    //
  },
})
</script>

<template>
  <VRow>
    <VCol cols="12">
      <ArticlesTable />
    </VCol>
  </VRow>
</template>
