<template>
    <el-form  label-width="80px" label-position="left" :model="entity" v-loading="loading" ref="window" :rules="rules">
        <el-form-item label="图片:">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8080/project/music-manager/file/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="entity.img" :src="$basePath +entity.img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户名:"prop="username">
          <el-input v-model="entity.username"></el-input>
        </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="entity.password" ></el-input>
      </el-form-item>
        <el-form-item label="昵称:" prop="nickname">
          <el-input v-model="entity.nickname"></el-input>
        </el-form-item>
        <el-form-item label="性别:" prop="gender">
          <el-radio v-model="entity.gender" :label="0">
            男
          </el-radio>
          <el-radio v-model="entity.gender" :label="1">
            女
          </el-radio>
        </el-form-item>
        <el-form-item label="电话:" prop="phone">
          <el-input v-model="entity.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="entity.email"></el-input>
        </el-form-item>
        <el-form-item label=":签名" prop="sign">
          <el-input type="textarea" v-model="entity.sign"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="handleSave">保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
  import API from '../../../api/music/user.js'
  export default {
    data(){
      return{
        entity:{},
        loading:0,
        rules:{
          username: [
            { required: true, trigger: 'blur',message:'用户名不能为空' },
            { min:2,max:10,message:'长度必须要2-10个字之间', trigger: 'blur'}
          ],
          password: {
            required: true, trigger: 'blur',message:'请输入密码'
          },
          nickname:[
            {required: true, trigger: 'blur',message:'昵称不能为空'},
            { min:2,max:15,message:'长度必须在2-15个字之间', trigger: 'blur'},
          ],
          gender: {
            required: true, trigger: 'blur'
          },
          phone: [
      /*      {type:'integer',message:'请输入正确的手机号码', trigger: 'blur' },*/
            {type:'string', min:11,max:11,message:'手机号码必须时11位数' , trigger: 'blur'}
            ],
          email: {
            type:'email',message:'请输入正确的邮箱格式', trigger: 'blur'
          },
          sign: {
            max:150,message:'最多不能超过150个字', trigger: 'blur'
          }
        }
      }
    },
    methods: {
      newEntity(){
        return {
        }
      },
      getEntity(id) {
        this.loading++
        API.getEntity(id)
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
          API.save(this.entity)
            .then(_ => {
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
          this.entity = Object.assign({},this.newEntity())
        }
      },
      handleAvatarSuccess(res, file) {
        this.entity.img = res
      },
      beforeAvatarUpload(res,file){
        const fileType = file.name.substring(file.name.lastIndexOf('.')+1,file.name.length)
        console.log(fileType)
        if(fileType!=='png'){
          this.$message.error('图片格式错误，只支持png格式')
          return false;
        }
      }
      /*beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }*/
    }
  }
</script>

<style scoped>

</style>
