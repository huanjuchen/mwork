<template>
    <div class="proof-box">
        <div class="box-item-type1">
            <div class="proof-title-text">记 账 凭 证</div>
        </div>
        <div class="bank-box"></div>
        <div class="box-item-type1">
            <el-date-picker
                    v-model="proof.date"
                    type="date"
                    format="yyyy年MM月dd日"
                    size="small"
                    prefix-icon="null"
                    placeholder="选择日期"
            ></el-date-picker>
        </div>
        <div class="bank-box"></div>
        <!--        表格开始-->
        <div class="proof-table-box">
            <!--表格头部开始-->
            <div class="proof-table-header">
                <div class="proof-table-double-row">
                    <!--头部摘要-->
                    <div class="proof-table-item item20 proof-table-header-text">
                        摘 要
                    </div>
                    <!--头部借方科目-->
                    <div class="proof-table-item item32">
                        <div class="proof-table-row">
                            <div class="proof-table-item item100 proof-table-header-text">
                                借 方 科 目
                            </div>
                        </div>
                        <div class="proof-table-row">
                            <div class="proof-table-item item100 proof-table-header-text">
                                总账科目
                            </div>
                            <div class="proof-table-item item100 proof-table-header-text">
                                明细账科目
                            </div>
                        </div>
                    </div>
                    <!--头部贷方科目-->
                    <div class="proof-table-item item32">
                        <div class="proof-table-row">
                            <div class="proof-table-item item100 proof-table-header-text">
                                贷 方 科 目
                            </div>
                        </div>
                        <div class="proof-table-row">
                            <div class="proof-table-item item100 proof-table-header-text">
                                总账科目
                            </div>
                            <div class="proof-table-item item100 proof-table-header-text">
                                明细账科目
                            </div>
                        </div>
                    </div>
                    <!--头部金额-->
                    <div class="proof-table-item item16 proof-table-header-text">
                        金 额
                    </div>
                </div>
            </div>
            <!--表格头部结束-->

            <!--数据区1开始-->
            <div class="proof-table-row" v-for="(item,index) in proof.items">
                <!--摘要-->
                <div class="proof-table-item item20 proof-plain-text">
                    <el-input size="mini" v-model="proof.items[index].abstraction"/>
                </div>
                <!--借方总账科目-->
                <div class="proof-table-item item16 proof-plain-text">
                    <el-select size="mini" remote filterable placeholder="请输入科目"
                               :loading="isLoading" :remote-method="doGetSubjectList"
                               v-model="proof.items[index].debitLedgerSubjectId">
                        <el-option v-for="item in subjectList" :key="item.id"
                                   :label="item.name" :value="item.id"/>
                    </el-select>
                </div>
                <!--借方明细账科目-->
                <div class="proof-table-item item16 proof-plain-text">
                    <el-select size="mini" remote filterable placeholder="请输入科目"
                               :loading="isLoading" :remote-method="doGetSubjectList"
                               v-model="proof.items[index].debitSubSubjectId">
                        <el-option v-for="item in subjectList" :key="item.id"
                                   :label="item.name" :value="item.id"/>
                    </el-select>
                </div>
                <!--贷方总账科目-->
                <div class="proof-table-item item16 proof-plain-text">
                    <el-select size="mini" remote filterable placeholder="请输入科目"
                               :loading="isLoading" :remote-method="doGetSubjectList"
                               v-model="proof.items[index].creditLedgerSubjectId">
                        <el-option v-for="item in subjectList" :key="item.id"
                                   :label="item.name" :value="item.id"/>
                    </el-select>
                </div>
                <!--贷方明细账科目-->
                <div class="proof-table-item item16 proof-plain-text">
                    <el-select size="mini" remote filterable placeholder="请输入科目"
                               :loading="isLoading" :remote-method="doGetSubjectList"
                               v-model="proof.items[index].creditSubSubjectId">
                        <el-option v-for="item in subjectList" :key="item.id"
                                   :label="item.name" :value="item.id"/>
                    </el-select>
                </div>
                <div class="proof-table-item item16 proof-plain-text">
                    <el-input size="mini" type="number" v-model.number="proof.items[index].money"/>
                </div>
            </div>
            <!--数据区1结束-->

            <!--数据区2开始-->
            <div class="proof-table-row">
                <div class="proof-row-item proof-plain-text" style="align-items: center">
                    <div style=" box-sizing:border-box;width: 40%;display: flex;flex-direction: row;flex-flow: nowrap">
                        <div style="width: 100%;height: 100%">
                            &nbsp;&nbsp;附单据 &nbsp;&nbsp;
                            <el-input size="mini" type="number" v-model="proof.invoiceCount" :style="{width:35+'%'}"/>
                            张
                        </div>
                    </div>
                    <div style="width: 20%;box-sizing: border-box">合 计:&nbsp;{{getSum}}</div>
                </div>
            </div>
            <!--数据区2结束-->


            <div class="proof-table-row proof-plain-text">
                <div class="proof-row-item">
                    <div>
                        主管：&nbsp;
                        <el-input size="mini" :style="{width:50+'%'}" v-model="proof.manager"></el-input>
                    </div>
<!--                    <div>-->
<!--                        记账: &nbsp;-->
<!--                        <el-input size="mini" :style="{width:50+'%'}" v-model="proof.collection"></el-input>-->
<!--                    </div>-->
<!--                    <div>-->
<!--                        出纳: &nbsp;-->
<!--                        <el-input size="mini" :style="{width:50+'%'}" v-model="proof.cashier"></el-input>-->
<!--                    </div>-->
                </div>
            </div>
        </div>
        <div class="bank-box"></div>
        <div class="proof-button-box">
            <el-button size="small" @click="addItemRow">添加一行</el-button>
            <el-button size="small" @click="removeItemRow">移除一行</el-button>
            <el-button size="small" @click="outData" type="primary">提 交</el-button>
        </div>

    </div>
</template>

<script>
    import {getSubjectListApi} from "../../../../api/SubjectApi"

    export default {
        name: "ProofForm",
        props: {
            formVersion: Number
        },
        data() {
            return {
                subjectList: [],
                isLoading: false,
                isSubmit: false,
                proof: {
                    date: null,
                    invoiceCount: null,
                    manager: "",
                    collection: "",
                    cashier: "",
                    payer: "",
                    items: []
                }
            }
        },
        methods: {

            /**
             * 组件初始化
             */
            init() {
                for (let i = 0; i < 2; i++) {
                    this.proof.items.push(this.getStrut());
                }
            },

            /**
             * 把数据提交到父组件
             */
            outData() {
                if (!this.isSubmit) {
                    this.isSubmit = true;
                    this.$emit("outData", this.proof);
                } else {
                    this.$message.warning("请勿重复提交");
                }
            },

            /**
             * 重置数据
             */
            resetData() {
                this.proof.date = null;
                this.proof.invoiceCount = null;
                this.proof.manager = "";
                this.proof.collection = "";
                this.proof.cashier = "";
                this.proof.payer = "";
                this.proof.items = [this.getStrut(), this.getStrut()];
                this.isSubmit = false;
            },

            /**
             * 获取待选择科目
             */
            doGetSubjectList(query) {
                if (query != null && query.length > 0) {
                    this.isLoading = true;
                    getSubjectListApi(query, null, 1, 15, true, null)
                        .then(response => {
                            if (response.data.code === 200) {
                                this.subjectList = response.data.data;
                            }
                            this.isLoading = false;
                        })
                }
            },

            /**
             * 获得一个空item对象
             */
            getStrut() {
                return {
                    //摘要
                    abstraction: null,
                    //借方明细账科目ID
                    debitSubSubjectId: null,
                    //贷方明细账科目ID
                    creditSubSubjectId: null,
                    //借方总账科目ID
                    debitLedgerSubjectId: null,
                    //贷方总账科目ID
                    creditLedgerSubjectId: null,
                    //金额
                    money: null
                }
            },

            /**
             * 添加一个item
             */
            addItemRow() {
                this.proof.items.push(this.getStrut());
            },
            /**
             * 移除一个item
             */
            removeItemRow() {
                this.proof.items.pop();
            }
        },
        computed: {
            /**
             * 计算总金额
             */
            getSum() {
                let sum = 0;
                if (this.proof.items != null && this.proof.items.length !== 0) {
                    for (let i = 0; i < this.proof.items.length; i++) {
                        if (this.proof.items[i].money != null) {
                            sum = sum + this.proof.items[i].money;
                        }
                    }
                }
                return sum;
            }
        },
        watch: {
            formVersion: function () {
                this.resetData();
            }
        },


        created() {
            this.init();
        }

    }
</script>

<style lang="less" scoped>
    @import url("../../../../css/proof");
</style>