<template>
    <div>
        <el-card>
            <el-input
                    size="medium" @input="searchTextChangeEventHandle"
                    placeholder="请输入查找的姓名或用户编号..."
                    v-model="searchText"
                    v-bind:style="{width:40+'%'}"
            ></el-input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button size="medium" type="primary" @click="doSearch">
                <i class="el-icon-search"></i> 搜 索
            </el-button>
            <el-button size="medium" type="primary" @click="doReset">
                <i class="el-icon-warning-outline"></i>
                重 置
            </el-button>
            <el-button size="medium" type="primary" @click="showCreateDialog">
                <i class="el-icon-plus"></i> 添 加
            </el-button>
            <div class="bank-box"></div>
            <user-list :list="list" :count="count" :page="page"
                       :page-size="pageSize" :is-loading="isLoading"
                       @changePage="doChangePage" @changePageSize="doChangePageSize"
                       @showInfo="doShowInfo" @resetPwd="doRestPwd"
                       @lockUser="doLockUser" @unlockUser="doUnlockUser"/>
        </el-card>

        <el-dialog title="添加用户" :visible.sync="createDialogVisible"
                   @close="createDialogCloseEventHandle" width="480px" center>
            <user-create-form :form-version="userCreateFormVersion"
                              @createUser="doCreateUser" @closeCreateDialog="doCloseCreateDialog"/>
        </el-dialog>

        <el-dialog title="详细信息" :visible.sync="infoShowDialog" width="360px" center>
            <user-info-detail :user="info"/>
        </el-dialog>
    </div>
</template>

<script>
    import UserCreateForm from "./userManagement/UserCreateForm";
    import UserList from "./userManagement/UserList";
    import UserInfoDetail from "./userManagement/UserInfoDetail";

    import {
        createUserApi, getUsersApi,
        getUsersCountApi, lockUserApi,
        unlockUserApi, resetPwdApi
    } from "../../../api/UserManageApi";

    // import {debug} from "../../../utils/ConsoleLogUtils";
    import {getTimestamp} from "../../../utils/DateUtils";
    import queryStore from "../../../store/QueryStore";

    export default {


        name: "UserManagement",
        data() {
            return {
                //新建用户对话框显示状态
                createDialogVisible: false,
                //用户详细信息对话框显示状态
                infoShowDialog: false,
                //用户详细信息
                info: null,
                list: [],
                //检索条件
                searchText: queryStore.userManagement.searchText,
                page: queryStore.userManagement.page,
                pageSize: queryStore.userManagement.pageSize,
                desc: queryStore.userManagement.desc,
                valid: queryStore.userManagement.valid,
                isLoading: false,
                count: 0,
                //新建用户表单版本
                userCreateFormVersion: getTimestamp()
            }
        },
        methods: {
            /**
             * 组件初始化
             */
            init() {
                //清空info
                this.info = null;
                //刷新list
                this.refreshList();
                //刷新count
                this.refreshCount();
            },

            searchTextChangeEventHandle(val) {
                queryStore.userManagement.searchText = val;
            },

            /**
             * 更改当前页码
             */
            doChangePage(val) {
                this.page = val;
                queryStore.userManagement.page=val;
                this.refreshList();
            },

            /**
             * 更改每页数量
             */
            doChangePageSize(val) {
                this.pageSize = val;
                queryStore.userManagement.pageSize=val;
                this.refreshList();
            },

            /**
             * 重置用户密码
             */
            doRestPwd(userId) {
                resetPwdApi(userId).then(response => {
                    if (response.data.code === 200) {
                        this.$message.success("重置成功");
                    }
                })
            },

            /**
             * 禁用用户
             */
            doLockUser(userId) {
                lockUserApi(userId).then(response => {
                    if (response.data.code === 200) {
                        this.$message.success("禁用成功");
                        this.refreshCount();
                        this.refreshList();
                    }
                });
            },

            /**
             * 启用用户
             */
            doUnlockUser(userId) {
                unlockUserApi(userId).then(response => {
                    if (response.data.code === 200) {
                        this.$message.success("启用成功");
                        this.refreshList();
                        this.refreshCount();
                    }
                });
            },


            /**
             * 执行搜索
             */
            doSearch() {
                this.refreshList();
                this.refreshCount();
            },

            /**
             * 执行重置
             */
            doReset() {
                this.searchText = "";
                this.page = 1;
                this.refreshList();
                this.refreshCount();
            },

            /**
             * 显示添加用户对话框
             */
            showCreateDialog() {
                this.info = null;
                this.createDialogVisible = true;
            },

            /**
             * 关闭创建窗口时的事件处理
             *
             */
            createDialogCloseEventHandle() {

                /*
                更新表单版本
                让其重置数据
                 */
                this.userCreateFormVersion = getTimestamp();

            },

            /**
             * 关闭详细信息窗口的事件处理
             *
             */
            infoDialogCloseEventHandle() {
                this.info = null;
            },


            /**
             * 关闭创建对话框
             */
            doCloseCreateDialog() {
                this.createDialogVisible = false;
            },

            doShowInfo(val) {
                this.info = val;
                this.infoShowDialog = true;
            },


            /**
             * 添加用户
             */
            doCreateUser(user) {
                createUserApi(user).then(response => {
                    if (response.data.code === 200) {
                        let nu = response.data.data;
                        this.$message.success("用户 " + nu.username + " 创建成功");
                        this.createDialogVisible = false;
                        this.refreshList();
                        this.refreshCount();
                    }
                })
            },


            /**
             * 刷新List，用于获取或刷新List
             */
            refreshList() {
                //设置为加载状态
                this.isLoading = true;
                //获取数据
                getUsersApi(this.page, this.pageSize,
                    this.searchText, this.valid, this.desc).then(response => {
                    if (response.data.code === 200) {
                        //获取成功处理
                        this.list = response.data.data;
                    }
                    //设置为非加载状态
                    this.isLoading = false;
                }).catch(e => {
                    this.isLoading = false;
                });
            },

            /**
             * 刷新Count
             */
            refreshCount() {
                getUsersCountApi(this.searchText, this.valid)
                    .then(response => {
                        if (response.data.code === 200) {
                            this.count = response.data.data;
                        }
                    });
            }

        },
        components: {
            "user-create-form": UserCreateForm,
            "user-list": UserList,
            "user-info-detail": UserInfoDetail
        },

        created() {
            this.init();
        }
    }
</script>

<style scoped>
</style>