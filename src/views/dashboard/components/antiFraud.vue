<template>
  <div class="antiFraud"> 
    <div class="processInf-ul">
      <div class="processInf-title">审批记录</div>
      <div class="processInf-table">
        <div class="ul-approvalRecord">
        <table border="1" cellspacing="0" width="100%" height="700">
                    <!-- <caption>纵向合并单元格</caption> -->
                    <tr height="50"><th>指标名称</t> <th>判断维度</th><th>输出字段</th></tr>
                    <tr height="50"><td rowspan="1">身份认证</td> <td>姓名、身份证二要素</td> <td>{{antiFraudData.identityAuthentication}}</td></tr>
                    <!-- <tr height="50"> <td>Tom</td> <td>22</td> </tr>                     -->
                    <tr height="50"><td rowspan="2">手机号</td> <td>手机号实名</td> <td>{{antiFraudData.mobileRealName}}</td></tr>
                    <tr height="50"> <td>手机号在网时长</td> <td>{{antiFraudData.mobileNetworkTime}}</td> </tr>
        <!--rowspan中必须指定要合并的列数目，是两行还是三行等等-->    
                    <tr height="50"><td rowspan="1">年龄</td> <td>18-55周岁</td> <td>{{antiFraudData.age}}</td></tr>
                    <!-- <tr height="50"> <td>手机号在网时长</td> <td>22</td> </tr> -->
                    <tr height="50"><td rowspan="1">性别</td> <td>男/女</td> <td>{{antiFraudData.gender}}</td></tr>
                    <tr height="50"><td rowspan="1">民族</td> <td>藏族/回族不做</td> <td>{{antiFraudData.group}}</td></tr>
                    <tr height="50"><td rowspan="1">驾照</td> <td>3年以上</td> <td>{{antiFraudData.driverLicenseTime}}</td></tr>
                    <!-- <tr height="50"> <td>手机号在网时长</td> <td>22</td> </tr> 
                                        -->
                    <tr height="50"><td rowspan="8">关注名单</td> <td>身份证命中法院失信名单</td> <td>{{antiFraudData.promisesList}}</td></tr>
                    <tr height="50"> <td>身份证命中犯罪通缉名单</td> <td>{{antiFraudData.mostWantedList}}</td> </tr> 
                    <tr height="50"> <td>身份证命中法院执行名单</td> <td>{{antiFraudData.performList}}</td> </tr>  
                    <tr height="50"> <td>身份证命中信贷逾期名单</td> <td>{{antiFraudData.overdueList}}</td> </tr>  
                    <tr height="50"> <td>身份证命中车辆融资租赁违约名单</td> <td>{{antiFraudData.defaultList}}</td> </tr>  
                    <tr height="50"> <td>身份证命中欠款公司法人代表名单</td> <td>{{antiFraudData.legalPersonList}}</td> </tr>  
                    <tr height="50"> <td>身份证命中法院结案名单</td> <td>{{antiFraudData.finalList}}</td> </tr>  
                    <tr height="50"> <td>身份证命中信贷逾期后还款名单</td> <td>{{antiFraudData.reimbursementList}}</td> </tr>   
                   <tr height="50"><td rowspan="5">多头借贷</td> <td>7天申请次数</td> <td>{{antiFraudData.sevenApplicationNumber}}</td></tr>
                    <tr height="50"> <td>1月内申请次数</td> <td>{{antiFraudData.oneMonthApplicationNumber}}</td> </tr> 
                    <tr height="50"> <td>3月内申请次数</td> <td>{{antiFraudData.threeMonthApplicationNumber}}</td> </tr>  
                    <tr height="50"> <td>6月内申请次数</td> <td>{{antiFraudData.sixMonthApplicationNumber}}</td> </tr>  
                    <tr height="50"> <td>1年内申请次数</td> <td>{{antiFraudData.oneYearApplicationNumber}}</td> </tr>                                                          
                </table>
           
            </div>                
      </div>
    </div>
    <div class="essential-other" v-if="userData.isPage !== 'chedaichaxun' && userData.auditType === 0 && userData.auditStatus === '0' && auditResultData === undefined && !isShow">
      <verification @isShoworHidden="isShoworHidden" :verificationData="verificationData" />
    </div>    
  </div>
</template>

<script>
import {getFrauDassessMentData} from '@/api/myMission'
import verification from '../zujian/verification'
export default {
  name: 'antiFraud',
  components: { verification},
  props: {
    userData: {
        type: Object,
        required: true
    }   
  },
  data(){
    return{
      antiFraudData: {},
      auditResultData: {},
      isShow: false,
    }
  },
  created() {
      this.verificationData = {
        businessId: this.userData.businessId,
        auditRecordId: this.userData.recordId,
        auditType: this.userData.auditType,
        auditNode: 3//基本信息审核
      }    
      getFrauDassessMentData(this.userData).then(response =>{
          if (response.data.errCode === "200") {
            if (response.data.body.fraudAssessmentData !== undefined) {
               this.antiFraudData = response.data.body.fraudAssessmentData;
            }             
            this.auditResultData = response.data.body.auditResultData;
            
          }
      }).catch(error => {
          console.log(error)
      })
  },
  methods: {
       isShoworHidden(data){
      this.isShow = data;
    },   
  }
}
</script>

<style <style lang="scss" scoped>
.antiFraud {
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
  .ul-approvalRecord {
    table,th,td{
        border:1px solid #d8dce5;
        text-align: center;
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
