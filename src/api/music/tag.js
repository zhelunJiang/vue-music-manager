import crud from './curd'
import request from '../axio_config'
export default {
  ...crud('project/music-manager/tag/'),
  getMusicById(id) {
    const url='project/music-manager/tag/getMusicTags'
    return request({
      url,
      method:'GET',
      params:{
        id
      }
    })
  }
}
