import { getList, getAreaList, getConstantList, addSupplier, deleteSupplier, getFileList, getSupplier, editSupplier } from '@/api/supplier'
// import { getToken, setToken, removeToken } from '@/utils/auth'

const supplier = {
  state: {
  },

  mutations: {
  },

  actions: {
    // 获取供应商列表数据
    getSupplierList({ commit }, param) {
      return new Promise((resolve, reject) => {
        getList(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取省市区列表数据
    getAreas({ commit }, param) {
      return new Promise((resolve, reject) => {
        getAreaList(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取结算方式/附加服务/行业/品牌
    getConstant({ commit }, param) {
      return new Promise((resolve, reject) => {
        getConstantList(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 新增供应商
    createSupplier({ commit }, param) {
      return new Promise((resolve, reject) => {
        addSupplier(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 更新供应商
    updateSupplier({ commit }, param) {
      return new Promise((resolve, reject) => {
        editSupplier(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取供应商详情
    editSupplier({ commit }, param) {
      return new Promise((resolve, reject) => {
        getSupplier(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除供应商
    delete({ commit }, param) {
      return new Promise((resolve, reject) => {
        deleteSupplier(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取附件列表
    getFileList({ commit }, param) {
      return new Promise((resolve, reject) => {
        getFileList(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default supplier
