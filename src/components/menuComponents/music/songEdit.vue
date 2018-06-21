<template>
  <el-form label-width="80px" v-loading="loading" :model="entity" ref="window">
    <el-row>
      <el-col :span="12">
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
      </el-col>
    </el-row>
    <el-row>
      <el-form-item label="歌曲名称:">
        <el-input v-model="entity.name"></el-input>
      </el-form-item>
      <el-form-item label="歌曲路径:">
        <el-input v-model="entity.path" disabled></el-input>
        <audio :src="$baseMusicFile + entity.path" controls="controls" style="margin-top: 15px" loop />
        <el-upload
          :limit="1"
          action="http://localhost:8080/project/music-manager/file/musicUpload"
          :before-upload="beforeMusicUpload"
          :on-remove="handleRemove"
          :on-success="handleMusicSuccess">
          <el-button size="small" type="primary">修改歌曲</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="歌词路径:">
        <el-input v-model=" entity.lyc" disabled></el-input>
        <el-upload
          :limit="1"
          action="http://localhost:8080/project/music-manager/file/lrcUpload"
          :before-upload="beforeLrcUpload"
          :on-remove="handleRemove"
          :on-success="handleLycSuccess">
          <el-button size="small" type="success">修改歌词</el-button>
        </el-upload>
      </el-form-item>
      <el-col :span="12">
        <el-form-item label="演唱者:">
          <el-select v-model="entity.sname" filterable placeholder="请选择" @change="handleChangeSinger">
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
      </el-col>
      <el-col :span="12">
        <el-form-item label="选择专辑:">
          <el-select v-model="entity.aname" filterable placeholder="请选择"  @change="handleChangeAlbum">
            <el-option
              v-for="item in AlbumItems"
              :key="item.id"
              :label="item.name"
              :value="item.id">
              <span style="float: left;font-size: 24px">{{ item.name }}</span>
              <span style="float: right; color: #8492a6;font-size: 32px"><img :src="$basePath + item.img" class="img"></span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="primary" @click="handleSave" style="margin-top: 20px" size="large">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import MusicAPI from '../../../api/music/music.js'
  import AlbumAPI from '../../../api/music/album.js'
  import SingerAPI from '../../../api/music/singer.js'
  import APlayer from 'vue-aplayer'
  export default {
    components:{
      APlayer
    },
    data(){
      return{
        entity:{
        },
        loading:0,
        SingerItems:[],
        AlbumItems:[]
      }
    },
    methods: {
      beforeMusicUpload(file){
        const fileType = file.name.substring(file.name.lastIndexOf('.')+1,file.name.length)
        if(fileType!=='mp3'){
          this.$message.error("歌曲文件当前只支持mp3格式")
          return false
        }
      },
      beforeLrcUpload(file){
        const fileType = file.name.substring(file.name.lastIndexOf('.')+1,file.name.length)
        if(fileType!=='lrc'){
          this.$message.error("歌词文件当前只支持lrc格式")
          return false
        }
      },
      handleChangeSinger(val){
        this.entity.singerid = val
      },
      handleChangeAlbum(val){
        this.entity.albumid = val;
      },
      handleAvatarSuccess(response, file) {
        this.entity.img = response
      },
      handleLycSuccess(response,file){
        this.entity.lyc = response
      },
      handleMusicSuccess(response,file){
        this.entity.path = response
      },
      handleSelectSinger(){
        this.loading++
        SingerAPI.getAll()
          .then(response=>{
            this.loading--
            this.SingerItems=Object.assign([],response.data.obj);
          }).catch(error=>{
          this.loading--
          this.$message.error("服务器未知错误!")
        })
      },
      handleSelectAlbum(){
        this.loading++
        AlbumAPI.getAll()
          .then(response=>{
            this.loading--
            this.AlbumItems=Object.assign([],response.data.obj);
        }).catch(error=>{
          this.loading--
          this.$message.error("服务器未知错误!")
        })
      },
      newEntity(){
        return {}
      },
      getEntity(id) {
        this.loading++
        MusicAPI.getVo(id)
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
          this.loading++
          MusicAPI.save(this.entity)
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
        this.handleSelectAlbum()
        if (id){
          this.getEntity(id)
        } else{
          this.entity = {}
          this.entity.click=0
          this.entity.search = 0
          this.entity.collect = 0
        }
      },
      beforeAvatarUpload(file) {
        const fileType = file.name.substring(file.name.lastIndexOf('.')+1,file.name.length)
        console.log(fileType)
        if(fileType!=='jpg'){
          this.$message.error('图片格式错误，只支持jpg格式')
          return false;
        }
      },

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    }
  }
</script>

<style scoped>
.img{
  height: 35px;
  width: 35px;
  position: center;
}

</style>
