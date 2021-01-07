import Vue from 'vue'
import Vuex from 'vuex'
import { ADP, CHANGE, ASYN } from '@/store/mutations-type'

Vue.use(Vuex)


const moduleA={
  state: {

  },
  mutations: {},
  actions:{},
  getters:{}
}


export default new Vuex.Store({
  state: {
    //保存全局变量的值
    nomber: 123,
    //其它地方通过$store.state.nomber取值
    obj: {
      att: 'unchanged value?',
      no: 1
    },
    
  },
  mutations: {
    //同步操作，在这儿做，可以与devtool进行通信
    /* modnomber(state){
       //在Vue的管理下，上面state中的nomber的数值，能够直接传入到这儿
        return state.nomber++;
     }, */
    mold(state) {
      // console.log(state.nomber)
      state.nomber
    },
    [CHANGE](state, text: string) {
      // Vue.set(state.obj,'att',text)
      state.obj.att = text
      console.log(text);
      // console.log("SEE IF ATT('')=>('TEXT')");
    }
  },
  actions: {
    //如果有异步操作，在这儿写，一般与后端进行交互
    [ADP](context, text: string) {//这儿的context传入的已经是$store了
      setTimeout(() => {
        context.commit(CHANGE, text)
      }, 1000);
    },
    [ASYN](context, url: string) {
       // eslint-disable-next-line
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(url, " here request is send");
          resolve('this is result')
        }, 1000)
      })
    }
  },
  modules: { 
    user:moduleA,//类型是module类型
    order:{
      state: {
      //取值是通过{{$state.order.orderNumber}}
      orderNumber:12,
      },
      mutations: {},
      actions:{},
      getters:{}
    }
  }
})
