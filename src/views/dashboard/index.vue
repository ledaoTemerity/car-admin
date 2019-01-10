<template>
  <div class="dashboard-container">
     <div class="event-tab">
        <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
          <el-radio-button label="top">代办事件</el-radio-button>
          <el-radio-button label="right">已办事件</el-radio-button>
        </el-radio-group>
        <div>       
          <el-form :inline="true" :model="formInline" class="demo-form-inline" :rules="rules" ref="ruleForm" >
            <el-row>
              <el-col :span="8">
                <el-form-item label="客户名称" prop="customerName">
                  <el-input v-model="formInline.customerName" placeholder="客户姓名"></el-input>
                </el-form-item>                
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件号码" prop="idNumber">
                  <el-input v-model="formInline.idNumber" placeholder="证件号码"></el-input>
                </el-form-item>               
              </el-col>
              <el-col :span="8">
                <el-form-item label="项目编号" prop="businessNo">
                  <el-input v-model="formInline.businessNo" placeholder="项目编号"></el-input>
                </el-form-item>                
              </el-col>
            </el-row> 
            <el-row>
              <el-col :span="8">
                <el-form-item label="流程名称">
                  <el-select v-model="formInline.auditType">
                    <!-- <el-option label="请选择" value="2"></el-option> -->
                    <el-option label="征信流程" value="0"></el-option>
                    <el-option label="贷款审批流程" value="1"></el-option>
                  </el-select>
                </el-form-item>             
              </el-col>
              <el-col :span="8">
                <el-form-item label="流程节点">
                  <el-select v-model="formInline.businessNodeCode" placeholder="审批状态">
                    <el-option label="请选择" value="请选择"></el-option>
                    <el-option v-for="item in processList" :key="item.businessNodeCode" :label="item.businessNodeName" :value="item.businessNodeCode"></el-option>
                  </el-select>
                </el-form-item>            
              </el-col>
              <el-col :span="8">
                <!-- <el-form-item label="发起机构">
                  <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                </el-form-item>                 -->
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">查询</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>                
              </el-col>
            </el-row>                                             
          </el-form>
        </div>  
        <div>
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              fixed
              prop="businessNo"
              label="业务编号">
            </el-table-column>
            <el-table-column
              prop="auditType"
              label="流程名称">
            </el-table-column>
            <el-table-column
              prop="businessNodeName"
              label="节点名称">
            </el-table-column>
            <el-table-column
              prop="jobStr"
              label="执行人">
            </el-table-column>
            <el-table-column
                prop="customerName"
                label="客户名称">
              </el-table-column>
            <el-table-column
                prop="zip"
                label="机构名称">
              </el-table-column>            
            <el-table-column
                prop="zip"
                label="业务组">
              </el-table-column>
            <el-table-column
                prop="businessType"
                label="业务类型">
              </el-table-column> 
            <el-table-column
                prop="totalPayment"
                label="贷款金额">
              </el-table-column>
            <el-table-column
                prop="recordId"
                label="上一次提交时间">
              </el-table-column>                                     
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="goPage(scope.row)" type="text" size="small" >立即处理</el-button>
                <!-- <el-button type="text" size="small">编辑</el-button> -->
              </template>
            </el-table-column>
          </el-table>          
          </div>
          <div class="dashboard-pagination">
            <el-pagination
               background
              @size-change="handleSizeChange"
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {getMissionDBList,getBusinessNodeCode} from '@/api/myMission'
// import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  // components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentPage: 1,      
      tabPosition: 'top',
      currentRole: 'adminDashboard',
      maxPage: 0,
      formInline: {
         customerName: '',
         idNumber: '',
         businessNo: '',
         auditType: "0",
         businessNodeCode: "请选择"
      },
      processList: [],
      tableData: [],
      rules: {
        user: [
          { required: false, message: '请输入活动名称', trigger: 'blur' },
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      }                  
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    this.getList({
      "page": 1,
      "auditType": 0,
      "auditStatus": 0      
    });
    getBusinessNodeCode().then(response => {
      if (response.data.errCode === '200') {
          this.processList = response.data.body.processList;
      }
    }).catch(error => {

    })
  },
  methods:{
    onSubmit() {
      this.getList({
      "page": 1,
      "auditStatus": 0 ,
      ...this.formInline     
    });
    this.currentPage = 1;
    console.log("dddddddd",this.currentPage)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getList({
      "page": val-1,
      "auditStatus": 0 ,
      ...this.formInline     
    });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getList(data){
      let prams = {};
      prams.page = data.page;
      prams.auditType = data.auditType; 
      prams.auditStatus = data.auditStatus; 
      if (data.customerName ) {
        prams.customerName = data.customerName;
      } 
      if (data.idNumber ) {
        prams.idNumber = data.idNumber;
      } 
      if (data.businessNo ) {
        prams.businessNo = data.businessNo;
      }
      if (data.businessNodeCode && data.businessNodeCode !== "请选择") {
        prams.businessNodeCodeId = data.businessNodeCode;
      }
      console.log(prams)                       
      // let prams = {...data};
      getMissionDBList(prams).then(response => {
        if (response.data.errCode === '200') {
          console.log(response.data.body.list)
          this.tableData = response.data.body.list.dataList;
          this.maxPage = response.data.body.list.pagesize*10;
        }
      }).catch(error => {
      })
    },
    goPage(){
      this.$router.push('userData')
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

