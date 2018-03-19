<template>
    <div class="panel admin-panel">
        <div class="panel-head"><strong><span class="icon-pencil-square-o"></span>学生管理</strong></div>
        <div class="body-content" style="padding: 10px;">
            <router-link :to="{name:'studentinsert'}">添加学生</router-link>
            <el-table
                    :data="tableData" height="420" ref="multipleTable"
                    style="width: 100%"  @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="sid"
                        label="sid"
                >
                </el-table-column>
                <el-table-column
                        prop="username"
                        label="姓名"
                >
                </el-table-column>
                <el-table-column
                        prop="cname"
                        label="班级"
                >
                </el-table-column>
                <el-table-column
                        prop="dname"
                        label="方向"
                >
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <router-link :to="{name:'classupdate',query: { cid: scope.row.cid }}">修改</router-link>
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin-top: 20px">
                <el-button @click="deleteSelection">删除</el-button>
                <el-button @click="reverseSelection(tableData)">反选</el-button>
                <el-button @click="cancelSelection()">取消选择</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "managedir",
        methods:{
            reverseSelection(rows){
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            },
            deleteSelection(){
                let arr = [];
                arr = this.arr.map(ele=>ele.sid);
                this.$http.post('/exam/studentdel.php',{ids:arr}).then(response=>{
                     if(response.body == 'ok'){
                         this.$message({
                             message:'删除成功',
                             type:'success'
                         })
                         this.tableData = this.tableData.filter(ele=>!arr.includes(ele.sid))
                     }else if(response.body == 'error'){

                     }
                })
            },
            cancelSelection:function(){
                this.$refs.multipleTable.clearSelection();
            },
            handleSelectionChange:function(val){
                this.arr = val;
            },
            deleteRow(id){
            }
        },
        data: function () {
            return {
                tableData: [
                    {
                        sid: 1,
                        username: '张三',
                        dname:'全栈',
                        cname:'wuif1709'
                    }
                ],
                arr:[],
            }
        },
        created:function(){
            this.$http.get('/exam/querystudent.php').then(response=>{
                this.tableData = response.body;
            })
        }
    }
</script>

<style scoped>
    @import url(../../assets/css/admin.css);
    @import url(../../assets/css/pintuer.css);
</style>