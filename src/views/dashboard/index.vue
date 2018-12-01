<template>
  <div class="dashboard-container">
    <div class="dashboard-text" style="margin-bottom: 30px; margin-left: 90px">最新动态</div>
    <!--<div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div>-->
    <el-form>
      <el-col :span="8">
        <ul style="margin-right: 150px">
          <li v-for="dataTime in items" style="list-style: none; margin-bottom: 20px; margin-left: 50px">{{dataTime.createDatetime}}
          </li>
        </ul>
      </el-col>
      <el-col :span="10">
        <ul style="margin-right: 150px">
          <li v-for="dataTime in items" style="list-style: none; margin-bottom: 20px">
            {{dataTime.fullName}}{{dataTime.handleLog}}
            <!--<router-link :to="'/createSupplier'">-->
              <span v-model="dataTime.urlText">11</span>
            <!--</router-link>-->
          </li>
        </ul>
      </el-col>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
//  name: 'Dashboard',
//  computed: {
//    ...mapGetters([
//      'name',
//      'roles'
//    ])
//  }
  data() {
    return {
      items: [{ // 时间信息
        createDatetime: '', // 用户id
        fullName: '', // 用户姓名
        handleLog: '', // 操作日志类型
        urlText: '', // 供应商名称/项目名称
        url: '' // 跳转链接
      }],
    }
  },
  created(){
    this.getLogList() // 请求搜索姓名
  },
  methods: {
    getLogList () {
      this.isShow = !this.isShow;
      this.$store.dispatch("userHandleLog").then(resolve => {
        if (resolve.code === 200) {
            this.items = resolve.data
        } else {
          this.$message({
            message: "获取员工数据失败",
            type: "warning"
          })
        }
      }).catch(() => {
        this.loading = false;
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
