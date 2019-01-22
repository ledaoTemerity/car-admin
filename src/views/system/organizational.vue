<template>
  <div class="organizational"> 
    <el-row>
    <el-col :span="6">
      <div class="organizational-jg">
          <div class="organizational-jg-btn">
              <el-button type="primary" @click="addOrge">新增</el-button>
          </div>
        <el-tree :data="data" label="fullName" children="orgList" :props="defaultProps" @node-click="handleNodeClick"></el-tree>         
      </div>
    </el-col>
    <el-col :span="18"><div class="organizational-right">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="机构类型" prop="orgType">
            <el-select v-model="ruleForm.orgType" placeholder="请选择活动区域" disabled>
            <el-option label="新策总部" value="3"></el-option>
            <el-option label="新策子机构" value="4"></el-option>
            <el-option label="渠道/组" value="5"></el-option>
            <el-option label="部门" value="6"></el-option>            
            </el-select>
        </el-form-item>
        <el-form-item label="机构名称" prop="fullName" >
            <el-input v-model="ruleForm.fullName" disabled></el-input>
        </el-form-item>
         <el-form-item label="上级机构" prop="parentFullName">
            <el-input v-model="ruleForm.parentFullName" disabled></el-input>
        </el-form-item>
         <el-form-item label="机构编码" prop="orgNo">
            <el-input v-model="ruleForm.orgNo"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="relationMan">
            <el-input v-model="ruleForm.relationMan"></el-input>
        </el-form-item>
         <el-form-item label="联系电话" prop="relationPhone">
            <el-input v-model="ruleForm.relationPhone"></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱" prop="orgEmail">
            <el-input v-model="ruleForm.orgEmail"></el-input>
        </el-form-item> 
        <el-form-item>
            <el-button>修改</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            <el-button>取消</el-button>
        </el-form-item>                                                   
        </el-form>       
        </div></el-col>
    </el-row>
<el-dialog title="新增" :visible.sync="dialogFormVisible">
        <el-form :model="ruleFormData" :rules="rules" ref="ruleFormData" label-width="100px" class="demo-ruleForm">
        <el-form-item label="机构类型" prop="orgType">
            <el-select v-model="ruleFormData.orgType" placeholder="请选择活动区域">
            <el-option label="新策总部" value="3"></el-option>
            <el-option label="新策子机构" value="4"></el-option>
            <el-option label="渠道/组" value="5"></el-option>
            <el-option label="部门" value="6"></el-option>            
            </el-select>
        </el-form-item>
        <el-form-item label="机构名称" prop="fullName">
            <el-input v-model="ruleFormData.fullName"></el-input>
        </el-form-item>
         <el-form-item label="上级机构" prop="parentFullName">
            <el-input v-model="ruleFormData.parentFullName"></el-input>
        </el-form-item>
         <el-form-item label="机构编码" prop="orgNo">
            <el-input v-model="ruleFormData.orgNo"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="relationMan">
            <el-input v-model="ruleFormData.relationMan"></el-input>
        </el-form-item>
         <el-form-item label="联系电话" prop="relationPhone">
            <el-input v-model="ruleFormData.relationPhone"></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱" prop="orgEmail">
            <el-input v-model="ruleFormData.orgEmail"></el-input>
        </el-form-item> 
        <el-form-item>
            <el-button>修改</el-button>
            <el-button type="primary" @click="submitForm('ruleFormData')">保存</el-button>
            <el-button>取消</el-button>
        </el-form-item>                                                   
        </el-form>     
</el-dialog>    
  </div>
</template>

<script>
import {getOrgList ,addOrg} from '@/api/myMission';
export default {
  name: '',
//   components: { errorA, errorB }
  data(){
    return{
        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'orgList',
          label: 'fullName'
        },
         ruleForm: {
          orgType: '',
          fullName: '',
          parentFullName: '',
          orgNo: '',
          relationMan: '',
          relationPhone: '',
          orgEmail: '',
        }, 
        ruleFormData: {
          orgType: '',
          fullName: '',
          parentFullName: '',
          orgNo: '',
          relationMan: '',
          relationPhone: '',
          orgEmail: '',
        },
        rules: {
          orgEmail: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          orgType: [
            { required: true, message: '请选择机构类型', trigger: 'change' }
          ],
          fullName: [
            { required: true, message: '请输入机构名称', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
           parentFullName: [
            { required: true, message: '请输入上级机构', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          orgNo: [
            { required: true, message: '请输入机构编码', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          relationMan: [
            { required: true, message: '请输入联系人', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          relationPhone: [
            { required: true, message: '请输入联系电话', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],          
        },    
        formLabelWidth: '120px',
        dialogFormVisible: false,                 
    }
  },
  created() {
     this.getDataList();
  },
    methods: {
        handleNodeClick(data) {
          this.ruleForm = data;
        console.log(data);
        },
      submitForm(formName) {
                    alert(formName);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let userData = [];
            if (formName === 'ruleFormData') {
              userData = this.ruleFormData;
            }else {
              userData = this.ruleForm;
            }
            addOrg(userData).then(res => {
              if (res.data.errCode === "200") {
                   this.getDataList();
                    this.$message({
                      type: 'success',
                      message: '成功'
                  });               
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      addOrge(){
        this.dialogFormVisible = true;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getDataList(){
        getOrgList().then(res => {
          console.log(res.data);
          if (res.data.errCode === '200') {
            this.data = res.data.body.orgList;
            console.log('orgListorgListorgList', this.data)
          }
        })
      }   
    }  
}
</script>

<style <style lang="scss" scoped>
.organizational {
  padding: 20px;
  .organizational-jg {
    padding: 20px;
    background: white;
    -webkit-box-shadow: 0px 2px 6px 0px rgba(19, 78, 110, 0.2);
    box-shadow: 0px 2px 6px 0px rgba(19, 78, 110, 0.2);
    border-radius: 5px;
    margin-top: 20px;
    .organizational-jg-btn {
      padding-bottom: 20px;
    }
  }
  .organizational-right {
     padding: 20px;
    background: white;
    -webkit-box-shadow: 0px 2px 6px 0px rgba(19, 78, 110, 0.2);
    box-shadow: 0px 2px 6px 0px rgba(19, 78, 110, 0.2);
    border-radius: 5px;
    margin-top: 20px;
    margin-left: 40px;     
  }
}
</style>
