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
import { mapGetters } from 'vuex'
export default {
  props: {
    item: Object,
  },
  data() {
    return {
      loading: false,
      formModel: {},
    }
  },
  computed: {
    ...mapGetters(['getProjectList', 'getProjectStatus']),
    formTitle() {
      return this.item ? 'Edit Project Task - ' + this.item.name : 'Create Project Task'
    },
    formItems() {
      return [
        {
          cols: 12,
          element: VAutocomplete,
          props: {
            name: 'project_id',
            required: true,
            outlined: true,
            items: this.getProjectList,
            rules: [(v) => !!v || 'Project is required'],
          },
        },
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
          cols: 12,
          element: VTextarea,
          props: {
            name: 'description',
            outlined: true,
          },
        },
        {
          cols: 6,
          element: VAutocomplete,
          props: {
            name: 'status',
            outlined: true,
            items: this.getProjectStatus,
          },
        },
      ]
    },
  },
  watch: {
    item: {
      handler(item) {
        this.formModel = item || {}
      },
      immediate: true,
    },
  },
  created() {
    this.$store.dispatch('fetchProject', { pageSize: -1 })
    this.$store.dispatch('fetchProjectStatus')
  },
  methods: {
    handleSubmit() {
      const form = this.$refs.builder.$refs.form
      if (form.validate()) {
        this.loading = true
        const data = this.transformData(this.formModel)
        if (this.item && this.item.id) {
          return this.$store
            .dispatch('updateTask', {
              id: this.item.id,
              data: data,
            })
            .then(({ data }) => {
              this.$emit('form:success', data)
              this.loading = false
            })
            .catch(() => {
              this.$emit('form:failed')
              this.loading = false
            })
        } else {
          return this.$store
            .dispatch('createTask', data)
            .then(({ data }) => {
              this.$emit('form:success', data)
              this.loading = false
            })
            .catch(() => {
              this.$emit('form:failed')
              this.loading = false
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
