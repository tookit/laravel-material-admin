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
    ...mapGetters(['getUserFlags', 'getUserGenders', 'getUserRoles']),
    formTitle() {
      return this.item ? 'Edit User - ' + this.item.username : 'Create User'
    },
    formItems() {
      return [
        {
          cols: 6,
          element: VTextField,
          props: {
            name: 'username',
            required: true,
            outlined: true,
            rules: [(v) => !!v || 'Username is required'],
          },
        },
        {
          cols: 6,
          element: VTextField,
          props: {
            name: 'email',
            required: true,
            outlined: true,
            rules: [(v) => !!v || 'Email is required'],
          },
        },
        {
          cols: 6,
          element: VTextField,
          props: {
            name: 'firstname',
            required: true,
            outlined: true,
          },
        },
        {
          cols: 6,
          element: VTextField,
          props: {
            name: 'lastname',
            required: true,
            outlined: true,
          },
        },
        {
          cols: 6,
          element: VAutocomplete,
          props: {
            name: 'gender',
            required: true,
            outlined: true,
            items: this.getUserGenders,
          },
        },
        {
          cols: 6,
          element: VAutocomplete,
          props: {
            name: 'flag',
            required: true,
            outlined: true,
            items: this.getUserFlags,
          },
        },
        {
          cols: 12,
          element: VAutocomplete,
          props: {
            name: 'role_ids',
            required: true,
            outlined: true,
            items: this.getUserRoles,
            itemText: 'name',
            itemValue: 'id',
            multiple: true,
          },
        },
      ]
    },
  },
  watch: {
    item: {
      handler(item) {
        this.formModel = Object.assign({}, item) || {}
        this.formModel.role_ids = item.roles.length > 0 ? item.roles.map((item) => item.id) : []
      },
      immediate: true,
    },
  },
  created() {
    this.$store.dispatch('fetchRole', { pageSize: -1 })
  },
  methods: {
    handleSubmit() {
      const form = this.$refs.builder.$refs.form
      if (form.validate()) {
        this.loading = true
        const data = this.transformData(this.formModel)
        if (this.item && this.item.id) {
          return this.$store
            .dispatch('updateUser', {
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
            .dispatch('createUser', data)
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
