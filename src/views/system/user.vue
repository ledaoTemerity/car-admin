<template>
  <div class="dashboard-container">
     <div class="event-tab">
        <div>       
          <el-form :inline="true" :model="formInline" class="demo-form-inline"  ref="ruleForm" >
            <el-row>
              <el-col :span="8">
                <el-form-item label="用户姓名" prop="opName">
                  <el-input v-model="formInline.opName" placeholder="客户姓名"></el-input>
                </el-form-item>                
              </el-col>
              <el-col :span="8">
                <el-form-item label="用户账号" prop="opCode">
                  <el-input v-model="formInline.opCode" placeholder="证件号码"></el-input>
                </el-form-item>               
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属公司" prop="parentCompany">
                  <el-select v-model="formInline.parentCompany">
                    <!-- <el-option label="请选择" value="2"></el-option> -->
                    <el-option v-for="item in parentCompanyArr" :key="item.fullName" :label="item.fullName"  :value="item.orgId"></el-option>
                  </el-select>
                </el-form-item>             
              </el-col>             
            </el-row> 
            <el-row>
              <el-col :span="8">
                <el-form-item label="状态" prop="status">
                  <el-select v-model="formInline.status" placeholder="请选择状态">
                    <el-option label="启用" value="0"></el-option>
                    <el-option label="停用" value="1"></el-option>
                  </el-select>
                </el-form-item>             
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属渠道" prop="parentChannel">
                  <el-select v-model="formInline.parentChannel" placeholder="请选择所属渠道">
                    <!-- <el-option label="请选择" value="请选择"></el-option> -->
                    <el-option v-for="item in processList" :key="item.businessNodeCode" :label="item.fullName" :value="item.orgId"></el-option>
                  </el-select>
                </el-form-item>            
              </el-col>
              <el-col :span="8">
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">查询</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                  <el-button @click="addUser">添加</el-button>
                </el-form-item>                
              </el-col>
            </el-row>                                             
          </el-form>
        </div>  
        <div>
          <el-table
            :data="tableData"
            v-loading="loading"
            border
            style="width: 100%">
            <el-table-column
              fixed
              prop="opName"
              label="用户姓名">
            </el-table-column>
            <el-table-column
              prop="opCode"
              label="用户账号">
            </el-table-column>
            <el-table-column
              prop="mobile"
              label="手机号">
            </el-table-column>
            <el-table-column
              prop="parentCompany"
              label="所属部门/分公司">
            </el-table-column>
            <el-table-column
                prop="parentChannel"
                label="所属组/渠道">
              </el-table-column>
            <el-table-column
                prop="status"
                label="状态">
                <template  slot-scope="scope">
                    {{scope.row.status==='0' ? '正常' : '停用'}}
                </template>
              </el-table-column>                                               
            <el-table-column
              fixed="right"
              label="操作"
              width="230">
              <template slot-scope="scope">
                <el-button @click="stopUserData(scope.row)" type="text" size="small" >{{ scope.row.status==="0" ? "停用" : "启用"}}</el-button>
                <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="delectUserData(scope.row)" type="text" size="small">删除</el-button>
                <el-button type="text" size="small">重置密码</el-button>
              </template>
            </el-table-column>
          </el-table>          
          </div>
          <div class="dashboard-pagination">
            <el-pagination
               background
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="10"
              layout="prev, pager, next, jumper"
              jumper-text="页面"
              :total="maxPage"
              >
            </el-pagination>         
          </div>      
     </div>

<el-dialog :title=" isAdd? '创建': '编辑' + '账号'" :visible.sync="dialogFormVisible">
 <!-- <p>基本信息</p> -->
<el-form :model="ruleForm" :rules="rulesll" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户姓名" prop="opName">
        <el-input v-model="ruleForm.opName" placeholder="客户姓名"></el-input>
    </el-form-item>   
    <el-form-item label="用户账号" prop="opCode">
        <el-input v-model="ruleForm.opCode" :disabled="!isAdd" placeholder="证件号码"></el-input>
    </el-form-item>    
    <el-form-item label="所属公司" prop="parentCompany">
        <el-select v-model="ruleForm.parentCompany">
        <!-- <el-option label="请选择" value="2"></el-option> -->
        <el-option v-for="item in parentCompanyArr" :key="item.fullName" :label="item.fullName"  :value="item.orgId"></el-option>
        </el-select>
    </el-form-item>  
    <el-form-item label="所属渠道" prop="parentChannel">
        <el-select v-model="ruleForm.parentChannel" placeholder="请选择所属渠道">
        <!-- <el-option label="请选择" value="请选择"></el-option> -->
        <el-option v-for="item in processList" :key="item.businessNodeCode" :label="item.fullName" :value="item.orgId"></el-option>
        </el-select>
    </el-form-item> 
    <el-form-item label="状态" prop="status">
        <el-select v-model="ruleForm.status" placeholder="请选择状态">
        <el-option label="启用" value="0"></el-option>
        <el-option label="停用" value="1"></el-option>
        </el-select>
    </el-form-item>  
    <el-form-item label="用户角色" prop="parentChannel">
        <el-select v-model="ruleForm.parentChannel" placeholder="请选择用户角色">
        <!-- <el-option label="请选择" value="请选择"></el-option> -->
        <el-option v-for="item in RoleList" :key="item.businessNodeCode" :label="item.roleName" :value="item.roleId"></el-option>
        </el-select>
    </el-form-item> 
    <el-form-item label="用户级别" prop="parentChannel">
        <el-select v-model="ruleForm.parentChannel" placeholder="请用户级别">
        <el-option label="分公司级" value="4"></el-option>
        <el-option label="组级" value="5"></el-option>
        <!-- <el-option label="请选择" value="请选择"></el-option> -->
        <!-- <el-option v-for="item in processList" :key="item.businessNodeCode" :label="item.fullName" :value="item.orgId"></el-option> -->
        </el-select>
    </el-form-item>               
  <el-form-item>
    <el-button v-if="isAdd" type="primary" @click="submitFormCJ('ruleForm')">保存</el-button>
     <el-button v-if="!isAdd" type="primary" @click="submitFormBJ('ruleForm')">保存</el-button>
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button @click="resetFormCJ('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</el-dialog>     
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import {getCompanyList,getDeptList ,getOperatorList ,getRoleList ,deleteUser ,editUserData ,createUserData} from '@/api/myMission'

export default {
  name: 'Dashboard',
  data() {
    return {
      isAdd: false,
      currentPage: 1,      
      tabPosition: '0',
      maxPage: 0,
      loading: false,
      parentCompanyArr: [],
      RoleList: [],
      formInline: {
        parentChannel: '',
        opName: '',
        parentCompany: '',
        status: '',
        opCode: ''
      },
      processList: [],
      tableData: [],
       ruleForm: {
         opCode: '',
         opName: '',
         mobile: '',
         parentCompany: '',
         parentChannel: '',
         status: '',
         role:'',
         level: ''
        },
       rulesll: {
        opCode: [
        { required: true, message: '请输入节点编号', trigger: 'blur' },
        // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        opName: [
        { required: true, message: '请输入节点名称', trigger: 'blur' },
        // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        mobile: [
        { required: true, message: '请输入执行顺序', trigger: 'blur' },
        // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],                   
        parentCompany: [
        { required: true, message: '请选择所属平台', trigger: 'change' }
        ],                   
        parentChannel: [
        { required: true, message: '请选择所属平台', trigger: 'change' }
        ],                   
        status: [
        { required: true, message: '请选择所属平台', trigger: 'change' }
        ],                   
        role: [
        { required: true, message: '请选择所属平台', trigger: 'change' }
        ],                   
        level: [
        { required: true, message: '请选择所属平台', trigger: 'change' }
        ]
       },
      formLabelWidth: '120px',
      dialogFormVisible: false,                       
    }
  },
  watch:{
    tabPosition:function (newValue,oldValue){
      this.getList({
        "page": 1,
        "auditType": 0,
        "auditStatus": this.tabPosition     
      }); 
      this.resetForm('ruleForm')     
    }
  },
  created() {
     getCompanyList().then(response => {
      //  console.log("33333333333",response)
       if (response.data.errCode === "200") {
           this.parentCompanyArr = response.data.body;
       }
     })
     getDeptList().then(response => {
       if (response.data.errCode === "200") {
           this.processList = response.data.body;
       }         
     })
     getRoleList({
         status: '0'
     }).then(response => {
       if (response.data.errCode === "200") {
           this.RoleList = response.data.body;
       }         
     })
     this.getOperatorListArr();
  },
  methods:{
    onSubmit() {
        this.getOperatorListArr();
    },
    submitFormCJ(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogFormVisible = false
            createUserData(this.ruleForm).then(res=> {
               this.getOperatorListArr();
                console.log("resssssss", res.data)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    submitFormBJ(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogFormVisible = false
            editUserData(this.ruleForm).then(res=> {
              this.getOperatorListArr();
                console.log("eeeeeeeee", res.data)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    resetFormCJ(formName) {
      this.$refs[formName].resetFields();
    },    
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleCurrentChange(val) {
        // console.log(this.currentPage)
        //    this.getListData();
    },    
    getOperatorListArr() {
      this.loading = true;
        getOperatorList({
            pageNo: String(this.currentPage),
            pageSize: '15',
            ...this.formInline
        }).then(response => {
          this.loading = false;
            if (response.data.errCode === "200") {
                this.tableData = response.data.body.dataList;
                this.maxPage = response.data.body.totalPages *10;
            }  
        })
    },
    delectUserData(row) {
        this.$confirm('你确定要删除该用户吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            console.log("opIdopIdopIdopIdopId", row)
            deleteUser({
                opId: row.opId
            }).then(response => {
                if (response.data.errCode === "200") {
                  this.getOperatorListArr()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }      
            }).catch(error =>{
                this.$message({
                    type: 'info',
                    message: error
                });                  
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      stopUserData(row) {
        this.$confirm(`你确定要${ row.status === '0' ? '停用': '启用' }该用户吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            console.log("opIdopIdopIdopIdopId", row)
            let status = row.status === '0' ? '1' : '0';           
            editUserData({
                ...row,
                status
            }).then(response => {
                if (response.data.errCode === "200") {
                  this.getOperatorListArr()
                    this.$message({
                        type: 'success',
                        message: `${ row.status === '0' ? '停用': '启用' }成功`
                    });
                }      
            }).catch(error =>{
                this.$message({
                    type: 'info',
                    message: error
                });                  
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      edit(row){
        this.dialogFormVisible = true ;
        this.isAdd = false;
        this.ruleForm = {
            ...row
        };
      },
      addUser(){
        this.isAdd = true;
        this.dialogFormVisible = true ;
        this.ruleForm= {
         opCode: '',
         opName: '',
         mobile: '',
         parentCompany: '',
         parentChannel: '',
         status: '',
         role:'',
         level: ''
        }
        this.resetFormCJ('ruleForm');
      },      
      editData() {
          editUserData({

          }).then(response => {
            if (response.data.errCode === "200") {
                // this.$message({
                //     type: 'success',
                //     message: '删除成功!'
                // });
            }  
          }).catch(error => {
            this.$message({
                type: 'info',
                message: error
            });               
          })
      }      
  }
}
</script>
<style rel="stylesheet/scss"  lang="scss">
 .event-tab {
   padding: 20px;
  .dashboard-pagination {
    padding: 20px;
    text-align:center;
  }   
  .demo-form-inline {
    .el-input--medium {
      .el-input__inner {
        width: 220px;   
      }
    }
  }   
 }
</style>

