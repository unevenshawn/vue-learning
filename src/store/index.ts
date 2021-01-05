import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //保存全局变量的值
    //nomber:111
    //其它地方通过$store.state.nomber取值
  },
  mutations: {
    //同步操作，在这儿做，可以与devtool进行通信
  },
  actions: {
    //如果有异步操作，在这儿写，一般与后端进行交互
  },
  modules: { 
    
  }
})
