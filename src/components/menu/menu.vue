<template>
  <div id="menu">
	<el-menu :default-active="$route.path" class=" el-menu-vertical-demo" light router>
      <el-menu-item-group title="后台管理">
          <el-menu-item :index="item.path" v-for="(item,index) in others_item" v-if="!item.hidden" :key="index">
            <i class="fa" :class="item.class"></i>{{item.title}}
          </el-menu-item>
	    </el-menu-item-group>
    <el-submenu :index="item.title" v-for="(item,index) in roots" v-if="!item.hidden" :key="index">
      <template slot="title"><i class="fa" :class="item.class"></i>{{item.title}}</template>
      <el-menu-item :index="subitem.path" v-for="(subitem,subindex) in item.Subs" v-if="!subitem.hidden" :key="subindex">
        <i class="fa" :class="subitem.class"></i>{{subitem.title}}
      </el-menu-item>
    </el-submenu>
  </el-menu>
  </div>
</template>
<script>
export default {
    data() {
      return {
        roots:[{
          title:'音乐管理',
          class:'fa-music',
          Subs:[{
            title:'音乐',
            path:'/index/music',
            class:'fa-music'
          }],
        },
          {
            title:'歌手管理',
            class:'fa-user-circle-o',
            Subs:[{
              title:'歌手',
              path:'/index/singer',
              class:'fa-user-circle-o',
            }]
          },{
            title:' 专辑管理',
            class:'fa-trash',
            Subs:[{
              title:'专辑',
              path:'/index/album',
              class:'fa-edge'
            }]
          }],
        others_item: [
          {
            title:'主页',
            path:'/index/home',
            class:'fa-home'
          },
          {
            title: '用户',
            path: '/index/user',
            class: 'fa-user'
          }, {
            title: '评论',
            path: '/index/comment',
            class: 'fa-comment-o'
          },{
            title:'标签',
            path:'/index/tabs',
            class:'fa-tag'
          }
        ]
      }
    },
  mounted () {
    // 刷新时以当前路由做为tab加入tabs
    if (this.$route.path !== '/index/home') {
      this.$store.commit('add_tabs', {path: '/index/home', name: '主页'});
      this.$store.commit('add_tabs', {path: this.$route.path , name: this.$route.name });
      this.$store.commit('setActiveIndex', this.$route.path);
    } else {
      this.$store.commit('add_tabs', {path: '/index/home', name: '主页'});
      this.$store.commit('setActiveIndex', '/index/home');
      this.$router.push('/index/home');
    }
  },
  computed: {
    options () {
      return this.$store.state.options;
    }
  },
  methods:{
    handleSelect(route,name){
        this.$store.commit('add_tabs',{path:route,name:name})
    }
  }
  }
</script>
<style>

  i.fa {
    vertical-align: baseline;
    margin-right: 10px;
  }
  #menu  {
    height: 100%;
    width: 100%;
    background-color: #fff;
    float: left;
    border-right: solid 1px #ccc;
    overflow: auto;
  }

</style>
