<template>
  <div id="app">
    <main-tb></main-tb>
    <router-view></router-view>
    <div>{{ $store.state.obj }}</div>
    <div @click="ok()">click and see next line</div>
    <div>{{ $store.state.obj.att }}</div>

    <div>{{ axiosTest() }}</div>
  </div>
</template>

<style>
#app {
  border: none;
  flex: 1;
  text-align: center;
  height: 49px;
  /* tabbar常用高度49 */
  font-size: 25px;
}
.test {
  color: peachpuff;
}
</style>
<script>
import MainTb from "@/components/tabbar/MainTb.vue";
import { ADP, CHANGE, ASYN } from "@/store/mutations-type";
import axios from "axios";

export default {
  name: "App",
  components: {
    MainTb,
  },
  methods: {
    ok() {
      this.$store.commit(CHANGE, "mutated by mutations");
      this.$store.dispatch(ADP, "dispatched by actions");
      this.$store.dispatch(ASYN, "dispatched by actions").then((res) => {
        console.log(
          "here request has been processed and data returned, here is for data post handle"
        );
        console.log(res);
      });
    },
    axiosTest() {
      axios({
        url: "http://123.207.32.32:8000/home/multidata",
      })
      .then(res => console.log(res));
    },
  },
};
</script>