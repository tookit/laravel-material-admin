<template>
  <v-form-builder
    ref="builder"
    v-model="formModel"
    :title="formTitle"
    :items="formItems"
    :loading="loading"
    color="primary"
    @form:submit="handleSubmit"
    @form:cancel="$emit('form:cancel')"
  />
</template>

<script>
import { VTextField, VTextarea, VAutocomplete } from 'vuetify/lib'
import ImagePicker from '@/components/image/ImagePicker'
import { mapGetters } from 'vuex'
import { EMAIL } from '@/util/regex'
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
    ...mapGetters(['getUserGenders']),
    formTitle() {
      return 'Profile'
    },
    formItems() {
      return [
        {
          cols: 12,
          element: ImagePicker,
          props: {
            name: 'avatar',
            required: true,
            outlined: true,
          },
        },
        {
          cols: 6,
          element: VTextField,
          props: {
            name: 'username',
            required: true,
            outlined: true,
            rules: [(v) => !!v || 'username is required'],
          },
        },
        {
          cols: 6,
          element: VTextField,
          props: {
            name: 'email',
            outlined: true,
            rules: [(v) => !!v || 'This field is required', (v) => EMAIL.test(v) || 'Invalid email'],
          },
        },
        {
          cols: 6,
          element: VTextField,
          props: {
            name: 'firstname',
            outlined: true,
          },
        },
        {
          cols: 6,
          element: VTextField,
          props: {
            name: 'lastname',
            outlined: true,
          },
        },
        {
          cols: 6,
          element: VTextField,
          props: {
            name: 'mobile',
            outlined: true,
          },
        },
        {
          cols: 6,
          element: VAutocomplete,
          props: {
            name: 'gender',
            outlined: true,
            items: this.getUserGenders,
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
  created() {},
  methods: {
    handleSubmit() {
      const form = this.$refs.builder.$refs.form
      if (form.validate()) {
        this.loading = true
        const data = this.transformData(this.formModel)
        return this.$store
          .dispatch('updateProfile', data)
          .then(({ data }) => {
            this.$emit('form:success', data)
            this.loading = false
          })
          .catch(() => {
            this.$emit('form:failed')
            this.loading = false
          })
      }
    },
    transformData(data) {
      return data
    },
  },
}
</script>
