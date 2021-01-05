<template>
  <div id="app">
    <router-view></router-view>
    <tabbar>
        <tabbaritem path="/home">
          <img slot="item-icon" src="~@/assets/img/tabbar/home.svg" alt="" />
          <img
            slot="item-icon-active"
            src="./assets/img/tabbar/home_fill.svg"
            alt=""
          />
          <div slot="item-text">首页</div>
        </tabbaritem>
      
      
        <tabbaritem  path="/category" activeColor="red">
          <img slot="item-icon" src="./assets/img/tabbar/category.svg" alt="" />
          <img
            slot="item-icon-active"
            src="./assets/img/tabbar/category_fill.svg"
            alt=""
          />
          <div slot="item-text">分类</div>
        </tabbaritem>
      
      
        <tabbaritem  path="/shopcart" :activeColor="green">
          <img slot="item-icon" src="./assets/img/tabbar/shopcart.svg" alt="" />
          <img
            slot="item-icon-active"
            src="./assets/img/tabbar/shopcart_fill.svg"
            alt=""
          />
          <div slot="item-text">购物车</div>
        </tabbaritem>
      
      
        <tabbaritem  path="/user">
          <img slot="item-icon" src="./assets/img/tabbar/user.svg" alt="" />
          <img
            slot="item-icon-active"
            src="./assets/img/tabbar/user_fill.svg"
            alt=""
          />
          <div slot="item-text">用户</div>
        </tabbaritem>
      
    </tabbar>
  </div>
</template>

<style>
button {
  border: none;
  flex: 1;
  text-align: center;
  height: 49px;
  /* tabbar常用高度49 */
  font-size: 10px;
}
</style>
<script>
import Tabbar from "./components/tabbar/Tabbar.vue";
import Tabbaritem from "./components/tabbar/TabbarItem.vue";


export default {
  name: "App",
  components: {
    Tabbar,
    Tabbaritem,
  },
  methods: {
   

  },
};
</script>