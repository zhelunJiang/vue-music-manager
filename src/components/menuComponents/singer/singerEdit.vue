<template>
  <el-form label-width="80px" label-position="left" :model="entity" v-loading="loading" ref="window">
    <el-form-item label="封面:">
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8080/project/music-manager/file/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="entity.img" :src="$basePath + entity.img" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="歌手姓名:">
      <el-input v-model="entity.name"></el-input>
    </el-form-item>
    <el-form-item label="性别:">
      <el-radio v-model="entity.gender" :label="0">男</el-radio>
      <el-radio v-model="entity.gender" :label="1">女</el-radio>
    </el-form-item>
    <el-form-item label="介绍:">
      <el-input type="textarea" v-model="entity.introduction"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSave">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import SingerAPI from '../../../api/music/singer.js'
    export default {
       data(){
        return{
            entity:{},
            loading:0
         }
       },
      methods: {
        newEntity(){
          return {}
        },
        getEntity(id) {
          this.loading++
          SingerAPI.getEntity(id)
            .then(response => {
              this.loading--
              this.entity = Object.assign({},response.data.obj)
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
            console.log(this.entity)
            this.loading++
            SingerAPI.save(this.entity)
              .then(response => {
                this.loading--
                this.$message({
                  type: 'success',
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
              this.entity.click = 0
              this.entity.search = 0
           }
         },
        handleAvatarSuccess(res, file) {
          console.log(res)
          this.entity.img = res
        },
        beforeAvatarUpload(file) {
          /*const isJPG = file.type === 'image/png';
          const isLt2M = file.size / 1024 / 1024 < 2;
          /!*if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }*!/
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;*/
        }
      }
    }
</script>

