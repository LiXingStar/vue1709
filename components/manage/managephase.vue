<template>
    <div class="panel admin-panel">
        <div class="panel-head"><strong><span class="icon-pencil-square-o"></span> 阶段管理</strong></div>
        <div class="body-content" style="padding: 10px;">
            <router-link :to="{name:'phaseinsert'}">添加阶段</router-link>
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        prop="pid"
                        label="pid"
                >
                </el-table-column>
                <el-table-column
                        prop="pname"
                        label="阶段名称"
                >
                </el-table-column>
                <el-table-column
                        prop="dname"
                        label="所属方向"
                >
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <router-link :to="{name:'dirupdate',query: { did: scope.row.did }}">修改</router-link>
                        <el-button type="text" size="small" @click="deleteRow(scope.row.did)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "managedir",
        methods:{
            deleteRow(id){
                /*this.$http.post('/exam/dirdelete.php',{id}).then(response=>{
                    if(response.body == 'ok'){
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.tableData = this.tableData.filter(ele=>ele.did!=id);
                    }else if(response.body == 'error'){
                        this.$message({
                            message: '删除失败',
                            type: 'error'
                        });
                    }
                })*/
            }
        },
        data: function () {
            return {
                tableData: [
                    {
                        pid: 1,
                        pname: 'html',
                        dname:'全栈'
                    }
                ]
            }
        },
        created:function(){
            this.$http.get('/exam/managephase.php').then(response=>{
                this.tableData = response.body;
            })
        }
    }
</script>

<style scoped>
    @import url(../../assets/css/admin.css);
    @import url(../../assets/css/pintuer.css);
</style>