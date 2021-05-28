import Dropzone from 'dropzone'
Dropzone.autoDiscover = false
export default {
  name: 'v-dropzone',
  props: {
    option: Object,
  },
  data() {
    return {
      dropzone: null,
    }
  },

  watch: {
    option: {
      handler(val) {
        this.$nextTick(() => {
          this.initDropzone(val)
        })
      },
      immediate: true,
    },
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    initDropzone(val) {
      if (this.dropzone) {
        this.dropzone.emit('url-change', val.url)
      } else {
        const dropzone = new Dropzone(this.$refs.dropzone, {
          url: val.url,
          headers: val.headers,
          addRemoveLinks: true,
          init: function () {
            this.on('url-change', (url) => {
              console.log(url)
              this.options.url = url
            })
          },
        })
        dropzone.on('success', (e) => {
          this.$emit('success', e)
        })

        this.dropzone = dropzone
      }
    },
  },
  render(h) {
    const data = {
      staticClass: 'dropzone',
      class: this.classes,
      ref: 'dropzone',
      attrs: { tabindex: this.disabled ? -1 : 0 },
      on: this.$listeners,
    }
    return h('div', data, [this.$slots.default])
  },
}
