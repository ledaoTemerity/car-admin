<template>
  <div class="antiFraud"> 
    <div class="processInf-ul">
      <div class="processInf-title">审批记录</div>
      <div class="processInf-table">
        <!-- <div class="processInf-hedaer">
          <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">指标名称</div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple-light">判断维度</div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple">输出字段</div></el-col>
          </el-row>          
        </div> -->
        <div class="ul-approvalRecord">
            <!-- <el-row>
            <el-col :span="5"> -->
            <!-- <div class="ul-approvalRecord-li">
                fffffffff
            </div>
            <div class="ul-approvalRecord-li">2</div>       
            <div class="ul-approvalRecord-li">
            <p class="bg-purple-p">主借基本信息</p>
            <p class="bg-purple-p">贷款信息</p>
            <p class="bg-purple-p">反欺诈评估</p>
            <p>征信信息</p>
            </div> -->
        <table border="1" cellspacing="0" width="100%" height="550">
                    <!-- <caption>纵向合并单元格</caption> -->
                    <tr><th>班级</t> <th>姓名</th><th>年龄</th> <th>电话</th> </tr>
                    <tr height="50"><td rowspan="2">601班</td> <td>Jack</td> <td>24</td> <td>1351234567</td>  </tr>
                    <tr height="50"> <td>Tom</td> <td>22</td> <td>1351234567</td>  </tr>
        <!--rowspan中必须指定要合并的列数目，是两行还是三行等等-->    
                    <tr><td  rowspan="3">602班</td> <td>Rose</td> <td>22</td> <td>1351234567</td>  </tr>
                    <tr> <td>张三</td> <td>25</td> <td>1351234567</td>  </tr>
                    <tr> <td>李四</td> <td>25</td> <td>1351234567</td>  </tr>
                </table>
           
            </div>                
      </div>
    </div>
  </div>
</template>

<script>
import {getFrauDassessMentData} from '@/api/myMission'
export default {
  name: 'antiFraud',
//   components: { errorA, errorB }
  props: {
    userData: {
        type: Object,
        required: true
    }   
  },
  data(){
    return{
    }
  },
  created() {
      console.log("================", this.userData)
      getFrauDassessMentData(this.userData).then(response =>{
          console.log("~~~~~~~", response.data)
      }).catch(error => {
          console.log(error)
      })
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
}
</style>
