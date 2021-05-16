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
    ...mapGetters(['getUsers', 'getPermissions']),
    formTitle() {
      return this.item ? 'Edit Role - ' + this.item.name : 'Create Role'
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
            name: 'guard_name',
            required: true,
            outlined: true,
            rules: [(v) => !!v || 'Guard name is required'],
          },
        },
        {
          cols: 12,
          element: VAutocomplete,
          props: {
            name: 'user_ids',
            required: true,
            outlined: true,
            items: this.getUsers,
            itemText: 'name',
            itemValue: 'id',
            multiple: true,
            chips: true,
            deletableChips: true,
          },
        },
        {
          cols: 12,
          element: VAutocomplete,
          props: {
            name: 'permission_ids',
            label: 'Permission Set',
            required: true,
            outlined: true,
            items: this.getPermissions,
            itemText: 'name',
            itemValue: 'id',
            multiple: true,
            chips: true,
            deletableChips: true,
          },
        },
      ]
    },
  },
  watch: {
    item: {
      handler(item) {
        this.formModel = Object.assign({}, item) || {}
        this.formModel.user_ids = item.users.length > 0 ? item.users.map((item) => item.id) : []
      },
      immediate: true,
    },
  },
  created() {
    this.$store.dispatch('fetchUser', { pageSize: -1 })
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
            .dispatch('updateRole', {
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
            .dispatch('createRole', data)
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
