import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/index.vue'
import Login from '../components/login.vue'
import User from '../components/menuComponents/user/User.vue'
import Comment from '../components/menuComponents/comment/comment.vue'
import Tabs from '../components/menuComponents/tag/Tag.vue'
import Singer from '../components/menuComponents/singer/singer.vue'
import Song from '../components/menuComponents/music/song.vue'
import Album from '../components/menuComponents/album/album.vue'
import Home from '../components/menuComponents/home.vue'
import AddMusic from '../components/element/addmusic.vue'
import AddSinger from '../components/element/addsinger.vue'
import AddAlbum from '../components/element/addalbum.vue'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  linkActiveClass: 'active',
  routes: [{
    path: '/',
    redirect: 'index'
  },
    {
    path: '/login',
    component: Login,
    name: 'login',
  }, {
    path: '/index',
    component: Index,
    children: [{
      path: '/',
      name: 'index',
      redirect: 'user',
    }, {
      path: '/index/user',
      component: User,
      name: '用户管理'
    },
      {
      path: '/index/comment',
      component: Comment,
      name: '评论管理'
    },{
      path:'/index/tabs',
      component:Tabs,
      name:'标签管理'
    },
      {
      path:'/index/music',
      component:Song,
      name:'音乐管理'
    },
      {
        path:'/index/Album',
        component:Album,
        name:'专辑管理'
      },{
        path:'/index/singer',
        component:Singer,
        name:'歌手管理'
      },
      {
        path:'/index/home',
        component:Home,
        name:'主页'
      },{
        path:'/index/addmusic',
        component:AddMusic,
        name:'addmusic',
      },{
        path:'/index/addsinger',
        component:AddSinger,
        name:'addsinger'
      },{
        path:'/index/addalbum',
        component:AddAlbum,
        name:'addalbum'
      }]
  }]
})
