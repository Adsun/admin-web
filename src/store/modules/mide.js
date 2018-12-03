import {
  getConstantList,
  getArticleList
} from '@/api/mide'

const mide = {
  state: {},

  mutations: {},
  actions: {
    getConstantList(params) {
      return new Promise((resolve, reject) => {
        getConstantList(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getArticleList(params) {
      return new Promise((resolve, reject) => {
        getArticleList(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default mide
