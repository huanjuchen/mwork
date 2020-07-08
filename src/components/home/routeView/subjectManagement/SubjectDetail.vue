<template>
    <div v-if="subject!=null">
        <p>
            <b>科目代码：</b>
            {{subject.code}}
        </p>
        <p>
            <b>科目名：</b>
            {{subject.name}}
        </p>
        <p>
            <b>科目类别：</b>
            {{_getSubjectCategory(subject.category)}}
        </p>
        <p>
            <b>一级科目：</b>
            {{subject.parent==null?null:subject.parent.name}}
        </p>

        <p>
            <b>状态：</b>
            {{_getState(subject.valid)}}
        </p>

        <p>
            <b>描述：</b>
            {{subject.remark}}
        </p>
    </div>
</template>

<script>
    import {getState, getSubjectCategory} from "../../../../utils/SubjectUtils"

    export default {
        name: "SubjectDetail",
        props: {
            subject: Object
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
        }
    }
</script>

<style scoped>

</style>