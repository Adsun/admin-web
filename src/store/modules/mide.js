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
    deleteCourse,
    getCoursePlanList,
    editCoursePlan,
    deleteCoursePlan,
    getResourceList,
    editResource,
    deleteResource,
    getJobList,
    editJob,
    deleteJob,
    getFeedbackList,
    deleteFeedback,
    getEditList,
    getEditListById,
    updateEdit,
    deleteEdit,
    getTeacherList,
    editTeacher,
    deleteTeacher
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
        },
        getCoursePlanList(commit, params) {
            return new Promise((resolve, reject) => {
                getCoursePlanList(params).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        editCoursePlan(commit, params) {
            return new Promise((resolve, reject) => {
                editCoursePlan(params).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        deleteCoursePlan(commit, params) {
            return new Promise((resolve, reject) => {
                deleteCoursePlan(params).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        getResourceList(commit, params) {
            return new Promise((resolve, reject) => {
                getResourceList(params).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        editResource(commit, params) {
            return new Promise((resolve, reject) => {
                editResource(params).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        deleteResource(commit, params) {
            return new Promise((resolve, reject) => {
                deleteResource(params).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        getJobList(commit, params) {
            return new Promise((resolve, reject) => {
                getJobList(params).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        editJob(commit, params) {
            return new Promise((resolve, reject) => {
                editJob(params).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        deleteJob(commit, params) {
            return new Promise((resolve, reject) => {
                deleteJob(params).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        getFeedbackList(commit, params) {
            return new Promise((resolve, reject) => {
                getFeedbackList(params).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        deleteFeedback(commit, params) {
            return new Promise((resolve, reject) => {
                deleteFeedback(params).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        getEditList(commit, params) {
            return new Promise((resolve, reject) => {
                getEditList(params).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        getEditListById(commit, params) {
            return new Promise((resolve, reject) => {
                getEditListById(params).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        updateEdit(commit, params) {
            return new Promise((resolve, reject) => {
                updateEdit(params).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        deleteEdit(commit, params) {
            return new Promise((resolve, reject) => {
                deleteEdit(params).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        getTeacherList(commit, params) {
            return new Promise((resolve, reject) => {
                getTeacherList(params).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        editTeacher(commit, params) {
            return new Promise((resolve, reject) => {
                editTeacher(params).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        deleteTeacher(commit, params) {
            return new Promise((resolve, reject) => {
                deleteTeacher(params).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}
export default mide