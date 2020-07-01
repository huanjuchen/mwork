<template>
    <div class="left-nav">
        <el-menu
                class="el-menu-vertical-demo"
                :default-active="activeIndex"
                background-color="#424242"
                text-color="#fff"
                menu-trigger="click"
        >
            <div style="height: 28px;width: 100%">
            </div>
            <el-menu-item index="DashBoard" @click="doRouteChange('DashBoard')">首页</el-menu-item>
            <el-menu-item index="ProofManagement" @click="doRouteChange('ProofManagement')">凭证管理</el-menu-item>
            <el-submenu index="2">
                <template slot="title">
                    <span>查看账簿</span>
                </template>
                <el-menu-item @click="doRouteChange('CashAccount')" index="CashAccount">现金日记账</el-menu-item>
                <el-menu-item @click="doRouteChange('BankAccount')" index="BankAccount">银行日记账</el-menu-item>
                <el-menu-item @click="doRouteChange('SubAccount')" index="SubAccount">明细分类账</el-menu-item>
                <el-menu-item @click="doRouteChange('LedgerAccount')" index="LedgerAccount">总分类账</el-menu-item>
            </el-submenu>
            <el-menu-item
                    index="SubjectManagement"
                    @click="doRouteChange('SubjectManagement')"
            >科目管理
            </el-menu-item>
            <el-menu-item
                    v-if="user!=null&&user.role===1"
                    index="UserManagement"
                    @click="doRouteChange('UserManagement')"
            >用户管理
            </el-menu-item>
            <el-menu-item v-if="user!=null&&(user.role===1||user.role===2)" index="Information"
                          @click="doRouteChange('InformationCenter')">公告中心
            </el-menu-item>
            <el-menu-item index="UserCenter" @click="doRouteChange('UserCenter')">个人中心</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    import MwStore from "../../store/MwStore"
    import {debug, error as errorLog} from "../../utils/ConsoleLogUtils"

    export default {
        name: "LeftNavigation",
        data() {
            return {
                activeIndex: MwStore.Home.LeftNavigation.activeIndex
            }
        },
        methods: {

            doRouteChange(name) {
                this.$router.push({name: name})
                    .then(() => {
                        MwStore.Home.LeftNavigation.activeIndex = name;
                        debug("activeIndex的值: " +
                            MwStore.Home.LeftNavigation.activeIndex);
                    }).catch(error => {
                    errorLog("出现了一个错误 " + error);
                });
            }
        },
        computed: {
            user: function () {
                return MwStore.user;
            }
        }
    }
</script>

<style scoped>
    .left-nav {
        height: 100%;
        background-color: #212121;
    }


</style>