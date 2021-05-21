<template>
  <v-form-builder
    ref="builder"
    v-model="formModel"
    :title="formTitle"
    :items="formItems"
    :loading="loading"
    color="primary"
    show-header
    @form:submit="handleSubmit"
    @form:cancel="$emit('form:cancel')"
  />
</template>

<script>
import { VTextField, VTextarea, VAutocomplete } from 'vuetify/lib'
import VEditor from '@/components/editor/VEditor'
import TagSelect from '@/components/tag/TagSelect'
import { mapGetters } from 'vuex'
export default {
  props: {
    item: Object,
    loading: Boolean,
  },
  data() {
    return {
      submitting: false,
      formModel: {},
    }
  },
  computed: {
    ...mapGetters(['getPostCategory']),
    formTitle() {
      return this.item ? 'Edit Post - ' + this.item.name : 'Create Post'
    },
    formItems() {
      return [
        {
          cols: 12,
          element: VTextField,
          props: {
            name: 'name',
            required: true,
            outlined: true,
            rules: [(v) => !!v || 'Name is required'],
          },
        },
        {
          cols: 6,
          element: VAutocomplete,
          props: {
            name: 'category_id',
            required: true,
            outlined: true,
            items: this.getPostCategory,
            itemText: 'name',
            itemValue: 'id',
            rules: [(v) => !!v || 'Category is required'],
          },
        },
        {
          cols: 6,
          element: TagSelect,
          props: {
            name: 'tags',
            items: [],
          },
        },
        {
          cols: 12,
          element: VTextarea,
          props: {
            name: 'description',
            outlined: true,
          },
        },

        {
          cols: 12,
          element: VEditor,
          props: {
            name: 'body',
            outlined: true,
          },
        },
      ]
    },
  },
  watch: {
    item: {
      handler(item) {
        this.formModel = Object.assign({}, item) || {}
        this.formModel.tags = item && item.tags.length > 0 ? item.tags.map((item) => item.name) : []
      },
      immediate: true,
    },
  },
  created() {
    this.$store.dispatch('fetchPostCategory', { pageSize: -1 })
  },
  methods: {
    handleSubmit() {
      const form = this.$refs.builder.$refs.form
      if (form.validate()) {
        this.submitting = true
        const data = this.transformData(this.formModel)
        if (this.item && this.item.id) {
          return this.$store
            .dispatch('updatePost', {
              id: this.item.id,
              data: data,
            })
            .then(({ data }) => {
              this.$emit('form:success', data)
              this.submitting = false
            })
            .catch(() => {
              this.$emit('form:failed')
              this.submitting = false
            })
        } else {
          return this.$store
            .dispatch('createPost', data)
            .then(({ data }) => {
              this.$emit('form:success', data)
              this.submitting = false
            })
            .catch(() => {
              this.$emit('form:failed')
              this.submitting = false
            })
        }
      }
    },
    transformData(data) {
      return data
    },
  },
}
</script>
