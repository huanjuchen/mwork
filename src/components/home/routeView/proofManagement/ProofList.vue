<template>
    <div>
        <el-table v-if="list!=null&&list.length!==0"
                  :data="list" v-loading="isLoading">
            <el-table-column prop="id" label="编号" width="100"></el-table-column>
            <el-table-column label="日期" width="150">
                <template slot-scope="scope">
                    {{_dateFormatter(scope.row.date)}}
                </template>
            </el-table-column>
            <el-table-column prop="invoiceCount" label="单据数" width="100"></el-table-column>
            <el-table-column label="稽查状态" width="125">
                <template slot-scope="scope">
                    {{_getVerifyStatus(scope.row.verify)}}
                </template>
            </el-table-column>
            <el-table-column prop="recorder.name" label="制单人" width="150"></el-table-column>
            <el-table-column label="操作" width="300">
                <template slot-scope="scope">
                    <el-button size="small" plain @click="showDetails(scope.row.id)">查看</el-button>

                    <el-button v-if="user.role<=2&&scope.row.verify===0" size="small" type="primary"
                               @click="verifyProof(scope.row.id,true)">
                        审核通过
                    </el-button>
                    <el-button v-if="user.role<=2&&scope.row.verify===0" size="small" type="primary"
                               @click="verifyProof(scope.row.id,false)">
                        审核不通过
                    </el-button>
                    <el-button v-if="scope.row.verify===1&&scope.row.trash===0&&scope.row.recorder.id===user.id" size="small" type="danger" @click="trashProof(scope.row.id)">冲账</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div style="text-align: center" v-if="count>pageSize">
            <el-pagination @size-change="pageSizeChange" @current-change="pageChange" background :total="count"
                           :page-sizes="[5,7,10,15]" :current-page="page"
                           :page-size="pageSize" :pager-count="7"
                           layout="prev, pager, next,sizes,total"/>
        </div>
    </div>
</template>

<script>
    import {getVerifyStatus} from "../../../../utils/ProofUtils";
    import {dateFormatter} from "../../../../utils/DateUtils";
    import MwStore from "../../../../store/MwStore";
    export default {
        name: "ProofList",
        props:{
            list:Array,
            count:{
                type:Number,
                default:0
            },
            page:{
                type:Number,
                default:1
            },
            pageSize:{
              type:Number,
              default:7
            },
            isLoading:Boolean,
        },
        data(){
            return {
                user:MwStore.user
            }
        },

        methods:{
            _getVerifyStatus(val){
                return getVerifyStatus(val);
            },
            _dateFormatter(val){
                return dateFormatter(val);
            },
            /**
             * 显示凭证详情
             */
            showDetails(id){
                this.$emit("showDetail",id);
            },

            /**
             * 审核凭证
             */
            verifyProof(id,result){
                let msg;

                if (result) {
                    msg = "此操作将通过该凭证且操作不可逆，是否继续？"
                } else {
                    msg = "此操作将不通过该凭证且操作不可逆，是否继续？"
                }
                this.$confirm(msg, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$emit("verifyProof", id, result);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '操作已取消'
                    });
                });
            },

            /**
             * 冲账凭证
             */
            trashProof(pid){
                this.$confirm("该操作不可逆，是否继续", '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$emit("trashProof", pid);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '操作已取消'
                    });
                });
            },
            /**
             * 每页数量更改
             */
            pageSizeChange(val) {
                this.$emit("pageSizeChange", val);
            },
            /**
             * 选择页面
             */
            pageChange(val) {
                this.$emit("pageChange", val);
            },
        }
    }
</script>

<style scoped>

</style>