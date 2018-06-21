<template>
  <section>
    <el-row>
      <el-col>
      <el-form :inline="true">
        <el-form-item label="搜索:">
          <el-input  placeholder="用户名或昵称" v-model="filter.name"></el-input>
        </el-form-item>
          <el-button type="primary" >查询</el-button>
          <el-button type="success" @click="handleAdd">添加</el-button>
      </el-form>
      </el-col>
        <!--表格-->
      <el-col :span="24">
        <el-table
          :data="page.list"
          style="width: 100%" size="mini" selection >
          <el-table-column type="selection">
          </el-table-column>
          <el-table-column prop="id" label="ID">
          </el-table-column>
          <el-table-column
            label="用户名">
            <template slot-scope="scope">
              <el-popover placement="top-start">
                <img :src="$basePath+scope.row.img" style="width: 150px;height: 150px">
                <div slot="reference">
                  <el-button type="text">{{scope.row.username}}</el-button>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="nickname"
            label="昵称">
          </el-table-column>
          <el-table-column
            label="性别">
            <template slot-scope="scope">
              {{$musicMap.dictionary.GenderState[scope.row.gender]}}
            </template>
          </el-table-column>
          <el-table-column
            prop="phone"
            label="电话">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱">
          </el-table-column>
          <el-table-column  label="操作" >
            <template slot-scope="scope"><!--可以用scope.row.获取表格假数据 如scope.row.id-->
              <el-button type="primary" icon="el-icon-edit" circle size="mini"@click="handleEdit(scope.$index,scope.row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle  size="mini" @click="handleDelete(scope.$index,scope.row)"></el-button><!--scope.$index传的是桌面数据而不是实际的数据-->
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog  :visible.sync="from.visible" size="tiny" width="30%">
      <user-dialog ref="window" @saved="handleSave"></user-dialog>
    </el-dialog>
  </section>

</template>

<script>

  import UserDialog from './UserEdit.vue'
  import API from '../../../api/music/user.js'
  export default {
    components:{
     UserDialog
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
        API.getAll()
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
          API.remove(row.id)
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
      handleSave(){
        this.from.visible = false;
        this.getPage()
      }

    },
  }
</script>
<style>

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
