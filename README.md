# teleworker
#### 电信通长城宽带项目，本项目用VUE框架、VUEX数据管理、vue-router路由以及element-ui完成的 
 1. 基于vue-cli simple版

 2. 配置路由

    例：

     routes: [
         {

             name:'home',
             path:'home',
             component:Home
             children:[
                {
                    name:'loginone',
                    path:'loginone',
                    component:loginone
                }
         }
     ]

 3. 用vue-route的beforeEach实现导航守卫（路由跳转前验证登录）

 4. 用到element-ui中的Form,Table,Pagination,Tree,Loading,NavMenu,Popvoer

 5. 遇到的问题
    * element-ui组件与所需效果不符，进行进一步的修改