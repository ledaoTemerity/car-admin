<template>
  <div class="app-container">
    <!-- 顶部表单 -->
    <el-form ref="topForm" :inline="true" :model="topForm">
      <el-form-item label="品牌" prop="findBrand">
        <el-input v-model="topForm.findBrand" placeholder="请输入品牌"/>
      </el-form-item>
      <el-form-item label="车系" prop="findType">
        <el-input v-model="topForm.findType" placeholder="请输入车系"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="find">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="clear">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="dialogFormVisible = true">新增车型</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 90%">
      <el-table-column prop="brandName" label="品牌"/>
      <el-table-column prop="seriesName" label="车系"/>
      <el-table-column prop="yearModel" label="年款"/>
      <el-table-column prop="style" label="车型"/>
      <el-table-column prop="guidedPrice" label="指导价（万元）"/>
      <el-table-column prop="styleName" label="全称"/>
      <el-table-column :formatter="stateFilter" prop="state" label="状态"/>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="handeldelete(scope.row)">删除</el-button>
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
    <el-dialog :visible.sync="dialogFormVisible" title="新增车型" width="33%">
      <el-form ref="addForm" :model="addForm" :rules="rules" label-width="120px">
        <el-form-item label="品牌" prop="brandName">
          <el-select v-model="addForm.brandName" filterable  placeholder="请选择品牌" @change="handleChange">
            <el-option
              v-for="item in brandData"
              :key="item.carBrandId"
              :label="item.carBrand"
              :value="item.carBrand"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="车系" prop="seriesName">
          <el-select v-model="addForm.seriesName" filterable placeholder="请选择车系" @change="seriesChange">
            <el-option
              v-for="item in seriesData"
              :key="item.carTrainId"
              :label="item.carTrain"
              :value="item.carTrain"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="车型" prop="style">
          <el-input v-model="addForm.style" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="年款" prop="yearModel">
          <el-select v-model="addForm.yearModel" placeholder="请选择年款">
            <el-option v-for="item in yearData" :key="item" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item label="指导价（万元）" prop="guidedPrice">
          <el-input v-model="addForm.guidedPrice" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCancel">取 消</el-button>
        <el-button type="primary" @click="addSend">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑弹窗 -->
    <el-dialog :visible.sync="editFormVisible" title="编辑车型" width="33%">
      <el-form ref="editForm" :model="editForm" :rules="editrules" label-width="120px">
        <el-form-item label="品牌">
          <el-select v-model="editForm.brandName" filterable placeholder="请选择品牌" @change="edithandleChange">
            <el-option
              v-for="item in brandData"
              :key="item.carBrandId"
              :label="item.carBrand"
              :value="item.carBrand"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="车系">
          <el-select v-model="editForm.seriesName" filterable placeholder="请选择车系" @change="seriesChange">
            <el-option
              v-for="item in seriesData"
              :key="item.carTrainId"
              :label="item.carTrain"
              :value="item.carTrain"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="车型">
          <el-input v-model="editForm.style" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="年款">
          <el-select v-model="editForm.yearModel" placeholder="请选择年款">
            <el-option v-for="item in yearData" :key="item" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item label="指导价（万元）">
          <el-input v-model="editForm.guidedPrice" autocomplete="off"/>
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
  carTypeList,
  getBrand,
  getSeries,
  add,
  del,
  edit
} from "@/api/carType";

export default {
  data() {
    return {
      brandNameFlag:0,
      yearData: [2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010],
      brandData: [],
      seriesData: [],
      addCarBrandId: "",
      addseriesId: "",
      currentpage: 1,
      pagesize: 15,
      totalItem: 1,
      brandName: "",
      seriesName: "",
      tableData: [],
      dialogFormVisible: false,
      editFormVisible: false,
      form: {},
      topForm: {
        findBrand: "",
        findType: ""
      },
      addForm: {
        brandName: "",
        seriesName: "",
        style: "",
        yearModel: "",
        guidedPrice: ""
      },
      rules: {
        brandName: [{ required: true, message: "请选择品牌", trigger: "blur" }],
        seriesName: [
          { required: true, message: "请选择车系", trigger: "blur" }
        ],
        style: [{ required: true, message: "请输入车型", trigger: "blur" }],
        yearModel: [{ required: true, message: "请输入年款", trigger: "blur" }],
        guidedPrice: [
          { required: true, message: "请输入指导价", trigger: "blur" }
        ]
      },
      editrules: {
        brandName: [{ required: true, message: "请选择品牌", trigger: "blur" }],
        seriesName: [
          { required: true, message: "请选择车系", trigger: "blur" }
        ],
        style: [{ required: true, message: "请输入车型", trigger: "blur" }],
        yearModel: [{ required: true, message: "请输入年款", trigger: "blur" }],
        guidedPrice: [
          { required: true, message: "请输入指导价", trigger: "blur" }
        ]
      },
      editForm: {
        brandName: "",
        seriesName: "",
        style: "",
        yearModel: "",
        guidedPrice: ""
      },
      editId: ""
    };
  },
  watch: {
    "addForm.brandName": function(newValue, oldValue) {
      this.addForm.seriesName = null;
    },
    "brandNameFlag": function(newValue, oldValue) {
      this.editForm.seriesName = null;
    }
  },
  created() {
    carTypeList(this.currentpage, this.pagesize)
      .then(res => {
        this.tableData = res.data.body.dataList;
        this.currentpage = res.data.body.currentpage;
        this.totalItem = res.data.body.totalItem;
      })
      .catch(error => {});
    getBrand(1, 500)
      .then(res => {
        this.brandData = res.data.body.dataList;
      })
      .catch(error => {});
    // getSeries(1, 500)
    //   .then(res => {
    //     this.seriesData = res.data.body.dataList;
    //   })
    //   .catch(error => {});
  },
  methods: {
    stateFilter: function(val) {
      return val.state == "1" ? "正常" : val.state == "0" ? "弃用" : "未知";
    },
    // 清除查询条件
    clear() {
      this.$refs.topForm.resetFields();
      this.brandName = this.topForm.findBrand;
      this.seriesName = this.topForm.findType;
      this.currentpage = 1;
      carTypeList(
        this.currentpage,
        this.pagesize,
        this.brandName,
        this.seriesName
      )
        .then(res => {
          this.tableData = res.data.body.dataList;
          this.currentpage = res.data.body.currentpage;
          this.totalItem = res.data.body.totalItem;
        })
        .catch(error => {});
    },
    // 查询
    find() {
      this.brandName = this.topForm.findBrand;
      this.seriesName = this.topForm.findType;
      this.currentpage = 1;
      carTypeList(
        this.currentpage,
        this.pagesize,
        this.brandName,
        this.seriesName
      )
        .then(res => {
          this.tableData = res.data.body.dataList;
          this.currentpage = res.data.body.currentpage;
          this.totalItem = res.data.body.totalItem;
        })
        .catch(error => {});
    },
    // 新增取消
    addCancel() {
      this.$refs.addForm.resetFields();
      this.dialogFormVisible = false;
    },
    // 编辑取消
    editCancel() {
      this.editFormVisible = false;
    },
    // 新增确定
    addSend() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          let brandId = this.addCarBrandId;
          let seriesId = this.addseriesId;
          let style = this.addForm.style;
          let brandName = this.addForm.brandName;
          let seriesName = this.addForm.seriesName;
          let guidedPrice = Number(this.addForm.guidedPrice);
          guidedPrice = guidedPrice.toFixed(2);
          let yearModel = this.addForm.yearModel;
          add(
            brandId,
            seriesId,
            style,
            brandName,
            seriesName,
            guidedPrice,
            yearModel
          )
            .then(res => {
              this.dialogFormVisible = false;
              this.$refs.addForm.resetFields();
              carTypeList(
                this.currentpage,
                this.pagesize,
                this.brandName,
                this.seriesName
              )
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
    // 编辑按钮
    handleEdit(row) {
      this.editFormVisible = true;
      this.editId = row.id;
      this.editForm.brandName = row.brandName;
      this.editForm.seriesName = row.seriesName;
      this.editForm.style = row.style;
      this.editForm.yearModel = row.yearModel;
      this.editForm.guidedPrice = row.guidedPrice;
      let obj = {};
      let brandId = "";
      obj = this.brandData.find(item => {
        return item.carBrand === this.editForm.brandName; // 筛选出匹配数据
      });
      brandId = obj.carBrandId;
      getSeries(1, 500, brandId)
        .then(res => {
          this.seriesData = res.data.body.dataList;
        })
        .catch(error => {});
    },
    // 编辑确定
    editSend() {
      let style = this.editForm.style;
      let brandName = this.editForm.brandName;
      let seriesName = this.editForm.seriesName;
      let guidedPrice = Number(this.editForm.guidedPrice);
      guidedPrice = guidedPrice.toFixed(2);
      let yearModel = this.editForm.yearModel;
      let brandId = "";
      let seriesId = "";
      if (this.addCarBrandId == "") {
        let obj = {};
        obj = this.brandData.find(item => {
          return item.carBrand === brandName; // 筛选出匹配数据
        });
        brandId = obj.carBrandId;
      } else {
        brandId = this.addCarBrandId;
      }
      if (this.addseriesId == "") {
        let obj = {};
        obj = this.seriesData.find(item => {
          return item.carTrain === seriesName; // 筛选出匹配数据
        });
        if (obj) {
          seriesId = obj.carTrainId;
        }
      } else {
        seriesId = this.addseriesId;
      }
      this.$refs.editForm.validate(valid => {
        if (valid) {
          edit(
            this.editId,
            brandId,
            seriesId,
            style,
            brandName,
            seriesName,
            guidedPrice,
            yearModel
          )
            .then(res => {
              this.editFormVisible = false;
              carTypeList(
                this.currentpage,
                this.pagesize,
                this.brandName,
                this.seriesName
              )
                .then(res => {
                  this.tableData = res.data.body.dataList;
                  this.currentpage = res.data.body.currentpage;
                  this.totalItem = res.data.body.totalItem;
                })
                .catch(error => {});
            })
            .catch(error => {});
        }
      });
    },
    // 品牌下拉框onchange
    handleChange(value) {
      let obj = {};
      obj = this.brandData.find(item => {
        return item.carBrand === value; // 筛选出匹配数据
      });
      const carBrandId = obj.carBrandId;
      this.addCarBrandId = carBrandId;
      // 根据品牌获取车系
      getSeries(1, 500, carBrandId)
        .then(res => {
          this.seriesData = res.data.body.dataList;
        })
        .catch(error => {});
    },
    //编辑弹框品牌下拉
    edithandleChange(value) {
      this.brandNameFlag++;
      let obj = {};
      obj = this.brandData.find(item => {
        return item.carBrand === value; // 筛选出匹配数据
      });
      const carBrandId = obj.carBrandId;
      this.addCarBrandId = carBrandId;
      // 根据品牌获取车系
      getSeries(1, 500, carBrandId)
        .then(res => {
          this.seriesData = res.data.body.dataList;
        })
        .catch(error => {});
    },
    // 车系下拉框onchange
    seriesChange(value) {
      let obj = {};

      obj = this.seriesData.find(item => {
        return item.carTrain === value; // 筛选出匹配数据
      });
      this.addseriesId = obj.carTrainId;
    },
    // 分页
    handleCurrentChange(val) {
      carTypeList(val, this.pagesize, this.brandName, this.seriesName)
        .then(res => {
          this.tableData = res.data.body.dataList;
          this.currentpage = res.data.body.currentpage;
          this.totalItem = res.data.body.totalItem;
        })
        .catch(error => {});
    },
    // 删除
    handeldelete(row) {
      this.$confirm("此操作将删除所选项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          del(row.id)
            .then(res => {
              carTypeList(
                this.currentpage,
                this.pagesize,
                this.brandName,
                this.seriesName
              )
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

