import Vue from 'vue'
import VueRouter from 'vue-router'
import home from './../components/login/home.vue'
import loginone from './../components/login/loginone.vue'
import logintwo from './../components/login/logintwo.vue'
import user from './../components/user/user.vue'
import staffAdmine from './../components/group/staff_admine.vue'
import menuAdmine from './../components/group/menu_admine.vue'
import userAdmine from './../components/group/user_admine.vue'
import menuChild from './../components/group/menu_child.vue'
import workOne from './../components/mywork/work_one.vue'
import workRename from './../components/mywork/work_rename.vue'
import clientOne from './../components/client/client_one.vue'

Vue.use(VueRouter);
let router = new VueRouter({
    routes:[
      {
        path:'/',
        component:home,
        redirect:'/home'
      },
      {
        name:'home',
        path:'/home',
        component:home,
        children:[
          {
            name:'loginone',
            path:'loginone',
            component:loginone
          },
          {
            name:"logintwo",
            path:'logintwo',
            component:logintwo,
            beforeEnter(to,from,next){
              next()
            }
          }
        ]
      },
      {
        name:'user',
        path:'/user',
        component:user,
        children:[
          {
            name:'staff_admine',
            path:'staff_admine',
            component:staffAdmine
          },
          {
            name:'menu_admine',
            path:'menu_admine',
            component:menuAdmine,
            children:[
              {
                name:'menu_child',
                path:'menu_child',
                component:menuChild
              }
            ]
          },
          {
            name:'user_admine',
            path:'user_admine',
            component:userAdmine
          },
          {
            name:'work_one',
            path:'work_one',
            component:workOne
          },
          {
            name:'work_rename',
            path:'work_rename/:id',
            component:workRename
          },
          {
            name:'client_one',
            path:'client_one',
            component:clientOne
          }
        ]
      }
    ]
  })
  router.beforeEach((to, from, next) => {
    if(to.name==='loginone'){
      next()
    } else if (to.name==='logintwo'){
      next()
    } else {
      let islogin = sessionStorage.getItem('login');
      if(islogin){
        next()
      } else {
        next('/home/logintwo')
      }
    }
  })
  export default router