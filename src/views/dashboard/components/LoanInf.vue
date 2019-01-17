<template>
  <div class="essential">
    <div class="borrower">
      <p class="borrower-p">借款人信息</p>
      <div class="borrower-ul">
        <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">
              <label>合作资方：</label>
              <span>{{loanData.criId}}</span>
            </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple-light">
               <label>业务类型：</label>
              <span>{{loanData.criId}}</span>               
                </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple">
              <label>金融产品：</label>
              <span>{{loanData.criId}}</span>                
                </div></el-col>
        </el-row>
        <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">
              <label>合作车商：</label>
              <span>{{loanData.criId}}</span>
            </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple-light">
               <label>购车用途（家庭乘用、办公乘用、网约车）：</label>
              <span>{{loanData.purposeStr}}</span>               
                </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple">
              <label>车辆信息（品牌+型号）  ：</label>
              <span>{{loanData.vehicleType}}</span>                
                </div></el-col>
        </el-row>
        <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">
              <label>车辆类型（新能源或者燃油车）：</label>
              <span>{{loanData.vehicleType}}</span>
            </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple-light">
               <label>指导价：</label>
              <span>{{loanData.guidePrice}}</span>               
                </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple">
              <label>开票价：</label>
              <span>{{loanData.ticketPrice}}</span>                
                </div></el-col>
        </el-row>
         <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">
              <label>车辆挂靠单位：</label>
              <span>{{loanData.affiliatedUnits}}</span>
            </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple-light">
               <label>首付金额：</label>
              <span>{{loanData.downPayment}}</span>               
                </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple">
              <label>尾款金额：</label>
              <span>{{loanData.finalPayment}}</span>                
                </div></el-col>
        </el-row>
        <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">
              <label>融资期限：</label>
              <span>{{loanData.criId}}</span>
            </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple-light">
               <label>月供：</label>
              <span>{{loanData.monthlyPrice}}</span>               
                </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple">
              <label>本息合计：</label>
              <span>{{loanData.totalPayment}}</span>                
                </div></el-col>
        </el-row>                        

                                        
      </div>  
    </div>
    <div class="essential-other" v-if="userData.auditType === 0 && userData.auditStatus === '0'">
      <verification :verificationData="verificationData"/>      
    </div>   
  </div>
</template>

<script>
import {getLoanData} from '@/api/myMission'
import verification from "../zujian/verification"
export default {
  name: 'loanInf',
  components: {verification},
  props: {
    userData:{
       type: Object,
      required: true 
    }
  },
  data(){
    
    return{
        // tabPosition: '1',
        // form:{},
        verificationData: {},
        loanData: {},
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]        
    }
  },
  created() {
    this.verificationData = {
      businessId: this.userData.businessId,
      auditRecordId: this.userData.recordId,
      auditType: this.userData.auditType,
      auditNode: 2,//基本信息审核
      operatorId: this.userData.opId
    }      
    getLoanData(this.userData).then(response => {
      console.log(response.data)
      if (response.data.errCode === "200") {
        this.loanData = response.data.body.loanData;
      }
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>

<style <style lang="scss" scoped>
  .essential {
    font-size:14px;
    .borrower-p {
        font-family:PingFangSC-Semibold;
        color:rgba(74,74,74,1);
        font-weight: bold;
        border-bottom: 1px solid #9B9B9B;
        padding-bottom: 10px;
    }
    .grid-content {
        padding-bottom: 20px;
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
