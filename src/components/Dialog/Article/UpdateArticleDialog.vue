<template>
  <v-dialog
    width="500"
    v-model="model"
  >
    <VForm
      @submit.prevent="onSubmit"
      :disabled="isLoading"
    >
      <v-card
        title="Update article"
        class="px-2"
      >
        <v-card-text>
          <VRow>
            <VCol cols="12">
              <Field
                v-slot="{ field, errors }"
                name="title"
                v-model="form.title"
              >
                <v-text-field
                  v-model="field.value"
                  v-bind="field"
                  label="Title"
                  :error-messages="errors"
                />
              </Field>
            </VCol>
            <VCol cols="12">
              <Field
                v-slot="{ field, errors }"
                name="body"
                v-model="form.body"
              >
                <v-textarea
                  v-model="field.value"
                  v-bind="field"
                  label="Body"
                  :error-messages="errors"
                />
              </Field>
            </VCol>
          </VRow>
        </v-card-text>

        <v-card-actions class="d-flex justify-end gap-2 py-3">
          <v-btn @click="handleClose">Close</v-btn>
          <v-btn
            variant="flat"
            type="submit"
            :loading="isLoading"
            >Submit</v-btn
          >
        </v-card-actions>
      </v-card>
    </VForm>
  </v-dialog>
</template>

<script lang="ts">
import { useArticleStore } from '@/stores/articles'
import { Article, CreateArticlePayload } from '@/types/article'
import { Field, useForm } from 'vee-validate'
import * as yup from 'yup'

export default defineComponent({
  name: 'UpdateArticleDialog',
  components: {
    Field,
  },

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
    const {
      data: { id, title, body },
    } = props

    const articleStore = useArticleStore()
    const isLoading = ref<boolean>(false)

    const model = computed({
      get() {
        return props.open
      },
      set(newValue) {
        //  emit('close')
      },
    })

    const validationSchema = yup.object().shape({
      title: yup.string().required(),
      body: yup.string().required(),
    })

    const { handleSubmit, handleReset } = useForm<CreateArticlePayload>({
      validationSchema,
    })

    const form = reactive<CreateArticlePayload>({
      title,
      body,
    })

    const onSubmit = handleSubmit(async values => {
      //   console.log(values)
      isLoading.value = true
      await new Promise(resolve =>
        setTimeout(() => {
          resolve('done')
        }, 1000),
      )
      articleStore.updateArticle({ ...values, id })
      handleClose()
      isLoading.value = false
    })

    const handleClose = () => {
      emit('close')
      handleReset()
    }

    return {
      model,
      isLoading,
      form,
      onSubmit,
      handleReset,
      handleClose,
    }
  },
})
</script>
