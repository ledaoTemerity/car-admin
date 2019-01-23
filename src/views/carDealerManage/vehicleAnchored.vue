<template>
  <div class="app-container">
    <!-- 顶部表单 -->
    <el-form ref="topForm" :inline="true" :model="topForm">
      <el-form-item label="挂靠单位名称" prop="company">
        <el-input v-model="topForm.company" placeholder="挂靠单位名称"/>
      </el-form-item>
      <el-form-item label="省份" prop="provinceId">
        <el-select
          v-model="topForm.provinceId"
          placeholder="请选择省份"
          @change="provinceChange(topForm.provinceId)"
        >
          <el-option
            v-for="item in provinceData"
            :key="item.areaId"
            :label="item.areaName"
            :value="item.areaId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="城市" prop="cityId">
        <el-select v-model="topForm.cityId" placeholder="请选择城市">
          <el-option
            v-for="item in cityData"
            :key="item.areaId"
            :label="item.areaName"
            :value="item.areaId"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="find">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="clear">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="add">添加</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 90%">
      <el-table-column prop="id" label="编号"/>
      <el-table-column prop="company" label="挂靠单位名称"/>
      <el-table-column :formatter="stateFilter" prop="state" label="状态"/>
      <el-table-column prop="address" label="地址"/>
      <el-table-column prop="contacts" label="联系人"/>
      <el-table-column prop="telephone" label="联系电话"/>
      <el-table-column prop="state" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handelstate(scope.row)"
          >{{scope.row.state===0 ? '启用' : '停用'}}</el-button>
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :total="totalItem"
        background
        layout="total, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 新增弹窗 -->
    <el-dialog :visible.sync="addFormVisible" title="新增" width="33%">
      <el-form ref="addForm" :model="addForm" :rules="rules" label-width="120px">
        <el-form-item label="挂靠单位名称" prop="company">
          <el-input v-model="addForm.company" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="联系人" prop="contacts">
          <el-input v-model="addForm.contacts" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="联系电话" prop="telephone">
          <el-input v-model="addForm.telephone" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="省份" prop="provinceId">
          <el-select
            v-model="addForm.provinceId"
            placeholder="请选择省份"
            @change="provinceChange(addForm.provinceId)"
          >
            <el-option
              v-for="item in provinceData"
              :key="item.areaId"
              :label="item.areaName"
              :value="item.areaId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="cityId">
          <el-select
            v-model="addForm.cityId"
            placeholder="请选择城市"
            @change="cityChange(addForm.cityId)"
          >
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
          <el-input v-model="addForm.address" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="是否启用" prop="state">
          <el-select v-model="addForm.state" placeholder="请选择是否启用">
            <el-option
              v-for="item in stateData"
              :key="item.id"
              :label="item.statedes"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCancel">取 消</el-button>
        <el-button type="primary" @click="addSend">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹窗 -->
    <el-dialog :visible.sync="editFormVisible" title="编辑" width="33%">
      <el-form ref="editForm" :model="editForm" :rules="editrules" label-width="120px">
        <el-form-item label="挂靠单位名称" prop="company">
          <el-input v-model="editForm.company" disabled autocomplete="off"/>
        </el-form-item>
        <el-form-item label="联系人" prop="contacts">
          <el-input v-model="editForm.contacts" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="联系电话" prop="telephone">
          <el-input v-model="editForm.telephone" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="省份" prop="provinceId">
          <el-select
            v-model="editForm.provinceId"
            placeholder="请选择省份"
            @change="editprovinceChange(editForm.provinceId)"
          >
            <el-option
              v-for="item in provinceData"
              :key="item.areaId"
              :label="item.areaName"
              :value="item.areaId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="cityId">
          <el-select
            v-model="editForm.cityId"
            placeholder="若未选择则为原始值"
            @change="editcityChange(editForm.cityId)"
          >
            <el-option
              v-for="item in cityData"
              :key="item.areaId"
              :label="item.areaName"
              :value="item.areaId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="区 / 县" prop="districtId">
          <el-select v-model="editForm.districtId" placeholder="若未选择则为原始值">
            <el-option
              v-for="item in districtData"
              :key="item.areaId"
              :label="item.areaName"
              :value="item.areaId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="editForm.address" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="是否启用" prop="state">
          <el-select v-model="editForm.state" placeholder="请选择是否启用">
            <el-option
              v-for="item in stateData"
              :key="item.id"
              :label="item.statedes"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editCancel">取 消</el-button>
        <el-button type="primary" @click="editSend">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import permission from '@/directive/permission/index.js' // 权限判断指令
// import checkPermission from '@/utils/permission' // 权限判断函数
// import SwitchRoles from './components/SwitchRoles'

import {
  province,
  city,
  district,
  licenseList,
  licensestate,
  add,
  edit
} from "@/api/vehicleAnchored";

export default {
  data() {
    return {
      addFormVisible: false,
      editFormVisible: false,
      tableData: [],
      currentPage: 1,
      pageSize: 15,
      totalItem: 0,
      provinceData: [],
      cityData: [],
      districtData: [],
      stateData: [{ id: 1, statedes: "启用" }, { id: 0, statedes: "停用" }],
      topForm: {
        company: "",
        provinceId: "",
        cityId: ""
      },
      addForm: {
        company: "",
        contacts: "",
        telephone: "",
        provinceId: "",
        cityId: "",
        districtId: "",
        address: "",
        state: 1
      },
      rules: {
        company: [
          { required: true, message: "请选输入靠单位名称", trigger: "blur" }
        ]
        // contacts: [
        //   { required: true, message: '请输入联系人', trigger: 'blur' }
        // ],
        // telephone: [
        //   { required: true, message: '请输入联系电话', trigger: 'blur' }
        // ],
        // provinceId: [
        //   { required: true, message: '请选择省份', trigger: 'blur' }
        // ],
        // cityId: [{ required: true, message: '请选择城市', trigger: 'blur' }],
        // districtId: [
        //   { required: true, message: '请选择区 / 县', trigger: 'blur' }
        // ],
        // address: [
        //   { required: true, message: '请输入详细地址', trigger: 'blur' }
        // ],
        // state: [{ required: true, message: '请选择是否启用', trigger: 'blur' }]
      },
      editrules: {
        company: [
          { required: true, message: "请选输入靠单位名称", trigger: "blur" }
        ]
        // contacts: [
        //   { required: true, message: '请输入联系人', trigger: 'blur' }
        // ],
        // telephone: [
        //   { required: true, message: '请输入联系电话', trigger: 'blur' }
        // ],
        // provinceId: [
        //   { required: true, message: '请选择省份', trigger: 'blur' }
        // ],
        // cityId: [{ required: true, message: '请选择城市', trigger: 'blur' }],
        // address: [
        //   { required: true, message: '请输入详细地址', trigger: 'blur' }
        // ],
        // state: [{ required: true, message: '请选择是否启用', trigger: 'blur' }]
      },
      editId: 0,
      editForm: {
        company: "",
        contacts: "",
        telephone: "",
        provinceId: "",
        cityId: "",
        districtId: "",
        address: "",
        state: 1
      },
      provinceIdFlag: 1,
      cityIdFlag: 1
    };
  },
  watch: {
    "topForm.provinceId": function(newValue, oldValue) {
      this.topForm.cityId = null;
    },
    "addForm.provinceId": function(newValue, oldValue) {
      this.addForm.cityId = null;
    },
    "addForm.cityId": function(newValue, oldValue) {
      this.addForm.districtId = null;
    },
    provinceIdFlag: function(newValue, oldValue) {
      this.editForm.cityId = null;
      this.editForm.districtId = null;
    },
    cityIdFlag: function(newValue, oldValue) {
      this.editForm.districtId = null;
    }
  },
  created() {
    province()
      .then(res => {
        this.provinceData = res.data.body;
      })
      .catch(error => {});
    licenseList(this.currentPage, this.pageSize)
      .then(res => {
        console.log(res);
        this.tableData = res.data.body.dataList;
        this.currentPage = res.data.body.currentpage;
        this.totalItem = res.data.body.totalItem;
      })
      .catch(error => {});
  },
  methods: {
    stateFilter: function(val) {
      return val.state == 1 ? "启用" : val.state == 0 ? "停用" : "未知";
    },
    // 清除查询条件
    clear() {
      this.$refs.topForm.resetFields();
      const company = this.topForm.company;
      const provinceId = this.topForm.provinceId;
      const cityId = this.topForm.cityId;
      licenseList(this.currentPage, this.pageSize, company, provinceId, cityId)
        .then(res => {
          console.log(res);
          this.tableData = res.data.body.dataList;
          this.currentPage = res.data.body.currentpage;
          this.totalItem = res.data.body.totalItem;
        })
        .catch(error => {});
    },
    // 省份onChange事件
    provinceChange(provinceId) {
      city(provinceId)
        .then(res => {
          this.cityData = res.data.body;
        })
        .catch(error => {});
    },
    // 城市onChange事件
    cityChange(cityId) {
      district(cityId)
        .then(res => {
          this.districtData = res.data.body;
        })
        .catch(error => {});
    },
    // 省份onChange事件
    editprovinceChange(provinceId) {
      this.provinceIdFlag++;
      city(provinceId)
        .then(res => {
          this.cityData = res.data.body;
        })
        .catch(error => {});
    },
    // 城市onChange事件
    editcityChange(cityId) {
      this.cityIdFlag++;
      district(cityId)
        .then(res => {
          this.districtData = res.data.body;
        })
        .catch(error => {});
    },
    // 查询
    find() {
      const company = this.topForm.company;
      const provinceId = this.topForm.provinceId;
      const cityId = this.topForm.cityId;
      licenseList(this.currentPage, this.pageSize, company, provinceId, cityId)
        .then(res => {
          console.log(res);
          this.tableData = res.data.body.dataList;
          this.currentPage = res.data.body.currentpage;
          this.totalItem = res.data.body.totalItem;
        })
        .catch(error => {});
    },
    add() {
      this.addFormVisible = true;
    },
    // 新增取消
    addCancel() {
      this.$refs.addForm.resetFields();
      this.addFormVisible = false;
    },
    // 编辑取消
    editCancel() {
      this.editFormVisible = false;
    },
    // 新增确定
    addSend() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          const company = this.addForm.company;
          const contacts = this.addForm.contacts;
          const telephone = this.addForm.telephone;
          const provinceId = this.addForm.provinceId;
          let provinceName = "";
          if (provinceId !== null && provinceId !== "") {
            let obj1 = {};

            obj1 = this.provinceData.find(item => {
              return item.areaId === this.addForm.provinceId; // 筛选出匹配数据
            });
            provinceName = obj1.areaName;
          }

          const cityId = this.addForm.cityId;
          let cityName = "";
          if (cityId !== null && cityId !== "") {
            let obj2 = {};

            obj2 = this.cityData.find(item => {
              return item.areaId === this.addForm.cityId; // 筛选出匹配数据
            });
            cityName = obj2.areaName;
          }

          const districtId = this.addForm.districtId;
          let districtName = "";
          if (districtId !== null && districtId !== "") {
            let obj3 = {};

            obj3 = this.districtData.find(item => {
              return item.areaId === this.addForm.districtId; // 筛选出匹配数据
            });
            districtName = obj3.areaName;
          }

          const address = this.addForm.address;
          const state = this.addForm.state;
          add(
            company,
            contacts,
            telephone,
            provinceId,
            cityId,
            districtId,
            provinceName,
            cityName,
            districtName,
            address,
            state
          )
            .then(res => {
              if (res.data.errCode == "403") {
                this.$alert(`${res.data.errMsg}`, "错误提示", {
                  confirmButtonText: "确定"
                });
                return;
              }
              this.addFormVisible = false;
              this.$refs.addForm.resetFields();
              licenseList(this.currentPage, this.pageSize)
                .then(res => {
                  console.log(res);
                  this.tableData = res.data.body.dataList;
                  this.currentPage = res.data.body.currentpage;
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
    // 编辑按钮
    handleEdit(row) {
      this.editId = row.id;
      this.editFormVisible = true;
      this.editForm.company = row.company;
      this.editForm.contacts = row.contacts;
      this.editForm.telephone = row.telephone;
      this.editForm.provinceId = row.provinceId;
      this.editForm.cityId = row.cityId;
      this.editForm.districtId = row.districtId;
      this.editForm.address = row.address;
      this.editForm.state = row.state;
      city(row.provinceId)
        .then(res => {
          this.cityData = res.data.body;
        })
        .catch(error => {});

      district(row.cityId)
        .then(res => {
          this.districtData = res.data.body;
        })
        .catch(error => {});
    },
    // 编辑确定
    editSend() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          const company = this.editForm.company;
          const contacts = this.editForm.contacts;
          const telephone = this.editForm.telephone;
          const provinceId = this.editForm.provinceId;
          let provinceName = "";
          let obj1 = {};
          if (
            provinceId !== null &&
            provinceId !== "" &&
            provinceId !== undefined
          ) {
            obj1 = this.provinceData.find(item => {
              return item.areaId === this.editForm.provinceId; // 筛选出匹配数据
            });
            console.log(obj1);
            provinceName = obj1.areaName;
          }

          const cityId = this.editForm.cityId;
          let cityName = "";
          let obj2 = {};
          if (cityId !== null && cityId !== "" && cityId !== undefined) {
            obj2 = this.cityData.find(item => {
              return item.areaId === this.editForm.cityId; // 筛选出匹配数据
            });
            console.log(obj2);
            cityName = obj2.areaName;
          }
          const districtId = this.editForm.districtId;
          console.log(districtId);
          let districtName = "";
          let obj3 = {};
          if (
            districtId !== null &&
            districtId !== "" &&
            districtId !== undefined
          ) {
            obj3 = this.districtData.find(item => {
              return item.areaId === this.editForm.districtId; // 筛选出匹配数据
            });
            console.log(obj3);
            districtName = obj3.areaName;
          }

          const address = this.editForm.address;
          const state = this.editForm.state;
          edit(
            this.editId,
            company,
            contacts,
            telephone,
            provinceId,
            cityId,
            districtId,
            provinceName,
            cityName,
            districtName,
            address,
            state
          )
            .then(res => {
              this.editFormVisible = false;
              licenseList(this.currentPage, this.pageSize)
                .then(res => {
                  console.log(res);
                  this.tableData = res.data.body.dataList;
                  this.currentPage = res.data.body.currentpage;
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
    // 分页
    handleCurrentChange(val) {
      licenseList(val, this.pageSize)
        .then(res => {
          console.log(res);
          this.tableData = res.data.body.dataList;
          this.currentPage = res.data.body.currentpage;
          this.totalItem = res.data.body.totalItem;
        })
        .catch(error => {});
    },
    // 修改状态
    handelstate(row) {
      this.$confirm("此操作将修改状态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let state = 0;
          if (row.state == 0) {
            state = 1;
          }
          if (row.state == 1) {
            state = 0;
          }
          licensestate(row.id, state)
            .then(res => {
              licenseList(this.currentPage, this.pageSize)
                .then(res => {
                  this.tableData = res.data.body.dataList;
                  this.currentPage = res.data.body.currentpage;
                  this.totalItem = res.data.body.totalPages;
                })
                .catch(error => {});
            })
            .catch(error => {});
        })
        .catch(() => {});
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

