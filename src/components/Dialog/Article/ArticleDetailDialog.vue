<template>
  <v-dialog
    width="500"
    v-model="model"
  >
    <VCard :title="title">
      <VCardText>
        {{ body }}
      </VCardText>

      <VCardItem class="px-5 pb-6">
        <button
          @click="isLiked = !isLiked"
          v-if="open"
        >
          <v-icon :icon="isLiked ? 'ri-thumb-up-fill' : 'ri-thumb-up-line'"></v-icon>
        </button>
      </VCardItem>

      <VCardActions class="d-flex justify-end">
        <v-btn
          color="primary"
          @click="handleClose"
          >Close</v-btn
        >
      </VCardActions>
    </VCard>
  </v-dialog>
</template>

<script lang="ts">
import { Article } from '@/types/article'

export default defineComponent({
  name: 'ArticleDetailDialog',

  props: {
    open: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object as PropType<Article>,
      required: true,
    },
  },

  setup(props, { emit }) {
    const title = computed(() => props.data.title)
    const body = computed(() => props.data.body)
    const isLiked = ref<boolean>(false)

    const model = computed({
      get() {
        return props.open
      },
      set(newValue) {
        if (newValue) {
          return
        }
        emit('close')
      },
    })

    const handleClose = () => {
      emit('close')
    }

    return {
      model,
      title,
      body,
      isLiked,
      handleClose,
    }
  },
})
</script>
