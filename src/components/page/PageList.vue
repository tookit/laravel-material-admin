<template>
  <div class="page-list">
    <v-sheet class="page-list__filter">
      <v-toolbar flat>
        <v-text-field
          v-model="search"
          text
          solo
          flat
          :prepend-icon="showFilter ? 'mdi-filter-variant-plus' : 'mdi-filter-variant'"
          append-icon="mdi-magnify"
          placeholder="search"
          hide-details
          clearable
          @keyup.enter="handleApplyFilter"
          @click:append="handleApplyFilter"
          @click:prepend="showFilter = !showFilter"
          @click:clear="handleClear"
        />
        <v-btn icon @click="handleRefreshItem">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
        <v-btn icon @click="$emit('create')">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider />
      <v-sheet v-show="showFilter">
        <v-form-builder
          ref="builder"
          v-model="filters"
          tile
          flat
          class="grey lighten-4"
          :items="filterItems"
          color="primary"
          cancel-text="reset"
          save-text="apply"
          @form:cancel="handleResetFilter"
          @form:submit="handleApplyFilter"
        />
      </v-sheet>
    </v-sheet>
    <v-grid
      v-model="selectedItems"
      :loading="loadingItems"
      :headers="headers"
      :items="items"
      :footer-props="{ itemsPerPageOptions: [15, 30, 50] }"
      :server-items-length="serverItemsLength"
      :options.sync="gridOptions"
      item-key="id"
      show-select
      multi-sort
      @update:items-per-page="handleApplyFilter"
      @update:page="handleApplyFilter"
      @update:sort-by="handleApplyFilter"
      @update:sort-desc="handleApplyFilter"
      @input="$emit('input',selectedItems)"
      @sortable:onUpdate="handleOnSort"
    >
      <template #top>
        <v-toolbar v-show="showBatchAction" flat>
          <v-menu>
            <template #activator="{ on: menu }">
              <v-btn v-on="{ ...menu }"> Batch Action </v-btn>
            </template>
            <v-list class="pa-0" dense>
              <v-list-item v-for="act in batchActions" :key="act.text" @click="handleBatchAction(act, selectedItems)">
                <v-list-item-icon class="mr-2">
                  <v-icon small>{{ act.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ act.text }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </template>
      <template #[`item.action`]="{ item }">
        <v-menu>
          <template #activator="{ on: menu }">
            <v-tooltip bottom>
              <template #activator="{ on: tooltip }">
                <v-btn icon v-on="onTooltip({ ...tooltip, ...menu })">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <span>Action</span>
            </v-tooltip>
          </template>
          <v-list class="pa-0" dense>
            <v-list-item
              v-for="act in actions"
              v-show="handleShowAct(act, item)"
              :key="act.text"
              @click="handleAction(act, item)"
            >
              <v-list-item-icon class="mr-2">
                <v-icon small>{{ act.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ act.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
    </v-grid>
  </div>
</template>

<script>
import TooltipMixin from '@/mixins/Tooltip'
import { VGrid } from '@tookit/vma'
import { getObjectValueByPath } from 'vuetify/lib/util/helpers'
export default {
  components: {
    VGrid,
  },
  mixins: [TooltipMixin],
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
    actions: {
      type: Array,
      default: () => [],
    },
    batchActions: {
      type: Array,
      default: () => [],
    },
    filterItems: {
      type: Array,
      default: () => [],
    },
    searchField: {
      type: String,
      default: 'name',
    },
    dataSource: {
      type: [Function, Array],
    },
  },
  data() {
    return {
      //filter section
      search: '',
      filters: {},
      showFilter: true,
      //grid
      selectedItem: null,
      selectedItems: [],
      loadingItems: false,
      serverItemsLength: 0,
      gridOptions: {
        page: 1,
        itemsPerPage: 15,
        sortBy: [],
        sortDesc: [],
      },
      items: [],
    }
  },
  computed: {
    showBatchAction() {
      return this.batchActions.length > 0 && this.selectedItems.length > 0
    },
  },
  watch: {
    '$route.query': {
      handler(query) {
        this.updateListOption(query)
        this.fetchRecords()
      },
      immediate: true,
    },
  },
  methods: {
    updateListOption(query) {
      const { page, pageSize, sort } = query
      this.gridOptions.page = page ? parseInt(page) : 1
      this.gridOptions.itemsPerPage = pageSize ? parseInt(pageSize) : 15
      this.search = getObjectValueByPath(query, this.searchField)
      this.updateSortOption(sort)
      this.filterItems.forEach((item) => {
        const key = item.props.name
        const val = getObjectValueByPath(query, key)
        const value = item.transform ? item.transform.call(this, val) : val
        this.filters[key] = value || null
      })
    },
    updateSortOption(sort) {
      let sortBy = [],
        sortDesc = []
      if (sort) {
        const temp = sort.split(',')
        temp.forEach((field, index) => {
          const dir = field.charAt(0)
          if (dir === '-') {
            sortBy[index] = field.replace('-', '')
            sortDesc[index] = true
          } else {
            sortBy[index] = field
            sortDesc[index] = false
          }
        })
      }
      this.gridOptions.sortBy = sortBy
      this.gridOptions.sortDesc = sortDesc
    },
    buildApiQuery() {
      const query = {
        sort: this.$route.query.sort,
        page: this.gridOptions.page,
        pageSize: this.gridOptions.itemsPerPage,
      }
      const filterKey = `filter[${this.searchField}]`
      query[filterKey] = this.search
      for (let key in this.filters) {
        let k = [`filter[${key}]`]
        query[k] = this.filters[key]
      }
      return query
    },
    buildRouteQuery() {
      this.filters[this.searchField] = this.search
      return {
        ...this.filters,
        sort: this.buildSort(),
        page: this.gridOptions.page,
        pageSize: this.gridOptions.itemsPerPage,
      }
    },
    buildSort() {
      const { sortBy, sortDesc } = this.gridOptions
      return sortBy
        .map((field, index) => {
          return sortDesc[index] ? '-' + field : field
        })
        .join(',')
    },
    fetchRecords() {
      const params = this.buildApiQuery()
      this.loadingItems = true
      this.items = []
      this.dataSource
        .call(this, params)
        .then(({ data, meta }) => {
          this.items = data
          this.serverItemsLength = meta.total
          this.loadingItems = false
        })
        .catch(() => {
          this.loadingItems = false
        })
    },
    // filter
    handleRefreshItem() {
      this.fetchRecords()
    },
    handleResetFilter() {
      const val = {}
      // filter
      for (let key in this.filters) {
        val[key] = null
      }
      // reset grid
      this.$refs.builder.reset()
      this.$router.replace({
        path: this.$route.path,
        query: {
          t: Date.now(),
        },
      })
    },
    handleApplyFilter() {
      const query = this.buildRouteQuery()
      query.t = Date.now()
      this.$router.replace({
        path: this.$route.path,
        query: query,
      })
    },
    handleClear() {
      this.$router.replace({
        path: this.$route.path,
        query: {},
      })
    },
    handleAction(act, item) {
      act.click.apply(this, [item])
    },
    handleBatchAction(act, items) {
      act.click.apply(this, [items])
    },
    // default action
    handleShowAct(act, item) {
      if (act.enable) {
        return act.enable.apply(this, [item])
      } else {
        return true
      }
    },
    handleOnSort(e) {
      this.$emit('sortable:onSort', e)
    },
    handleOptionsChange(option) {
      console.log(option)
    },
  },
}
</script>
