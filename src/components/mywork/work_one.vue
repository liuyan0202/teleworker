<template>
    <!-- 8、从用户user页跳到任务一页-->
    <div class="my_apply">
        <router-link v-for="(x,ind) in list" :key="ind" :to="{name:x.name,params:{name:x.title}}" tag="div" class="my_box">
            <p class="my_title">{{x.title}}</p>
            <p class="my_msg">{{x.msg}}</p>
        </router-link>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data(){
        return {
            list:[
                {   
                    name:"work_rename",
                    title:"发起更名流程工单",
                    msg:"功能说明：发起更名流程工音频别人相去甚远别人模块鼓楼区"
                },
                {   
                    name:"work_rename",
                    title:"发起过户工单",
                    msg:"功能说明：发起更名流程工音频别人相去甚远别人模块鼓楼区"
                },
                {
                    name:"work_rename",
                    title:"工程维护单",
                    msg:"功能说明：发起更名流程工音频别人相去甚远别人模块鼓楼区"
                },
                {
                    name:"work_rename",
                    title:"其他类型工单",
                    msg:"功能说明：发起更名流程工音频别人相去甚远别人模块鼓楼区"
                }
            ]
        }
    }
}
</script>
<style>
.my_apply{
    width:100%;
    height:100%;
    display: flex;
    flex-wrap: wrap;
}
.my_apply .my_box{
    width:31%;
    margin:4px 1%;
    height:160px;
    background: #eee;
}
.my_box .my_title{
    height:100px;
    line-height: 100px;
    text-align: center;
    font-size:20px;
    color:#666;
}
.my_box .my_msg{
    height:60px;
    line-height: 30px;
    line-height: center;
    font-size:14px;
    color:#666;
    padding:0 20px;
}
</style>
