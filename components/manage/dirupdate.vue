<template>
    <div class="panel admin-panel">
        <div class="panel-head" style="padding: 10px 0 0 28px;">
          <el-button type="primary">修改方向</el-button>
        </div>
        <div class="body-content" style="padding: 10px">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="方向">
                    <el-input v-model="ruleForm.did" disabled></el-input>
                </el-form-item>
                <el-form-item label="方向名称" prop="dname">
                    <el-input v-model="ruleForm.dname" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onsubmit('ruleForm')">提交数据</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "dirinsert",
        data:function(){
            return {
                ruleForm: {
                    did:'1',
                    dname: '测试数据',
                },
                rules: {
                    dname: [
                        { required: true, message: '请输入方向名称', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
           onsubmit:function (form) {
                this.$refs[form].validate(value => {
                    if (value) {
                        this.$http.post('/exam/dirupdate.php', this.ruleForm).then(response => {
                           if(response.body == 'ok'){
                              this.$router.push('managedir');
                           }
                        })
                    } else {

                    }
                })
            }
        },
        mounted:function(){
            let did = this.$route.query.did;
            this.$http.post('/exam/dirselect.php',{did}).then(response=>{
                this.ruleForm =  response.body
            });
        }
    }
</script>

<style scoped>
</style>