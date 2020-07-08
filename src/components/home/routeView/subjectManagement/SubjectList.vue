<template>
    <div>
        <el-table v-loading="isLoading" :data="list" style="width: 100%">
            <el-table-column label="科目编号" prop="code" width="120"></el-table-column>
            <el-table-column label="科目名" prop="name" width="150"></el-table-column>
            <el-table-column label="科目类别" width="120">
                <template slot-scope="scope">{{_getSubjectCategory(scope.row.category)}}</template>
            </el-table-column>

            <el-table-column label="一级科目" width="120">
                <template slot-scope="scope">{{scope.row.parent==null?null:scope.row.parent.name}}</template>
            </el-table-column>

            <el-table-column label="状态" width="120">
                <template slot-scope="scope">{{_getState(scope.row.valid)}}</template>
            </el-table-column>

            <el-table-column label="操作" width="360">
                <template slot-scope="scope">
                    <el-button size="small" plain @click="showDetail(scope.row)">详细信息</el-button>
                    <el-button size="small" plain @click="modifySubject(scope.row.id)">修 改</el-button>


                    <el-button v-if="scope.row.valid" @click="lockSubject(scope.row.id)" size="small" type="danger"
                               plain>禁 用
                    </el-button>
                    <el-button v-if="!scope.row.valid" @click="unlockSubject(scope.row.id)" size="small" plain>启 用
                    </el-button>
                    <el-button size="small" type="danger" @click="deleteSubject(scope.row.id)" plain>删 除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="bank-box"></div>
        <div v-if="count>pageSize" style="text-align: center">
            <el-pagination
                    background
                    @current-change="changePage"
                    @size-change="changePageSize"
                    :page-sizes="[5,7,10,15]"
                    :page-size="pageSize"
                    :current-page="page"
                    :pager-count="5"
                    layout="prev, pager, next ,sizes,total"
                    :total="count">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {getState, getSubjectCategory} from "../../../../utils/SubjectUtils"

    export default {
        name: "SubjectList",

        props: {
            //需要显示的数组
            list: Array,
            //满足条件的数量
            count: {
                type:Number,
                default:0
            },
            //当前页
            page: {
                type:Number,
                require:true
            },
            //每页数量
            pageSize: {
                type:Number,
                require:true
            },
            //是否正在加载
            isLoading: Boolean
        },
        data() {
            return {}
        },
        methods: {
            /**
             * 调用工具集的方法
             */
            _getSubjectCategory(val) {
                return getSubjectCategory(val);
            },
            /**
             * 调用工具集的方法
             */
            _getState(val) {
                return getState(val);
            },

            /**
             * 显示科目详细信息
             * @param info 详细信息
             */
            showDetail(info) {
                this.$emit("showDetail", info);
            },
            /**
             * 修改科目
             * @param sid 科目id
             */
            modifySubject(sid) {
                this.$emit("modifySubject", sid);
            },
            /**
             * 更改页
             * @param pn 页码
             */
            changePage(pn) {
                this.$emit("changePage", pn);
            },
            /**
             * 更改每页数量
             * @param ps 每页数量
             */
            changePageSize(ps) {
                this.$emit("changePageSize", ps);
            },
            /**
             * 禁用科目
             * @param sid 科目id
             */
            lockSubject(sid) {
                this.$confirm('此操作将禁用该科目, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$emit("lockSubject", sid);
                });

            },
            /**
             * 启用科目
             * @param sid 科目id
             */
            unlockSubject(sid) {
                this.$confirm('此操作将启用该科目, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$emit("unlockSubject", sid);
                });

            },
            /**
             * 删除科目
             * @param sid 科目id
             */
            deleteSubject(sid) {
                this.$confirm('此操作将删除该科目, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$emit("deleteSubject", sid);
                });

            }
        }
    }
</script>

<style scoped>


</style>