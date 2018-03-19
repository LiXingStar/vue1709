<template>
    <div class="panel admin-panel">
        <div class="panel-head"><strong><span class="icon-pencil-square-o"></span> 题型管理</strong></div>
        <div class="body-content" style="padding: 10px;">
            <router-link :to="{name:'qinsert'}">添加题型</router-link>
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        prop="qid"
                        label="qid"
                        >
                </el-table-column>
                <el-table-column
                        prop="qname"
                        label="题型"
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
        },
        data: function () {
            return {
                tableData: [
                    {
                        qid: 1,
                        qname: '全栈',
                    }
                 ]
            }
        },
        created:function(){
            this.$http.get('/exam/qtypes.php').then(response=>{
              this.tableData = response.body;
            })
        }
    }
</script>

<style scoped>
    @import url(../../assets/css/admin.css);
    @import url(../../assets/css/pintuer.css);
</style>