<template>
    <!-- 6、从用户user页跳到菜单管理页-->
    <div class="menu">
        <div class="menu_left">
            <h3>菜单管理</h3>
            <el-tree :data="data" show-checkbox :props="defaultProps" @node-click="handleNodeClick" default-expand-all></el-tree>
        </div>
        <div class="menu_right">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          label: "应用菜单树",
          num:1,
          children: [
            {
              label: "组织权限管理",
              num:2,
              children: [{label: "员工账号管理",name:"menu_child"},{label: "菜单管理",name:"menu_child"},{label: "用户管理",name:"menu_child"}]
            },
            {
              label: "我的工作",
              num:2,
              children: [{label: "我的申请",name:"menu_child"}]
            },
            {
              label: "客户管理",
              num:2,
              children: [{label: "管理一",name:"menu_child"}]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    handleNodeClick(data,node) {
       if(!data.children){
           console.log(data.label)
               this.$router.push({ name: data.name, params:{ userId: data.label }})
           }
    }
  }
};
</script>
<style>
.menu{
    width:100%;
    height:570px;
    display: flex;
}
.menu_left{
    width:20%;
    background: #eee;
    border-right:1px solid #ccc;
}
.menu_left h3{
    width:100%;
    height:30px;
    border-bottom:1px solid #ccc;
    line-height: 30px;
    font-weight: normal;
    font-size:18px;
    text-indent: 10px;
}
.menu_right{
    width:80%;
}
</style>
