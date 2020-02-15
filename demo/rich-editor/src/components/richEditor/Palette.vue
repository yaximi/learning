<template>
  <div class="palette">
    <div class="input">
      字体颜色：
      <input
        class="current-color"
        type="text"
        v-model="currentColor"
      >
      <span
        class="sure"
        @click.stop.prevent="onSure"
      >
        确认
      </span>
    </div>
    <div>标准颜色</div>
    <div class="interval"></div>
    <div>
      <span
        class="color-block"
        v-for="(item, index) in colors.slice(0, 10)"
        :key="index"
        :style="{background: item}"
        @click.stop.prevent="onChoose(item)"
      >
      </span>
    </div>
    <div>主题颜色</div>
    <div class="interval"></div>
    <div>
      <template v-for="(item, index) in colors.slice(10)">
        <span
          class="color-block"
          :key="index"
          :style="{background: item}"
          @click.stop.prevent="onChoose(item)"
        >
        </span>
        <br
          v-if="(index + 1) % 10 === 0"
          :key="index"
        />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'palette',
  props: {
    choose: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      colors: [
        '#c00000',
        '#ff0000',
        '#ffc000',
        '#ffff00',
        '#92d050',
        '#00b050',
        '#00b0f0',
        '#0070c0',
        '#002060',
        '#7030a0',
        '#ffffff',
        '#000000',
        '#eeece1',
        '#1f497d',
        '#4f81bd',
        '#c0504d',
        '#9bbb59',
        '#8064a2',
        '#4bacc6',
        '#f79646',
        '#f2f2f2',
        '#7f7f7f',
        '#ddd9c3',
        '#c6d9f0',
        '#dbe5f1',
        '#f2dcdb',
        '#ebf1dd',
        '#e5e0ec',
        '#dbeef3',
        '#fdeada',
        '#d8d8d8',
        '#595959',
        '#c4bd97',
        '#8db3e2',
        '#b8cce4',
        '#e5b9b7',
        '#d7e3bc',
        '#ccc1d9',
        '#b7dde8',
        '#fbd5b5',
        '#bfbfbf',
        '#3f3f3f',
        '#938953',
        '#548dd4',
        '#95b3d7',
        '#d99694',
        '#c3d69b',
        '#b2a2c7',
        '#92cddc',
        '#fac08f',
        '#a5a5a5',
        '#262626',
        '#494429',
        '#17365d',
        '#366092',
        '#953734',
        '#76923c',
        '#5f497a',
        '#31859b',
        '#e36c09',
        '#7f7f7f',
        '#0c0c0c',
        '#1d1b10',
        '#0f243e',
        '#244061',
        '#632423',
        '#4f6128',
        '#3f3151',
        '#205867',
        '#974806'
      ],
      currentColor: ''
    }
  },
  methods: {
    onChoose (item) {
      this.currentColor = item
    },
    onSure () {
      this.$emit('choose', this.currentColor)
    }
  }
}
</script>

<style lang="less" scoped>
  .palette {
    padding: 20px;
    background: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.6);
    position: absolute;
    left: 40px;
    top: 205px;
    z-index: 2;

    .input {
      .current-color {
        padding: 10px;
        border: 2px solid #dddddd;/*no*/
        outline: none;
        appearance: none;
      }

      .sure,
      .sure:visited {
        display: inline-block;
        margin: 20px 10px 20px 20px;
        padding: 10px;
        background: #2981e4;
        border-bottom: 1px solid rgba(0,0,0,0.25);
        border-radius: 12px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.6);
        text-shadow: 0 -2px 2px rgba(0,0,0,0.25);
        line-height: normal;
        color: #ffffff;
      }

      .sure:hover {
        background: #2575cf;
      }

      .sure:active {
        background: #88b5e8;
      }
    }

    .interval {
      height: 0;
      margin-top: 10px;
      border: 1px solid #eeeeee;
    }

    .color-block {
      display: inline-block;
      width: 30px;
      height: 30px;
      margin: 12px;
      border: solid 2px #cccccc;
      cursor: pointer;
    }
  }
</style>
