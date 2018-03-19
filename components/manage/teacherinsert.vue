<template>
    <div class="panel admin-panel">
        <div class="panel-head" style="padding: 10px 0 0 28px;">
          <el-button type="primary">添加教师</el-button>
        </div>
        <div class="body-content" style="padding: 10px">
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                <el-form-item label="方向">
                    <el-select v-model="ruleForm.did" placeholder="请选择方向">
                        <el-option v-for="item in dirarr" :label="item.dname" :value="item.did" :key="item.did"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="阶段">
                    <el-checkbox-group v-model="ruleForm.tphase">
                        <el-checkbox v-for="item in phasearr" :label="item.pname" name="type" :value="item.pname" :key="item.pid"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.username"></el-input>
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
                    username:'',
                    did:'',
                    tphase:[]
                },
                dirarr:[],
                phasearr:[]
            }
        },
        methods: {
           onsubmit:function (form) {

               this.$http.post('/exam/teacherinsert.php', this.ruleForm).then(response => {
                   if (response.body == 'ok') {
                       console.log('ok');
                       // this.$router.push('managedir');
                   }
               })
           }
        },
        mounted:function(){
            this.$http.get('/exam/querydir.php').then(res=>this.dirarr = res.body);
            this.$http.get('/exam/queryphase.php').then(res=>this.phasearr = res.body);
        }
    }
</script>

<style scoped>
</style>