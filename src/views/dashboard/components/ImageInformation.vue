<template>
  <div class="ImageInformation"> 
      <!-- ImageInformation -->
      <pictureArra :greditData="greditData" :cardTitle="'征信资料'"/>
    <div class="essential-other" v-if="userData.isPage !== 'chedaichaxun' && userData.auditStatus === '0' && auditResultData === undefined && !isShow">
      <verification   @isShoworHidden="isShoworHidden" :verificationData="verificationData"/>      
    </div>       
  </div>
</template>

<script>
import {getImageData} from "@/api/myMission"
import pictureArra from "../zujian/pictureArra"
import verification from "../zujian/verification"
export default {
  name: 'ImageInformation',
  components: { pictureArra , verification},
  props: {
    userData: {
      type: Object,
      required: true
    }
  },
  data(){
    return{
      greditData: [],
      verificationData: {},
      isShow: false
    }
  },
  created() {
    this.verificationData = {
      businessId: this.userData.businessId,
      auditRecordId: this.userData.recordId,
      auditType: this.userData.auditType,
      auditNode: 5//基本信息审核
    }
    // this.showAndHidde = {
    //   auditStatus: this.userData.auditStatus
    // }           
    getImageData(this.userData).then(response => {
      console.log(response.data.errCode)
      if (response.data.errCode === "200") {
        if (response.data.body.imageData.contractImgs) {
             let contractImgs = JSON.parse(response.data.body.imageData.contractImgs);  
             this.greditData = contractImgs  
             this.auditResultData= response.data.body.auditResultData;      
        }
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
.ImageInformation{
    .essential-other {
        padding: 20px;
        background:rgba(255,255,255,1);
        box-shadow:0px 2px 6px 0px rgba(19,78,110,0.2);
        border-radius:5px;
        margin-top: 20px;   
    }  
}
</style>
