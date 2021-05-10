<template>
  <v-dialog v-model="visible" :width="width" scrollable>
    <component :is="component" v-bind="data" ref="comp" v-on="on" />
  </v-dialog>
</template>

<script>
export default {
  name: 'CDialog',
  props: {
    width: {
      type: String,
      default: '960px',
    },
  },
  data() {
    return {
      visible: false,
      data: null,
      on: {},
      component: null,
    }
  },
  methods: {
    loadComponent(option) {
      const { component, data, on } = option
      this.component = component
      this.on = on
      this.data = data
    },
    show() {
      this.visible = true
    },
    hide() {
      this.visible = false
    },
  },
}
</script>
