<template>
  <v-combobox
    v-model="inputValue"
    :label="label"
    :placeholder="placeholder"
    outlined
    :items="getTagsByType(type)"
    :loading="isLoading"
    :search-input.sync="searchName"
    item-text="text"
    item-value="name"
    deletable-chips
    multiple
    small-chips
    :return-object="false"
    @change="handleChange"
  >
    <template #no-data>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            No results matching "<strong>{{ searchName }}</strong
            >". Press <kbd>enter</kbd> to create a new one
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
    <template #selection="{ attrs, item, parent, selected }">
      <v-chip v-bind="attrs" :input-value="selected" label small>
        <span class="pr-2">
          {{ item }}
        </span>
        <v-icon small @click="parent.selectItem(item)"> mdi-close </v-icon>
      </v-chip>
    </template>
  </v-combobox>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    label: String,
    placeholder: String,
    value: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: 'post',
    },
  },
  data() {
    return {
      searchName: '',
      isLoading: false,
    }
  },
  computed: {
    ...mapGetters(['getTagsByType']),
    inputValue: {
      get() {
        return this.value
      },
      set(val) {
        console.log(val)
      },
    },
  },
  watch: {
    searchName(val) {
      if (val || this.isLoading) return
      this.$store.dispatch('fetchTag', {
        pageSize: -1,
      })
    },
  },
  created() {
    // this.$store.dispatch('fetchTagType')
  },
  methods: {
    handleChange(val) {
      this.$emit('input', val)
    },
  },
}
</script>

<style></style>
