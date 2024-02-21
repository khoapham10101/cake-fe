<template>
  <v-dialog
    width="500"
    v-model="isOpen"
  >
    <template v-slot:activator="{ props }">
      <v-btn @click="handleOpen"> Create article </v-btn>
    </template>
    <VForm
      @submit.prevent="onSubmit"
      :disabled="isLoading"
    >
      <v-card
        title="Create article"
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
import { CreateArticlePayload } from '@/types/article'
import { Field, useForm } from 'vee-validate'
import * as yup from 'yup'

export default defineComponent({
  name: 'CreateArticleDialog',
  components: {
    Field,
  },

  setup() {
    const articleStore = useArticleStore()
    const isOpen = ref<boolean>(false)
    const isLoading = ref<boolean>(false)

    const validationSchema = yup.object().shape({
      title: yup.string().required(),
      body: yup.string().required(),
    })

    const { handleSubmit, handleReset } = useForm<CreateArticlePayload>({
      validationSchema,
    })

    const form = reactive<CreateArticlePayload>({
      title: '',
      body: '',
    })

    const onSubmit = handleSubmit(async values => {
      // console.log(values)
      isLoading.value = true
      await new Promise(resolve =>
        setTimeout(() => {
          resolve('done')
        }, 1000),
      )
      articleStore.addArticles(values)
      handleClose()
      isLoading.value = false
    })

    const handleOpen = () => {
      isOpen.value = true
    }

    const handleClose = () => {
      isOpen.value = !isOpen.value
      handleReset()
    }

    return {
      isOpen,
      isLoading,
      form,
      onSubmit,
      handleReset,
      handleClose,
      handleOpen,
    }
  },
})
</script>
