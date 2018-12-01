<!--附件列表-->
<template>
  <div class="app-container">
    <el-form :inline="true" class="f1">
      <el-form-item label="供应商">
        <el-input placeholder="请输入供应商全名" v-model="supplierName" clearable>
          <el-button slot="append" icon="el-icon-search" @click.native="search(1)"/>
        </el-input>
      </el-form-item>
      <el-form-item label="文件名">
        <el-input placeholder="请输入文件名" v-model="fileName" clearable>
          <el-button slot="append" icon="el-icon-search" @click.native="search(2)" />
        </el-input>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="70" />
      <el-table-column
        prop="supplierName"
        label="供应商"
        width="160" />
      <el-table-column
        prop="fileType"
        label="分类"
        width="150">
        <template slot-scope="scope">
          {{scope.row.fileType == '1' ? '项目附件': ( scope.row.fileType == '2' ? '供应商附件': '供应商其它附件')}}
        </template>
      </el-table-column>
      <el-table-column
        prop="fileName"
        label="文件名"
        width="350" />
      <el-table-column
        prop="fileSize"
        label="文件大小"
        width="100" />
      <el-table-column
        prop="state"
        label="状态"
        width="100">
        <template slot-scope="scope">
          {{scope.row.state == '1' ? '正常': '已删除'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="operation"
        label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="exportFile(scope.row.id)">下载</el-button>
          <el-button type="text" size="small" @click="update(scope.row)" v-if="scope.row.state == 2">激活</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="pageDoct">
      <el-col>
        <el-pagination background layout="prev, pager, next, jumper"  page-size.sync="formData.size" :pager-count="7" :page-count="totalPage" @current-change="toPage">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      totalPage:0,// 总页数
      formData:{ // 查询参数
        number:1,
        size:10
      },
      tableData: [], // 列表数据
      supplierName: '', // 供应商名称
      fileName:'' // 文件名称
    }
  },
  created(){
    this.getList()
  },
  methods: {
    // 获取列表数据
    getList(param) {
      let formData= Object.assign({}, param, this.formData)
      this.$store.dispatch('getFileList', formData).then((resolve) => {
        if(resolve.code == 200){
          this.tableData = resolve.data.content
          this.totalPage = resolve.data.totalPages
        }
      }).catch((err) => {
        this.$message({
          type: 'waring',
          message: err
        })
      })
    },
    // 点击分页
    toPage(e) {
      this.$set(this.formData, 'number', e)
      this.getList()
    },
    // 下载
    exportFile(id) {
      location.href = this.baseUrl + '/addFile/download?fileId=' + id
    },
    // 激活附件
    update(row) {
      this.$store.dispatch('update', { id: row.id, state: 1 }).then((resolve) => {
        if (resolve.code === 200) {
          this.getList()
        }
      }).catch((reject) => {
        this.$message({
          type: 'error',
          message: reject
        })
      })
    },
    // 查询
    search(type) {
      let obj = {};
      if(type == 1){
        obj.supplierName = this.supplierName
      }else{
        obj.fileName = this.fileName
      }
      this.getList(obj)
    }
  }
}
</script>

<style scoped>
  .f1{
    margin-bottom: 40px;
  }
</style>

