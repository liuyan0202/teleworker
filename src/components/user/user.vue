<template>
  <!-- 4、从登录页跳到用户user页-->
    <div class="user_page">
        <div class="user_top">
            <span class="user_title">北京电信通有限公司</span>
            <span>{{time}}</span>
        </div>
        <div class="user_box">
            <div class="user_left">
                <dl class="user">
                    <dt>
                        <img src="./../../img/user.png" alt=""/>
                    </dt>
                    <dd>
                        <h4>您好</h4>
                        <p>注销</p>
                    </dd>
                </dl>
                <div class="user_select">
                    <el-menu @open="handleOpen">
                        <el-submenu v-for="(item,index) in menu" :key="index" :index="index+1+''">
                            <template slot="title">{{item.name}}</template>
                            <el-menu-item v-for="(x,idx) in item.submenus" :key="idx" :index="idx+'-'+index">
                                <router-link :to="{name:x.type}" tag="span" class="actives">{{x.name}}</router-link>
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </div>
            </div>
            <div class="user_right">
                <div class="user_topname">
                   <router-link v-for="(item,index) in getmenus.submenus" :to="{name:item.type}" :key="index" tag="span">{{item.name}}<b>x</b></router-link>
                </div>
                <div class="user_content">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>    
</template>
<script>
import { mapState,mapActions } from 'vuex' 
export default {
  data() {
    return {
      time: null,
      menus:[],
      getmenus:[]
    };
  },
  methods: {
    gettime() {
        setInterval(()=>{
            this.time = new Date().toLocaleString();
        },1000)
    },
    handleOpen(key, keyPath) {
        this.$store.state.menu.map((v,i)=>{
          if((key-1)==i){
            this.getmenus = v
          }
        })
    },
    ...mapActions(['fetchMenu'])//this.$store.dispatch('fetchMenu')
  },
  computed: {
      ...mapState(['menu'])//map映射，将this.$store.state.menu替换成menu
  },
  mounted() {
    this.gettime();
    //方法一，用封装的http方法请求数据
    /* this.$http.get('/server/data.json').then(res=>{
        this.menus = res.data.data
    }) */
    //方法二将数据在store中管理
    this.fetchMenu()
    //this.$store.dispatch('fetchMenu')
  }
};
</script>
<style src="./user.css">

</style>

