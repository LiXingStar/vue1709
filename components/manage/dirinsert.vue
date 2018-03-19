<template>
    <div class="panel admin-panel">
        <div class="panel-head" style="padding: 10px 0 0 28px;">
          <el-button type="primary">添加方向</el-button>
        </div>
        <div class="body-content" style="padding: 10px">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="方向名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onsubmit('ruleForm')">立即创建</el-button>
                    <el-button >重置</el-button>
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
                    name: '',
                },
                rules: {
                    name: [
                        { required: true, message: '请输入方向名称', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
           onsubmit:function (form) {
                this.$refs[form].validate(value => {
                    if (value) {
                        this.$http.post('/exam/dirinsert.php', this.ruleForm).then(response => {
                           if(response.body == 'ok'){
                               this.$router.push('managedir');
                           }
                        })
                    } else {

                    }
                })
            }
        }
    }
</script>

<style scoped>
</style>