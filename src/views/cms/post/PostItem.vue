<template>
  <v-container>
    <v-row>
      <v-col>
        <form-post :loading="loading" :item="item" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FormPost from './FormPost'

export default {
  components: {
    FormPost,
  },
  props: {
    id: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {
      loading: true,
      item: null,
    }
  },
  watch: {
    id: {
      handler(id) {
        this.fetchRecordById(id)
      },
      immediate: true,
    },
  },
  methods: {
    fetchRecordById(id) {
      this.loading = true
      this.$store
        .dispatch('getPostById', id)
        .then((resp) => {
          this.item = resp.data
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
  },
}
</script>

<style></style>
