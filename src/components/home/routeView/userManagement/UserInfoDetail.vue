<template>
    <div v-if="user!=null">
        <p>
            <b>用户编号：</b>
            {{user.id}}
        </p>
        <p>
            <b>用户名：</b>
            {{user.username}}
        </p>
        <p>
            <b>姓名：</b>
            {{user.name}}
        </p>
        <p>
            <b>用户类型：</b>
            {{_getRole(user.role)}}
        </p>
        <p>
            <b>创建日期：</b>
            {{_dateFormatter(user.joinTime)}}
        </p>
        <p>
            <b>手机号：</b>
            {{user.phone}}
        </p>
        <p>
            <b>状态：</b>
            {{_getState(user.valid)}}
        </p>
    </div>
</template>

<script>
    import {getRole,getState} from "../../../../utils/UserInfoUtils";
    import {dateFormatter} from "../../../../utils/DateUtils";
    export default {
        name: "userDetail",
        props:{
            user:Object
        },
        methods:{
            _dateFormatter(val) {
                return dateFormatter(val);
            },

            _getRole(val) {
                return getRole(val);
            },

            _getState(val) {
                return getState(val);
            },
        }
    }
</script>

<style scoped>

</style>