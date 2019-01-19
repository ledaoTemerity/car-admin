<template>
  <div class="app-container">
    <!-- 顶部表单 -->
    <el-form ref="topForm" :inline="true" :model="topForm">
      <el-form-item label="车商名称" prop="dealerName">
        <el-input v-model="topForm.dealerName" placeholder="请输入车商名称"/>
      </el-form-item>
      <el-form-item label="签约状态" prop="status">
        <el-select v-model="topForm.status" placeholder="请选择签约状态">
          <el-option
            v-for="item in statusData"
            :key="item.id"
            :label="item.status"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="所属分公司" prop="carDealerOrgId">
        <el-select v-model="topForm.carDealerOrgId" placeholder="请选择所属分公司">
          <el-option v-for="item in orgData" :key="item.orgId" :label="item.fullName" :value="item.orgId"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="find">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="clear('topForm')">清除查询条件</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="dialogFormVisible = true">新增车商</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 90%">
      <el-table-column prop="dealerNo" label="车商编号"/>
      <el-table-column prop="dealerName" label="车商名称"/>
      <el-table-column prop="carDealerOrgName" label="所属分公司"/>
      <el-table-column prop="statusDesc" label="签约状态"/>
      <el-table-column :formatter="stateFilter" prop="state" label="状态"/>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="goPage(scope.row)">查看</el-button>
          <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        :current-page="currentpage"
        :page-size="pagesize"
        :total="totalItem"
        background
        layout="total, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 新增弹窗 -->
    <el-dialog :visible.sync="dialogFormVisible" title="新增车商" width="33%">
      <el-form ref="addForm" :model="addForm" :rules="rules" label-width="100px">
        <el-form-item label="车商名称" prop="dealerName">
          <el-input v-model="addForm.dealerName" autocomplete="off" placeholder="请输入车商名称"/>
        </el-form-item>
        <el-form-item label="所属分公司" prop="carDealerOrgId">
          <el-select v-model="addForm.carDealerOrgId" placeholder="请选择所属分公司">
            <el-option v-for="item in orgData" :key="item.orgId" :label="item.fullName" :value="item.orgId"/>
          </el-select>
        </el-form-item>
        <el-form-item label="签约状态" prop="status">
          <el-select v-model="addForm.status" placeholder="请选择签约状态">
            <el-option
              v-for="item in statusData"
              :key="item.id"
              :label="item.status"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="省份" prop="provinceId">
          <el-select v-model="addForm.provinceId" placeholder="请选择省份" @change="provinceChange">
            <el-option
              v-for="item in provinceData"
              :key="item.areaId"
              :label="item.areaName"
              :value="item.areaId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="cityId">
          <el-select v-model="addForm.cityId" placeholder="请选择城市" @change="cityChange">
            <el-option
              v-for="item in cityData"
              :key="item.areaId"
              :label="item.areaName"
              :value="item.areaId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="区 / 县" prop="districtId">
          <el-select v-model="addForm.districtId" placeholder="请选择区 / 县">
            <el-option
              v-for="item in districtData"
              :key="item.areaId"
              :label="item.areaName"
              :value="item.areaId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="addForm.address" autocomplete="off" placeholder="请输入详细地址"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCancel('addForm')">取 消</el-button>
        <el-button type="primary" @click="addSend">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑弹窗 -->
    <el-dialog :visible.sync="editFormVisible" title="新增车商" width="33%">
      <el-form ref="editForm" :model="editForm" :rules="rules" label-width="100px">
        <el-form-item label="车商名称" prop="dealerName">
          <el-input v-model="editForm.dealerName" autocomplete="off" disabled="true" placeholder="请输入车商名称"/>
        </el-form-item>
        <el-form-item label="所属分公司" prop="carDealerOrgId">
          <el-select v-model="editForm.carDealerOrgId" placeholder="请选择所属分公司">
            <el-option v-for="item in orgData" :key="item.orgId" :label="item.fullName" :value="item.orgId"/>
          </el-select>
        </el-form-item>
        <el-form-item label="签约状态" prop="status">
          <el-select v-model="editForm.status" placeholder="请选择签约状态">
            <el-option
              v-for="item in statusData"
              :key="item.id"
              :label="item.status"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="省份" prop="provinceId">
          <el-select v-model="editForm.provinceId" placeholder="请选择省份" @change="editprovinceChange">
            <el-option
              v-for="item in provinceData"
              :key="item.areaId"
              :label="item.areaName"
              :value="item.areaId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="cityId">
          <el-select v-model="editForm.cityId" placeholder="请选择城市" @change="editcityChange">
            <el-option
              v-for="item in cityData"
              :key="item.areaId"
              :label="item.areaName"
              :value="item.areaId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="区 / 县" prop="districtId">
          <el-select v-model="editForm.districtId" placeholder="请选择区 / 县">
            <el-option
              v-for="item in districtData"
              :key="item.areaId"
              :label="item.areaName"
              :value="item.areaId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="editForm.address" autocomplete="off" placeholder="请输入详细地址"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editCancel('editForm')">取 消</el-button>
        <el-button type="primary" @click="editSend()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import permission from '@/directive/permission/index.js' // 权限判断指令
// import checkPermission from '@/utils/permission' // 权限判断函数
// import SwitchRoles from './components/SwitchRoles'

import {
  carDealerList,
  orglist,
  province,
  city,
  district,
  add,
  del,
  edit
} from "@/api/carDealer";

export default {
  data() {
    return {
      statusData: [
        { id: 1, status: "待准入" },
        { id: 2, status: "已准入" },
        { id: 3, status: "已签约" },
        { id: 4, status: "已退网" },
        { id: 5, status: "已暂停" }
      ],
      orgData: [],
      provinceData: [],
      cityData: [],
      districtData: [],
      currentpage: 1,
      pagesize: 15,
      totalItem: 1,
      tableData: [],
      dialogFormVisible: false,
      editFormVisible: false,
      form: {},
      topForm: {
        dealerName: "",
        status: "",
        carDealerOrgId: ""
      },
      addForm: {
        dealerName: "",
        carDealerOrgId: "",
        status: "",
        provinceId: "",
        cityId: "",
        districtId: "",
        address: ""
      },
      rules: {
        dealerName: [
          { required: true, message: "请输入车商名称", trigger: "blur" }
        ],
        carDealerOrgId: [
          { required: true, message: "请选择所属分公司", trigger: "blur" }
        ],
        status: [
          { required: true, message: "请选择签约状态", trigger: "blur" }
        ],
        provinceId: [
          { required: true, message: "请选择省份", trigger: "blur" }
        ],
        cityId: [{ required: true, message: "请选择城市", trigger: "blur" }],
        // districtId: [
        //   { required: true, message: "请选择区 / 县", trigger: "blur" }
        // ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ]
      },
      editForm: {
        dealerName: "",
        carDealerOrgId: "",
        status: "",
        provinceId: "",
        cityId: "",
        districtId: "",
        address: ""
      },
      editRowData: [],
      provinceIdFlag:1,
      cityIdFlag:1,
    };
  },
  watch: {
    "addForm.provinceId": function(newValue, oldValue) {
      this.addForm.cityId = null;
    },
    "addForm.cityId": function(newValue, oldValue) {
      this.addForm.districtId = null;
    },
    "provinceIdFlag": function(newValue, oldValue) {
      this.editForm.cityId = null;
      this.editForm.districtId = null;
    },
    "cityIdFlag": function(newValue, oldValue) {
      this.editForm.districtId = null;
    },
  },
  created() {
    // 获取列表数据
    carDealerList(this.currentpage, this.pagesize)
      .then(res => {
        console.log(res.data.body.dataList[0])
        this.tableData = res.data.body.dataList;
        this.currentpage = res.data.body.currentpage;
        this.totalItem = res.data.body.totalItem;
      })
      .catch(error => {});
    // 获取所属公司
    orglist()
      .then(res => {
        this.orgData = res.data.body;
      })
      .catch(error => {});
    province()
      .then(res => {
        console.log(res);
        this.provinceData = res.data.body;
      })
      .catch(error => {});
  },
  methods: {
    stateFilter: function(val) {
      return val.state == "1" ? "正常" : val.state == "0" ? "弃用" : "未知";
    },
    // 清除查询条件
    clear(formName) {
      this.$refs[formName].resetFields();
    },
    // 查询
    find() {
      this.currentpage = 1;
      carDealerList(
        this.currentpage,
        this.pagesize,
        this.topForm.dealerName,
        this.topForm.status,
        this.topForm.carDealerOrgId
      )
        .then(res => {
          this.tableData = res.data.body.dataList;
          this.currentpage = res.data.body.currentpage;
          console.log(res);
          this.totalItem = res.data.body.totalItem;
        })
        .catch(error => {});
    },
    // 新增取消按钮
    addCancel(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    },
    // 编辑取消按钮
    editCancel(formName) {
      this.$refs[formName].resetFields();
      this.editFormVisible = false;
    },
    // 新增确定
    addSend() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          const dealerName = this.addForm.dealerName;
          const carDealerOrgId = this.addForm.carDealerOrgId;
          const status = this.addForm.status;
          const provinceId = this.addForm.provinceId;
          const cityId = this.addForm.cityId;
          const districtId = this.addForm.districtId;
          const address = this.addForm.address;
          let obj1 = {};
          let provinceName = "";
          obj1 = this.provinceData.find(item => {
            return item.areaId === this.addForm.provinceId; // 筛选出匹配数据
          });
          provinceName = obj1.areaName;
          let obj2 = {};
          let cityName = "";
          obj2 = this.cityData.find(item => {
            return item.areaId === this.addForm.cityId; // 筛选出匹配数据
          });
          cityName = obj2.areaName;
          let obj3 = {};
          let districtName = "";
          obj3 = this.districtData.find(item => {
            return item.areaId === this.addForm.districtId; // 筛选出匹配数据
          });
          districtName = obj3.areaName;
         
          add(
            dealerName,
            carDealerOrgId,
            status,
            provinceId,
            provinceName,
            cityId,
            cityName,
            districtId,
            districtName,
            address
          )
            .then(res => {
              console.log(res);
              if (res.data.errCode == "403") {
                this.$alert(`${res.data.errMsg}`, "错误提示", {
                  confirmButtonText: "确定"
                });
                return;
              }
              this.dialogFormVisible = false;
              this.$refs.addForm.resetFields();
              carDealerList(this.currentpage, this.pagesize)
                .then(res => {
                  this.tableData = res.data.body.dataList;
                  this.currentpage = res.data.body.currentpage;
                  this.totalItem = res.data.body.totalItem;
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
    // 删除
    del(row) {
      let id = String(row.id);
      this.$confirm("此操作将删除所选项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          del(id)
            .then(res => {
              carDealerList(this.currentpage, this.pagesize)
                .then(res => {
                  this.tableData = res.data.body.dataList;
                  this.currentpage = res.data.body.currentpage;
                  this.totalItem = res.data.body.totalItem;
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
    // 编辑按钮
    edit(row) {
      console.log(JSON.stringify(row));
      this.editRowData = row;
      this.editFormVisible = true;
      this.editForm.dealerName = row.dealerName;
      this.editForm.carDealerOrgId = row.carDealerOrgId;
      this.editForm.status = row.status;
      this.editForm.provinceId = row.provinceId;
      city(row.provinceId)
        .then(res => {
          this.cityData = res.data.body;
        })
        .catch(error => {});
      this.editForm.cityId = row.cityId;
      district(row.cityId)
        .then(res => {
          this.districtData = res.data.body;
        })
        .catch(error => {});
      this.editForm.districtId = row.districtId;
      this.editForm.address = row.address;
    },
    // 编辑确定
    editSend() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          const address = this.editForm.address;
          const carDealerOrgId = this.editForm.carDealerOrgId;
          const provinceId = this.editForm.provinceId;
          let obj1 = {};
          let provinceName = "";
          obj1 = this.provinceData.find(item => {
            return item.areaId === this.editForm.provinceId; // 筛选出匹配数据
          });
          provinceName = obj1.areaName;
          const cityId = this.editForm.cityId;
          let obj2 = {};
          let cityName = "";
          obj2 = this.cityData.find(item => {
            return item.areaId === this.editForm.cityId; // 筛选出匹配数据
          });
          cityName = obj2.areaName;
          const districtId = this.editForm.districtId;
          let obj3 = {};
          let districtName = "";
          obj3 = this.districtData.find(item => {
            return item.areaId === this.editForm.districtId; // 筛选出匹配数据
          });
          districtName = obj3.areaName;
          const dealerName = this.editForm.dealerName;
          const status = this.editForm.status;
          const id = this.editRowData.id;
          const dealerNo = this.editRowData.dealerNo;
          const state = this.editRowData.state;
          edit(
            address,
            carDealerOrgId,
            cityId,
            cityName,
            dealerName,
            dealerNo,
            districtId,
            districtName,
            id,
            provinceId,
            provinceName,
            state,
            status
          )
            .then(res => {
              this.editFormVisible = false;
              carDealerList(this.currentpage, this.pagesize)
                .then(res => {
                  this.tableData = res.data.body.dataList;
                  this.currentpage = res.data.body.currentpage;
                  this.totalItem = res.data.body.totalItem;
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
    // 省份select框onchange
    provinceChange(val) {
      city(val)
        .then(res => {
          console.log(res);
          this.cityData = res.data.body;
        })
        .catch(error => {});
    },
    // 城市select框onchange
    cityChange(val) {
      district(val)
        .then(res => {
          console.log(res);
          this.districtData = res.data.body;
        })
        .catch(error => {});
    },
    // 省份select框onchange
    editprovinceChange(val) {
      this.provinceIdFlag++;
      city(val)
        .then(res => {
          console.log(res);
          this.cityData = res.data.body;
        })
        .catch(error => {});
    },
    // 城市select框onchange
    editcityChange(val) {
      this.cityIdFlag++;
      district(val)
        .then(res => {
          console.log(res);
          this.districtData = res.data.body;
        })
        .catch(error => {});
    },
    // 分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      carDealerList(
        val,
        this.pagesize,
        this.topForm.dealerName,
        this.topForm.status,
        this.topForm.carDealerOrgId
      )
        .then(res => {
          this.tableData = res.data.body.dataList;
          this.currentpage = res.data.body.currentpage;
          this.totalItem = res.data.body.totalItem;
        })
        .catch(error => {});
    },
    goPage(prams) {
      this.$router.push({
        path: "CarDealerdetail",
        query: { userData: JSON.stringify(prams) }
      });
    }
  }
};
</script>

<style>
label {
  font-weight: 500 !important;
}
.el-select {
  display: block;
}
.block {
  text-align: center;
  margin-top: 20px;
}
</style>

