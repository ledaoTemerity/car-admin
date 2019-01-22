<template>
  <div class="essential">
    <div class="borrower">
      <p class="borrower-p">借款人信息</p>
      <div class="borrower-ul">
        <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">
              <label>客户名称：</label>
              <span>{{basicData.customerName}}</span>
            </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple-light">
               <label>证件号码：</label>
              <span>{{basicData.idNumber}}</span>               
                </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple">
              <label>手机号码：</label>
              <span>{{basicData.mobile}}</span>                
                </div></el-col>
        </el-row>
        <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">
              <label>出生日期：</label>
              <span>{{basicData.createTime}}</span>
            </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple-light">
               <label>年龄：</label>
              <span>{{basicData.age}}</span>               
                </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple">
              <label>性别：</label>
              <span>{{basicData.genderStr}}</span>                
                </div></el-col>
        </el-row>    
        <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">
              <label>婚姻状况：</label>
              <span>{{basicData.maritalStatusStr}}</span>
            </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple-light">
               <label>户籍：</label>
              <span>{{basicData.nativePlace}}</span>               
                </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple">
              <label>民族：</label>
              <span>{{basicData.nation}}</span>                
                </div></el-col>
        </el-row>
        <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">
              <label>最高学历：</label>
              <span>{{basicData.education_st}}</span>
            </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple-light">
               <label>居住地址：</label>
              <span>{{basicData.address}}</span>               
                </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple">
              <label>居住年限(满一年或者未满一年)：</label>
              <span>{{basicData.residenceTimeStr}}</span>                
                </div></el-col>
        </el-row>
        <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">
              <label>驾驶证类型：</label>
              <span>{{basicData.drivelicenseType}}</span>
            </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple-light">
               <label>驾龄：</label>
              <span>{{basicData.drivingAge + '年'}}</span>               
                </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple">
              <label>汽车价格：</label>
              <span>{{basicData.drivingAge}}</span>                
                </div></el-col>
        </el-row> 
        <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">
              <label>贷款金额：</label>
              <span>{{basicData.drivingAge}}</span>
            </div></el-col>
        </el-row>                                                           
      </div>  
    </div>
    <div class="borrower">
      <p class="borrower-p">紧急联系人</p>
      <div class="borrower-ul" v-if="contactList.length !== 0">
        <el-row v-for="(item , index ) in contactList" :key="index + item">
            <el-col :span="8"><div class="grid-content bg-purple">
              <label>客户名称：</label>
              <span>{{item.contactName}}</span>
            </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple-light">
               <label>证件号码：</label>
              <span>{{item.contactMobile}}</span>               
                </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple">
              <label>手机号码：</label>
              <span>{{item.contactRelationshipStr}}</span>                
                </div></el-col>
        </el-row>                                   
      </div>
      <div v-else class="no-data">
          暂无数据
        </div>  
    </div>
    <div class="essential-other">
      <verification :verificationData="verificationData"   @isShoworHidden="isShoworHidden" v-if="userData.isPage !== 'chedaichaxun' && userData.auditType === 0 && userData.auditStatus === '0' && auditResultData === undefined && !isShow"/>
      <div class="verification">
          <div class="verification-p">信息修改记录
            <div class="verification-add">
              <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
            </div>
          </div>
          <div class="news-report-ul"> 
            <el-table
                v-loading="loading"
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                prop="updateTime"
                label="修改日期">
                </el-table-column>
                <el-table-column
                prop="opName"
                label="修改人">
                </el-table-column>
                <el-table-column
                prop="fieldStr"
                label="修改字段名称">
                </el-table-column>
              <el-table-column
                prop="content"
                label="修改值">
                </el-table-column>                
            </el-table>                         
          </div>
       </div>           
    </div> 
    <el-dialog title="个人信息修改" :visible.sync="dialogFormVisible">
      <el-form ref="formRule" :model="form" :rules="rules">
        <el-form-item label="修改字段名称" :label-width="formLabelWidth" prop="field">
          <el-select v-model="form.field" placeholder="请选择字段名称">
            <el-option label="主借人个人月收入" value="1"></el-option>
            <el-option label="紧急联系人手机号" value="2"></el-option>
            <el-option label="工作单位名称" value="3"></el-option>
            <el-option label="工作单位地址" value="4"></el-option>                       
          </el-select>
        </el-form-item>
        <el-form-item label="修改字段值为" :label-width="formLabelWidth" prop="content">
          <el-input v-model="form.content" autocomplete="off"></el-input>
        </el-form-item>        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addList('formRule')">确 定</el-button>
      </div>
    </el-dialog>       
  </div>
</template>

<script>
import {getBasicdata ,getcmodify} from '@/api/myMission'
import verification from "../zujian/verification"
export default {
  name: 'LoanInf',
  components: { verification },
  props: {
    userData:{
      type: Object,
      required: true
    }
  },
  data(){
    return{
        // tabPosition: '1',
        auditResultData:{},
        basicData: {},
        contactList: [],
        isShow: false,
        form:{
          field:'',
          content: ''
          },
        tableData: [],
        loading: false  ,
        verificationData: {} ,
        dialogFormVisible: false ,
        formLabelWidth: '120px' ,
        rules: {
          field: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          content: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]                      
        }          
    }
  },
  created() {
    this.verificationData = {
      businessId: this.userData.businessId,
      auditRecordId: this.userData.recordId,
      auditType: this.userData.auditType,
      auditNode: 1//基本信息审核
    }
    this.getListData();

  },
  methods:{
    isShoworHidden(data){
      this.isShow = data;
    },
    addList(form){
        this.$refs[form].validate((valid) => {
          if (valid) { 
            console.log("--------",this.userData)
            this.dialogFormVisible = false
            getcmodify({
              businessId: this.userData.businessId,
              auditRecordId: this.userData.recordId,
              customerId: this.userData.customerId,
              auditType: this.userData.auditType,
              ...this.form
            }).then(response => {
              console.log("*********", response.data)
              if (response.data.errCode === '200') {
                this.getListData();
              }
            }).catch(error => {
              console.log(error)
            })
          }   
        })  
    },
    getListData(){
    this.loading = true;
    getBasicdata(this.userData).then(response => {
      this.loading = false;
      if (response.data.errCode === "200") {
          if (response.data.body.basicData !== undefined) {
            this.basicData = response.data.body.basicData;
          }
          if (response.data.body.contactList !== undefined) {
            this.contactList = response.data.body.contactList;
          }         
        this.tableData = response.data.body.cModifyList;
         this.auditResultData= response.data.body.auditResultData;        
      }
    }).catch(error => {
      console.log(error)
      this.loading = false;
    })
    }
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
        .verification {
            .verification-p {
              font-weight: bold;
              padding-left: 10px;
              overflow: hidden;
            }
            .verification-add {
              float: right;
            }
            .news-report-ul {
              margin-top: 10px;
            }           
        }        
    }
    .no-data {
      text-align: center;
      padding: 30px;
    }
  }
</style>
