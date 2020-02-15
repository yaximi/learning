<template>
  <div class="selection">
    <div
      class="option"
      v-for="(item, index) in options"
      :key="index"
      :style="resetStyle(item)"
      @click.stop.prevent="onSelect(item, index)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Selection',
  props: {
    attrName: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    select: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    resetStyle (item) {
      let style = {}
      style[this.attrName] = item
      return style
    },
    onSelect (item, index) {
      this.$emit('select', item, index)
    }
  }
}
</script>

<style lang="less" scoped>
  .selection {
    position: absolute;
    left: 0;
    top: 110%;
    z-index: 2;
    padding: 20px;
    background: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.6);
  }

  .option {
    padding: 10px;
    border-bottom: 1px solid #eeeeee;
    white-space: nowrap;

    &:last-child {
      border: none;
    }
  }
</style>
