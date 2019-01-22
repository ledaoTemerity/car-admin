<template>
  <div class="dashboard-container">
     <div class="event-tab">
        <div>       
          <el-form :inline="true" :model="formInline" class="demo-form-inline"  ref="ruleForm" >
            <el-row>
              <el-col :span="8">
                <el-form-item label="角色名称" prop="roleName">
                  <el-input v-model="formInline.roleName" placeholder="客户姓名"></el-input>
                </el-form-item>                
              </el-col>
              <el-col :span="8">
                <el-form-item label="角色编码" prop="roleId">
                  <el-input v-model="formInline.roleId" placeholder="证件号码"></el-input>
                </el-form-item>               
              </el-col>
               <el-col :span="8">
                <el-form-item label="状态" prop="status">
                  <el-select v-model="formInline.status" placeholder="请选择状态">
                    <el-option label="启用" value="0"></el-option>
                    <el-option label="停用" value="1"></el-option>
                  </el-select>
                </el-form-item>             
              </el-col>        
            </el-row> 
            <el-row>
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
            style="width:100%">
            <el-table-column
              fixed
              prop="roleId"
              label="角色编码">
            </el-table-column>
            <el-table-column
              prop="roleName"
              label="角色名称">
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
                <el-button type="text" size="small" @click="openMenu(scope.row)">权限</el-button>
              </template>
            </el-table-column>
          </el-table>          
          </div>  
     </div>

<el-dialog :title=" isAdd? '创建': '编辑' + '角色'" :visible.sync="dialogFormVisible">
 <!-- <p>基本信息</p> -->
<el-form :model="ruleForm" :rules="rulesll" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="ruleForm.roleName" placeholder="客户姓名"></el-input>
    </el-form-item>   
    <el-form-item label="角色编码" prop="roleId">
        <el-input v-model="ruleForm.roleId" :disabled="!isAdd" placeholder="证件号码"></el-input>
    </el-form-item>    
    <el-form-item label="状态" prop="status">
        <el-select v-model="ruleForm.status" placeholder="请选择状态">
        <el-option label="启用" value="0"></el-option>
        <el-option label="停用" value="1"></el-option>
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
<el-dialog title="权限" :visible.sync="dialogTableVisible">
  <!-- <el-table :data="gridData">
    <el-table-column property="date" label="日期" width="150"></el-table-column>
    <el-table-column property="name" label="姓名" width="200"></el-table-column>
    <el-table-column property="address" label="地址"></el-table-column>
  </el-table> -->
  <div>
    <el-tree
    ref="tree"
    :data="data2"
    show-checkbox
    node-key="menuId"
    default-expand-all
    :default-checked-keys="menuList"
    :props="defaultProps"
    @check-change="handleCheckChange"
    >
    </el-tree>     
  </div>
  <div class="quanxian-btn">
    <el-button v-if="!isAdd" type="primary" @click="fenpeQx">保存</el-button>
    <el-button @click="dialogTableVisible = false">取 消</el-button>
  </div>
    <!-- <el-button @click="resetFormCJ('ruleForm')">重置</el-button>   -->
</el-dialog>   
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import {getRoleList ,deleteRole ,editRole ,addRole ,getAllMenu ,editQx} from '@/api/myMission'

export default {
  name: 'Dashboard',
  data() {
    return {
         data2: [],
        defaultProps: {
          children: 'sysMenuVOList',
          label: 'menuName'
        },       
      isAdd: false,  
      loading: false,
      parentCompanyArr: [],
      RoleList: [],
      formInline: {
        roleName: '',
        status: '',
        roleId: ''
      },
      processList: [],
      menuList: [],
      tableData: [],
       ruleForm: {
        roleName: '',
        status: '',
        roleId: ''
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
        status: [
        { required: true, message: '请选择所属平台', trigger: 'change' }
        ]
       },
      formLabelWidth: '120px',
      dialogFormVisible: false, 
      dialogTableVisible: false                 
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
     this.getOperatorListArr();
  },
  methods:{
    handleCheckChange(data, checked, indeterminate) {
      // let arr = {...this.menuList};
      //  console.log('menuList',this.$refs.tree.getCheckedKeys());
    },
    onSubmit() {
        this.getOperatorListArr();
    },
    submitFormCJ(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addRole(this.ruleForm).then(res=> {
                this.getOperatorListArr()
                this.dialogFormVisible = false;
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
            editRole(this.ruleForm).then(res=> {
              this.getOperatorListArr()
              this.dialogFormVisible = false;
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
    getOperatorListArr() {
      this.loading = true;
        getRoleList({
            pageNo: String(this.currentPage),
            pageSize: '15',
            ...this.formInline
        }).then(response => {
          this.loading = false;
            if (response.data.errCode === "200") {
                this.tableData = response.data.body;
            }  
        })
    },
    delectUserData(row) {
        this.$confirm('你确定要删除该角色吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            console.log("opIdopIdopIdopIdopId", row)
            deleteRole({
                roleId: String(row.roleId)
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
        this.$confirm(`你确定要${ row.status === '0' ? '停用': '启用' }该角色吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            console.log("opIdopIdopIdopIdopId", row)
            let status = row.status === '0' ? '1' : '0';           
            editRole({
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
        roleName: '',
        status: '',
        roleId: ''
        }
        this.resetFormCJ('ruleForm');
      },
      openMenu(row){
          this.dialogTableVisible = true
          getAllMenu({
           roleId: row.roleId
          }).then(res => {
            console.log("ooooooooooooooooooo",res.data)
            if (res.data.errCode === '200') {
              this.data2 = res.data.body;
              let _arr = [];
              this.arrayJg(this.data2, _arr);
              this.menuList = _arr;
              // console.log(_arr)
            }
          })
      },
      fenpeQx(){
        // alert(this.$refs.tree.getCheckedKeys().length)
        if (this.$refs.tree.getCheckedKeys().length == 0) {
               this.$message({
                    type: 'info',
                    message: '请至少分配一个权限'
              });  
              return false;
        }
        editQx({
          roleId: this.roleId,
          menuList: this.$refs.tree.getCheckedKeys()
        }).then(res => {
          console.log(res.data)
        })
      },
      arrayJg(arr,_arr){
        // let _arr = [];
        arr.forEach(element => {
          if (element.having) {
            _arr.push(element.menuId)
          }
          if (element.sysMenuVOList.length !== 0) {
            this.arrayJg(element.sysMenuVOList,_arr)
          }
        });
        return _arr;
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
.quanxian-btn {
    text-align: center;
    padding-top: 20px;
}
</style>

