<script src="../../../config/dev.env.js"></script>
<template>
    <el-main id="main">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="myform">
            <el-form-item label="用户名" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="form.pass"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
                <el-input v-model="form.code"></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="type">
                <el-radio-group v-model="form.type">
                    <el-radio label="manage">管理员</el-radio>
                    <el-radio label="teacher">教师</el-radio>
                    <el-radio label="student">学生</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item>
                <el-button plain @click="onsubmit('form')">Submit</el-button>
            </el-form-item>
        </el-form>
    </el-main>

</template>
<script>
    export default {
        name: "login",
        data:function(){
            return {
                form: {
                    name: '',
                    pass:'',
                    type: '',
                    code:''
                },
                rules:{
                    name:[
                        {required:true,message:'请输入用户名',trigger:'blur'},
                        {min:2,max:8,message:'请输入2~8位的用户名',trigger:'blur'}
                    ],
                    pass:[
                        {required:true,message:'请输入密码',trigger:'blur'},
                        {min:3,max:8,message:'请输入3~8位的密码',trigger:'blur'}
                    ],
                    code:[
                        {required:true,message:'验证码不能为空',trigger:'blur'},
                    ],
                    type:[
                        {required:true,message:'请选择登陆类型',trigger:'blur'},
                    ],
                }
            }
        },
        methods:{
           onsubmit:function(form){
              this.$refs[form].validate((value)=>{
                 if(value){
                     // /exam/login.php  localhost:80/exam/login.php
                    /* this.$http.get('/exam/login.php').then(function(res){
                         console.log(res);
                     },function(){})*/
                     this.$http.post('/exam/login.php',this.form).then(function(res){
                        if(res.body == 'ok'){
                            this.$message({
                                showClose: true,
                                message: '登陆成功',
                                type: 'success'
                            });
                            sessionStorage.username = this.form.name;
                            sessionStorage.flag = 'yes';
                            if(this.form.type == 'manage'){
                                this.$router.push('manage');
                            }else if(this.form.type =='teacher'){
                                this.$router.push('teacher');
                            }else if(this.form.type =='student'){
                                this.$router.push('student');
                            }
                        }else if(res.body == 'error'){
                            this.$message({
                                showClose: true,
                                message: '密码错误',
                                type: 'error'
                            });
                        }else if(res.body =='no'){
                            this.$message({
                                showClose: true,
                                message: '用户名不存在',
                                type: 'warning'
                            });
                        }
                     })

                 }else{
                     console.log('error');
                 }
              })
           }
        }
    }
</script>

<style scoped>
    #main{
        width: 500px;
        height: 360px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -200px;
        margin-left: -250px;
        border:1px solid #EBEEF5;
        background: #FFFFFF;
        border-radius: 5px;
        box-shadow: 0 0 10px 1px rgba(64,158,255,0.5);
    }
</style>