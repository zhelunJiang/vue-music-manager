<template>
  <div id='index' style="height: 100%">
  <el-row class="container">
    <v-header :user="user" ></v-header>
    <el-col :span="3" style="height: 100%">
      <v-menu></v-menu>
    </el-col>
    <el-col :span="21" class="main">
      <el-row style="height: 6%;margin: 3px">
      <el-tabs type="card"  @tab-remove="removeTab" @tab-click="handleTabsClick" v-model="$store.state.activeIndex">
        <el-tab-pane
          v-for="(item,index) in options"
          :label="item.name"
          :name="item.path"
          :closable="index != 0"
        >
        </el-tab-pane>
      </el-tabs>
      </el-row>
      <el-row style="height: 88%;overflow-y: auto; " >
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      </el-row>
      <el-row style="height: 4.5%;margin-top:7px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="14">
          </el-pagination>
      </el-row>
    </el-col>
  </el-row>
  </div>
</template>
<script>
  import header from '../components/header/header.vue';
  import menu from '../components/menu/menu.vue';
  export default {
    data () {
      return {
        user: {
          name: "蒋哲伦"
        },
      }
    },
    methods:{
      removeTab(val) {
        console.log(val)
        var items = this.$store.state.options
        for(var i = 0;i < items.length;i++){
          if(items[i].path == val){
            items.splice(i,1)
            if(i == items.length&& i != 0){
              this.$store.commit('setActiveIndex',items[i-1].path)
              this.$router.push(items[i-1].path)
            }else{
              this.$store.commit('setActiveIndex',items[i].path)
              this.$router.push(items[i].path)
            }
          }
        }
      },
      handleTabsClick(val){
        this.$store.commit('setActiveIndex',val.name)
        console.log(this.$store.state.activeIndex)
        this.$router.push(val.name)
      }
    },
    components: {
      'v-header': header,
      'v-menu': menu
    },
    computed:{
      options(){
        /*console.log(this.$store.state.options)*/
        return this.$store.state.options
      }
    },
    watch:{
      $route(to,form){

        var flag = 0
        var items  = this.$store.state.options
        for(let item of items){
          if(to.name == item.name){
            flag = 1
            break
          }
        }
        if(flag == 0){
          this.$store.commit('add_tabs',{path:to.path,name:to.name})
        }
        this.$store.commit('setActiveIndex',to.path)
      }
    }
  };
</script>
<style>

  body {
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    background-color: #fff;
  }

  .container {
    padding-top: 80px;
    height: 100%;
  }

  .main {
    padding-left: 10px;
    padding-right: 3px;
    padding-top: 3px;
    height: 100%;
  }

  .container ul li.el-menu-item {
    font-size: 100%;
  }

  .container .mar-l {
    padding: 0;
  }
  .container .content-wrapper {
    padding: 20px;
  }
  :last-child {
    margin-bottom: 0;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>

