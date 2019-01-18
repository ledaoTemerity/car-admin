<template>
  <div class="app-container">
    <h3 class="titleName">车商信息</h3>

    <!-- 基本信息 -->
    <el-card class="box-card" style="width:100%;margin:0 auto">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <div>
        <p class="txt">
          <span>车商名称：{{ topCard.dealerName }}</span>
          <span>所属机构：{{ topCard.carDealerOrgName }}</span>
        </p>
        <p class="txt">
          <span>车商地址：{{ topCard.fullAddress }}</span>
          <span>签约状态：{{ topCard.statusDesc }}</span>
        </p>
      </div>
    </el-card>

    <!-- 金融产品 -->
    <el-card class="box-card" style="width:100%;margin:20px auto">
      <div slot="header" class="clearfix">
        <span>金融产品</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="addfinancial">新增</el-button>
      </div>
      <div>
        <el-table :data="financialData" border style="width: 100%">
          <el-table-column prop="styleName" label="车型" width="220"/>
          <el-table-column prop="purposeDesc" label="购车用途"/>
          <el-table-column prop="guidePrice" label="指导价" width="60"/>
          <el-table-column prop="ticketPrice" label="开票价"  width="60"/>
          <el-table-column prop="purchasePrice" label="采购价" width="60"/>
          <el-table-column prop="downPaymentRatio" label="首付比例(%)"/>
          <el-table-column prop="downPayment" label="首付金额"/>
          <el-table-column prop="balancePayment" label="尾款" width="60"/>
          <el-table-column prop="deposit" label="保证金"/>
          <el-table-column prop="numberOfStages" label="期数" width="60"/>
          <el-table-column prop="monthlyPayment" label="月供"/>
          <el-table-column prop="totalPayment" label="付款总额"/>
          <el-table-column prop="totalLoan" label="贷款总额"/>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="financialEdit(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="financialDel(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <!-- <div class="block">
        <el-pagination
          :current-page="financialcurrentPage"
          :page-size="financialpageSize"
          :total="financialtotal"
          background
          layout="total, prev, pager, next, jumper"
          @current-change="financialCurChange"
        />
      </div>-->
    </el-card>

    <!-- 新增金融产品弹窗 -->
    <el-dialog :visible.sync="addfinancialVisible" title="新增金融产品" width="33%">
      <el-form
        ref="addfinancialForm"
        :model="addfinancialForm"
        :rules="financialrules"
        label-width="120px"
      >
        <el-form-item label="购车用途" prop="purpose">
          <el-select v-model="addfinancialForm.purpose" placeholder="请选择品牌">
            <el-option
              v-for="item in purposeData"
              :key="item.id"
              :label="item.purpose"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="车型" prop="styleId">
          <el-select v-model="addfinancialForm.styleId" placeholder="请选择品牌">
            <el-option
              v-for="item in styleData"
              :key="item.id"
              :label="item.styleName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="指导价" prop="guidePrice">
          <el-input v-model="addfinancialForm.guidePrice" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="开票价" prop="ticketPrice">
          <el-input v-model="addfinancialForm.ticketPrice" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="采购价" prop="purchasePrice">
          <el-input v-model="addfinancialForm.purchasePrice" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="首付比例" prop="downPaymentRatio">
          <el-select v-model="addfinancialForm.downPaymentRatio" placeholder="请选择品牌">
            <el-option v-for="item in PaymentRatioData" :key="item.val" :label="item.des" :value="item.val"/>
          </el-select>
        </el-form-item>
        <el-form-item label="首付金额" prop="downPayment">
          <el-input v-model="addfinancialForm.downPayment" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="尾款" prop="balancePayment">
          <el-input v-model="addfinancialForm.balancePayment" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="保证金" prop="deposit">
          <el-input v-model="addfinancialForm.deposit" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="期数" prop="numberOfStages">
          <el-select v-model="addfinancialForm.numberOfStages" placeholder="请选择品牌">
            <el-option v-for="item in numberOfStagesData" :key="item" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item label="月供" prop="monthlyPayment">
          <el-input v-model="addfinancialForm.monthlyPayment" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="付款总额" prop="totalPayment">
          <el-input v-model="addfinancialForm.totalPayment" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="贷款总额" prop="totalLoan">
          <el-input v-model="addfinancialForm.totalLoan" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addfinancialCancel">取 消</el-button>
        <el-button type="primary" @click="addfinancialSend">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑金融产品弹窗 -->
    <el-dialog :visible.sync="editfinancialVisible" title="编辑金融产品" width="33%">
      <el-form
        ref="editfinancialForm"
        :model="editfinancialForm"
        :rules="financialrules"
        label-width="120px"
      >
        <el-form-item label="购车用途" prop="purpose">
          <el-select v-model="editfinancialForm.purpose" placeholder="请选择品牌">
            <el-option
              v-for="item in purposeData"
              :key="item.id"
              :label="item.purpose"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="车型" prop="styleId">
          <el-select v-model="editfinancialForm.styleId" placeholder="请选择品牌">
            <el-option
              v-for="item in styleData"
              :key="item.id"
              :label="item.styleName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="指导价" prop="guidePrice">
          <el-input v-model="editfinancialForm.guidePrice" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="开票价" prop="ticketPrice">
          <el-input v-model="editfinancialForm.ticketPrice" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="采购价" prop="purchasePrice">
          <el-input v-model="editfinancialForm.purchasePrice" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="首付比例" prop="downPaymentRatio">
          <el-select v-model="editfinancialForm.downPaymentRatio" placeholder="请选择品牌">
            <el-option v-for="item in PaymentRatioData" :key="item.val" :label="item.des" :value="item.val"/>
          </el-select>
        </el-form-item>
        <el-form-item label="首付金额" prop="downPayment">
          <el-input v-model="editfinancialForm.downPayment" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="尾款" prop="balancePayment">
          <el-input v-model="editfinancialForm.balancePayment" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="保证金" prop="deposit">
          <el-input v-model="editfinancialForm.deposit" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="期数" prop="numberOfStages">
          <el-select v-model="editfinancialForm.numberOfStages" placeholder="请选择品牌">
            <el-option v-for="item in numberOfStagesData" :key="item" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item label="月供" prop="monthlyPayment">
          <el-input v-model="editfinancialForm.monthlyPayment" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="付款总额" prop="totalPayment">
          <el-input v-model="editfinancialForm.totalPayment" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="贷款总额" prop="totalLoan">
          <el-input v-model="editfinancialForm.totalLoan" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editfinancialCancel">取 消</el-button>
        <el-button type="primary" @click="editfinancialSend">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 车辆上牌机构 -->
    <el-card class="box-card" style="width:100%;margin:20px auto">
      <div slot="header" class="clearfix">
        <span>车辆上牌机构</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="addlicense">新增</el-button>
      </div>
      <div>
        <el-table :data="licenseData" border style="width: 100%">
          <el-table-column prop="id" label="标号" width="220"/>
          <el-table-column prop="company" label="车辆挂靠单位"/>
          <el-table-column prop="state" label="状态" :formatter="stateFilter"/>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="licensedelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <!-- 新增上牌机构弹窗 -->
    <el-dialog :visible.sync="addlicenseVisible" title="新增车辆上牌机构" width="33%">
      <el-form
        ref="addlicenseForm"
        :model="addlicenseForm"
        :rules="licenserules"
        label-width="120px"
      >
        <el-form-item label="车辆挂靠单位" prop="licenseOrgId">
          <el-select v-model="addlicenseForm.licenseOrgId" placeholder="请选择车辆挂靠单位">
            <el-option
              v-for="item in orglicenseData"
              :key="item.id"
              :label="item.company"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addlicenseCancel">取 消</el-button>
        <el-button type="primary" @click="addlicenseSend">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import permission from '@/directive/permission/index.js' // 权限判断指令
// import checkPermission from '@/utils/permission' // 权限判断函数
// import SwitchRoles from './components/SwitchRoles'
import {
  getDetail,
  // financialPro,
  getStyle,
  addfinancial,
  delfinancial,
  editfinancial,
  // license,
  licensedel,
  addlicense,
  orglicense
} from "@/api/detail";

export default {
  data() {
    return {
      dealerId: "",
      id: "",
      topCard: {
        dealerName: "",
        carDealerOrgName: "",
        fullAddress: "",
        statusDesc: ""
      },
      financialData: [],
      licenseData: [],
      styleData: [],
      orglicenseData: [],
      financialcurrentPage: 1,
      financialpageSize: 2,
      financialtotal: 0,
      addfinancialVisible: false,
      editfinancialVisible: false,
      addlicenseVisible: false,
      purposeData: [
        { id: 1, purpose: "网约车" },
        { id: 2, purpose: "家庭乘用" },
        { id: 3, purpose: "办公乘用" }
      ],
      PaymentRatioData: [{"des":"5%","val":5}, {"des":"6%","val":6},{"des":"7%","val":7},{"des":"8%","val":8},],
      numberOfStagesData: [12, 24, 36, 48],
      addfinancialForm: {
        purpose: "",
        styleId: "",
        guidePrice: "",
        ticketPrice: "",
        purchasePrice: "",
        downPaymentRatio: "",
        downPayment: "",
        balancePayment: "",
        deposit: "",
        numberOfStages: "",
        monthlyPayment: "",
        totalPayment: "",
        totalLoan: ""
      },
      editfinancialForm: {
        purpose: "",
        styleId: "",
        guidePrice: "",
        ticketPrice: "",
        purchasePrice: "",
        downPaymentRatio: "",
        downPayment: "",
        balancePayment: "",
        deposit: "",
        numberOfStages: "",
        monthlyPayment: "",
        totalPayment: "",
        totalLoan: ""
      },
      financialrules: {
        purpose: [
          { required: true, message: "请选择购车用途", trigger: "blur" }
        ],
        styleId: [{ required: true, message: "请选择车型", trigger: "blur" }],
        guidePrice: [
          { required: true, message: "请输入指导价", trigger: "blur" }
        ],
        ticketPrice: [
          { required: true, message: "请输入开票价", trigger: "blur" }
        ],
        purchasePrice: [
          { required: true, message: "请输入采购价", trigger: "blur" }
        ],
        downPaymentRatio: [
          { required: true, message: "请选择首付比例", trigger: "blur" }
        ],
        downPayment: [
          { required: true, message: "请输入首付金额", trigger: "blur" }
        ],
        balancePayment: [
          { required: true, message: "请输入尾款", trigger: "blur" }
        ],
        deposit: [{ required: true, message: "请输入保证金", trigger: "blur" }],
        numberOfStages: [
          { required: true, message: "请选择期数", trigger: "blur" }
        ],
        monthlyPayment: [
          { required: true, message: "请输入月供", trigger: "blur" }
        ],
        totalPayment: [
          { required: true, message: "请输入付款总额", trigger: "blur" }
        ],
        totalLoan: [
          { required: true, message: "请输入贷款总额", trigger: "blur" }
        ]
      },
      addlicenseForm: {
        licenseOrgId: ""
      },
      licenserules: {
        licenseOrgId: [
          { required: true, message: "请选择车辆挂靠单位", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    const routeData = JSON.parse(this.$route.query.userData);
    // 新增接口需要车商ID
    this.dealerId = routeData.id;
    getDetail(routeData.id)
      .then(res => {
        console.log(res);
        this.topCard.dealerName = res.data.body.carDealer.dealerName;
        this.topCard.carDealerOrgName =
          res.data.body.carDealer.carDealerOrgName;
        this.topCard.fullAddress = res.data.body.carDealer.fullAddress;
        this.topCard.statusDesc = res.data.body.carDealer.statusDesc;
        this.financialData = res.data.body.financialProductList;
        this.licenseData = res.data.body.licenseOrgList;
      })
      .catch(error => {});
    getStyle(1, 1000)
      .then(res => {
        this.styleData = res.data.body.dataList;
      })
      .catch(error => {});
    orglicense(1, 100)
      .then(res => {
        console.log(res);
        this.orglicenseData = res.data.body.dataList;
      })
      .catch(error => {});
  },
  methods: {
    stateFilter: function(val) {
      return val.state == "1" ? "启用" : val.state == "0" ? "停用" : "未知";
    },
    financialEdit(row) {
      this.id = row.id;
      this.editfinancialVisible = true;
      this.editfinancialForm.purpose = row.purpose;
      this.editfinancialForm.styleId = row.styleId;
      this.editfinancialForm.guidePrice = row.guidePrice;
      this.editfinancialForm.ticketPrice = row.ticketPrice;
      this.editfinancialForm.purchasePrice = row.purchasePrice;
      this.editfinancialForm.downPaymentRatio = `${row.downPaymentRatio}%`;
      this.editfinancialForm.downPayment = row.downPayment;
      this.editfinancialForm.balancePayment = row.balancePayment;
      this.editfinancialForm.deposit = row.deposit;
      this.editfinancialForm.numberOfStages = row.numberOfStages;
      this.editfinancialForm.monthlyPayment = row.monthlyPayment;
      this.editfinancialForm.totalPayment = row.totalPayment;
      this.editfinancialForm.totalLoan = row.totalLoan;
    },
    financialDel(row) {
      this.$confirm("此操作将删除所选项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delfinancial(row.id)
            .then(res => {
              getDetail(this.dealerId)
                .then(res => {
                  this.financialData = res.data.body.financialProductList;
                })
                .catch(error => {});
            })
            .catch(error => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 新增金融产品按钮
    addfinancial() {
      this.addfinancialVisible = true;
      this.$refs.addfinancialForm.resetFields();
    },
    addlicense() {
      this.addlicenseVisible = true;
      this.$refs.addlicenseForm.resetFields();
    },
    // 新增金融产品弹窗取消按钮
    addfinancialCancel() {
      this.$refs.addfinancialForm.resetFields();
      this.addfinancialVisible = false;
    },
    addlicenseCancel() {
      this.$refs.addlicenseForm.resetFields();
      this.addlicenseVisible = false;
    },
    // 新增金融产品弹窗确定
    addfinancialSend() {
      this.$refs.addfinancialForm.validate(valid => {
        if (valid) {
          let dealerId = this.dealerId;
          let styleId = this.addfinancialForm.styleId;
          let purpose = this.addfinancialForm.purpose;
          let guidePrice = Number(this.addfinancialForm.guidePrice);
          guidePrice = guidePrice.toFixed(2);
          let ticketPrice = Number(this.addfinancialForm.ticketPrice);
          ticketPrice = ticketPrice.toFixed(2);
          let purchasePrice = Number(this.addfinancialForm.purchasePrice);
          purchasePrice = purchasePrice.toFixed(2);
          let downPaymentRatio = Number(
            this.addfinancialForm.downPaymentRatio
          );
          let downPayment = Number(this.addfinancialForm.downPayment);
          let balancePayment = Number(this.addfinancialForm.balancePayment);
          let deposit = Number(this.addfinancialForm.deposit);
          let numberOfStages = this.addfinancialForm.numberOfStages;
          let monthlyPayment = Number(this.addfinancialForm.monthlyPayment);
          let totalPayment = Number(this.addfinancialForm.totalPayment);
          let totalLoan = Number(this.addfinancialForm.totalLoan);
          addfinancial(
            dealerId,
            styleId,
            purpose,
            guidePrice,
            ticketPrice,
            purchasePrice,
            downPaymentRatio,
            downPayment,
            balancePayment,
            deposit,
            numberOfStages,
            monthlyPayment,
            totalPayment,
            totalLoan
          )
            .then(res => {
              this.addfinancialVisible = false;
              getDetail(this.dealerId)
                .then(res => {
                  this.financialData = res.data.body.financialProductList;
                })
                .catch(error => {});
            })
            .catch(error => {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addlicenseSend() {
      this.$refs.addlicenseForm.validate(valid => {
        if (valid) {
          const dealerId = this.dealerId;
          const licenseOrgId = this.addlicenseForm.licenseOrgId;
          addlicense(dealerId, licenseOrgId)
            .then(res => {
              getDetail(this.dealerId)
                .then(res => {
                  this.addlicenseVisible = false;
                  this.licenseData = res.data.body.licenseOrgList;
                })
                .catch(error => {});
            })
            .catch(error => {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 编辑弹窗取消按钮
    editfinancialCancel() {
      this.editfinancialVisible = false;
    },
    // 编辑弹窗确定按钮
    editfinancialSend() {
      this.$refs.editfinancialForm.validate(valid => {
        if (valid) {
          let id = this.id;
          let dealerId = this.dealerId;
          let styleId = this.editfinancialForm.styleId;
          let purpose = this.editfinancialForm.purpose;
          let guidePrice = Number(this.editfinancialForm.guidePrice);
          guidePrice = guidePrice.toFixed(2);
          let ticketPrice = Number(this.editfinancialForm.ticketPrice);
          ticketPrice = ticketPrice.toFixed(2);
          let purchasePrice = Number(this.editfinancialForm.purchasePrice);
          purchasePrice = purchasePrice.toFixed(2);
          let downPaymentRatio = Number(
            this.editfinancialForm.downPaymentRatio
          );
          let downPayment = Number(this.editfinancialForm.downPayment);
          let balancePayment = Number(this.editfinancialForm.balancePayment);
          let deposit = Number(this.editfinancialForm.deposit);
          let numberOfStages = this.editfinancialForm.numberOfStages;
          let monthlyPayment = Number(this.editfinancialForm.monthlyPayment);
          let totalPayment = Number(this.editfinancialForm.totalPayment);
          let totalLoan = Number(this.editfinancialForm.totalLoan);
          editfinancial(
            id,
            dealerId,
            styleId,
            purpose,
            guidePrice,
            ticketPrice,
            purchasePrice,
            downPaymentRatio,
            downPayment,
            balancePayment,
            deposit,
            numberOfStages,
            monthlyPayment,
            totalPayment,
            totalLoan
          )
            .then(res => {
              console.log(res);
              this.editfinancialVisible = false;
              getDetail(this.dealerId)
                .then(res => {
                  this.financialData = res.data.body.financialProductList;
                })
                .catch(error => {});
            })
            .catch(error => {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // //删除车商的一个上牌机构
    licensedelete(row) {
      this.$confirm("此操作将删除所选项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          licensedel(row.id)
            .then(res => {
              getDetail(this.dealerId)
                .then(res => {
                  this.addlicenseVisible = false;
                  this.licenseData = res.data.body.licenseOrgList;
                })
                .catch(error => {});
            })
            .catch(error => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style>
.el-select {
  display: block;
}
.titleName {
  text-align: center;
  color: #909399;
}
.txt span {
  display: inline-block;
  width: 500px;
  color: #606266;
}
.block {
  text-align: center;
  margin-top: 20px;
}
</style>

