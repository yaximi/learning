<template>
  <div class="link-input">
    <div class="title">
      <span>链接</span>
      <img
        class="close"
        src="../../assets/img/close.png"
        alt=""
        @click.stop.prevent="onClose"
      >
    </div>
    <div class="input">
      链接文本：
      <input
        type="text"
        placeholder=""
        v-model="linkText"
      >
    </div>
    <div class="input">
      链接地址：
      <input
        type="text"
        placeholder="http://..."
        v-model="linkUrl"
      >
    </div>
    <div class="button">
      <div
        class="sure"
        @click.stop.prevent="onSure"
      >
        确认
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LinkInput',
  data () {
    return {
      linkText: '',
      linkUrl: ''
    }
  },
  props: {
    close: {
      type: Function,
      default: () => {}
    },
    sure: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    onClose () {
      this.$emit('close')
    },
    onSure () {
      if (this.linkText === '' || this.linkUrl === '') {
        return
      }
      this.$emit('sure', this.linkText, this.linkUrl)
    }
  }
}
</script>

<style lang="less" scoped>
  .link-input {
    width: 80%;
    padding: 20px;
    background: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.6);
    position: absolute;
    left: 0;
    right: 0;
    top: 40%;
    z-index: 2;
    margin: 0 auto;

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 10px;
      margin-bottom: 20px;
      border-bottom: 1px solid #eeeeee;

      .close {
        width: 32px;
      }
    }

    input {
      width: 350px;
      padding: 10px;
      border: 2px solid #dddddd;/*no*/
      outline: none;
      appearance: none;
      margin-bottom: 10px;
    }

    .button {
      text-align: right;

      .sure,
      .sure:visited {
        display: inline-block;
        padding: 10px 20px;
        border-radius: 12px;
        background: #2575cf;
        font-size: 32px;
        color: #ffffff;
      }

      .sure:hover {
        background: #2575cf;
      }

      .sure:active {
        background: #88b5e8;
      }
    }
  }
</style>
