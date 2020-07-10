<template>
    <div>
        <el-card>
            月份
            <el-date-picker @change="monthChangeEventHandle" v-model="monthValue" type="month" size="small"
                            placeholder="选择月">
            </el-date-picker>
            模式
            <el-select @change="showModeChangeEventHandle" size="small" v-model="showMode">
                <el-option v-for="item in showModeOptions" :label="item.label" :key="item.value"
                           :value="item.value"></el-option>
            </el-select>
            审核状态
            <el-select @change="verifyStatusChangeEventHandle" size="small" v-model="verifyStatus">
                <el-option v-for="item in verifyStatusOptions" :label="item.label" :key="item.value"
                           :value="item.value"></el-option>
            </el-select>
            排序方式
            <el-select @change="sortModeChangeEventHandle" size="small" v-model="orderType">
                <el-option v-for="item in sortModeOptions" :label="item.label" :key="item.value"
                           :value="item.value"></el-option>
            </el-select>
            <p style="text-align: center">
                <el-button size="small" type="primary" @click="doSelect">检索</el-button>
                <el-button size="small" type="primary" @click="doReset">重置</el-button>
                <el-button size="small" type="primary" @click="createVisible=true">创建</el-button>
            </p>
            <div class="bank-box"></div>
            <div v-if="list!=null&&list.length>0">
                <proof-list :list="list" :count="count" :is-loading="isLoading"
                            :page="page" :page-size="pageSize" @showDetail="doShowDetail"
                            @verifyProof="doVerifyProof" @trashProof="doTrash"
                            @pageChange="doPageChange" @pageSizeChange="doPageSizeChange"/>
            </div>
        </el-card>

        <el-dialog :width="850+'px'" :visible.sync="createVisible" @close="createDialogCloseEventHandle" center>
            <proof-form :form-version="createFormVersion" @outData="doCreate"/>
        </el-dialog>

        <el-dialog :width="850+'px'" :visible.sync="detailVisible" @close="detailDialogCloseEventHandle" center>
            <proof-detail :proof="proof"/>
        </el-dialog>

    </div>
</template>

<script>
    import ProofForm from "./proofManagement/ProofForm";
    import ProofDetail from "./proofManagement/ProofDetail";
    import ProofList from "./proofManagement/ProofList";
    import {
        getProofApi, getProofCountApi, getProofListApi,
        verifyProofApi, trashProofApi, createProofApi
    } from "../../../api/ProofApi";
    import MwStore from "../../../store/MwStore";

    import {getLastDay, getTimestamp} from "../../../utils/DateUtils";
    import queryStore from "../../../store/QueryStore";

    export default {
        name: "ProofManagement",
        data() {
            return {
                user: MwStore.user,

                createFormVersion: getTimestamp(),
                /*
                子组件数据
                */
                list: [],
                count: 0,
                proof: null,
                isLoading: false,
                createVisible: false,
                detailVisible: false,
                /*
                查询参数
                 */
                //记账人用户id
                rid: queryStore.proofManagement.rid,
                startDate: queryStore.proofManagement.startDate,
                endDate: queryStore.proofManagement.endDate,
                verify: queryStore.proofManagement.verify,
                orderType: queryStore.proofManagement.orderType,
                page: queryStore.proofManagement.page,
                pageSize: queryStore.proofManagement.pageSize,
                /*
                中间值
                 */
                showMode: queryStore.proofManagement.showMode,
                verifyStatus: queryStore.proofManagement.verifyStatus,
                monthValue: queryStore.proofManagement.monthValue,
                /*
                选项
                 */
                showModeOptions: [
                    {
                        label: "显示所有",
                        value: 1
                    },
                    {
                        label: "只看我",
                        value: 0
                    }
                ],
                verifyStatusOptions: [
                    {
                        label: "查看所有",
                        value: -2
                    },
                    {
                        label: "待审核",
                        value: 0
                    },
                    {
                        label: "审核通过",
                        value: 1
                    },
                    {
                        label: "审核未通过",
                        value: -1
                    }
                ],
                sortModeOptions: [
                    {
                        label: "日期降序",
                        value: "dateDESC"
                    },
                    {
                        label: "日期升序",
                        value: "dateASC"
                    },
                    {
                        label: "凭证号降序",
                        value: "idDESC"
                    },
                    {
                        label: "凭证号升序",
                        value: "idASC"
                    }
                ]
            }
        },
        components: {
            "proof-form": ProofForm,
            "proof-list": ProofList,
            "proof-detail": ProofDetail
        },
        methods: {

            init() {
                if (this.monthValue == null) {
                    this.monthValue = new Date();
                }
                this.monthChangeEventHandle(this.monthValue);
                this.refreshList();
                this.refreshCount();
            },

            /**
             * 创建新凭证
             */
            doCreate(obj) {
                createProofApi(obj).then(response => {
                    if (response.data.code === 200) {
                        this.$message.success("创建成功");
                        this.createFormVersion = getTimestamp();
                        this.createVisible = false;
                        this.refreshList();
                        this.refreshCount();
                    }
                })
            },

            doTrash(id) {
                trashProofApi(id).then(response => {
                    if (response.data.code === 200) {
                        this.$message.success("提交成功，等待审核");
                        this.refreshList();
                        this.refreshCount();
                    }
                })
            },

            doVerifyProof(id, result) {
                let obj = {
                    id: id,
                    result: result
                };
                verifyProofApi(obj).then(response => {
                    if (response.data.code === 200) {
                        this.$message.success("审核完成");
                    }
                    this.refreshList();
                    this.refreshCount();
                })
            },

            doShowDetail(id) {
                getProofApi(id).then(response => {
                    if (response.data.code === 200) {
                        this.proof = response.data.data;
                        this.detailVisible = true;
                    }
                })
            },

            doPageChange(val) {
                this.page = val;
                queryStore.proofManagement.page = val;
                this.refreshList();
            },

            doPageSizeChange(val) {
                this.pageSize = val;
                queryStore.proofManagement.pageSize = val;
                this.page = 1;
                queryStore.proofManagement.page = 1;
                this.refreshList();
            },

            /**
             * 检索
             */
            doSelect() {
                this.refreshList();
                this.refreshCount();
            },

            /**
             * 重置搜索条件
             */
            doReset() {
                this.rid = null;
                queryStore.proofManagement.rid = null;
                this.startDate = "";
                queryStore.proofManagement.startDate = "";
                this.endDate = "";
                queryStore.proofManagement.endDate = "";
                this.refreshList();
                this.refreshCount();
            },

            createDialogCloseEventHandle() {
                this.createFormVersion = getTimestamp();
            },

            detailDialogCloseEventHandle() {
                this.proof = null;
            },

            /**
             * 显示模式条件改变
             * @param val
             */
            showModeChangeEventHandle(val) {
                if (val === 0) {
                    queryStore.proofManagement.showMode = 0;
                    queryStore.proofManagement.rid = this.user.id;
                    this.rid = this.user.id;
                } else if (val === 1) {
                    queryStore.proofManagement.showMode = 1;
                    this.rid = null;
                    queryStore.proofManagement.rid = null;
                }
                this.refreshList();
                this.refreshCount();
            },
            /**
             * 月份条件改变
             */
            monthChangeEventHandle(val) {
                queryStore.proofManagement.monthValue = val;
                let date = new Date(val);
                let month = date.getMonth() + 1;
                let year = date.getFullYear();
                let lastDay = getLastDay(year, month);
                if (month < 10) {
                    month = "0" + month;
                }
                let ym = year + "-" + month;
                this.startDate = ym + "-01";
                this.endDate = ym + "-" + lastDay;
                queryStore.proofManagement.startDate = this.startDate;
                queryStore.proofManagement.endDate = this.endDate;
                this.refreshList();
                this.refreshCount();
            },
            /**
             * 稽核状态条件改变
             */
            verifyStatusChangeEventHandle(val) {
                this.verify = val;
                queryStore.proofManagement.verifyStatus = val;
                queryStore.proofManagement.verify = val;
                this.refreshList();
                this.refreshCount();
            },
            /**
             * 排序模式条件改变
             */
            sortModeChangeEventHandle(val) {
                queryStore.proofManagement.orderType = val;
                this.refreshList();
            },

            /**
             * 刷新list，请求数据
             */
            refreshList() {
                this.isLoading = true;
                getProofListApi(this.rid, this.startDate, this.endDate, this.verify,
                    this.orderType, this.page, this.pageSize)
                    .then(response => {
                        if (response.data.code === 200) {
                            this.list = response.data.data;
                        }
                        this.isLoading = false;
                    })
            },
            /**
             * 属性count，请求数据
             */
            refreshCount() {
                getProofCountApi(this.rid, this.startDate, this.endDate, this.verify)
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