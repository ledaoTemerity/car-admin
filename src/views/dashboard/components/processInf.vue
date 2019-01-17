<template>
  <div class="processInf"> 
    <div class="processInf-ul">
      <div class="processInf-title">过程信息</div>
      <div class="processInf-table">
        <el-table
            :data="processList"
            border
            style="width: 100%">
            <el-table-column
            prop="processStr"
            label="环节名称">
            </el-table-column>
            <el-table-column
            prop="auditNodeResultStr"
            label="结论">
            <!-- <template slot-scope="scope"> -->
              <!-- {{}} -->
                <!-- <a :download="scope.row.attach" :href="'/api/hbase/readFile?fileName=' + scope.row.attach">{{scope.row.attach}}</a> -->
            <!-- </template> -->
            </el-table-column>
            <el-table-column
            prop="auditRole"
            label="审批角色">
            </el-table-column>
            <el-table-column
            prop="opName"
            label="审批人">
            </el-table-column>
            <el-table-column
            prop="auditTime"
            label="审批时间">
            </el-table-column>    
            <el-table-column
            prop="auditEfficiency"
            label="审批时效">
            </el-table-column>    
            <el-table-column
            prop="insideOpinion"
            label="意见">
            </el-table-column>                                                    
        </el-table>          
      </div>
    </div>
    <div class="processInf-ul">
      <div class="processInf-title">审批记录</div>
      <div class="processInf-table">
        <div class="processInf-hedaer">
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple">审核时间</div></el-col>
            <el-col :span="5"><div class="grid-content bg-purple-light">审核人</div></el-col>
            <el-col :span="5"><div class="grid-content bg-purple">审批模块</div></el-col>
            <el-col :span="5"><div class="grid-content bg-purple-light">意见结论</div></el-col>
            <el-col :span="5"><div class="grid-content bg-purple-light no-right-border">内部意见（聚合）</div></el-col> 
          </el-row>          
        </div>
        <approval-record v-for="(item,index) in auditRecordList" :key="index" :userData="item"/>        
      </div>
    </div>
    <div class="essential-other">
        <div class="verification">
            <p class="verification-p">信息核验</p>
            <div>
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="意见结论" prop="auditNodeResult">
                <el-radio-group v-model="form.auditNodeResult">
                <el-radio label="1">通过</el-radio>
                <el-radio label="2">驳回</el-radio>
                <el-radio label="3">拒绝</el-radio>
                <el-radio label="4">加入黑名单</el-radio>              
                </el-radio-group>
            </el-form-item>
            <el-form-item label="活动形式">
                <el-input type="textarea" v-model="form.insideOpinion"></el-input>
            </el-form-item>
            <el-form-item label="活动形式">
                <el-input type="textarea" v-model="form.auditReason"></el-input>
            </el-form-item>            
            <el-form-item>
                <el-button type="primary" @click="submitForm('form')">确定</el-button>
                <!-- <el-button>取消</el-button> -->
            </el-form-item>
            </el-form>              
            </div>
        </div>   
    </div>     
  </div>
</template>

<script>
import approvalRecord from '../zujian/approvalRecord'
import {getProcessData , getAuditResult} from '@/api/myMission'
export default {
  name: 'processInf',
  props: {
    userData: {
      type: Object,
      required: true
    }
  },
  components: {approvalRecord },
  data(){
    return{
        form:{
          auditNodeResult: '',
          insideOpinion: '',
          auditReason: ''
        },
        processList: [],
        auditRecordList: [],
        rules: {
          auditNodeResult: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ]            
        }         
    }
  },
  created() {
    console.log("0000000000",this.userData)
    getProcessData(this.userData).then(response => {
      if (response.data.errCode === "200") {
        let data = response.data.body;
         console.log('this.userData',response.data)
         this.processList = data.processList;
         this.auditRecordList = data.auditRecordList;
      }
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    submitForm(form){
        let that = this;
        this.$confirm('####', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getAuditResult({
            businessId: that.userData.businessId,
            auditRecordId: that.userData.recordId,
            auditType: that.userData.auditType,
            auditNode: that.userData.auditNode,
            operatorId: that.userData.opId,
            ...that.form
          }).then(response => {
            if (response.data.errCode === "200") {
              
            } else {
              that.$message({
                type: 'info',
                message: response.data.errMsg
              });                 
            }
            // console.log(response.data)
          }).catch(error => {
            console.log(error)
          })
          // this.$message({
          //   type: 'success',
          //   // message: '删除成功!'
          // });
        }).catch(() => {
          this.$message({
            type: 'info',
            // message: '已取消删除'
          });       

        });      
    }
  }
}
</script>

<style <style lang="scss" scoped>
.processInf {
  .processInf-ul {
    .processInf-title {
        background-color: #00AFAA;
        color: white;
        padding: 10px;
        margin: 0;        
    }
    .processInf-table {
        padding: 20px;
        border: 1px solid #d8dce5;
    } 
    .processInf-hedaer {
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      line-height: 35px;
      border: 1px solid #d8dce5;
      .grid-content {
        border-right: 1px solid #d8dce5; 
      }
      .no-right-border{
        border-right: 0px;
      }
    } 
  }
.essential-other {
    padding: 20px;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 6px 0px rgba(19,78,110,0.2);
    border-radius:5px;
    margin-top: 20px;   
}    
}

</style>
