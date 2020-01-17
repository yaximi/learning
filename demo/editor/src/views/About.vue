<template>
  <div>
    <!-- 头部 -->
    <div class="header-top">
      <span>editor</span>
    </div>

    <div class="menu-list">
      <div class="cell">
        <div class="title">font-family</div>
        <select
          name="fontFamily"
          id="fontFamily"
        >
          <option
            v-for="(item, index) in fontFamily"
            :key="index"
            :value="item">
            {{ item }}
          </option>
        </select>
      </div>

      <div class="cell">
        <div class="title">font-size</div>
        <input
          type="text"
          placeholder="请输入字体大小"
        >
      </div>

      <div class="cell">
        <div class="title">color</div>
        <input
          type="text"
          placeholder="请输入字体颜色"
        >
      </div>

      <div class="cell">
        <div class="title">background-color</div>
        <input
          type="text"
          placeholder="请输入文本背景"
        >
      </div>

      <div class="cell">
        <div class="title">line-height</div>
        <input
          type="text"
          placeholder="请输入行高"
        >
      </div>

      <div class="cell">
        <div class="title">letter-spacing</div>
        <input
          type="text"
          placeholder="请输入字体间隔"
        >
      </div>

      <div class="btns">
        <div class="btn clear">清空</div>
        <div class="btn publish">发布</div>
      </div>
    </div>

    <div class="menu-bar">
      <i class="iconfont icon-tupian"></i>
    </div>
    <div
      class="rich-text"
      contenteditable="true"
    >

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fontFamily: [
        '宋体',
        '微软雅黑'
      ],
      fontSize: [
        '一号',
        '二号',
        '三号',
        '四号',
        '五号',
        '六号'
      ],
      color: [],
      backgroundColor: []
    }
  }
}
</script>

<style lang="less" scoped>
  .header-top {
    width: 100%;
    height: 100px;
    background: #fff;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    color: #000;
  }

  .menu-list {
    padding: 0 30px;
    border-top: 10px solid #eee;
    background: #fff;

    .cell {
      height: 80px;
      padding: 1px 0;/*no*/
      border-bottom: 1px solid #eee;/*no*/
      display: flex;
      align-items: center;

      .title {
        width: 35%;
        height: 70%;
        border-right: 1px dashed #ccc;/*no*/
        margin-right: 30px;
        display: flex;
        align-items: center;
      }

      input {
        flex: 1;
        height: 100%;
        border: none;
        outline: none;
        appearance: none;
      }
    }

    .btns {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .btn {
        height: 74px;
        margin: 15px 0;
        background: #ccc;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .clear {
        width: 23%;
      }

      .publish {
        width: 72%;
      }
    }
  }

  .menu-bar {
    height: 80px;
    padding: 0 30px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    background: #eee;
    display: flex;
    align-items: center;
  }

  .rich-text {
    height: 560px;
    padding: 20px 30px;
    background: #fff;
    outline: none;
    overflow-y: auto;
  }
</style>
