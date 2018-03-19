<template>
    <div class="panel admin-panel">
        <div class="panel-head"><strong><span class="icon-pencil-square-o"></span> 添加阶段</strong></div>
        <div class="body-content" style="padding: 10px;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="所属方向" prop="region">
                    <el-select v-model="ruleForm.did">
                        <el-option :label="item.dname" :value="item.did" v-for="item in dirarr"
                                   :key="item.did"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="阶段名称" prop="pname">
                    <el-input v-model="ruleForm.pname"></el-input>
                </el-form-item>


                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<script>
    export default {
        name: "phaseinsert",
        methods: {
            submitForm() {
                console.log(this.ruleForm);
            },
            resetForm() {

            }
        },
        data: function () {
            return {
                ruleForm: {
                    pname: '',
                    did: '',
                },
                dirarr: [],
                rules: {
                    pname: [
                        {required: true, message: '请输入阶段名称', trigger: 'blur'},
                        {min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur'}
                    ],
                    did: [
                        {required: true, message: '请选择方向', trigger: 'change'}
                    ]
                }
            }
        },
        mounted: function () {
            this.$http.get('/exam/querydir.php').then(response => {
                this.dirarr = response.body
            })

        }
    }
</script>

<style scoped>

</style>