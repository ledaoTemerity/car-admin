<template>
  <div class="navbar">
    <div class="logo">
      <img src="../../../assets/logo.png" alt="" srcset="">
    </div>

    <!-- <breadcrumb class="breadcrumb-container"/> -->

    <div class="right-menu">
      <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
      <template v-if="device!=='mobile'">
        <error-log class="errLog-container right-menu-item"/>
        <el-button  type="primary" style="width:100%;margin-bottom:30px;" @click="oprTrun">{{OrderStatus}}</el-button>
        <!-- <el-tooltip :content="$t('navbar.screenfull')" effect="dark" placement="bottom">
          <screenfull class="screenfull right-menu-item"/>
        </el-tooltip> -->

        <!-- <el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">
          <size-select class="international right-menu-item"/>
        </el-tooltip> -->

        <!-- <lang-select class="international right-menu-item"/> -->
<!-- 
        <el-tooltip :content="$t('navbar.theme')" effect="dark" placement="bottom">
          <theme-picker class="theme-switch right-menu-item"/>
        </el-tooltip> -->
      </template>

      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
          <span>admin</span>
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{ $t('navbar.dashboard') }}
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
import {workstatus ,oprWorkStatus} from '@/api/myMission'
export default {
  data(){
    return {
      OrderStatus: '开始接单'
    }
  },
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    ThemePicker
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar',
      'device'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
         this.$confirm('你确定要退出登录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('LogOut').then(() => {
             this.$message({
              type: 'success',
              message: '退出登录成功!'
             });           
            location.reload()// In order to re-instantiate the vue-router object to avoid bugs
          })         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出操作'
          });          
        });     
    },
    oprTrun(){
        this.$confirm('你确定要' + this.OrderStatus +'吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let workStatus = ""
          if (this.OrderStatus === '停止接单') {
            workStatus = 0;
          } else {
            workStatus = 1;
          }
          oprWorkStatus({
            workStatus: workStatus
          }).then(res => {
            // console.log('workStatusworkStatusworkStatusworkStatus',res.data)
            if (res.data.errCode === '200') {
              // this
              this.getworkstatus()
              this.$message({
                type: 'success',
                message: workStatus=== 0 ? '你已经停止接单' : '你已经开始接单'
              });           
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    getworkstatus(){
      workstatus({
        }).then(res => {
          if (res.data.errCode === '200') {
            if (res.data.body.workStatus==0 || res.data.body.workStatus===1) {
              if (res.data.body.workStatus === 0) {
                this.OrderStatus = '开始接单'
              } else{
                this.OrderStatus = '停止接单'
              }
            }
            
          }
          console.log('workstatus', res.data)
        })
    }

  },
  created(){
   this.getworkstatus();
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  position: fixed;
  width: 100%;
  z-index: 1002;
  background:rgba(255,255,255,1);
  box-shadow:0px 2px 6px 0px rgba(19,78,110,0.2);  
  .logo {
    float: left;
    padding-left: 20px;
    img {
      vertical-align: middle;
      width:112px;
      height:32px;   
    } 
  } 
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    .el-button {
      width: 103px;
      height: 27px;
      background: linear-gradient(90deg,rgba(19,123,140,1) 0%,rgba(86,186,145,1) 100%);
      box-shadow: 0px 2px 6px 0px rgba(19,78,110,0.2);
      border-radius: 13px;
      border: 0;   
      margin: 0px !important;
      width: auto !important;  
    }
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
