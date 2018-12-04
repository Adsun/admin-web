<!--员工管理-->
<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="资源报错" name="1">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" label="序号" width="50"/>
          <el-table-column prop="name" label="资源分类" width="200"/>
          <el-table-column prop="detail" label="错误描述" width="500"/>
          <el-table-column prop="operation" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="deleteFeedback(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="联系我们" name="2">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" label="序号" width="50"/>
          <el-table-column prop="name" label="姓名" width="150"/>
          <el-table-column prop="city" label="所在城市" width="150"/>
          <el-table-column prop="email" label="邮箱" width="150"/>
          <el-table-column prop="phone" label="手机号" width="150"/>
          <el-table-column prop="detail" label="详情" width="350"/>
          <el-table-column prop="operation" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="deleteFeedback(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

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
      activeName: '1',
      searchformData: {
        // 查询参数
        type: 1,
        number: 1,
        size: 10
      },
      totalPage: 1, // 总页数
      tableData: [], // 列表数据
    };
  },
  created() {
    this.getFeedbackList();
  },
  methods: {
    handleClick(tab, event) {
        this.searchformData.type = tab.name
        this.getFeedbackList()
    },
    getFeedbackList() {
      this.$store
        .dispatch("getFeedbackList", this.searchformData)
        .then(resolve => {
          if (resolve.code == 200) {
            this.tableData = resolve.data.content;
            this.totalPage = resolve.data.totalPages;
          }
        })
        .catch(err => {
          debugger;
          this.$message({
            type: "waring",
            message: err
          });
        });
    },
    // 查询
    search() {
      this.$set(this.searchformData, "number", 1);
      this.getFeedbackList();
    },
    //  点击分页
    toPage(e) {
      this.$set(this.searchformData, "number", e);
      this.getFeedbackList();
    },
    // 删除用户
    deleteFeedback(row) {
      MessageBox.confirm("您确定要删除吗？", {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("deleteFeedback", { id: row.id, type: this.searchformData.type})
            .then(resolve => {
              if (resolve.code === 200) {
                this.$set(this.searchformData, "number", 1);
                this.getFeedbackList();
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

