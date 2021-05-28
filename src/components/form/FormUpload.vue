<template>
  <v-card>
    <v-tabs v-model="defaultTab" background-color="primary" dark>
      <v-tab v-for="(item, key) in tabs" :key="key" :href="'#' + item.value">
        {{ item.text }}
      </v-tab>
    </v-tabs>
    <v-card-text class="pa-3">
      <v-tabs-items v-model="defaultTab">
        <v-tab-item value="local">
          <v-dropzone class="v-dropzone" :option="option" @success="handleSuccess"> </v-dropzone>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
import VDropzone from '@/components/dropzone'
export default {
  name: 'FormUpload',
  components: {
    VDropzone,
  },
  props: {
    uploadUrl: String,
  },
  data() {
    return {
      submiting: false,
      fileUrl: null,
      attrs: {
        accept: 'image/*',
      },
      searchName: null,
      directory: null,
      //tabs
      defaultTab: 'Local',
      tabs: [
        {
          text: 'Local',
          value: 'local',
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['getAccessToken']),
    option() {
      return {
        url: process.env.VUE_APP_BASE_API + this.uploadUrl,
        headers: {
          Authorization: 'Bearer ' + this.getAccessToken,
        },
        testChunks: false,
      }
    },
  },
  watch: {},
  methods: {
    handleUpload() {
      this.submiting = true
      const data = {
        file: this.fileUrl,
      }
      this.$store
        .dispatch('uploadMedia', data)
        .then((resp) => {
          this.submiting = false
          this.$emit('form:success', resp)
        })
        .catch(() => {
          this.submiting = false
        })
    },
    handleSuccess(e) {
      this.$emit('form:success', JSON.parse(e.xhr.response))
    },
  },
}
</script>

<style scoped lang="scss">
.v-dropzone {
  border: 2px dashed #0087f7;
}
</style>
