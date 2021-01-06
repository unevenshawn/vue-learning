<template>
  <div class="tab-bar-item" @click="routeTo">
    <!-- 插槽包装一层div，用于定义其它属性，isActive和.active决定状态 -->
    <div><slot v-if="isActive" name="item-icon-active"></slot></div>
    <!-- v-if，v-else动态绑定slot -->
    <div><slot v-if="!isActive" name="item-icon"></slot></div>
    <!-- ：class绑定文字活跃颜色 -->
    <div :style="{color:getActiveColor}"><slot name="item-text"></slot></div>
  </div>
</template>
<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  /* tabbar常用高度49 */
  font-size: 10px;
}
.tab-bar-item img {
  height: 25px;
  widows: 25px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
.active {
  color: gray;
}
</style>
<script>

import VueRouter from 'vue-router';
import Vue from 'vue'

Vue.use(VueRouter)
export default {
  name: "TabbarItem",
  props:{//这儿用props，是自己属性传给自己
    path:String,
    activeColor:{
      color:String,
      default: "gray"
    }
  },
  computed:{
    getActiveColor(){
      if(this.$route.path==this.path){ 
      return this.activeColor}
      return 'black'
    },
    isActive(){
      return  this.$route.path==this.path
  }
  },

  methods: {
    routeTo() {
       if(this.$route.path!=this.path){ 
       this.$router.push(this.path)}
     },
  },
};


</script>