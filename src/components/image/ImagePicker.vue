<template>
  <div>
    <template v-if="!value">
      <div class="image-holder">
        <v-icon size="24">mdi-plus</v-icon>
      </div>
    </template>
    <template v-else>
      <div class="image-holder">
        <v-hover v-slot="{ hover }">
          <v-img height="128" width="128" :src="value">
            <div v-if="hover" class="image-remove primary" style="height: 100%">
              <v-icon color="white" class="mr-1">mdi-eye</v-icon>
              <v-icon color="white" @click="handleDetachMedia">mdi-close</v-icon>
            </div>
          </v-img>
        </v-hover>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    value: String,
  },
  data() {
    return {
      selectedItems: null,
      image: null,
      showDialog: false,
      showLightbox: false,
    }
  },
  computed: {},

  methods: {
    handleAttachMedia() {},
    handleDetachMedia() {},
  },
}
</script>

<style lang="scss">
.image-holder {
  display: flex;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  height: 128px;
  width: 128px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.image-remove {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
