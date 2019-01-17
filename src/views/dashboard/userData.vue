<template>
  <div class="userData-container">
    <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
      <el-radio-button label="1">基本信息</el-radio-button>
      <el-radio-button label="2">贷款信息</el-radio-button>
      <el-radio-button label="3">反欺诈评估</el-radio-button>
      <el-radio-button label="4">征信信息</el-radio-button>
      <el-radio-button label="5">过程信息</el-radio-button>
      <el-radio-button label="6">影像管理</el-radio-button>          
    </el-radio-group>
    <!-- {{$route.query.userData}} -->
    <ess-ential v-if="tabPosition === '1'" :userData ="essEntialData"/>
    <loan-inf v-else-if="tabPosition === '2'" :userData ="essEntialData" />
    <antiFraud v-else-if="tabPosition === '3'" :userData ="essEntialData" />
    <credit  v-else-if="tabPosition === '4'" :userData ="essEntialData" />
    <imageInformation  v-else-if="tabPosition === '6'" :userData ="essEntialData"/>
    <processInf v-else :userData ="essEntialData" />
  </div>
</template>

<script>
import essEntial from './components/essential'
import loanInf from './components/LoanInf'
import credit from './components/credit'
import processInf from './components/processInf'
import imageInformation from './components/imageInformation'
import antiFraud from './components/antiFraud'
export default {
  name: 'userData',
  components: { essEntial , loanInf ,credit ,processInf,imageInformation ,antiFraud},
  data(){
    return{
      tabPosition: '1',
      essEntialData: {}
    }
  },
  created(){
    if (!this.$route.query.userData) {
      this.$router.push({path: 'dashboard'})
      return false;
    } 
    console.log("vvvvvvvvvvvvvvvvv",this.$route.query.auditStatus)
    let data = JSON.parse(this.$route.query.userData)
    this.essEntialData ={
      businessId: data.businessId,
      recordId: data.recordId,
      opId : data.opId,
      auditType: data.auditType,
      customerId: data.customerId,
      auditNode: data.businessNodeCodeId,
      auditStatus: this.$route.query.auditStatus
    }
  }  
}
</script>

<style scoped>
  .userData-container {
    padding: 20px;
  }
</style>
