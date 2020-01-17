<template>
  <div>

    <!-- 头部 -->
    <div class="header-top">
      <span>发布</span>
    </div>

    <!-- 工具按钮 -->
    <div class="tool-bar">
      <label for="file">
        <i class="iconfont icon-tupian"></i>
        <input
          id="file"
          name="file"
          type="file"
          accept="image/*"
          multiple
          required
          @change="chooseImage"
        >
      </label>
      <div
        class="publish"
        @click="publish"
      >
        <span>编辑好了</span>
        <i class="iconfont icon-duihao"></i>
      </div>
    </div>

    <!-- 富文本 -->
    <div
      class="textarea"
      id="textarea"
      contenteditable="true"
    >
    </div>
  </div>
</template>

<script>
import { upload, submit } from 'common/api'
import { browserType } from 'common/utils'

export default {
  name: 'Home',
  methods: {
    // 选择照片
    chooseImage () {
      let oFile = document.getElementById('file')
      let files = oFile.files || []
      if (files.length <= 0) {
        return
      }
      let formData = new FormData()
      formData.append('img', files[0])
      upload(formData)
        .then(res => {
          let oImg = this.createImg(res.data.url)
          this.insertImg(oImg)
          oFile.value = ''
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 发布
    publish () {
      let oTextarea = document.getElementById('textarea')
      let params = {
        userCode: '000001',
        nickname: '小明',
        richText: oTextarea.innerHTML + ''
      }
      submit(params)
        .then(() => {
          console.info(oTextarea.innerHTML + '')
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 创建img标签
    createImg (url) {
      let oDiv = document.createElement('div')
      let oImg = document.createElement('img')
      oImg.alt = ''
      oImg.src = url
      oImg.style.maxWidth = '100%'
      oDiv.appendChild(oImg)
      return oDiv
    },

    // 插入img
    insertImg (oImg) {
      let oTextarea = document.getElementById('textarea')
      oTextarea.appendChild(oImg)
      // 换行
      let oDiv = document.createElement('div')
      let oBr = document.createElement('br')
      if (['Edge', 'IE'].includes(browserType())) {
        oTextarea.appendChild(oDiv)
      } else if (browserType() === 'FF') {
        oTextarea.appendChild(oBr)
      } else {
        oDiv.appendChild(oBr)
        oTextarea.appendChild(oDiv)
      }
      // 设置光标
      let lastChild = oTextarea.lastChild
      let selection = window.getSelection()
      let range = document.createRange()
      range.selectNodeContents(oTextarea)
      range.collapse(false)
      range.setStartAfter(lastChild)
      range.setEndAfter(lastChild)
      selection.removeAllRanges()
      selection.addRange(range)
    }
  }
}
</script>

<style lang="less" scoped>
  .header-top {
    width: 100%;
    height: 100px;
    background: black;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    color: white;
  }

  .tool-bar {
    height: 80px;
    padding: 0 20px;
    border-bottom: 1px solid #cccccc;/*no*/
    background: ghostwhite;
    display: flex;
    justify-content: space-between;
    align-items: center;

    input {
      display: none;
    }
  }

  .publish {
    font-size: 32px;
    color: limegreen;
  }

  .textarea {
    padding: 20px;
    background: white;
    position: absolute;
    left: 0;
    right: 0;
    top: 180px;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: auto;
    outline: none;
    font-size: 32px;

    img {
      width: 100%;
    }
  }
</style>
