<template>
    <el-form :model="newUser" ref="newUserForm" :rules="rules">
        <el-form-item prop="username">
            <el-input placeholder="用户名" v-model="newUser.username"></el-input>
        </el-form-item>
        <el-form-item prop="name">
            <el-input placeholder="姓名" v-model="newUser.name"></el-input>
        </el-form-item>
        <el-form-item prop="role">
            <el-select v-model="newUser.role" placeholder="请选择用户类型" v-bind:style="{width:100+'%'}">
                <el-option label="会计" value="3"></el-option>
                <el-option label="主管会计" value="2"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item prop="phone">
            <el-input placeholder="手机号" v-model="newUser.phone"></el-input>
        </el-form-item>
        <el-form-item>
            <div :style="{textAlign:'center'}">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submitForm('newUserForm')">添 加</el-button>
            </div>
        </el-form-item>
    </el-form>

</template>

<script>
    // import MwStore from "../../../../store/MwStore"

    export default {
        name: "UserCreateForm",
        props:{
            formVersion:Number
        },

        data() {
            return {
                //新用户数据
                newUser: {
                    username: "",
                    name: "",
                    role: null,
                    phone: ""
                },
                //校验规则
                rules: {
                    username: [
                        {
                            required: true,
                            message: "请输入用户名",
                            trigger: "blur"
                        }
                    ],
                    role: [
                        {
                            required: true,
                            message: "请选择用户类型",
                            trigger: "blur"
                        }
                    ],
                    name: [
                        {
                            required: true,
                            message: "请输入姓名",
                            trigger: "blur"
                        }
                    ]
                },
                isSubmit: false
            }
        },
        methods: {
            /**
             * 组件初始化调用
             */
            init() {


            },

            /**
             * 提交表单
             */
            submitForm(formName) {
                if (this.isSubmit) {
                    this.$message.warning("请勿重复提交");
                    return;
                }

                this.$refs[formName].validate(valid => {
                    if (valid) {
                        //提交状态设置true
                        this.isSubmit = true
                        //提交数据给父组件处理
                        this.$emit("createUser", this.newUser);
                    }
                });
            },

            /**
             * 重置表单数据 以及重置提交状态
             */
            resetFormData() {
                this.newUser.username = "";
                this.newUser.role = null;
                this.newUser.phone = "";
                this.newUser.name = "";
                this.isSubmit = false;
            },


            /**
             * 取消创建
             */
            cancel() {
                //触发关闭窗口事件
                this.$emit("closeCreateDialog");
            }

        },
        watch:{
            formVersion:function() {
                this.resetFormData();
            }
        },
        created() {
            this.init();
        }
    }
</script>

<style scoped>

</style>