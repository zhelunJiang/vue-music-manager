<template>
  <section>
    <el-row>
      <el-col :span="12">
        <el-form :inline="true">
          <el-form-item label="搜索:" >
            <el-input v-model="filter.name" placeholder="输入用户"></el-input>
          </el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <!--表格-->
        <el-table
          :data="page.list"
          style="width: 100%" size="mini">
          <el-table-column type="selection">
          </el-table-column>
          <el-table-column
            prop="create"
            label="评论时间"
            sortable
            :formatter="$dateFormat"
            width="200">
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名"
            width="200">
          </el-table-column>
          <el-table-column
            prop="nickname"
            label="昵称"
            width="200">
          </el-table-column>
          <el-table-column
            prop="mname"
            label="对象"
            width="200">
          </el-table-column>
          <el-table-column
            label="内容"
            width="500">
            <template slot-scope="scope">
              <el-input type="textarea" v-model="content">
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button type="danger" size="small"  icon="el-icon-delete" circle @click="handleDelete(scope.$index,scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import API from '../../../api/music/comment.js'
  export default {
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
      handleGetMusic(musicId){

      },
      getPage(){
        this.loading++
        API.getAll()
          .then( data=> {
            this.loading--
            this.page.list = Object.assign([],data.obj)
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
            .catch(error=>{
              this.loading--
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
      }
    },
    openEdit(id){
      this.from.visible = true;
      setTimeout(_=>{
        this.$refs['window'].init(id);
        console.log('pass')
      },10)
    }
  }
</script>
<style>
  .el-message-box__btns .cancel {
    float: right;
    margin-left: 10px;
  }
</style>
