<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="defaultActive"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#FFFFFF"
      text-color="#9B9B9B"
      active-text-color="#00AFAA"
    >
      <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  data(){
     return {
       defaultActive:'' 
     }
  },
  watch:{
    '$route' (to, from) {
      if ( this.$route.fullPath === '/dashboard') {
          this.defaultActive = this.$route.fullPath + '?page=woderenwu';      
      }else if(this.$route.path === '/userData'){
          this.defaultActive = '/dashboard?page=woderenwu'; 
      }else {
          this.defaultActive = this.$route.fullPath
      }
    }
  },
  created(){
    // alert(this.$route.path)
      if ( this.$route.fullPath === '/dashboard') {
          this.defaultActive = this.$route.fullPath + '?page=woderenwu';      
      }else if(this.$route.path === '/userData'){
          this.defaultActive = '/dashboard' + '?page=woderenwu';  
      }else {
          this.defaultActive = this.$route.fullPath
      }
    // console.log('$route.path------',this.$route)
  }
}
</script>
