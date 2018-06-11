<template>
    <!-- 3、从首页到登录页-->
    <div class="two">
        <label>
            <span>登录账号</span>
            <input type="text" placeholder="请输入账号" ref="tel"/>
            <p class="error" ref="error"></p>
        </label>
        <div class="check">
            <button class="telbtn" @click="tel" :disabled="flag">{{msg}}</button>
            <button class="emailbtn" @click="email" :disabled="pick">{{msgs}}</button>
        </div>
        <label>
            <span>动态密码</span>
            <input type="text" placeholder="请输入动态密码" ref="login" :data="sum" />
        </label>
        <button class="loginbtn" @click="login">登录</button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            msg:'手机获取密码',
            msgs:'邮箱获取密码',
            n:10,
            flag:false,
            pick:false,
            sum:''
        }
    },
    beforeRouteEnter (to, from, next) {
      next()
    },
    methods:{
        tel(){
            let reg=/^1[3578]\d{9}$/;
            if(reg.test(this.$refs.tel.value)){
                this.$refs.error.innerText=''
                let timer=setInterval(()=>{
                    this.flag=true
                    this.n--
                    this.msg='重新发送'+this.n
                    if(this.n<=0){
                        clearInterval(timer)
                        this.msg="手机获取密码"
                        this.flag=false
                    }
                },1000)
                this.sum=this.$store.state.getsum
            } else {
                this.$refs.error.innerText='请输入正确的手机号'
            }
                alert('动态密码为'+this.sum)
        },
        email(){
            let reg=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if(reg.test(this.$refs.tel.value)){
                this.$refs.error.innerText=''
                let timer=setInterval(()=>{
                    this.pick=true
                    this.n--
                    this.msgs='重新发送'+this.n
                    if(this.n<=0){
                        clearInterval(timer)
                        this.msgs="邮箱获取密码"
                        this.pick=false
                    }
                },1000)
                this.sum=this.$store.state.getsum
            } else {
                this.$refs.error.innerText='请输入正确的邮箱号'
            }
             alert('动态密码为'+this.sum)
        },
        login(){
            if(this.$refs.login.value){
                if(this.$refs.login.value == this.sum){
                    sessionStorage.setItem('login',1)
                    this.$router.push('/user')
                }
            }
            
        }
    }
    
}
</script>
<style>
.two{
    box-sizing: border-box;
    width:100%;
    height:100%;
    padding:10px 0;
}
label span{
    display: block;
    width:100%;
    height:30px;
    line-height: 30px;
    text-indent: 20px;
    color:blue;
    font-size:12px;
}
label input{
    width:80%;
    height:36px;
    border:1px solid #ccc;
    border-radius: 10px;
    margin-left:10%;
    text-indent: 20px;
    outline: none;
}
.check{
    box-sizing: border-box;
    width: 100%;
    height:20px;
    display: flex;
    padding:0 30px;
    margin-bottom: 10px;
}
.check button{
    flex:1;
    height:20px;
    margin-right:10px;
}
.loginbtn{
    width:80%;
    height:32px;
    background: royalblue;
    margin-left:10%;
    border:1px solid skyblue;
    color:#fff;
    border-radius: 10px;
    margin-top:10px;
    outline: none;
}
.error{
    width: 100%;
    height:26px;
    line-height: 26px;
    color:red;
    padding-left:10%;
    font-size:12px;
}
</style>


