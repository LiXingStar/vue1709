<template>
    <div class="panel admin-panel">
        <div class="panel-head" style="padding: 10px 0 0 28px;">
          <el-button type="primary">逐条添加</el-button>
        </div>
        <div class="body-content" style="padding: 10px">
            <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="方向">
                    <el-select v-model="ruleForm.did">
                        <el-option
                                v-for="item in dirArr"
                                :key="item.did"
                                :label="item.dname"
                                :value="item.did">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级">
                    <el-select v-model="ruleForm.cid">
                        <el-option
                                v-for="item in classArr"
                                :key="item.cid"
                                :label="item.cname"
                                :value="item.cid">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="姓名" >
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onsubmit">立即添加</el-button>
                </el-form-item>
            </el-form>
        </div>


        <div class="panel-head" style="padding: 10px 0 0 28px;">
            <el-button type="primary">批量添加</el-button>
        </div>
        <div class="body-content" style="padding: 10px">
            <div @drop="_drop" @dragenter="_suppress" @dragover="_suppress">
                <div class="row"><div class="col-xs-12">
                    <form class="form-inline">
                        <div class="form-group">
                            <label for="file">Spreadsheet</label>
                            <input type="file" class="form-control" id="file" :accept="SheetJSFT" @change="_change" />
                        </div>
                    </form>
                </div></div>
                <div class="row"><div class="col-xs-12">
                    <button :disabled="data.length ? false : true" class="btn btn-success" @click="_export">Export</button>
                </div></div>
                <div class="row"><div class="col-xs-12">
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead><tr>
                                <th v-for="c in cols" :key="c.key">{{c.name}}</th>
                            </tr></thead>
                            <tbody>
                            <tr v-for="(r, key) in data" :key="key">
                                <td v-for="c in cols" :key="c.key"> {{ r[c.key] }}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>
            </div>
            <el-form>
                <el-form-item>
                    <el-button type="primary" @click="onsubmitAll">批量添加</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import XLSX from 'xlsx';

    const make_cols = refstr => Array(XLSX.utils.decode_range(refstr).e.c + 1).fill(0).map((x,i) => ({name:XLSX.utils.encode_col(i), key:i}));
    const _SheetJSFT = [
        "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
    ].map(function(x) { return "." + x; }).join(",");


    export default {
        name: "dirinsert",
        methods:{
          onsubmitAll(){

              this.$http.get('/exam/studentinsertall.php',{params:{data:this.data}}).then(res=>{
                  if(res.body == 'ok'){
                      this.$router.push('managestudent');
                  }
              })
          }  ,
          onsubmit(){
              this.$http.get('/exam/studentinsert.php',{params:this.ruleForm}).then(res=>{
                  if(res.body == 'ok'){
                      this.$router.push('managestudent');
                  }
              })
          },
            _suppress(evt) { evt.stopPropagation(); evt.preventDefault(); },
            _drop(evt) {
                evt.stopPropagation(); evt.preventDefault();
                const files = evt.dataTransfer.files;
                if(files && files[0]) this._file(files[0]);
            },
            _change(evt) {
                const files = evt.target.files;
                if(files && files[0]) this._file(files[0]);
            },
            _export(evt) {
                /* convert state to workbook */
                const ws = XLSX.utils.aoa_to_sheet(this.data);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
                /* generate file and send to client */
                XLSX.writeFile(wb, "sheetjs.xlsx");
            },
            _file(file) {
                /* Boilerplate to set up FileReader */
                const reader = new FileReader();
                reader.onload = (e) => {
                    /* Parse data */
                    const bstr = e.target.result;
                    const wb = XLSX.read(bstr, {type:'binary'});
                    /* Get first worksheet */
                    const wsname = wb.SheetNames[0];
                    const ws = wb.Sheets[wsname];
                    /* Convert array of arrays */
                    const data = XLSX.utils.sheet_to_json(ws, {header:1});
                    /* Update state */
                    this.data = data.slice(1);
                    this.cols = make_cols(ws['!ref']);
                };
                reader.readAsBinaryString(file);
            }
        },
        data:function(){
            return {
                ruleForm: {
                    username: '',
                    did:'',
                    cid:'',
                },
                classArr:[],
                dirArr:[],
                data:[],
                cols: [
                    {name:"A", key:0},
                    {name:"B", key:1},
                    {name:"C", key:2},
                    {name:"D", key:3},
                    {name:"E", key:4},
                    {name:"F", key:5},
                    {name:"G", key:6},
                ],
                SheetJSFT: _SheetJSFT
            }
        },
        mounted:function(){
           this.$http.get('/exam/querydir.php').then(res=>this.dirArr=res.body);
           this.$http.get('/exam/queryclass.php').then(res=>this.classArr = res.body);
        }
    }
</script>

<style scoped>
</style>