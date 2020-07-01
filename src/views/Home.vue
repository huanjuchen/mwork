<template>
    <el-container v-bind:style="{height:100+'%'}">
        <el-aside v-bind:style="{height:100+'%',width:220+'px'}" >
            <!-- 左栏 -->
            <left-navigation/>
        </el-aside>
        <el-container>
            <el-header>
                <!-- 顶栏 -->
<!--                <top-bar />-->
            </el-header>
            <el-main>
                <router-view />
            </el-main>
            <el-footer></el-footer>
        </el-container>
    </el-container>
</template>

<script>
    import LeftNavigation from "../components/home/LeftNavigation";
    export default {
        name: 'Home',
        components:{
            "left-navigation":LeftNavigation
        },
        computed:{
        }
    }
</script>

<style scoped>
    .container{

    }

</style>
