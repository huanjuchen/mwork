<template>
    <el-card>
        <div class="search-box">
            <div class="item-box">
                月份:
            </div>
            <div class="item-box">
                <el-date-picker @change="monthChangeEventHandle" v-model="monthValue" type="month" size="small"
                                placeholder="选择月"/>
            </div>
            <div class="item-box">科目:</div>
            <div class="item-box">
                <el-select size="small" :remote-method="doGetSubjectList"
                           v-model="subjectId" :loading="isSubLoading"
                           remote filterable
                           placeholder="请输入科目代码或科目名检索">
                    <el-option
                            v-for="item in subjectList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"/>
                </el-select>
            </div>
            <div class="item-box">
                <el-button size="small" type="primary" @click="doSelect">查看</el-button>
            </div>
        </div>
        <el-divider/>

        <div v-if="list!=null&&list.length>0">
            <h2 style="text-align: center">明细分类账</h2>
            <div v-if="subject!=null">
                <b style="margin-left: 10px">会计科目：</b>{{subject.parent==null?"":subject.parent.name+"——"}}{{subject.name}}
            </div>
            <sub-account-list :is-loading="isLoading" :list="list"/>
        </div>
        <div class="bank-box"/>
    </el-card>
</template>

<script>
    import SubAccountList from "./subAccount/SubAccountList";
    import {getSubAccountApi} from "../../../api/AccountBookApi";
    import {getSubjectListApi, getSubjectById} from "../../../api/SubjectApi";
    import {getLastDay} from "../../../utils/DateUtils";

    export default {
        name: "SubAccount",
        data() {
            return {
                startDate: "",
                endDate: "",
                subject: null,
                subjectId: null,


                subjectList: [],

                list: [],
                isLoading: false,
                isSubLoading: false,
                monthValue: null
            }
        },
        components: {
            "sub-account-list": SubAccountList
        },
        methods: {
            init() {
                this.monthValue = new Date();
                this.monthChangeEventHandle(this.monthValue);
            },
            monthChangeEventHandle(val) {
                let date = new Date(val);
                let month = date.getMonth() + 1;
                let year = date.getFullYear();
                let lastDay = getLastDay(year, month);
                if (month < 10) {
                    month = "0" + month;
                }
                let ym = year + "-" + month;
                this.startDate = ym + "-" + "01";
                this.endDate = ym + "-" + lastDay;
                if (this.subjectId != null) {
                    this.doSelect();
                }
            },

            doSelect() {
                this.refreshList();
                this.doGetSubject()
            },


            refreshList() {
                if (this.startDate.length <= 0 || this.endDate <= 0) {
                    this.$message.warning("请选择日期");
                    return;
                }
                if (this.subjectId == null) {
                    this.$message.error("请选择科目");
                    return;
                }
                this.isLoading = true;
                getSubAccountApi(this.subjectId, this.startDate, this.endDate)
                    .then(response => {
                        if (response.data.code === 200) {
                            this.list = response.data.data;
                        }
                        this.isLoading = false;
                    }).catch(e => {
                    this.isLoading = false;
                })

            },

            doGetSubjectList(query) {
                if (query !== null && query.length > 0) {
                    this.isSubLoading = true;
                    getSubjectListApi(query, null, 1, 5, null, null)
                        .then(response => {
                            if (response.data.code === 200) {
                                this.subjectList = response.data.data;
                            }
                            this.isSubLoading = false;
                        }).catch(e => {
                        this.isSubLoading = false;
                    })
                }
            },

            doGetSubject() {
                if (this.subjectId != null) {
                    getSubjectById(this.subjectId).then(response => {
                        if (response.data.code === 200) {
                            this.subject = response.data.data;
                        }
                    })
                }
            }
        },
        created() {
            this.init();
        }
    }
</script>

<style lang="less" scoped>
    @import url("../../../css/accountBook");
</style>