<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <page-list
          ref="grid"
          :headers="headers"
          :filter-items="filterItems"
          :actions="actions"
          :data-source="dataSource"
          search-field="name"
          @create="handleCreateItem"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PageList from '@/components/page/PageList'
import Mixin from './Category'
export default {
  components: {
    PageList,
  },
  mixins: [Mixin],
}
</script>
