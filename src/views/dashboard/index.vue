<template>
  <div class="dashboard-container">
    <div class="dashboard-text" style="margin-bottom: 30px; margin-left: 90px">欢迎你，{{sessionStorage.fullName}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      sessionStorage: {
        fullName: sessionStorage['fullName'] // fullName值保存
      }
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
