import {
    getConstantList,
    getArticleList,
    editArticle,
    deleteArticle,
    getPictureList,
    editPicture,
    deletePicture,
    getCourseList,
    editCourse,
    deleteCourse
} from '@/api/mide'

const mide = {
    state: {},

    mutations: {},
    actions: {
        getConstantList(commit, params) {
            return new Promise((resolve, reject) => {
                getConstantList(params).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        getArticleList(commit, params) {
            return new Promise((resolve, reject) => {
                getArticleList(params).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        editArticle(commit, params) {
            return new Promise((resolve, reject) => {
                editArticle(params).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        deleteArticle(commit, params) {
            return new Promise((resolve, reject) => {
                deleteArticle(params).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        getPictureList(commit, params) {
            return new Promise((resolve, reject) => {
                getPictureList(params).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        editPicture(commit, params) {
            return new Promise((resolve, reject) => {
                editPicture(params).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        deletePicture(commit, params) {
            return new Promise((resolve, reject) => {
                deletePicture(params).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        getCourseList(commit, params) {
            return new Promise((resolve, reject) => {
                getCourseList(params).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        editCourse(commit, params) {
            return new Promise((resolve, reject) => {
                editCourse(params).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        deleteCourse(commit, params) {
            return new Promise((resolve, reject) => {
                deleteCourse(params).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}
export default mide