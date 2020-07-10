<template>
    <el-table :data="list" v-if="list!=null&&list.length>0" size="medium">
        <el-table-column label="日期" width="150px">
            <template slot-scope="scope">
                {{_dateFormatter(scope.row.date)}}
            </template>
        </el-table-column>
        <el-table-column label="凭证号" prop="proofId"></el-table-column>
        <el-table-column label="摘要" prop="abstraction"></el-table-column>
        <el-table-column label="对方科目" prop="subject.name"></el-table-column>
        <el-table-column label="借方" prop="debitMoney"></el-table-column>
        <el-table-column label="贷方" prop="creditMoney"></el-table-column>
        <el-table-column label="金额" prop="money"></el-table-column>
    </el-table>
</template>

<script>
    import {dateFormatter} from "../../../../utils/DateUtils"
    export default {
        name: "CashAccountList",
        props:{
            list:Array,
            isLoading:Boolean
        },
        methods:{
            _dateFormatter(val) {
                return dateFormatter(val);
            }
        }
    }
</script>

<style scoped>

</style>