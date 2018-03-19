<template>
    <div class="panel admin-panel">
        <div class="panel-head"><strong><span class="icon-pencil-square-o"></span> 题型管理</strong></div>
        <div class="body-content" style="padding: 10px;">
            <router-link :to="{name:'textinsert'}">添加试题</router-link>
            <el-table
                    :data="data"
                    style="width: 100%">

                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="选项" v-if="props.row.options">
                                <span v-for="(item,index) in props.row.options" :key="index" style="margin-right: 10px">{{ item }}</span>
                            </el-form-item>
                            <el-form-item label="答案">
                                <span>{{props.row.manswer}}</span>
                            </el-form-item>

                        </el-form>
                    </template>
                </el-table-column>


                <el-table-column
                        prop="mid"
                        label="mid"
                >
                </el-table-column>
                <el-table-column
                        prop="qname"
                        label="题型"
                >
                </el-table-column>
                <el-table-column
                        prop="pname"
                        label="所属阶段"
                >

                </el-table-column>
                <el-table-column
                        prop="tg"
                        label="题干"
                >
                </el-table-column>
                <el-table-column
                        prop="mscore"
                        label="分值"
                >
                </el-table-column>
                <el-table-column
                        prop="mauthor"
                        label="出题人"
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
    import ElFormItem from "element-ui/packages/form/src/form-item";

    export default {
        components: {ElFormItem},
        name: "managedir",
        methods: {},
        data: function () {
            return {
                tableData: []
            }
        },
        computed: {
            data() {
                let dataarr = [];
                /*
                *   [
                *    {pid,mname:"xxx@  A:;B:;C:;D:;  "}
                *   ]
                *   A:;B:;C:;D:;
                *
                *   A:XXX
                *   B:XXX
                *   C:XXXX
                *   D:XXXX
                *

                *   [
                *    {pid,answer,jx,tg:'',options:[{A:''},{B:'',}{C:''},{D:''}]}
                *   ]
                * */
                for (let i = 0; i < this.tableData.length; i++) {
                    let obj = {};
                    let arr = this.tableData[i].mname.split('@');
                    obj.tg = arr[0];
                    if (arr[1]) {
                        let temp = arr[1].split(/;|；/);
                        temp.pop();
                        obj.options = temp;
                    } else {
                        obj.option = '';
                    }
                    obj.mid = this.tableData[i].mid;
                    obj.pname = this.tableData[i].pname;
                    obj.qname = this.tableData[i].qname;
                    obj.manswer = this.tableData[i].manswer;
                    obj.mauthor = this.tableData[i].mauthor;
                    obj.mscore = this.tableData[i].mscore;
                    obj.mjx = this.tableData[i].mjx;
                    dataarr.push(obj)
                }

                return dataarr;
            }
        },
        created: function () {
            this.$http.get('/exam/textmanage.php').then(response => {
                this.tableData = response.body;
            })
        }
    }
</script>

<style scoped>
    @import url(../../assets/css/admin.css);
    @import url(../../assets/css/pintuer.css);
</style>