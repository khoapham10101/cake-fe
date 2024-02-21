<template>
  <v-dialog
    width="500"
    v-model="model"
  >
    <v-card class="px-5 pt-5 pb-2">
      <v-card-text
        class="text-h5 text-left"
        style="padding: 0"
      >
        {{ title }}
      </v-card-text>
      <v-card-actions class="d-flex justify-end pt-6">
        <v-btn
          size="small"
          color="primary"
          @click="handleCancel"
          >Cancel</v-btn
        >
        <v-btn
          size="small"
          color="primary"
          variant="flat"
          @click="handleConfirm"
          >Confirm</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
export default defineComponent({
  name: 'ConfirmDialog',
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      requred: true,
    },
  },
  setup(props, { emit }) {
    const { open, title } = toRefs(props)

    const handleCancel = () => {
      emit('cancel')
    }

    const handleConfirm = () => {
      emit('confirm')
    }

    const model = computed({
      get() {
        return props.open
      },
      set(newValue) {
        if (newValue) {
          return
        }
        emit('cancel')
      },
    })

    return {
      open,
      title,
      handleCancel,
      handleConfirm,
      model,
    }
  },
})
</script>
