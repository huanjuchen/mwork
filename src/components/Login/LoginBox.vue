<template>
    <div class="login-box">
        <div class="login-title">系统登录</div>
        <el-divider></el-divider>
        <el-form :model="loginData" :rules="rules" ref="loginData" label-width="25%">
            <el-form-item prop="username" label="用户名">
                <el-input v-model="loginData.username"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码">
                <el-input type="password" v-model="loginData.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" v-bind:style="{width:100+'%'}" @click="submitForm('loginData')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {debug} from "../../utils/ConsoleLogUtils"

    export default {
        name: "LoginBox",
        data() {
            return {
                loginData: {
                    username: "",
                    password: ""
                },
                rules: {
                    username: [
                        {required: true, message: "请输入用户名/编号", trigger: "blur"}
                    ],
                    password: [
                        {required: true, message: "请输入密码", trigger: "blur"}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        debug(this.loginData.username + "  " + this.loginData.password);

                        //把数据提交到上一级处理
                        this.$emit("login", this.loginData.username,
                            this.loginData.password);
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-box {
        width: 480px;
        border: #E0E0E0 1px solid;
        border-radius: 2px;
        background-color: #FAFAFA;
        box-shadow: 5px 5px 5px #E0E0E0;
        padding: 10px;

    }

    .login-title {
        display: flex;
        justify-content: center;
        flex-direction: row;
        font-weight: bold;
        font-size: larger;
        margin-top: 5px;
    }
</style>