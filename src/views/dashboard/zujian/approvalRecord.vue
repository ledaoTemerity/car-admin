<template>
  <div class="ul-approvalRecord">
    <el-row>
    <el-col :span="4"><div class="grid-content bg-purple approvalRecord-height">{{userData.auditTime}}</div></el-col>
    <el-col :span="5"><div class="grid-content bg-purple-light approvalRecord-height">{{userData.auditName}}</div></el-col>
    <el-col :span="5"><div class="grid-content bg-purple">
      <p class="bg-purple-p">主借基本信息</p>
      <p class="bg-purple-p">贷款信息</p>
      <p class="bg-purple-p">反欺诈评估</p>
      <p>征信信息</p>
      </div></el-col>
    <el-col :span="5"><div class="grid-content bg-purple-light">
      <p class="bg-purple-p">{{restData[userData.auditProcessList.split(',')[0]]}}</p>
      <p class="bg-purple-p">{{restData[userData.auditProcessList.split(',')[1]]}}</p>
      <p class="bg-purple-p">{{restData[userData.auditProcessList.split(',')[2]]}}</p>
      <p class="bg-purple-p">{{restData[userData.auditProcessList.split(',')[3]]}}</p>        
        </div></el-col>
    <el-col :span="5"><div class="grid-content bg-purple-light approvalRecord-height no-right-border">{{...userData.insideOpinionList.split('^')}}</div></el-col>  
    </el-row>   
    </div>  
</template>

<script>
export default {
  name: 'approvalRecord',
  props: {
    userData: {
        type: Object,
        required: true
    }
  },
  data(){
    return{
       restData: {
          1:'通过',2:'驳回',3:'拒绝',4:'拉黑'
      }     
    }
  },
  created() {
    //   console.log(this.userData.auditProcessList = '')
    //   this.userData.auditProcessList = '1,2,3'
  }
}
</script>

<style <style lang="scss" scoped>
.ul-approvalRecord {
  font-size: 12px;
  text-align: center;
  border-right: 1px solid #d8dce5;
  border-left: 1px solid #d8dce5;
  border-bottom: 1px solid #d8dce5;
  .grid-content {
    border-right: 1px solid #d8dce5;
    p{
        height: 35px;
        margin: 0;
        line-height: 35px;
    }
    .bg-purple-p {
      border-bottom: 1px solid #d8dce5;       
    }
  }
  .approvalRecord-height {
      height: 140px;
      line-height: 140px;
      
  }
  .no-right-border {
      border-right: 0px;
    }
}
</style>
