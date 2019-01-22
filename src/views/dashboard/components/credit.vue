<template>
  <div class="credit">  
    <picture-arra :greditData="greIDCard" :cardTitle="'身份证图片'"/>
    <picture-arra :greditData="greCredit" :cardTitle="'征信图片'"/>
    <div class="essential-other" v-if="userData.isPage !== 'chedaichaxun' && userData.auditType === 0 && userData.auditStatus === '0'&& auditResultData === undefined && !isShow">
      <verification @isShoworHidden="isShoworHidden" :verificationData="verificationData" />
    </div>               
  </div>
</template>

<script>
import pictureArra from '../zujian/pictureArra'
import verification from '../zujian/verification'
import {getCreditData} from '@/api/myMission'
export default {
  name: 'credit',
  components: { pictureArra, verification },
  props: {
    userData:{
      type:Object,
      required: true
    }
  },
  data(){
    return {
      greIDCard: [],
      greCredit: [],
      verificationData: {},
      showAndHidde: {},
      isShow: false,
      auditResultData: {}
    }
  },
  created() {
     this.verificationData = {
      businessId: this.userData.businessId,
      auditRecordId: this.userData.recordId,
      auditType: this.userData.auditType,
      auditNode: 4//基本信息审核
    }   
      getCreditData(this.userData).then(response => {
          if (response.data.errCode === '200') {
            if (response.data.body.greditData !== undefined) {
            let data = response.data.body.greditData;
            this.greCredit= JSON.parse(data.creditLicense); 
                 this.greIDCard.push(data.idCardFront);
                 this.greIDCard.push(data.idCardBack);               
            }                 
             this.auditResultData= response.data.body.auditResultData;    
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
.credit-ul-bottom {
    margin-top: 30px;
}
.essential-other {
    padding: 20px;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 6px 0px rgba(19,78,110,0.2);
    border-radius:5px;
    margin-top: 20px;     
} 
</style>
