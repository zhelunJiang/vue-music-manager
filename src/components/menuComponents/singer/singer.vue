<template>
  <section>
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" class="demo-form-inline" height="8%">
          <el-form-item label="搜索:">
            <el-input placeholder="输入歌手名字" v-model="filter.name"></el-input>
          </el-form-item>
          <el-button type="primary" icon="search">查询</el-button>
          <el-button type="success" icon="search" @click="handleAdd">添加</el-button>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="page.list" size="mini" style="width: 100%" v-loading="loading">
          <el-table-column type="selection">
          </el-table-column>
          <el-table-column label="封面">
            <template slot-scope="scope">
              <img :src="$basePath + scope.row.img" class="singerImg">
            </template>
          </el-table-column>
          <el-table-column prop="name" label="歌手">
          </el-table-column>
          <el-table-column  label="性别">
            <template slot-scope="scope">
              {{$musicMap.dictionary.GenderState[scope.row.gender]}}
            </template>
          </el-table-column>
          <el-table-column  label="相关专辑">
            <template slot-scope="scope">
              <el-button type="text">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column  label="相关歌曲">
            <template slot-scope="scope">
              <el-button type="text">查看</el-button>
            </template>
          </el-table-column>
           <el-table-column prop="search" label="搜索量">
          </el-table-column>
          <el-table-column prop="click" label="点击量">
          </el-table-column>
          <el-table-column prop="create" label="创建时间" sortable>
            <template slot-scope="slot">
              {{$dateFormat(slot.row.create)}}
            </template>
          </el-table-column>
          <el-table-column  label="操作">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="handleEdit(scope.$index, scope.row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle  size="mini" @click="handleDelete(scope.$index, scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog  :visible.sync="from.visible"size="tiny" width="25%">
        <singer-dialog ref="window" @saved="handleSaved"></singer-dialog>
    </el-dialog>
  </section>
</template>

<script>
  import SingerDialog from './singerEdit.vue'
  import SingerAPI from '../../../api/music/singer.js'
    export default {
      components:{
        SingerDialog
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
          SingerAPI.getAll()
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
            SingerAPI.remove(row.id)
              .then(() => {
                this.loading--
                this.getPage()
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
              })
          })
        },
        // 查询
        handleQuery: function(){
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
        handleSaved(){
          this.from.visible = false;
          this.getPage()
        }

      },
    }
</script>

<style >
.singerImg{
  height: 50px;
  width: 50px;
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
