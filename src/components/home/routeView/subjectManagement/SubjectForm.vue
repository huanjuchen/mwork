<template>
    <el-form :model="subjectData" ref="subjectData" :rules="rules" label-width="80px">
        <el-form-item prop="code" label="科目代码">
            <el-input type="number" size="small" placeholder="请输入科目代码" v-model="subjectData.code"></el-input>
        </el-form-item>

        <el-form-item prop="name" label="科目名">
            <el-input placeholder="请输入科目名" size="small" v-model="subjectData.name"></el-input>
        </el-form-item>
        <el-form-item prop="category" label="类别">
            <el-select size="small" v-model="subjectData.category" placeholder="请选择科目类别">
                <el-option
                        v-for="item in categoryOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                ></el-option>
            </el-select>
        </el-form-item>

        <el-form-item prop="parentId" label="一级科目">
            <el-select size="small" filterable remote :remote-method="doGetParentList"
                       v-model="subjectData.parentId">
                <el-option
                        v-for="item in parentList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item prop="remark" label="科目备注">
            <el-input
                    size="small"
                    type="textarea"
                    v-model="subjectData.remark"
                    maxlength="50"
                    show-word-limit
            ></el-input>
        </el-form-item>

        <el-form-item>
            <div :style="{textAlign:'center'}">
                <el-button @click="cancelSubmit">取 消</el-button>
                <el-button type="primary" @click="submitForm('subjectData')">提 交</el-button>
            </div>
        </el-form-item>
    </el-form>
</template>

<script>
    import {getSubjectListApi} from "../../../../api/SubjectApi";
    import {deepCopy} from "../../../../utils/CommonUtils"

    export default {
        name: "SubjectForm",
        props: {
            //修改时传入值
            initVal: Object,
            formVersion: Number
        },
        data() {
            return {
                subjectData: {
                    code: "",
                    name: "",
                    category: null,
                    parentId: null,
                    remark: ""
                },
                rules: {
                    code: [{required: true, message: "科目代码不能为空", trigger: "blur"}],
                    name: [
                        {required: true, message: "科目名不能为空", trigger: "blur"},
                        {max: 20, message: "长度不能超过20个字符"}
                    ],
                    category: [
                        {
                            required: true,
                            message: "请选择科目类别",
                            trigger: "blur"
                        }
                    ]
                },
                parentList: [],
                isLoading: false,
                isSubmit: false,
                categoryOptions: [
                    {
                        label: "资产类",
                        value: 1
                    },
                    {
                        label: "负债类",
                        value: 2
                    },
                    {
                        label: "共同类",
                        value: 3
                    },
                    {
                        label: "所有者权益类",
                        value: 4
                    },
                    {
                        label: "成本类",
                        value: 5
                    },
                    {
                        label: "损益类-收入",
                        value: 6
                    },
                    {
                        label: "损益类-费用",
                        value: 7
                    }
                ],
            }
        },
        methods: {
            init() {
                if (this.initVal!=null){
                    this.setInitData();
                }
            },

            setInitData(){
                if (this.initVal != null) {
                    let obj = deepCopy(this.initVal);
                    let parentSubject = deepCopy(this.initVal.parent);
                    this.subjectData = obj;
                    if (parentSubject != null) {
                        this.parentList = [deepCopy(parentSubject)];
                        this.subjectData.parentId = parentSubject.id;
                    }
                }
            },

            /**
             * 提交
             */
            submitForm(formName) {
                if (!this.isSubmit) {
                    this.$refs[formName].validate(valid => {
                        this.$emit("submitData", this.subjectData);
                    });
                } else {
                    this.$message.error("禁止重复提交");
                }
            },

            /**
             * 取消提交
             */
            cancelSubmit() {
                this.$emit("cancelSubmit");
            },

            /**
             * 获取上一级科目选项
             */
            doGetParentList(query) {
                if (query != null && query.length > 0) {
                    this.isLoading = true;
                    getSubjectListApi(query, null, 1,
                        15, true, 0).then(response => {
                        if (response.data.code === 200) {
                            this.parentList = response.data.data;
                        }
                        this.isLoading = false;
                    })
                }
            },

            /**
             * 重置表单数据
             */
            resetFormData() {
                this.subjectData.code = "";
                this.subjectData.name = "";
                this.subjectData.remark = "";
                this.subjectData.category = null;
                this.subjectData.parentId = null;
                this.isSubmit = false;
            }
        },

        watch: {
            initVal: function () {
                this.setInitData();
            },
            formVersion: function () {
                if (this.initVal == null) {
                    this.resetFormData();
                }
            }
        },

        created() {
            this.init();
        }
    }
</script>

<style scoped>

</style>