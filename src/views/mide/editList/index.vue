<!--员工管理-->
<template>
  <div class="app-container">
    <el-col :span="18">
      <el-button style="float: left" @click="edit()">添加</el-button>
    </el-col>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="50"/>
      <el-table-column prop="constantName" label="页面类型" width="150"/>
      <el-table-column prop="title" label="页面标题" width="150"/>
      <el-table-column prop="subTitle" label="副标题" width="150"/>
      <el-table-column prop="time" label="发布时间" width="150"/>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row)">页面编辑</el-button>
          <el-button type="text" @click="deleteEdit(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-row class="pageDoct">
      <el-col>
        <el-pagination
          background
          layout="prev, pager, next, jumper"
          page-size.sync="searchformData.size"
          :pager-count="7"
          :page-count="totalPage"
          @current-change="toPage"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { validatMobile } from "@/utils/validate";
import { Message, MessageBox } from "element-ui";

export default {
  data() {
    return {
      searchformData: {
        // 查询参数
        number: 1,
        size: 10
      },
      totalPage: 1, // 总页数
      tableData: [], // 列表数据
    };
  },
  created() {
    this.getEditList();
  },
  methods: {
    getEditList() {
      this.$store
        .dispatch("getEditList", this.searchformData)
        .then(resolve => {
          if (resolve.code == 200) {
            this.tableData = resolve.data.content;
            this.totalPage = resolve.data.totalPages;
          }
        })
        .catch(err => {
          this.$message({
            type: "waring",
            message: err
          });
        });
    },
    // 查询
    search() {
      this.$set(this.searchformData, "number", 1);
      this.getEditList();
    },
    
    edit(row) {
      this.$router.push({
        name:'edit',
        query :{
          id:row.id
        }
      })
    },
    //  点击分页
    toPage(e) {
      this.$set(this.searchformData, "number", e);
      this.getEditList();
    },
    // 删除用户
    deleteEdit(row) {
      MessageBox.confirm("您确定要删除吗？", {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("deleteEdit", { id: row.id })
            .then(resolve => {
              if (resolve.code === 200) {
                this.$set(this.searchformData, "number", 1);
                this.getEditList();
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
              } else {
                this.$message({
                  message: res.desc,
                  type: "success"
                });
              }
            })
            .catch(res => {
              this.$message({
                message: "系统繁忙",
                type: "warning"
              });
            });
        })
        .catch(res => {
          this.$message({
            message: "已取消删除",
            type: "warning"
          });
        });
    }
  }
};
</script>

<style scoped>
.formData {
  display: inline-block;
}
.el-select {
  display: block;
}
.title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
}
.card {
  margin: 0;
}
</style>

