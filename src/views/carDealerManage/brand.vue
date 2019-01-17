<template>
  <div class="app-container">
    <!-- 顶部表单 -->
    <el-form ref="topForm" :inline="true" :model="topForm">
      <el-form-item label="品牌" prop="findBrand">
        <el-input v-model="topForm.findBrand" placeholder="请输入品牌"/>
      </el-form-item>
      <el-form-item>
        <el-button @click="find">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="clear">清除查询条件</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="dialogFormVisible = true">新增车型</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="品牌编号" width="180"/>
      <el-table-column prop="name" label="品牌" width="180"/>
      <el-table-column prop="address" label="图标"/>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="small">车系</el-button>
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="handleClick(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        :total="400"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 弹窗表单 -->
    <el-dialog :visible.sync="dialogFormVisible" title="新增品牌" width="33%">
      <el-form :model="addForm" label-width="120px">
        <el-form-item label="品牌">
          <el-select v-model="addForm.brand" placeholder="请选择品牌">
            <el-option label="品牌一" value="shanghai"/>
            <el-option label="品牌二" value="beijing"/>
          </el-select>
        </el-form-item>
        <el-form-item label="图标">
          <el-upload
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="1"
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
          >
            <el-button size="small" style="marginLeft:200px">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSend">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 可编辑表格 -->
    <el-row>
      <el-col span="24">
        <el-table :data="master_user.data" border style="width: 80%">
          <el-table-column
            v-for="(v,i) in master_user.columns"
            :prop="v.field"
            :label="v.title"
            :width="v.width"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.isSet">
                <el-input v-model="master_user.sel[v.field]" size="mini" placeholder="请输入内容"/>
              </span>
              <span v-else>{{ scope.row[v.field] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                style="cursor: pointer;"
                @click="edit(scope.row,scope.$index,true)"
              >{{ scope.row.isSet?'保存':"修改" }}</el-button>
              <el-button
                v-if="!scope.row.isSet"
                type="text"
                size="small"
                style="cursor: pointer;"
              >删除</el-button>
              <el-button
                v-else
                type="text"
                size="small"
                style="cursor: pointer;"
                @click="edit(scope.row,scope.$index,false)"
              >取消</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col span="24">
        <div class="el-table-add-row" style="width: 80%;" @click="addMasterUser()">
          <span>+ 添加</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import permission from '@/directive/permission/index.js' // 权限判断指令
// import checkPermission from '@/utils/permission' // 权限判断函数
// import SwitchRoles from './components/SwitchRoles'
import { loginByUsername } from '@/api/brand'
// id生成工具 这个不用看 示例而已 模拟后台返回的id
var generateId = {
  _count: 1,
  get() {
    return +new Date() + '_' + this._count++
  }
}
export default {
  data() {
    return {
      master_user: {
        sel: null, // 选中行
        columns: [
          { field: 'type', title: '车系编号', width: 120 },
          { field: 'info', title: '车系' }
        ],
        data: []
      },
      currentPage4: 4,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      dialogFormVisible: false,
      form: {},
      topForm: {
        findBrand: '',
        findType: ''
      },
      addForm: {
        brand: ''
      }
    }
  },
  created() {
    loginByUsername(eee, dddd).then(response => {

    }).catch(error => {

    })
  },
  methods: {
    // 清除查询条件
    clear() {
      this.$refs.topForm.resetFields()
    },
    // 查询
    find() {
      console.log(this.topForm.findBrand)
    },
    // 新增确定
    addSend() {
      // console.log(this.addForm.change);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    handleClick(row) {
      console.log(JSON.stringify(row))
    },
    // 图片上传
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    // 读取表格数据
    readMasterUser() {
      // 根据实际情况，自己改下啊
      this.master_user.data.map(i => {
        i.id = generateId.get()// 模拟后台插入成功后有了id
        i.isSet = false // 给后台返回数据添加`isSet`标识
        return i
      })
    },
    // 添加账号
    addMasterUser() {
      for (const i of this.master_user.data) {
        if (i.isSet) return this.$message.warning('请先保存当前编辑项')
      }
      const j = {
        id: 0,
        type: '',
        info: '',
        isSet: true,
        _temporary: true
      }
      this.master_user.data.push(j)
      this.master_user.sel = JSON.parse(JSON.stringify(j))
    },
    // 可编辑表格修改
    edit(row, index, cg) {
      // console.log(JSON.stringify(row));
      // console.log(index);
      // console.log(cg);
      // 点击修改 判断是否已经保存所有操作
      for (const i of this.master_user.data) {
        if (i.isSet && i.id != row.id) {
          app.$message.warning('请先保存当前编辑项')
          return false
        }
      }
      // 是否是取消操作
      if (!cg) {
        if (!this.master_user.sel.id) this.master_user.data.splice(index, 1)
        return (row.isSet = !row.isSet)
      }
      // 提交数据
      if (row.isSet) {
        //  console.log(JSON.stringify(row));
        // 项目是模拟请求操作  自己修改下
        const that = this;
        (function() {
          const data = JSON.parse(JSON.stringify(that.master_user.sel))
          console.log(data)
          for (const k in data) row[k] = data[k]
          that.$message({
            type: 'success',
            message: '保存成功!'
          })
          // 然后这边重新读取表格数据
          that.readMasterUser()
          row.isSet = false
        })()
      } else {
        this.master_user.sel = JSON.parse(JSON.stringify(row))
        row.isSet = true
      }
    }
  }
}
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
.upload-demo {
  display: inline-block;
  width: 200px;
  border-bottom: 1px solid #dcdfe6;
}
.el-upload-list {
  position: absolute;
  top: 0;
  left: 0;
}
.el-table-add-row {
  margin-top: 10px;
  width: 100%;
  height: 34px;
  border: 1px dashed #c1c1cd;
  border-radius: 3px;
  cursor: pointer;
  justify-content: center;
  display: flex;
  line-height: 34px;
}
</style>

