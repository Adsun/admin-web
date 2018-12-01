<!--进行中项目-->
<template>
  <div class="app-container">
    <el-form :inline="true" class="f1">
      <el-form-item label="项目名称">
        <el-input placeholder="请输入项目名称" v-model="onGoing.projectName" clearable>
          <el-button slot="append" icon="el-icon-search" @click.native="search"/>
        </el-input>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="序号"
        width="70" />
      <el-table-column
        prop="projectName"
        label="项目名称"
        width="300" />
      <el-table-column
        prop="customerName"
        label="客户"
        width="160" />
      <el-table-column
        prop="schedule"
        label="当前进度"
        width="110" />
      <el-table-column
        prop="ownerName"
        label="管理员"
        width="120" />
      <el-table-column
        prop="updateBy"
        label="最后更新人员"
        width="120" />
      <el-table-column
        prop="operation"
        width="130"
        label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="onSubmit(scope.row)">更新</el-button>
          <el-button size="small" type="text" @click="onFile(scope.row)">归档</el-button>
          <el-button type="text" size="small" @click="onCancel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="pageDoct">
      <el-col>
        <el-pagination background layout="prev, pager, next, jumper"  page-size.sync="onGoing.size" :pager-count="7" :page-count="totalPage" @current-change="toPage">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import ElCol from 'element-ui/packages/col/src/col'
import ElRow from 'element-ui/packages/row/src/row'
import { MessageBox } from 'element-ui';

export default {
  components: {
    ElRow,
    ElCol
  },
  data() {
    return {
      onGoing: {
        projectName: '',
        number: 1,//当前页
        size: 10, //每页大小
      },
      tableData: [],//列表数据
      totalPage:0//总页数
    }
  },
  created() {
    this.getProjectList();
  },
  methods: {
    // 获取项目列表数据
    getProjectList() {
      console.log(this.onGoing);
      this.$store.dispatch('projectUpdateList', this.onGoing).then((resolve) => {
        if(resolve.code == 200){
          this.tableData = resolve.data.content;
          this.totalPage = resolve.data.totalPages;
        }
        
      }).catch((err) => {
        this.$message({
          type:'waring',
          message:err
        })
      })
    },
    //搜索
    search (){
      console.log(this.onGoing.projectName)
      this.getProjectList();
    },
    //点击分页
    toPage(e){
      this.$set(this.onGoing,'number',e)
      this.getProjectList();
    },
    onSubmit(row) {
      this.$router.push({
        // path: '@/views/project/ongoing/update',
        name:'Update',
        query :{
          projectId:row.id
        }
      })
    },
    // 归档弹窗
    onFile(row) {
      console.log(row);
      MessageBox.confirm('您确定要归档该项目吗？', {
        confirmButtonText: '确定归档',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        let state = {}
        state.id = row.id;
        state.contactIds = row.contactIds;
        state.projectName = row.projectName;
        state.customerName = row.customerName;
        state.projectSummary = row.projectSummary;
        state.state = "2";
        state.nodeDtos = [];
        this.$store.dispatch('state', {projectId: row.id,state}).then((resolve) => {
          // debugger
          if (resolve.code === 200) {
            this.getProjectList();
            this.$message({
              type: 'success',
              message: '归档成功!'
            })
          }
        }).catch((res) => {
          this.$message({
            message: res,
            type: 'warning'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '已取消归档'
        })
      })
    },
    // 确认删除弹窗
    onCancel(row) {
      MessageBox.confirm('您确定要删除该项目吗？', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        let state = {}
        state.id = row.id;
        state.contactIds = row.contactIds;
        state.projectName = row.projectName;
        state.customerName = row.customerName;
        state.projectSummary = row.projectSummary;
        state.state = "3";
        state.nodeDtos = [];
        this.$store.dispatch('state', {projectId: row.id,state}).then((resolve) => {
          if (resolve.code === 200) {
            this.getProjectList();
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        }).catch((res) => {
          this.$message({
            message: res,
            type: 'warning'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>
  .line{
    text-align: center;
  }
  .f1{
    margin-bottom: 40px;
  }
</style>

