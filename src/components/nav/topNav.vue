<template>
  <el-row class="container">
    <!--头部-->
    <el-col :span="24" class="topbar-wrap">
       <div class="topbar-logo topbar-btn">
        <a href="/"><img src="../../assets/logo.png"></a>
      </div> 
      <div class="topbar-logos">
        <a href="/" style="color: #fff;">维修资金综合管理平台</a>
      </div>
      <div class="topbar-title">
        <el-row>
          <el-col :span="24">
            <el-menu :default-active="defaultActiveIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true">
              <el-menu-item index="/">系统平台</el-menu-item>
              <el-submenu index="2-4">
                  <template slot="title">更多</template>
                  <el-menu-item index="/enterpriseManager9">资金支用</el-menu-item>
               </el-submenu>            
            </el-menu>            
          </el-col>
        </el-row>
      </div>
      <div class="topbar-account topbar-btn">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner">
            <i class="iconfont icon-user"></i> {{nickname}}   <i class="el-icon-caret-bottom"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div @click="jumpTo('/user/profile')"><span style="color: #555;font-size: 14px;">个人信息</span></div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="jumpTo('/user/changepwd')"><span style="color: #555;font-size: 14px;">修改密码</span></div>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
</template>
<script>
  import 'element-ui/lib/theme-chalk/display.css';
  import {road} from '../../road.js'
  
  export default {
    data(){
      return {
        loading: false,
        companyName: '',
        nickname: '',
        defaultActiveIndex: '/',
        homeMenu: false,
        messageCount: 5
      }
    },
    created() {
      road.$on('setNickName', (text) => {
        this.nickname = text;
      });
      road.$on('goto', (url) => {
        if(url === "/login") {
          sessionStorage.removeItem('access-token')
          this.$router.push(url);
        }
      });
      // 组件创建完后获取数据
      this.fetchNavData();
    },
    methods: {
      jumpTo(url){
        this.$router.push(url); //用go刷新
      },
      handleSelect(index){
        this.defaultActiveIndex = index;
      },
      fetchNavData () { // 初始化菜单激活项
        var cur_path = this.$route.path; //获取当前路由
        var routers = this.$router.options.routes; // 获取路由对象
        var nav_type = "home", nav_name = "home";
        for (var i = 0; i < routers.length; i++) {
          var children = routers[i].children;
          if(children){
            for (var j = 0; j < children.length; j++) {
              if (children[j].path === cur_path) {
                nav_type = routers[i].type;
                nav_name = routers[i].name;
                break;
              }
            }
          }
        }
        this.$store.state.topNavState = nav_type;
        this.$store.state.leftNavState = nav_name;
        if(nav_type == "home"){
          this.defaultActiveIndex = "/";
        } else {
          this.defaultActiveIndex = "/" + nav_name + "Manager";
        }
      },
      logout(){
        //logout
        let that = this;
        this.$confirm('确认退出吗?', '提示', {
          confirmButtonClass: 'el-button--warning'
        }).then(() => {
          //确认
          sessionStorage.removeItem('access-token');
          that.$router.go('/login'); //用go刷新
        }).catch(() => {});
      }
    },
    mounted() {
      let user = window.localStorage.getItem('access-user');
      if (user) {
        user = JSON.parse(user);
        this.nickname = user.nickname || '';
        this.companyName = user.companyName || '';
      }
    },
    watch: {
      '$route': function(to, from){ // 路由改变时执行
        //console.info("to.path:" + to.path);
        this.fetchNavData();
      }
    }
  }
</script>
<style>
.topbar-logo{
  width:38px !important;
}
.topbar-logos{
  padding:0 5px;
}
.el-submenu,.el-submenu__title{
  height:50px !important;
  line-height:50px !important;
}
.el-submenu__title{
  color:#fff !important;
}
.el-submenu__title:hover{
  color:#fff !important;
  background-color:#373d41 !important;
}
</style>