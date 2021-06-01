<template>
  <div class="v-editor">
    <label>{{ label }}</label>
    <textarea ref="editor" />
    <v-dialog v-model="showDialog" scrollable :retain-focus="false">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Media Manager</v-toolbar-title>
          <v-spacer />
          <v-btn icon @click="handleAttachMedia(selectedItems)">
            <v-icon color="white">mdi-check</v-icon>
          </v-btn>
          <v-btn icon @click="showDialog = false">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="pa-0">
          <media-manager v-model="selectedItems" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import MediaManager from '@/components/media/MediaManager'
import { Jodit } from 'jodit'
export default {
  name: 'VEditor',
  components: {
    MediaManager,
  },
  props: {
    label: {
      type: String,
      default: 'Editor',
    },
    option: {
      type: Object,
      default: () => {
        return {
          height: 400,
        }
      },
    },
    value: {
      type: [String, Object],
      required: true,
      default: 'placeholder',
    },
  },
  data() {
    return {
      editor: null, // jodit instance
      showDialog: false,
      selectedItems: [],
    }
  },
  computed: {},
  watch: {
    value: {
      handler(val) {
        this.editor.value = val
      },
    },
  },
  mounted() {
    const vm = this
    const btns = [
      'source',
      'ul',
      'ol',
      'paragraph',
      'link',
      {
        iconURL:
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkYXRhLXN2Zz0iaW1hZ2UiIGlkPSJzdmciPjxjaXJjbGUgY3g9IjE2LjEiIGN5PSI2LjEiIHI9IjEuMSIvPjxyZWN0IGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgeD0iLjUiIHk9IjIuNSIgd2lkdGg9IjE5IiBoZWlnaHQ9IjE1Ii8+PHBvbHlsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxLjAxIiBwb2ludHM9IjQsMTMgOCw5IDEzLDE0Ii8+PHBvbHlsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxLjAxIiBwb2ludHM9IjExLDEyIDEyLjUsMTAuNSAxNiwxNCIvPjwvc3ZnPg==',
        exec: function (editor) {
          vm.showDialog = true
        },
      },
      'video',
      'table',
      'fullsize',
      'preview',
    ]
    const defaultOptions = {
      useSearch: false,
      height: '400',
      defaultActionOnPaste: 'insert_clear_html',
      disablePlugins: 'addnewline,autofocus,color,font,indent,redoundo',
      buttons: btns,
      buttonsSM: btns,
      buttonsMD: btns,
    }
    const jodit = new Jodit(this.$refs.editor, Object.assign(this.option, defaultOptions))
    this.editor = jodit
    this.editor.value = this.value
    this.editor.events.on('change', (newValue) => this.$emit('input', newValue))
  },
  beforeDestroy() {
    this.editor.destruct()
  },
  methods: {
    handleAttachMedia(items) {
      const item = items[0]
      const image = document.createElement('img')
      const editor = this.editor
      editor.selection.focus()
      image.setAttribute('src', item.url)
      image.setAttribute('alt', item.filename)
      editor.selection.insertImage(image)
      editor.setEditorValue()
      this.showDialog = false
    },
  },
}
</script>
