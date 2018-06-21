<template>
  <section>
    <el-row>
      <el-form :inline="true" class="demo-form-inline" height="8%">
        <el-form-item label="搜索:">
          <el-input placeholder="输入标签名" v-model="filter.name"></el-input>
        </el-form-item>
        <el-button type="primary" icon="search">查询</el-button>
        <el-button type="success" icon="search" @click="handleAdd">添加</el-button>
      </el-form>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table  :data="page.list"  size="mini" key="byTags" v-loading="loading">
          <el-table-column type="selection">
          </el-table-column>
          <el-table-column prop="id" label="ID">
          </el-table-column>
          <el-table-column prop="name" label="标签名">
          </el-table-column>
          <el-table-column prop="create" label="创建时间" sortable>
            <template slot-scope="slot">
              {{$dateFormat(slot.row.create)}}
            </template>
          </el-table-column>
          <el-table-column label="关联歌曲">
            <template slot-scope="scope">
              <el-button type="text" @click="handleGetMusic(scope.row.id)">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column  label="操作" >
            <template slot-scope="scope">
              <el-button type="primary" size="small"  icon="el-icon-edit" circle @click="handleEdit(scope.$index,scope.row)"></el-button>
              <el-button type="danger" size="small"  icon="el-icon-delete" circle @click="handleDelete(scope.$index,scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="from.visible" title="修改标签名" width="30%">
      <tag-dialog ref="window" @saved="handleSave"></tag-dialog>
    </el-dialog>
  </section>
</template>
<script>
  import TagDialog from './TagEdit.vue'
  import TagAPI from '../../../api/music/tag.js'
  export default {
    components:{
      TagDialog
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
      handleGetMusic(musicId){
        this.loading++
        TagAPI.getMusicById(musicId)
          .then(response=>{

          })

      },
      getPage(){
        this.loading++
        TagAPI.getAll()
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
          TagAPI.remove(row.id)
            .then(() => {
              this.loading--
              this.getPage()
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
        this.from.visible = false
        this.getPage()
      }

    },
  }
</script>

<style scoped>
  .el-message-box__btns .cancel {
    float: right;
    margin-left: 10px;
  }
</style>

