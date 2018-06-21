<template>
  <el-form v-loading="loading" label-width="80px" :model="entity" ref="window">
    <el-form-item label="封面:">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8080/project/music-manager/file/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="entity.img" :src="$basePath+entity.img"  class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </el-form-item>
    <el-form-item label="专辑名称:">
      <el-input v-model="entity.name"></el-input>
    </el-form-item>
    <el-form-item label="所有歌曲:">
      <el-input disabled></el-input>
    </el-form-item>
    <el-form-item label="演唱者:">
      <el-select v-model="entity.singid" filterable placeholder="请选择" @change="handleChangeSinger">
        <el-option
          v-for="item in SingerItems"
          :key="item.id"
          :label="item.name"
          :value="item.id">
          <span style="float: left;font-size: 24px">{{ item.name }}</span>
          <span style="float: right; color: #8492a6; font-size: 32px"><img :src="$basePath+item.img" class="img"></span>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="出版时间:">
      <el-date-picker
        v-model="entity.publish"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSave">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import API from '../../../api/music/album.js'
  import SingerAPI from '../../../api/music/singer.js'
  export default {
    data(){
      return{
         entity:{},
        loading:0,
        SingerItems:[]
      }
    },
    methods: {
      handleChangeSinger(val){
        this.entity.singerid = val
      },
      newEntity(){
        return {}
      },
      getEntity(id) {
        this.loading++
        API.getEntity(id)
          .then(response => {
            this.loading--
            this.entity = Object.assign({},response.data.obj)
            this.entity.publish = this.$dateFormat(this.entity.publish)
          })
      },
      handleSelectSinger(){
        this.loading++
        SingerAPI.getAll()
          .then(response=>{
            this.loading--
            this.SingerItems=Object.assign([],response.data.obj);
          }).catch(error=>{
          this.loading--
          this.$message.error("服务器未知错误！")
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
          API.save(this.entity)
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
        this.handleSelectSinger()
        if (id){
          this.getEntity(id)
        } else{
          this.entity = {}
          this.entity.click = 0
          this.entity.search = 0
        }
      },

      handleUploadFail(){
        console.log("loadingFail...")
      },
      handleAvatarSuccess(res, file) {
        this.entity.img = res
      },
      beforeAvatarUpload(file) {
       /* const isJPG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;*/
      }
    }
  }
</script>

<style>
  .img{
    height: 35px;
    width: 35px;
    position: center;
  }

</style>
