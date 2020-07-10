<template>
    <el-card>
        <div class="search-box">
            <div class="item-box">日期范围: &nbsp;&nbsp;&nbsp;</div>
            <div class="item-box">
                <el-date-picker @change="rangeDateChangeEventHandle" v-model="rangeDate" type="daterange" size="small"
                                range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"/>
            </div>
            <div class="item-box">
                <el-button size="small" type="primary" @click="doSelect">查看</el-button>
            </div>
        </div>
        <div class="bank-box"></div>
        <el-divider/>

        <div v-if="list!=null&&list.length>0">
            <h2 style="text-align: center">银行日记账</h2>
            <div class="bank-box"/>
            <bank-account-list :list="list" :is-loading="isLoading"/>
        </div>
    </el-card>
</template>

<script>
    import {dateFormatter} from "../../../utils/DateUtils";
    import {getBankAccountApi} from "../../../api/AccountBookApi";
    import BankAccountList from "./bankAccount/BankAccountList";
    import queryStore from "../../../store/QueryStore";

    export default {
        name: "BankAccount",
        data() {
            return {
                startDate: "",
                endDate: "",
                rangeDate:[],
                list: [],
                count: 0,
                isLoading: false

            }
        },

        components: {
            "bank-account-list": BankAccountList
        },

        methods: {
            init() {
                if (this.rangeDate == null || this.rangeDate.length <= 0) {
                    let now = new Date();
                    this.rangeDate.push(now, now);
                    this.rangeDateChangeEventHandle();
                } else {
                    this.refreshList();
                }
            },


            refreshList() {
                if (this.startDate.length <= 0 || this.endDate <= 0) {
                    this.$message.warning("请选择日期");
                    return;
                }
                this.isLoading = true;
                getBankAccountApi(this.startDate, this.endDate).then(response => {
                    if (response.data.code === 200) {
                        this.list = response.data.data;
                    }
                    this.isLoading = false;
                }).catch(e=>{
                    this.isLoading=false;
                })
            },

            doSelect() {
                this.refreshList();
            },


            rangeDateChangeEventHandle() {
                if (this.rangeDate != null && this.rangeDate.length > 0) {
                    this.startDate = dateFormatter(this.rangeDate[0]);
                    this.endDate = dateFormatter(this.rangeDate[1]);
                    this.refreshList();
                } else {
                    this.startDate = "";
                    this.endDate = "";
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