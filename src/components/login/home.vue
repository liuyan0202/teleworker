<template>
    <!-- 1、首页-->
    <div class="big">
        <header>
            <img src='./../../img/1.png' alt=""/>
        </header>
        <section>
            <div class="login">
                <div class="top">
                    <router-link to="/home/loginone" tag="span" class="active">二维码登录</router-link>
                    <router-link to="/home/logintwo" tag="span">账号登录</router-link>
                </div>
                <router-view></router-view>
            </div>
        </section>
        <footer>

        </footer>
    </div>
</template>


<script>
export default {
    data() {
        return {
            int: 0
        }
    },
    methods: {
        toggle(ind) {
            this.int = ind
        }
    }
}
</script>

<style>
.big{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
}
header{
    flex:1;
    padding-left:20px;
    display: flex;
    align-items: center;
}
header img{
    width:30%;
}
section{
    position: relative;
    flex:8;
    background: url('./../../img/bj.png') center;
    background-size:100% 100%;
}
footer{
    flex:2;
}
section .login{
    width:300px;
    height:300px;
    background: #fff;
    position: absolute;
    right:30px;
    bottom:30px;
    border-radius: 10px;
    overflow: hidden;
}
section .login .top{
    width:100%;
    height:36px;
    line-height: 36px;
    display: flex;
}
section .login .top span{
    height:100%;
    flex:1;
    line-height: 36px;
    text-align: center;
    cursor: pointer;
    background: #ccc;
}
section .login .top span.router-link-active{
    background: #fff;
}
</style>

