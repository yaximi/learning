<template>
  <div class="header-top">
    <div class="icon-l">
      <i
        class="iconfont icon-fanhui"
        @click="back"
      >
      </i>
    </div>
    <div class="title">{{ title }}</div>
    <div class="icon-r"></div>
  </div>
</template>

<script>
export default {
  name: 'HeaderTop',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
  .header-top {
    width: 100%;
    height: 100px;
    padding: 0 30px;
    background: #000000;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .icon-l,
    .icon-r {
      width: 60px;

      .iconfont:before {
        color: #ffffff;
      }
    }

    .title {
      font-size: 32px;
      color: #ffffff;
    }
  }
</style>
