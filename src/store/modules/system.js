import { getUserList, addUser, updateConstant, getLimits, deleteUser, getUserLimit, updateUserLimit } from '@/api/system'

const system = {
    state: {},

    mutations: {},
    actions: {
        // 获取用户列表
        getUserList({ commit }, param) {
            return new Promise((resolve, reject) => {
                getUserList(param).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 新增编辑用户信息
        creatUser({ commit }, param) {
            return new Promise((resolve, reject) => {
                addUser(param).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 删除用户
        removeUser({ commit }, params) {
            return new Promise((resolve, reject) => {
                deleteUser(params).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}
export default system