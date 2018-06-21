<template>
  <section>
  <el-row>
    <el-col :span="24">
      <el-form :inline="true"  class="demo-form-inline" height="8%">
        <el-form-item label="搜索:">
          <el-input placeholder="输入歌名,专辑或歌手" v-model="filter.name"></el-input>
        </el-form-item>
        <el-button type="primary" >查询</el-button>
        <el-button type="success" @click="handleAdd">添加</el-button>
      </el-form>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24">
      <el-table   size="mini" style="width: 100%" :data="page.list" v-loading="loading" stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
          <el-row>
          <el-form  label-position="left" size="mini" class="demo-table-expand">
            <el-col :span="5">
              <el-form-item label="音乐封面:">
                <img :src="$basePath + scope.row.img"  class="miniimg">
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="专辑封面:">
                <img :src="$basePath+scope.row.aimg" class="miniimg">
              </el-form-item>
              <el-form-item label="歌手封面:">
                <img :src="$basePath+scope.row.simg" class="miniimg">
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item  label="搜索量:">
                {{scope.row.search}}
              </el-form-item>
              <el-form-item  label="点击量:" >
                {{scope.row.click}}
              </el-form-item>
              <el-form-item label="歌词地址:">
                <p>{{scope.row.lyc}}</p>
              </el-form-item>
              <el-form-item label="歌曲地址:">
                <p>{{scope.row.path}}</p>
              </el-form-item>
            </el-col>
          </el-form>
          </el-row>
        </template>
        </el-table-column>
        <el-table-column type="selection">
        </el-table-column>
        <el-table-column prop="name" label="歌曲名">
        </el-table-column>
        <el-table-column prop="sname" label="歌手" sortable>
        </el-table-column>
        <el-table-column prop="aname" label="专辑">
        </el-table-column>
        <el-table-column prop="create" label="创建时间" sortable>
          <template slot-scope="slot">
            {{$dateFormat(slot.row.create)}}
          </template>
        </el-table-column>
        <el-table-column  label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="handleEdit(scope.$index,scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle  size="mini" @click="handleDelete(scope.$index,scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>

  <el-dialog  :visible.sync="from.visible" size="tiny" width="35%">
    <song-dialog ref="window" @saved="handleSave()"></song-dialog>
  </el-dialog>
</section>
</template>

<script>
  import SongDialog from './songEdit.vue'
  import MusicAPI from '../../../api/music/music.js'
  export default {
    components:{
      SongDialog
    },
    created(){
      this.getPage()
    },
    data(){
      return{
        filter:{
          name:null
        },
        page:{
          totalElements:0,
          currentPage:1,
          totalPage:0,
          pageSize:0,
          list:[]
        },
        loading:0,
        from:{
          visible: false,
        }
      }
    },
    methods:{
      getPage(){
        this.loading++
        MusicAPI.getList()
          .then( response=> {
            this.loading--
            this.page.list = Object.assign([],response.data.obj)
          })
          .catch(error => {
            this.loading--
            this.$message({
              type:'danger',
              message:'出错,请联系管理员'
            })
          })
      },
      handleDelete: function(index, row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        }).then(() => {
          this.loading++
          MusicAPI.remove(row.id)
            .then(() => {
              this.loading--
              this.getPage()
              setTimeout({},100)
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            })
            .catch(()=>{
              this.loading--
            })
        })
      },
      // 查询
      handleQuery: function() {
        this.getPage()
      },
      // 编辑
      handleEdit: function(index, row) {
        this.openEdit(row.id)
      },
      // 添加
      handleAdd: function() {
        this.openEdit('')
      },
      openEdit(id){
        this.from.visible = true;
        setTimeout(_=>{
          this.$refs['window'].init(id);
        },10)
      },
      handleSave(){
        this.from.visible = false;
        this.getPage()
      }
    },
  }
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .miniimg{
    width: 80px;
    height: 80px;
  }
  .el-message-box__btns .cancel {
    float: right;
    margin-left: 10px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
