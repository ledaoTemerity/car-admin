<template>
    <div class="verification">
        <p class="verification-p">信息核验</p>
        <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="意见结论" prop="auditNodeResult">
          <!-- {{form.auditNodeResult}} -->
            <el-radio-group v-model="form.auditNodeResult">
            <el-radio label="1">通过</el-radio>
            <el-radio label="2">驳回</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="内部意见">
            <el-input type="textarea" v-model="form.insideOpinion"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('form')">确定</el-button>
            <!-- <el-button>取消</el-button> -->
        </el-form-item>
        </el-form>              
        </div>
    </div>   
</template>

<script>
import {getAuditprocess} from "@/api/myMission"
export default {
  name: 'verification',
//   components: { errorA, errorB }
  props: {
    verificationData: {
      type: Object,
      required: true
    }
  },
  data(){
    return{
        form: {
          auditNodeResult: '',
          insideOpinion: ''          
        },
        rules: {
          auditNodeResult: [
            { required: true, message: '请选择内部结论', trigger: 'change' }
          ]            
        }
    }
  },
  methods: {
       submitForm(form) {
         console.log(this.form)
        this.$refs[form].validate((valid) => {
          if (valid) {
            // this.open()
            if (this.form.auditNodeResult === "2" && this.form.insideOpinion === '') {
                 this.open("如果是异常，内部意见必填")
                 return false;
            } 

            let news = {
              1:'基本信息审核',2:'贷款信息审核',3:'反欺诈评估',4:'征信信息',5:'影像管理'
            } 
            this.$confirm(news[this.verificationData.auditNode] + '模块，已检查完毕', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                getAuditprocess({
                  ...this.verificationData,
                  ...this.form
                }).then(response => {
                  console.log('verificationData',response)
                  if (response.data.errCode === "200") {
                    this.$emit("isShoworHidden",true);
                    this.$message({
                      type: 'success',
                      message: '审核成功!'
                    });
                  } else {
                      this.open(response.data.errMsg)
                  }
                }).catch(error => {
                  this.open(error)
                })              
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消审核'
              });          
            });        
          } else {
            this.open("请选择意见结论")
            return false;
          }
        });
      }, 
      open(msg) {
        this.$message({
          message: msg,
          type: 'warning'
        });
      }          
  }
}
</script>

<style <style lang="scss" scoped>
.verification {
    .verification-p {
        font-weight: bold;
        padding-left: 10px;
    }
}   
</style>
