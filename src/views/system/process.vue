<template>
  <div class="process-container">
    <div class="process-top">
        <el-button type="primary" @click="addNode">新增节点</el-button>
    </div>
      <el-table
       v-loading="loading"
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="businessNodeCode"
      label="节点编码">
    </el-table-column>
    <el-table-column
      prop="businessNodeName"
      label="节点名称">
    </el-table-column>
    <el-table-column
      prop="businessNodeSort"
      label="执行顺序">
    </el-table-column>
    <el-table-column
      prop="applicationClientType"
      label="所属平台">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
        <!-- <el-button type="text" size="small">编辑</el-button> -->
      </template>
    </el-table-column>
  </el-table>
  <div class="process-bottom">
     <el-pagination
       background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="totalPages">
    </el-pagination>   
  </div>
<el-dialog :title=" title? '新增节点名称': '编辑节点名称'" :visible.sync="dialogFormVisible">
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="节点编号" prop="businessNodeCode">
    <el-input :disabled="!title" v-model="ruleForm.businessNodeCode"></el-input>
  </el-form-item>
  <el-form-item label="节点名称" prop="businessNodeName">
    <el-input v-model="ruleForm.businessNodeName"></el-input>
  </el-form-item>
  <el-form-item label="执行顺序" prop="businessNodeSort">
    <el-input v-model="ruleForm.businessNodeSort"></el-input>
  </el-form-item>    
  <el-form-item label="所属平台" prop="applicationClientType">
    <el-select v-model="ruleForm.applicationClientType" placeholder="请选择所属平台">
      <el-option label="app" value="1"></el-option>
      <el-option label="pc" value="2"></el-option>
      <el-option label="全部" value="3"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
    <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
  </el-form-item>
</el-form>
  <!-- <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div> -->
</el-dialog>


  </div>
</template>

<script>
import {getProcessList,addProcessNode} from "@/api/myMission"
export default{
  data(){
    return {
        loading: false,
        tableData: [] ,
        // pageNo: 1 ,
        title: false,
        currentPage: 1,  
        dialogFormVisible: false,
        totalPages: 0,
        ruleForm: {
          applicationClientType: '',
          businessNodeCode: '',
          businessNodeName: '',
          businessNodeSort: ''
        },
        rules: {
          businessNodeCode: [
            { required: true, message: '请输入节点编号', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          businessNodeName: [
            { required: true, message: '请输入节点名称', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          businessNodeSort: [
            { required: true, message: '请输入执行顺序', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],                   
          applicationClientType: [
            { required: true, message: '请选择所属平台', trigger: 'change' }
          ]
        },
        formLabelWidth: '120px'         
    }
  },
  methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(this.currentPage)
           this.getListData();
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            addProcessNode(this.ruleForm).then(response => {
              this.dialogFormVisible = false;
              if (response.data.errCode === '200') {
                     this.$message({
                        type: 'success',
                        message: '保存成功'
                    });               
                this.getListData();
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getListData() {
        this.loading = true
        getProcessList({
            "pageNo": this.currentPage,
            "pageSize":"15"
        }).then(response => {
            console.log(response.data)
            this.loading = false;
            if (response.data.errCode === "200") {
              console.log(JSON.stringify(response.data.body))
              this.tableData = response.data.body.dataList;
              this.totalPages = response.data.body.totalItem*10;
            }
        })
      },
      addNode()  {
        this.ruleForm =  {
          applicationClientType: '',
          businessNodeCode: '',
          businessNodeName: '',
          businessNodeSort: ''
        }
        this.resetForm('ruleForm');
        this.dialogFormVisible = true;
        this.title = true;
      },
      handleClick(row) {
        this.dialogFormVisible = true;
        this.title = false;     
        this.ruleForm = {
          ...row,
          applicationClientType: String(row.applicationClientType)
        }  
        // this.ruleForm = row; 
      }
      
  } ,
  created(){
    this.getListData();
  }
}
</script>
<style lang="scss" scoped>
.process-container {
  padding: 20px;
  .process-top{
    margin-bottom: 20px;
    text-align: right;
  }
  .process-bottom {
     margin-top: 20px;
    text-align: center;   
  }
}
</style>

