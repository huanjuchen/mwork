<template>
    <div class="proof-box" v-if="proof!=null">
        <div class="box-item-type1">
            <div class="proof-title-text">
                记 账 凭 证
            </div>
        </div>
        <div class="bank-box"></div>
        <div class="box-item-type1">
            <div class="proof-title-text">
                {{_dateFormatter(proof.date)}}
            </div>
        </div>
        <div class="bank-box"></div>
        <div class="proof-table-box">
            <!--表格头部开始-->
            <div class="proof-table-header">
                <div class="proof-table-double-row">
                    <!--头部摘要-->
                    <div class="proof-table-item item18 proof-table-header-text">
                        摘 要
                    </div>
                    <!--头部借方科目-->
                    <div class="proof-table-item item30">
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
                    <div class="proof-table-item item30">
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
                    <div class="proof-table-item item12 proof-table-header-text">
                        金 额
                    </div>

                    <div class="proof-table-item item10 proof-table-header-text">
                        记账标识
                    </div>
                </div>
            </div>
            <!--表格头部结束-->

            <!--数据区1开始-->
            <div class="proof-table-row" v-for="(item,index) in proof.items">
                <!--摘要-->
                <div class="proof-table-item item18 proof-plain-text hiddenOver">
                    {{item.abstraction}}
                </div>
                <!--借方总账科目-->
                <div class="proof-table-item item15 proof-plain-text hiddenOver">
                    {{item.debitLedgerSubject.name}}
                </div>
                <!--借方明细账科目-->
                <div class="proof-table-item item15 proof-plain-text hiddenOver">
                    {{item.debitSubSubject.name}}
                </div>
                <!--贷方总账科目-->
                <div class="proof-table-item item15 proof-plain-text hiddenOver">
                    {{item.creditLedgerSubject.name}}
                </div>
                <!--贷方明细账科目-->
                <div class="proof-table-item item15 proof-plain-text hiddenOver">
                    {{item.creditSubSubject.name}}
                </div>
                <div class="proof-table-item item12 proof-plain-text hiddenOver">
                    {{item.money}}
                </div>
                <div class="proof-table-item item10 proof-plain-text hiddenOver">
                    {{item.charge?"√":""}}
                </div>
            </div>
            <!--数据区1结束-->

            <!--数据区2开始-->
            <div class="proof-table-row">
                <div class="proof-row-item proof-plain-text" style="align-items: center">
                    <div style=" box-sizing:border-box;width: 40%;display: flex;flex-direction: row;flex-flow: nowrap">
                        <div style="width: 100%">
                            &nbsp;&nbsp;附单据 &nbsp;{{proof.invoiceCount}}张
                        </div>
                    </div>
                    <div style="width: 20%;box-sizing: border-box">合 计:&nbsp;{{getSum}}</div>
                </div>
            </div>
            <!--数据区2结束-->


            <div class="proof-table-row proof-plain-text">
                <div class="proof-row-item">
                    <div>&nbsp;&nbsp;&nbsp;主管：{{proof.manager}}</div>
                    <div>制单人：{{proof.recorder.name}}</div>
                    <div>稽核：{{proof.verifyUser==null?"":proof.verifyUser.name}}&nbsp;&nbsp;&nbsp;</div>
                </div>
            </div>

        </div>
        <div class="bank-box"></div>
        <div class="bank-box"></div>
    </div>
</template>

<script>
    import {dateFormatter} from "../../../../utils/DateUtils";

    export default {
        name: "ProofDetail",
        props: {
            proof: {
                type: Object,
                default: null,
            }
        },
        methods: {
            _dateFormatter(val) {
                return dateFormatter(val);
            }
        },
        computed: {
            //计算总金额
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
        }
    }
</script>

<style lang="less" scoped>
    @import url("../../../../css/proof");
</style>