<template>
    <div>
        <el-table size="medium" v-loading="isLoading" :data="list" style="width: 100%">
            <el-table-column prop="id" label="用户编号" width="100"></el-table-column>
            <el-table-column prop="username" label="用户名" width="150"></el-table-column>
            <el-table-column prop="name" label="姓名" width="150"></el-table-column>
            <el-table-column label="创建日期" width="150">
                <template slot-scope="scope">{{_dateFormatter(scope.row.joinTime)}}</template>
            </el-table-column>
            <el-table-column label="用户类型" width="100">
                <template slot-scope="scope">{{_getRole(scope.row.role)}}</template>
            </el-table-column>

            <el-table-column label="状态">
                <template slot-scope="scope">
                    {{_getState(scope.row.valid)}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="360">
                <template slot-scope="scope">
                    <el-button size="small" plain @click="showInfoDetail(scope.row)">查看</el-button>
                    <el-button size="small" type="danger" @click="resetPwd(scope.row.id)" plain>重置密码</el-button>
                    <el-button v-if="scope.row.valid" size="small" type="danger" @click="lockUser(scope.row.id)" plain>
                        禁用
                    </el-button>
                    <el-button v-else-if="!scope.row.valid" size="small" @click="unlockUser(scope.row.id)" plain>
                        启用
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="bank-box"></div>
        <div class="bank-box"></div>
        <div v-if="count>pageSize" style="text-align: center">
            <el-pagination
                    background
                    @current-change="changePage"
                    @size-change="changePageSize"
                    :page-sizes="[5,10,15]"
                    :page-size="pageSize"
                    :pager-count="5"
                    :current-page.sync="page"
                    layout="prev, pager, next ,sizes,total"
                    :total="count">
            </el-pagination>
        </div>


    </div>
</template>

<script>
    import {getRole, getState} from "../../../../utils/UserInfoUtils";
    import {dateFormatter} from "../../../../utils/DateUtils";

    export default {
        name: "UserList",
        //参数
        props: {
            list: Array,
            pageSize: {
                type:Number,
                require:true
            },
            page: {
                type:Number,
                require:true
            },
            isLoading: Boolean,
            count: {
                type:Number,
                default:0
            }
        },
        methods: {
            _dateFormatter(val) {
                return dateFormatter(val);
            },

            _getRole(val) {
                return getRole(val);
            },

            _getState(val) {
                return getState(val);
            },
            /**
             * 显示用户信息
             * @param val 信息
             */
            showInfoDetail(val) {
                this.$emit("showInfo", val)
            },

            /**
             * 更改页码时触发
             */
            changePage(val) {
                // console.log("页数: " + val);
                this.$emit("changePage", val);
            },

            /**
             * 更改每页数目时触发
             */
            changePageSize(val) {
                this.$emit("changePageSize", val);
            },


            /**
             * 重置用户密码
             * @param userId
             */
            resetPwd(userId) {
                this.$confirm('此操作将重置该用户的密码, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$emit("resetPwd", userId);
                });
            },

            /**
             * 锁定/禁用用户
             * @param userId
             */
            lockUser(userId) {
                this.$confirm('此操作将禁用该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$emit("lockUser", userId);
                });

            },
            /**
             * 解锁/启用用户
             * @param userId
             */
            unlockUser(userId) {
                this.$confirm('此操作将启用该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$emit("unlockUser", userId);
                });
            },
        }
    }
</script>

<style scoped>
</style>