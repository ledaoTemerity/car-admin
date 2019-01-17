<template>
  <div class="ImageInformation"> 
      <!-- ImageInformation -->
      <pictureArra :greditData="greditData" :cardTitle="'征信资料'"/>
    <div class="essential-other" v-if="userData.auditStatus === '0'">
      <verification :verificationData="verificationData"/>      
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
      verificationData: {}
    }
  },
  created() {
    this.verificationData = {
      businessId: this.userData.businessId,
      auditRecordId: this.userData.recordId,
      auditType: this.userData.auditType,
      auditNode: 5,//基本信息审核
      operatorId: this.userData.opId
    }
    // this.showAndHidde = {
    //   auditStatus: this.userData.auditStatus
    // }           
    getImageData(this.userData).then(response => {
      console.log(response.data.errCode)
      if (response.data.errCode === "200") {
        if (response.data.body.imgeData.contractImgs) {
             let contractImgs = JSON.parse(response.data.body.imgeData.contractImgs);  
             this.greditData = contractImgs      
        }
      }
    }).catch(error => {
      console.log(error)
    })
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
