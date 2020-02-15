<template>
  <div>
    <header-top title="editor" />

    <rich-editor ref="richEditor" />

    <div
      class="show-html"
      @click="showHTML"
    >
      显示HTML
    </div>

    <div class="rich-text">
      {{ richText }}
    </div>
  </div>
</template>

<script>
import HeaderTop from '../components/common/HeaderTop'
import RichEditor from '../components/richEditor/RichEditor'
export default {
  name: 'About',
  components: {
    HeaderTop,
    RichEditor
  },
  data () {
    return {
      richText: ''
    }
  },
  methods: {
    showHTML () {
      this.richText = this.$refs.richEditor.$refs.textarea.innerHTML + ''
    }
  }
}
</script>

<style lang="less" scoped>
  .show-html,
  .show-html:visited {
    display: inline-block;
    margin: 20px;
    padding: 20px;
    border-radius: 12px;
    background: #2575cf;
    color: #ffffff;
  }

  .show-html:hover {
    background: #2575cf;
  }

  .show-html:active {
    background: #88b5e8;
  }

  .rich-text {
    padding: 20px;
    font-size: 32px;
  }
</style>
