<template>
    <el-menu mode="horizontal">

        <el-menu-item v-bind:style="{float:'right'}" v-if="user!=null">
            <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{user.username}}
          <i class="el-icon-user"></i>
        </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="userLogout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-menu-item>
        <el-menu-item v-bind:style="{float:'right'}" v-if="user==null">
      <span class="el-dropdown-link">
        <router-link to="/login">请先登录</router-link>
        <i class="el-icon-user"></i>
      </span>
        </el-menu-item>
    </el-menu>
</template>

<script>
    import MwStore from "../../store/MwStore";
    import {LogoutApi} from "../../api/AuthApi";
    import {debug, error} from "../../utils/ConsoleLogUtils";

    export default {
        name: "TopBar",
        methods: {
            /**
             * 事件处理
             * @param command
             */
            handleCommand(command) {
                if (command === "userLogout") {
                    debug("处理登出事件")
                    this.logout();
                }
            },

            /**
             * 登出事件处理
             */
            logout() {
                //发送请求
                LogoutApi().then(response => {
                    if (response.data.code === 200) {
                        //成功处理
                        this.logoutAfter();
                    }
                });
            },

            /**
             * 登出成功后置处理
             */
            logoutAfter() {
                //清除tokenId
                MwStore.tokenId = null;

                //清除user信息
                MwStore.user = null;

                //重置LeftNav的活动项
                MwStore.Home.LeftNavigation.activeIndex="DashBoard";

                //路由跳转到Login组件
                this.$router.push({name: "Login"})
                    .catch(e => {
                        error("路由跳转出现一个错误，目标组件: Login");
                    });

            }

        },
        computed: {
            user: function () {
                return MwStore.user;
            }
        }

    }
</script>