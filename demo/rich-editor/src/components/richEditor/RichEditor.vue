<template>
  <div class="rich-editor">
    <div class="menu-list">
      <button
        class="menu-item"
        type="button"
        v-for="(menu, index) in menuList"
        :key="'menu-item-' + index"
        @click="edit(menu)"
      >
        <!-- 插入图片按钮 -->
        <label
          for="file"
          v-if="menu.command === 'insertImage'"
        >
          <i :class="['iconfont', menu.icon]"></i>
          <input
            id="file"
            name="file"
            type="file"
            accept="image/*"
            multiple
            required
            @change="uploadImg"
          >
        </label>

        <!-- 按钮 -->
        <i
          :class="['iconfont', menu.icon]"
          v-else
        >
        </i>

        <!-- 下拉选择框 -->
        <selection
          v-if="
            ['fontName', 'fontSize'].includes(menu.command) &&
            selection.command === menu.command &&
            selection.show
          "
          :attr-name="selection.attrName"
          :options="selection.options"
          @select="selection.selectFunc"
        />
      </button>
    </div>

    <!-- 文本域 -->
    <div
      class="textarea"
      ref="textarea"
      contenteditable="true"
      @blur="saveRange"
    >
    </div>

    <!-- 调色盘 -->
    <palette
      v-if="palette.show"
      @choose="palette.chooseFunc"
    />

    <!-- 链接输入框 -->
    <link-input
      v-if="linkInput.show"
      @sure="linkInput.sureFunc"
      @close="linkInput.closeFunc"
    />
  </div>
</template>

<script>
import { upload } from '../../common/api'
import Selection from './Selection'
import Palette from './Palette'
import LinkInput from './LinkInput'
export default {
  name: 'RichEditor',
  components: {
    Selection,
    Palette,
    LinkInput
  },
  data () {
    return {
      menuList: [
        {
          icon: 'icon-ziti',
          command: 'fontName'
        },
        {
          icon: 'icon-zitidaxiao',
          command: 'fontSize'
        },
        {
          icon: 'icon-zitiyanse',
          command: 'foreColor'
        },
        {
          icon: 'icon-zitibeijingse',
          command: 'backColor'
        },
        {
          icon: 'icon-jiacu',
          command: 'bold'
        },
        {
          icon: 'icon-xieti',
          command: 'italic'
        },
        {
          icon: 'icon-xiahuaxian',
          command: 'underline'
        },
        {
          icon: 'icon-shanchuxian',
          command: 'strikeThrough'
        },
        {
          icon: 'icon-juzuo',
          command: 'justifyLeft'
        },
        {
          icon: 'icon-juzhong',
          command: 'justifyCenter'
        },
        {
          icon: 'icon-juyou',
          command: 'justifyRight'
        },
        {
          icon: 'icon-liangduanduiqi',
          command: 'justifyFull'
        },
        {
          icon: 'icon-wuxuliebiao',
          command: 'insertUnorderedList'
        },
        {
          icon: 'icon-youxuliebiao',
          command: 'insertOrderedList'
        },
        {
          icon: 'icon-tupian',
          command: 'insertImage'
        },
        {
          icon: 'icon-lianjie',
          command: 'createLink'
        },
        // {
        //   icon: 'icon-wenjian',
        //   command: ''
        // },
        {
          icon: 'icon-chexiao',
          command: 'undo'
        },
        {
          icon: 'icon-chongzuo',
          command: 'redo'
        }
      ],
      fontNames: [
        '宋体',
        '楷体',
        '黑体',
        '微软雅黑',
        'andale mono',
        'arial',
        'arial black',
        'comic sans ms',
        'impact',
        'times new roman'
      ],
      fontSizes: [
        '8px',
        '10px',
        '12px',
        '14px',
        '18px',
        '24px',
        '36px'
      ],
      selection: {
        show: false,
        command: '',
        attrName: '',
        options: [],
        selectFunc: () => {}
      },
      palette: {
        show: false,
        command: '',
        chooseFunc: () => {}
      },
      linkInput: {
        show: false,
        closeFunc: () => {},
        sureFunc: () => {}
      },
      range: null
    }
  },
  methods: {
    // 点击按钮编辑内容
    edit (menu) {
      if (['fontName', 'fontSize'].includes(menu.command)) {
        this.palette.show = false
        this.linkInput.show = false
        if (this.selection.command !== menu.command) {
          this.selection.show = true
        } else {
          this.selection.show = !this.selection.show
        }
        this.selection.command = menu.command
        if (menu.command === 'fontName') {
          this.selection.attrName = 'fontFamily'
          this.selection.options = this.fontNames
          this.selection.selectFunc = this.selectFontName
        } else if (menu.command === 'fontSize') {
          this.selection.attrName = 'fontSize'
          this.selection.options = this.fontSizes
          this.selection.selectFunc = this.selectFontSize
        }
        return
      }
      if (['foreColor', 'backColor'].includes(menu.command)) {
        this.selection.show = false
        this.linkInput.show = false
        if (this.palette.command !== menu.command) {
          this.palette.show = true
        } else {
          this.palette.show = !this.palette.show
        }
        this.palette.command = menu.command
        if (menu.command === 'foreColor') {
          this.palette.chooseFunc = this.chooseForeColor
        } else if (menu.command === 'backColor') {
          this.palette.chooseFunc = this.chooseBackColor
        }
        return
      }
      if (menu.command === 'insertImage') {
        this.selection.show = false
        this.palette.show = false
        this.linkInput.show = false
        return
      }
      if (menu.command === 'createLink') {
        this.selection.show = false
        this.palette.show = false
        this.linkInput.show = !this.linkInput.show
        this.linkInput.closeFunc = this.closeLinkInput
        this.linkInput.sureFunc = this.createLink
        return
      }
      this.selection.show = false
      this.palette.show = false
      this.linkInput.show = false
      this.execCommand(menu.command)
    },

    // 回调 - 选择字体类型
    selectFontName (fontName, index) {
      this.selection.show = false
      this.execCommand('fontName', fontName)
    },

    // 回调 - 选择字体大小
    selectFontSize (fontSize, index) {
      this.selection.show = false
      this.execCommand('fontSize', index + 1)
    },

    // 回调 - 选择字体颜色
    chooseForeColor (color) {
      this.palette.show = false
      this.execCommand('foreColor', color)
    },

    // 回调 - 选择背景颜色
    chooseBackColor (color) {
      this.palette.show = false
      this.execCommand('backColor', color)
    },

    // 回调 - 关闭链接输入框
    closeLinkInput () {
      this.linkInput.show = false
    },

    // 回调 - 确认输入的链接
    createLink (linkText, linkUrl) {
      this.linkInput.show = false
      this.restoreSelection()
      this.insertLink(linkText, linkUrl)
    },

    // 插入链接
    insertLink (text, url) {
      let oLink = `<a href=${url} target="_blank" contenteditable="false">${text}</a>`
      document.execCommand('insertHTML', false, oLink)
    },

    // 上传图片
    uploadImg () {
      let oFile = document.getElementById('file')
      let files = oFile.files || []
      if (files.length === 0) {
        return
      }
      let formData = new FormData()
      formData.append('img', files[0])
      upload(formData)
        .then(res => {
          this.restoreSelection()
          this.insertImg(res.data.url)
          oFile.value = ''
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 插入图片
    insertImg (url) {
      let oImg = `<img src=${url} style="max-width:100%" alt="">`
      document.execCommand('insertHTML', false, oImg)
    },

    // 移动端execCommand
    execCommand (command, value) {
      if (this.range) {
        let selection = window.getSelection()
        if (this.range.collapsed) {
          this.range.selectNodeContents(this.range.commonAncestorContainer)
        }
        selection.removeAllRanges()
        selection.addRange(this.range)
      } else {
        this.setCursorAtEnd()
      }
      document.execCommand(command, false, value)
    },

    // 当文本域失去焦点时，保存selection range
    saveRange () {
      if (window.getSelection) {
        let selection = window.getSelection()
        if (selection.getRangeAt && selection.rangeCount) {
          let range = selection.getRangeAt(0)
          this.range = range.cloneRange()
        }
      }
    },

    // 恢复选区
    restoreSelection () {
      if (this.range) {
        this.resetSelection(this.range)
      } else {
        this.setCursorAtEnd()
      }
    },

    // 重置选区
    resetSelection (range) {
      const selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)
    },

    // 在end处设置贯标
    setCursorAtEnd () {
      const oTextarea = this.$refs.textarea
      if (oTextarea.lastChild) {
        const lastChild = oTextarea.lastChild
        const selection = window.getSelection()
        const range = document.createRange()
        range.setStartAfter(lastChild)
        range.setEndAfter(lastChild)
        selection.removeAllRanges()
        selection.addRange(range)
      } else {
        oTextarea.focus()
      }
    }
  }
}
</script>

<style lang="less" scoped>
  button {
    border: none;
    outline: none;
    appearance: none;
  }

  .rich-editor {
    margin: 20px;
    border: 1px solid #dddddd;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.6);
    position: relative;
  }

  .menu-list {
    padding: 0 10px;
    background: #f2f2f2;
    border: 1px solid #dddddd;
    border-radius: 12px 12px 0 0;
  }

  .menu-item,
  .menu-item:visited {
    display: inline-block;
    margin: 20px 10px;
    padding: 10px;
    background: #2981e4;
    border-bottom: 1px solid rgba(0,0,0,0.25);
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.6);
    cursor: pointer;
    position: relative;

    .iconfont:before {
      color: #ffffff;
      text-shadow: 0 -2px 2px rgba(0,0,0,0.25);
    }

    input {
      display: none;
    }
  }

  .menu-item:hover {
    background: #2575cf;
  }

  .menu-item:active {
    background: #88b5e8;
  }

  .textarea {
    height: 600px;
    padding: 20px 30px;
    border: 1px solid #dddddd;
    background: #fff;
    outline: none;
    overflow-y: auto;
    font-size: 32px;

    img {
      width: 200px;
    }
  }
</style>
