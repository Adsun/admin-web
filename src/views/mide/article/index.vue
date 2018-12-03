<!--员工管理-->
<template>
  <div class="app-container">
    <el-col :span="18">
      <el-button style="float: left" @click="addDialog = true">添加</el-button>
    </el-col>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="70"/>
      <el-table-column prop="articleName" label="标签名" width="200"/>
      <el-table-column prop="articleContent" label="内容" width="400"/>
      <el-table-column prop="contentUrl" label="跳转链接" width="400"/>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="editArticle(scope.row)">编辑</el-button>
          <el-button type="text" @click="deleteArticle(scope.row)">删除</el-button>
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
    <!--添加员工按钮弹窗-->
    <el-dialog :visible.sync="addDialog" width="30%" center>
      <el-form :model="createData" label-width="80px" ref="createData" :rules="createDataRules">
        <el-form-item label="标签名" prop="articleId">
          <el-select v-model="createData.articleId" placeholder="请选择">
            <el-option
              v-for="constant in constantList"
              :key="constant.constantId"
              :label="constant.constantName"
              :value="constant.constantId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容" prop="articleContent">
          <el-col :span="18">
            <el-input v-model="createData.articleContent" autocomplete="off"/>
          </el-col>
        </el-form-item>
        <el-form-item label="跳转链接" prop="contentUrl">
          <el-col :span="18">
            <el-input v-model="createData.contentUrl" autocomplete="off"/>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="createUser('createData')">确 定</el-button>
      </span>
    </el-dialog>
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
        size: 15
      },
      constantList: [],
      totalPage: 1, // 总页数
      tableData: [], // 列表数据
      createData: {
        id: "",
        articleId: "",
        articleContent: "",
        contentUrl: ""
      },
      addDialog: false // 弹窗是否显示
    };
  },
  watch: {
    // 清除form表单数据
    addDialog(curVal, oldVal) {
      if (!curVal) {
        this.$refs["createData"].resetFields(); // form表单重置
      }
    }
  },
  created() {
    this.getConstantList();
    this.getArticleList();
  },
  methods: {
    getArticleList() {
      this.$store
        .dispatch("getArticleList", searchformData)
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
    getConstantList() {
      this.$store
        .dispatch("getConstantList", { types: "1,3,4" })
        .then(resolve => {
          if (resolve.code == 200) {
            this.tableData = resolve.data;
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
      this.getArticleList();
    },
    // 新建用户
    createUser(form) {
      debugger;
      this.$refs[form].validate(valid => {
        debugger;

        if (valid) {
          this.$store
            .dispatch("creatUser", this.createData)
            .then(resolve => {
              if (resolve.code == 200) {
                this.getList(); // 刷新列表数据
                this.addDialog = false; // 隐藏新增员工的diglog
                this.$message({
                  type: "success",
                  message: "保存成功"
                });
              }
            })
            .catch(err => {
              this.$message({
                type: "waring",
                message: err
              });
            });
        }
      });
    },
    // 编辑用户
    editUser(row) {
      console.log(row);
      this.$set(this.createData, "id", row.id);
      this.$set(this.createData, "userName", row.userName);
      this.$set(this.createData, "fullName", row.fullName);
      this.$set(this.createData, "adminInd", row.adminInd);
      this.addDialog = true;
    },
    //  点击分页
    toPage(e) {
      this.$set(this.searchformData, "number", e);
      this.getList();
    },
    // 删除用户
    deleteData(row) {
      MessageBox.confirm("您确定要删除该用户吗？", {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("removeUser", { userId: row.id })
            .then(resolve => {
              if (resolve.code === 200) {
                this.$set(this.searchformData, "number", 1);
                this.getList();
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

