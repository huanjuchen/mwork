<template>
    <div class="login-container">
        <login-box @login="doLogin"/>
    </div>
</template>

<script>
    import {error, debug} from "../utils/ConsoleLogUtils"
    import LoginBox from "../components/Login/LoginBox";
    import {LoginApi} from "../api/AuthApi"
    import MwStore from "../store/MwStore";

    export default {
        name: "Login",
        components: {
            "login-box": LoginBox
        },
        methods: {

            /**
             * 组件初始化
             */
            init() {
                let ti = MwStore.tokenId;
                let rn = MwStore.Login.routeName;
                MwStore.Login.routeName = null;

                /*
                检查store中是否有token_id
                如果有，跳转回源地址
                 */

                if (ti != null && ti.length > 0) {
                    this.$message.warning("已登录，无需重复登录");

                    this.routeJump(rn);
                }
            },
            /**
             * 登录处理
             *
             * 参数为下层组件数据
             * @param username  用户名
             * @param password  密码
             */
            doLogin(username, password) {
                debug("username: " + username + "  password: " + password);
                LoginApi(username, password)
                    .then(response => {
                        if (response.data.code === 200) {
                            /*
                            登录成功后 步骤
                             */
                            //token_id存入Store
                            // sessionStorage.setItem("token_id", response.data.data.tokenId);
                            MwStore.tokenId = response.data.data.tokenId;
                            //用户信息存入store
                            MwStore.user = response.data.data.user;
                            //获取路径并进行路由跳转
                            let routeName = MwStore.Login.routeName;
                            MwStore.Login.routeName = null;
                            this.routeJump(routeName);
                        }
                    });
            },

            routeJump(name) {
                let rName = name;
                if (rName == null) {
                    rName = "Home";
                }
                this.$router.push({name: rName}).then(() => {
                    debug("路由跳转成功，组件名: " + name);
                }).catch(e => {
                    error("路由跳转出现一个错误，组件名: " + name);
                });
            }
        },
        mounted() {
            this.init();
        }
    }
</script>

<style scoped>
    .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }
</style>