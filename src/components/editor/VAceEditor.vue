<template>
  <div>
    <label for="">{{ label }}</label>
    <AceEditor
      v-model="conent"
      lang="markdown"
      theme="monokai"
      width="100%"
      height="500px"
      :options="{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        fontSize: 14,
        highlightActiveLine: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
        showPrintMargin: false,
        showGutter: true,
      }"
      :commands="[
        {
          name: 'save',
          bindKey: { win: 'Ctrl-s', mac: 'Command-s' },
          readOnly: true,
        },
      ]"
      @init="editorInit"
    />
  </div>
</template>

<script>
import AceEditor from 'vuejs-ace-editor'
export default {
  components: { AceEditor },
  props: {
    label: String,
  },
  data() {
    return {
      valid: true,
      conent: null,
    }
  },
  computed: {},
  methods: {
    editorInit: function () {
      require('brace/ext/language_tools') //language extension prerequsite...
      require('brace/mode/markdown')
      require('brace/mode/less')
      require('brace/theme/monokai')
    },
  },
}
</script>
