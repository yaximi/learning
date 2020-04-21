<template>
  <div id="app">
    <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
    <div class="footer">
      <div
        v-for="(item, index) in menuList"
        :key="index"
        @click.stop.prevent="clickMenu(item)"
      >
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      menuList: [
        {
          text: '社区首页',
          link: '/'
        },
        {
          text: '牛人榜单',
          link: '/list'
        },
        {
          text: '模拟练习',
          link: '/exercise'
        },
        {
          text: '炒股大赛',
          link: '/game'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      direction: 'getDirection'
    })
  },
  methods: {
    clickMenu (item) {
      this.$router.push(item.link)
    }
  }
}
</script>

<style lang="less" scoped>
  #app {
    height: 100%;
  }

  .vux-pop-out-enter-active,
  .vux-pop-out-leave-active,
  .vux-pop-in-enter-active,
  .vux-pop-in-leave-active {
    will-change: transform;
    transition: all 250ms;
    height: 100%;
    position: absolute;
    top: 0;
    backface-visibility: hidden;
    perspective: 1000;
  }

  .vux-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .vux-pop-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .footer {
    width: 100%;
    height: 100px;
    border-top: 1px solid #cccccc;/*no*/
    background: #ffffff;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 100;
    overflow: hidden;
    display: flex;

    > div {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 32px;
    }
  }
</style>
