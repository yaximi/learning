<template>
  <div class="rich-editor">
    <div class="menu-list">
      <div
        class="menu-item"
        v-for="(menu, index) in menuList"
        :key="index"
        @click="edit(menu)"
      >
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
        <i
          :class="['iconfont', menu.icon]"
          v-else
        >
        </i>
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
      </div>
    </div>
    <div
      class="textarea"
      ref="textarea"
      contenteditable="true"
      @blur="onBlur"
    >
    </div>
    <palette
      v-if="palette.show"
      @choose="palette.chooseFunc"
    />
  </div>
</template>

<script>
import { upload } from '../../common/api'
import Selection from './Selection'
import Palette from './Palette'
export default {
  name: 'RichEditor',
  components: {
    Selection,
    Palette
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
      range: null
    }
  },
  methods: {
    edit (menu) {
      if (['fontName', 'fontSize'].includes(menu.command)) {
        this.palette.show = false
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
        return
      }
      if (menu.command === 'createLink') {
        return
      }
      this.selection.show = false
      this.palette.show = false
      this.execCommand(menu.command)
    },
    selectFontName (fontName, index) {
      console.info('fontName:', fontName)
      this.selection.show = false
      this.execCommand('fontName', fontName)
    },
    selectFontSize (fontSize, index) {
      console.info('fontSize:', fontSize)
      this.selection.show = false
      this.execCommand('fontSize', index + 1)
    },
    chooseForeColor (color) {
      console.info('foreColor:', color)
      this.palette.show = false
      this.execCommand('foreColor', color)
    },
    chooseBackColor (color) {
      console.info('backColor:', color)
      this.palette.show = false
      this.execCommand('backColor', color)
    },
    execCommand (command, value) {
      if (this.range) {
        let selection = window.getSelection()
        if (this.range.collapsed) {
          this.range.selectNodeContents(this.range.commonAncestorContainer)
        }
        selection.removeAllRanges()
        selection.addRange(this.range)
      } else {
        this.$refs.textarea.focus()
      }
      document.execCommand(command, false, value)
    },
    uploadImg () {
      let oFile = document.getElementById('file')
      let files = oFile.files || []
      if (files.length <= 0) {
        return
      }
      let formData = new FormData()
      formData.append('img', files[0])
      upload(formData)
        .then(res => {
          if (this.range) {
            let selection = window.getSelection()
            selection.removeAllRanges()
            selection.addRange(this.range)
          } else {
            this.$refs.textarea.focus()
          }
          let oImg = `<img src=${res.data.url} style="max-width:100%" alt="">`
          document.execCommand('insertHTML', false, oImg)
          oFile.value = ''
        })
        .catch(err => {
          console.error(err)
        })
    },
    onBlur () {
      if (window.getSelection) {
        let selection = window.getSelection()
        if (selection.getRangeAt && selection.rangeCount) {
          let range = selection.getRangeAt(0)
          this.range = range.cloneRange()
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .rich-editor {
    margin: 20px;
    border: 1px solid #dddddd;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.6);
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
