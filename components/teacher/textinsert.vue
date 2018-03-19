<template>
    <div class="panel admin-panel">
        <div class="panel-head" style="padding: 10px 0 0 28px;">
            <el-button type="primary">添加试题</el-button>
        </div>
        <div class="body-content" style="padding: 10px">
            <el-form :model="form" label-width="100px" class="demo-ruleForm">
                <el-form-item label="题型">
                    <el-select v-model="form.qid" placeholder="请选择题型">
                        <el-option v-for="item in qtypes" :label="item.qname" :value="item.qid"
                                   :key="item.qid"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属阶段">
                    <el-select v-model="form.pid" placeholder="请选择所属阶段">
                        <el-option v-for="item in phase" :label="item.pname" :value="item.pid"
                                   :key="item.pid"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="题干">
                    <el-input type="textarea" v-model="tg"></el-input>
                </el-form-item>
                <el-form-item label="选项">
                    <el-input type="textarea" v-model="option" placeholder="选项之间用;隔开"></el-input>
                </el-form-item>
                <el-form-item label="正确答案">
                    <el-input type="textarea" v-model="form.manswer"></el-input>
                </el-form-item>
                <el-form-item label="解析">
                    <el-input type="textarea" v-model="form.mjx"></el-input>
                </el-form-item>
                <el-form-item label="分值">
                    <el-input v-model="form.mscore"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onsubmit">立即添加</el-button>
                    <el-button>重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "qinsert",
        data: function () {
            return {
                form: {
                    qid: '',
                    pid: '',
                    mname: '',
                    manswer: '',
                    mjx: '',
                    mscore: '',
                    mauthor: ''
                },
                tg: '',
                option: '',
                qtypes: [],
                phase: []
            }
        },
        methods: {
            onsubmit: function (form) {
                this.form.mname = this.tg + '@' + this.option;
                this.form.mauthor = sessionStorage.username;
                this.$http.post('/exam/textinsert.php', this.form).then(response => {
                    if (response.body == 'ok') {
                        this.$router.push('qtypes');
                    }
                })
            }
        },
        mounted: function () {

            this.$http.get('/exam/qtypes.php').then(res => {
                this.qtypes = res.body;
            });
            this.$http.get('/exam/queryphase.php').then(res => {
                this.phase = res.body;
            });
        },
        beforeCreate: function () {
            if (!sessionStorage.getItem('username')) {
                this.$router.push({name: 'login'});
            }
        }
    }
</script>

<style scoped>
</style>