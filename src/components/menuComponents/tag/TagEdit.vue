<template>
  <el-form v-loading="loading" :model="entity" ref="window" :rules="rule">
    <el-form-item label="ID" >
      <el-input v-model="entity.id" disabled>
      </el-input>
    </el-form-item>
    <el-form-item label="名称" prop="name">
      <el-input v-model="entity.name">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSave">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import TagApi from '../../../api/music/tag.js'
  export default {
    data(){
      return{
        entity:{},
        loading:0,
        rule:{
          name:[
            { required: true, trigger: 'blur',message:'不能为空'},
            { max:10,trigger:'blur',message:'标签名不能超过10个字'}
            ]
        }
      }
    },
    methods: {
      newEntity(){
        return {}
      },
      getEntity(id) {
        this.loading++
        TagApi.getEntity(id)
          .then(response => {
            this.loading--
            this.entity = this.$newData(this.entity, response.data.obj)
          })
      },
      handleSave() {
        this.$refs['window'].validate((valid) => {
          if (!valid) {
            this.$message({
              type: 'warning',
              message: '格式有误!'
            })
            return
          }
          this.loading++
          TagApi.save(this.entity)
            .then(response => {
              this.loading--
              this.$message({
                type: ' success',
                message: '保存成功'
              })
              this.$emit('saved')
            })
            .catch(() => {
              this.loading--
            })
        })
      },
      init(id){
        if (id){
          this.getEntity(id)
        } else{
          this.entity = {}
        }
      }
    }
  }
</script>

