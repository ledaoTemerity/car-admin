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
    <div class="essential-other" v-if="userData.isPage !== 'chedaichaxun' && userData.auditStatus === '0'">
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
            <el-form-item label="内部意见">
                <el-input type="textarea" v-model="form.insideOpinion"></el-input>
            </el-form-item>
            <el-form-item label="驳回信息">
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
        dataList:{1:'通过', 2: '驳回',3:'拒绝', 4: '加入黑名单'},
        processList: [],
        auditRecordList: [],
        auditRecord: [],
        rules: {
          auditNodeResult: [
            { required: true, message: '请选择意见结论', trigger: 'change' }
          ]            
        }         
    }
  },
  created() {
    this.getListAll();
  },
  methods: {
    submitForm(form){
        let that = this;
       this.$refs[form].validate((valid) => {
          if (valid) {
            if (this.form.auditNodeResult !== '1' && this.form.auditReason=== '') {
                   that.$message({
                    type: 'warning',
                    message: '如果审批不通过，驳回信息必须填写'
                  });  
                  return false;             
            }
            let isYouBh = false;
            this.auditRecord.auditProcessList.split(',').forEach(el => {
              if (el !== '1') {
                isYouBh = true;
              }
            })
            let tishi = ''
            if (this.form.auditNodeResult !== '1' && !isYouBh) {
                tishi = '该客户风险较低'
            }
            if (this.form.auditNodeResult === '1' && isYouBh) {
                    that.$message({
                    type: 'warning',
                    message: '对不起该用户存在风险，不能进行通过操作'
                  });  
                  return false;                 
            }            
            console.log('dddddddddd',this.auditRecord)
              this.$confirm(tishi+'你确定将该审批' +this.dataList[this.form.auditNodeResult] + '吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              getAuditResult({
                businessId: that.userData.businessId,
                auditRecordId: that.userData.recordId,
                auditType: that.userData.auditType,
                auditNode: 6,
                ...that.form
              }).then(response => {
                if (response.data.errCode === "200") {
                    that.getListAll();
                    that.$message({
                    type: 'success',
                    message: '审批成功'
                  });                
                } else {
                  that.$message({
                    type: 'warning',
                    message: response.data.errMsg
                  });                 
                }
              }).catch(error => {
                console.log(error)
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              });       

            });              
          }else{
            that.$message({
              type: 'warning',
              message: '请选择意见结论'
            });  
          }
       })         
    },
    getListAll(){
      getProcessData(this.userData).then(response => {
        if (response.data.errCode === "200") {
          let data = response.data.body;
          if (data.processList !== undefined) {
            this.processList = data.processList;
          } 
          if (data.auditRecordList !== undefined) {
            this.auditRecordList = data.auditRecordList;
            this.auditRecordList.forEach(el => {
              if (el.operatorId === response.data.body.operatorId) {
                this.auditRecord = el
                return false;
              }
            })
          }                     
        }
      }).catch(error => {
        console.log(error)
      })     
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
