<template>
    <div>
        <el-card>
            <el-input
                    size="medium" @input="searchTextChangeEventHandle"
                    placeholder="请输入查找的科目名或科目代码..."
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
            <div class="bank-box"></div>
            <subject-list v-if="list!=null&&list.length>0"
                          :count="count" :list="list" :is-loading="isLoading"
                          :page-size="pageSize" :page="page"
                          @showDetail="doShowDetail" @modifySubject="doModifySubject"
                          @lockSubject="doLockSubject" @unlockSubject="doUnlockSubject"
                          @deleteSubject="doDeleteSubject"
                          @changePage="doPageChange" @changePageSize="doPageSizeChange"
            />


        </el-card>

        <el-dialog title="添加科目" :visible.sync="createDialogVisible" @close="createDialogCloseEventHandle" width="480px"
                   center>
            <subject-form :form-version="createFormVersion"
                          @submitData="doSubmitDataNew" @cancelSubmit="doCancelNew"/>
        </el-dialog>

        <el-dialog title="修改科目" :visible.sync="modifyDialogVisible" @close="modifyDialogCloseEventHandle" width="480px"
                   center>
            <subject-form :form-version="modifyFormVersion" :init-val="modifySubject"
                          @submitData="doSubmitDataModify" @cancelSubmit="doCancelModify"/>
        </el-dialog>

        <el-dialog title="科目详情" :visible.sync="infoDialogVisible" @close="infoDialogCloseEventHandle" width="360px"
                   center>
            <subject-detail :subject="info"/>
        </el-dialog>

    </div>
</template>

<script>
    import {
        createSubjectApi,
        getSubjectListApi, getSubjectById,
        countSubjectApi, lockSubjectApi, unLockSubjectApi,
        deleteSubjectApi, updateSubjectApi
    } from "../../../api/SubjectApi"

    import SubjectForm from "./subjectManagement/SubjectForm";
    import SubjectDetail from "./subjectManagement/SubjectDetail";
    import SubjectList from "./subjectManagement/SubjectList";

    import {getTimestamp} from "../../../utils/DateUtils";

    import queryStore from "../../../store/QueryStore";

    export default {
        name: "SubjectManagement",
        data() {
            return {
                //创建科目对话框状态
                createDialogVisible: false,

                //修改对话框状态
                modifyDialogVisible: false,
                //科目详细信息对话框状态
                infoDialogVisible: false,
                //搜索关键字
                searchText: queryStore.subjectManagement.searchText,
                //排序属性
                desc: queryStore.subjectManagement.desc,
                //满足条件的结果
                list: [],
                //结果数
                count: 0,
                page: queryStore.subjectManagement.page,
                pageSize: queryStore.subjectManagement.pageSize,
                //将要显示的详细信息
                info: null,
                //将要修改的科目信息
                modifySubject: null,
                //是否正在加载数据
                isLoading: false,
                //创建科目表单版本
                createFormVersion: getTimestamp(),
                //修改科目表单版本
                modifyFormVersion: getTimestamp()
            }
        },
        components: {
            "subject-form": SubjectForm,
            "subject-detail": SubjectDetail,
            "subject-list": SubjectList
        },
        methods: {

            init() {
                this.refreshList();
                this.refreshCount();
            },

            createDialogCloseEventHandle() {
                this.createFormVersion = getTimestamp();
            },

            modifyDialogCloseEventHandle() {
                this.modifySubject = null;
                this.modifyFormVersion = getTimestamp();
            },

            infoDialogCloseEventHandle() {
                this.info = null;
            },

            searchTextChangeEventHandle(val){
                queryStore.subjectManagement.searchText=val;
            },


            /**
             * 根据条件筛选
             */
            doSearch() {
                this.refreshCount();
                this.refreshList();
            },

            /**
             * 重置
             */
            doReset() {
                this.page = 1;
                queryStore.subjectManagement.page=1;
                this.searchText = "";
                queryStore.subjectManagement.searchText="";
                this.refreshCount();
                this.refreshList();
            },
            //---------------

            /**
             * 禁用科目
             */
            doLockSubject(sid) {
                lockSubjectApi(sid).then(response => {
                    if (response.data.code === 200) {
                        this.$message.success("禁用成功");
                        this.refreshList();
                        this.refreshCount();
                    }
                })
            },

            /**
             * 启用科目
             */
            doUnlockSubject(sid) {
                unLockSubjectApi(sid).then(response => {
                    if (response.data.code === 200) {
                        this.$message.success("启用成功");
                        this.refreshList();
                        this.refreshCount();
                    }
                })
            },

            /**
             * 删除科目
             */
            doDeleteSubject(sid) {
                deleteSubjectApi(sid).then(response => {
                    if (response.data.code === 200) {
                        this.$message.success("删除成功");
                        this.refreshList();
                        this.refreshCount();
                    }
                })
            },

            /**
             * 更改页码
             */
            doPageChange(pn) {
                this.page = pn;
                queryStore.subjectManagement.page=pn;
                this.refreshList();
            },

            /**
             * 更改每页数目
             */
            doPageSizeChange(ps) {
                this.pageSize = ps;
                queryStore.subjectManagement.pageSize=ps;
                this.refreshList();
            },

            showCreateDialog() {
                this.createDialogVisible = true;
            },

            doModifySubject(sid) {
                getSubjectById(sid).then(response => {
                    if (response.data.code === 200) {
                        this.modifySubject = response.data.data;
                        this.modifyDialogVisible = true;
                    }
                })
            },

            /**
             * 显示详细信息
             */
            doShowDetail(subject) {
                this.info = subject;
                this.infoDialogVisible = true;
            },

            //-----------------------

            /**
             * 提交创建
             */
            doSubmitDataNew(sub) {
                createSubjectApi(sub).then(response => {
                    if (response.data.code === 200) {
                        let subject = response.data.data;
                        this.$message.success("科目 " + subject.name + " 添加成功");
                        this.createDialogVisible = false;
                        this.createFormVersion = getTimestamp();
                        this.refreshList();
                        this.refreshCount();
                    }
                })
            },

            /**
             * 提交修改
             */
            doSubmitDataModify(sub) {
                updateSubjectApi(sub).then(response => {
                    if (response.data.code === 200) {
                        this.$message.success("修改成功");
                        this.modifyDialogVisible = false;
                        this.modifySubject = null;
                        this.modifyFormVersion = getTimestamp();
                        this.refreshList();
                        this.refreshCount();
                    }
                })
            },

            /**
             * 取消创建
             */
            doCancelNew() {
                //关闭对话框，并更新表单版本让其重置表单数据
                this.createDialogVisible = false;
                this.createFormVersion = getTimestamp();

            },
            /**
             * 取消修改
             */
            doCancelModify() {
                //关闭对话框，把修改科目的值设为空
                // 并更新表单版本让其重置表单数据
                this.modifyDialogVisible = false;
                this.modifySubject = null;
                this.modifyFormVersion = getTimestamp();
            },


            /**
             * 从后端获取list
             */
            refreshList() {
                this.isLoading = true;
                getSubjectListApi(this.searchText, this.desc,
                    this.page, this.pageSize,
                    null, null).then(response => {
                    if (response.data.code === 200) {
                        this.list = response.data.data;
                    }
                    this.isLoading = false;
                })


            },
            /**
             * 从后端获取count
             */
            refreshCount() {
                countSubjectApi(this.searchText, null, null)
                    .then(response => {
                        if (response.data.code === 200) {
                            this.count = response.data.data;
                        }
                    })
            }
        },
        created() {
            this.init();
        }
    }
</script>

<style scoped>
</style>