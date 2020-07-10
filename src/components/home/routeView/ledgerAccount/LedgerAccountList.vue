<template>
    <el-table v-loading="isLoading" :data="list" v-if="list!=null&&list.length>0">
        <el-table-column label="日期" width="150px">
            <template slot-scope="scope">
                {{_dateFormatter(scope.row.date)}}
            </template>
        </el-table-column>
        <el-table-column label="摘要" prop="abstraction"></el-table-column>
        <el-table-column label="借方" prop="debitMoney"></el-table-column>
        <el-table-column label="贷方" prop="creditMoney"></el-table-column>
        <el-table-column label="借或贷" width="100px">
            <template slot-scope="scope">
                {{_debitCredit(scope.row.mark)}}
            </template>
        </el-table-column>
        <el-table-column label="金额" prop="money"></el-table-column>
    </el-table>

</template>

<script>
    import {dateFormatter} from "../../../../utils/DateUtils";
    import {debitCredit} from "../../../../utils/AccountBookUtils";

    export default {
        name: "LedgerAccountList",
        props: {
            list: Array,
            isLoading: Boolean
        },
        methods:{
            _dateFormatter(val) {
                return dateFormatter(val);
            },
            _debitCredit(val) {
                return debitCredit(val);
            }
        }

    }
</script>

<style scoped>

</style>