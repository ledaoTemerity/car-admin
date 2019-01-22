<template>
  <div class="login-container">
        <img class="login-container-back" src="../../assets/dengluback.png" alt="">
  <div class="login-container-conter-wrap">
       <div class="title-container">
         <img src="../../assets/logo.png" alt="" srcset="">
      </div>   
  <div class="login-container-conter">
    <div class="login-conter-left">
      <div class="login-conter-left-title">
      清柠汽车金融审批后台
    </div>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <el-form-item prop="username">
        <div class="svg-container">
          <!-- <svg-icon icon-class="user" /> -->
          用户名
        </div>
        <el-input
          v-model="loginForm.username"
          :placeholder="$t('login.username')"
          name="username"
          type="text"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <div class="svg-container">
          密码
        </div>
        <el-input
          :type="passwordType"
          v-model="loginForm.password"
          :placeholder="$t('login.password')"
          name="password"
          auto-complete="on"
          @keyup.enter.native="handleLogin" />
        <!-- <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span> -->
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">{{ $t('login.logIn') }}</el-button>
    </el-form>
    </div>
    <div class="login-conter-right">
      <img src="../../assets/dengluxiao.png" alt="">
    </div>
 </div>       
      </div>

  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
// import {workstatus } from '@/api/myMission'
import LangSelect from '@/components/LangSelect'
import SocialSign from './socialsignin'

export default {
  name: 'Login',
  components: { LangSelect, SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      console.log('isvalidUsername(value)',value.length)
      // alert(isvalidUsername(value))
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确格式的手机号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 8) {
        callback(new Error('密码必须是6位以上'))
      } else {
        callback()
      }
    }
    return {
            // "18234034747"
      // "123456789"
      loginForm: {
        username: '15658151157',
        password: 'xc123456'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
    // workstatus().then(res => {
    //   console.log('workstatus', res.data)
    // })
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
            this.$message({
                type: 'success',
                message: '登录成功'
            });            
          }).catch(error => {
            if (error === '需要修改密码') {
              alert(error)
              this.$router.push( { path:'/changePassword' })
            }            
            this.$message({
                type: 'error',
                message: error
            });              
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    afterQRScan() {
      // const hash = window.location.hash.slice(1)
      // const hashObj = getQueryObject(hash)
      // const originUrl = window.location.origin
      // history.replaceState({}, '', originUrl)
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // }
      // const codeName = hashObj[codeMap[this.auth_type]]
      // if (!codeName) {
      //   alert('第三方登录失败')
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({ path: '/' })
      //   })
      // }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:rgba(3,3,3,1);
  $cursor: rgba(3,3,3,1);

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input{
      color: $cursor;
      &::first-line {
        color: $light_gray;
      }
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border-top: 0px;
        border-left: 0px;
        border-right: 0px;
        // -webkit-appearance: none;
        border-radius: 0px;
        // padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        padding: 0px;
        // caret-color: $cursor;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    .el-form-item {
      // border-bottom: 1px solid rgba(155,155,155,1);
      // background: rgba(0, 0, 0, 0.1);
      width:206px;
      // height:1px;
// background:rgba(155,155,155,1);
      // border-radius: 5px;
      // color: #454545;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  max-height: 100%;
  width: 100%;
  // background-image:url('../../assets/dengluback.png');
  background-size: 100%;
  background-repeat: no-repeat;
  overflow: hidden;
  position: relative;
  .title-container {
    img {
      height: 40px;
      margin-left: 40px;
      margin-top: 24px;      
    }
  }
  .login-container-back {
    width:100%;
    height: 100%;
  }
  .login-container-conter-wrap {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;    
  }
  .login-container-conter {
    width:823px;
    height:443px;
    background:rgba(255,255,255,1);
    box-shadow:0px 16px 16px 4px rgba(19,78,110,0.2);
    border-radius:10px;   
    margin: 0 auto;
    margin-top: 146px;  
    button {
      margin-bottom: 30px;
      width: 119px !important;
      height: 32px;
      background: linear-gradient(270deg,rgba(86,186,145,1) 0%,rgba(19,123,140,1) 100%);
      box-shadow: 0px 2px 6px 0px rgba(19,78,110,0.2);
      border-radius: 16px;
      border: 0;     
      margin-top: 30px; 
    }
    .login-conter-left{
      float: left;
      width:302px;
      padding-top: 48px;
      padding-left: 48px;
      .login-conter-left-title {
        height:33px;
        font-size:24px;
        font-family:PingFangSC-Semibold;
        font-weight:600;
        color:rgba(3,3,3,1);
        line-height:33px;       
      }
    }
    .login-conter-right{
      float: right;
      width: 521px;;
      height: 100%;
      // background-image:url('../../assets/dengluxiao.png');
      background-size: 100%;
      background-repeat: no-repeat;  
      border: 1px dashed rgba(155,155,155,0.5);  
      img{
        width:100%;
        height: 100%;
      }  
    }
  }
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    // padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    padding-top: 80px;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    // padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    // width:29px;
    height:13px;
    font-size:15px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(155,155,155,1);
    line-height:13px;
    padding:0px;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
}
</style>
