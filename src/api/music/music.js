import crud from './curd'
import request from '../axio_config'
export default {
  ...crud('project/music-manager/music/'),
  getList(){
    const url = "project/music-manager/music/getList"
    return request({
      url,
      method:'GET'
    })
  },
  getVo(id){
    const  url ="project/music-manager/music/getVo"
    return request({
      url,
      method:'GET',
      params:{
        id
      }
    })
  }
}
