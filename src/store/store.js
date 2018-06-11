import Vue from 'vue'
import vuex from 'vuex'
import {instance as http} from './../http/http'
Vue.use(vuex);
var store = new vuex.Store({
    state:{//存放整个视图对应的数据
      getsum:Math.random(0,1).toString().substr(2,4),//发送验证码
      menu: [],//user页面左侧栏列表项
      group:[],
      userlist:[]
    },
    mutations: {
      //唯一可以改变state值的地方,通过commit来触发mutations
      updateMenu(state,data){
        state.menu = data.data
      },
      updateGroup(state,data){
        state.group = data.orgs
      },
      updateUser(state,data){
        state.userlist = data.userlist
      }
    },
    actions: {
      //基于mutations做一个异步操作,通过一个dispatch来触发action
      fetchMenu({commit}){
        http.get('/server/data.json').then(res=>{
            commit('updateMenu',res.data)
        })
      },
      fetchGroup({commit,state},cb){
        if(state.group.length>0){
          cb()
        }
        http.get('/server/groups.json').then(res=>{
          setTimeout(()=>{
            commit('updateGroup',res.data)
            cb()
          },2000)
        })
      },
      fetchUser({commit,state},cb){
        if(state.userlist.length>0){
          cb()
        }
        http.get('/server/user.json').then(res=>{
          setTimeout(()=>{
            commit('updateUser',res.data)
            cb()
          },2000)
        })
      }
    },
    getters: {//对state的二次封装
      filterGroup(state){
        return (filter)=>{
          if(filter){
            let result = state.group.filter((v,i)=>{
              return v.ORGNAME.indexOf(filter)>-1||v.FORGNAME.indexOf(filter)>-1
            })
            return result
          } else {
            return state.group
          }
        }
      }
    },
    modules: {
      //对state进行功能划分
    }
  })
export default store