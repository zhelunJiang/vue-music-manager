import request from '../axio_config'
export default (baseUrl)=>{
    return {
      getEntity(id){
        const url = baseUrl + 'get'
        return request({
          url,
          method: 'get',
          params: {
            id
          }
        })
      },
      getAll(){
        const url = baseUrl + 'getAll'
        return request({
          url,
          method:'GET',
        })
      },
      getPage(filter,page){
        const url = baseUrl + 'page'
        for(const key in filter){
          if(filter[key] = '') {
            filter[key] = null
          }
          page.list = null
          return request({
            url,
            method: 'get',
            params: {
              filterJson: JSON.stringify(filter),
              pageQueryJson: JSON.stringify(page)
            }
          })
        }
      },
      save(entity){
        const url = baseUrl + 'save'
        return request({
          url,
          method: 'POST',
          data:entity
        })
      },
      remove(id) {
        const  url = baseUrl + 'delete'
        return request({
          url,
          method: 'GET',
          params:{
            id
          }
        })
      }
    }
}
