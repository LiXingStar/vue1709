<template>
    <div class="panel admin-panel">
        <div class="panel-head" style="padding: 10px 0 0 28px;">
            <el-button type="primary">添加题型</el-button>
        </div>
        <div class="body-content" style="padding: 10px">
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="题型名称">
                    <el-input v-model="ruleForm.qname"></el-input>
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
                ruleForm: {
                    qname: '',
                }
            }
        },
        methods: {
            onsubmit: function (form) {
                this.$http.post('/exam/qinsert.php', this.ruleForm).then(response => {
                    if (response.body == 'ok') {
                        this.$router.push('qtypes');
                    }
                })
            }
        }
    }
</script>

<style scoped>
</style>