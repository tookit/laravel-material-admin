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
import { VTextField, VAutocomplete } from 'vuetify/lib'
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
    ...mapGetters(['getPermissions']),
    formTitle() {
      return this.item ? 'Edit Permission - ' + this.item.name : 'Create Permission'
    },
    formItems() {
      return [
        {
          cols: 6,
          element: VTextField,
          props: {
            name: 'name',
            required: true,
            outlined: true,
            rules: [(v) => !!v || 'name is required'],
          },
        },
        {
          cols: 6,
          element: VTextField,
          props: {
            name: 'description',
            required: true,
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
      },
      immediate: true,
    },
  },
  created() {
    this.$store.dispatch('fetchPermission', { pageSize: -1 })
  },
  methods: {
    handleSubmit() {
      const form = this.$refs.builder.$refs.form
      if (form.validate()) {
        this.loading = true
        const data = this.transformData(this.formModel)
        if (this.item && this.item.id) {
          return this.$store
            .dispatch('updatePermission', {
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
            .dispatch('createPermission', data)
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
