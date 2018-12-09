<!--员工管理-->
<template>
  <div class="app-container">
    <el-col :span="18">
      <el-button style="float: left" @click="addDialog = true">添加</el-button>
    </el-col>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="50"/>
      <el-table-column prop="name" label="职位名称" width="200"/>
      <el-table-column prop="englishName" label="职位英文名" width="200"/>
      <el-table-column prop="jobDtl" label="职位详情" width="300"/>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="editJob(scope.row)">编辑</el-button>
          <el-button type="text" @click="deleteJob(scope.row)">删除</el-button>
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
    <!--添加按钮弹窗-->
    <el-dialog :visible.sync="addDialog" width="30%" center>
      <el-form :model="createData" label-width="80px" ref="createData">
        <el-form-item label="职位名称" prop="name">
          <el-col>
            <el-input v-model="createData.name" autocomplete="off"/>
          </el-col>
        </el-form-item>
        <el-form-item label="职位英文名" prop="englishName">
          <el-col>
            <el-input v-model="createData.englishName" autocomplete="off"/>
          </el-col>
        </el-form-item>
        <el-form-item label="职位详情" prop="jobDtl">
          <el-col>
            <el-input type="textarea"
                    :autosize="{ minRows: 2, maxRows: 10}"
                     v-model="createData.jobDtl" autocomplete="off"/>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="createJob('createData')">确 定</el-button>
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
        size: 10
      },
      totalPage: 1, // 总页数
      tableData: [], // 列表数据
      createData: {
        id: "",
        jobDtl: "",
        name:"",
        englishName:""
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
    this.getJobList();
  },
  methods: {
    getJobList() {
      this.$store
        .dispatch("getJobList", this.searchformData)
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
      this.getJobList();
    },
    // 新建用户
    createJob(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("editJob", this.createData)
            .then(resolve => {
              if (resolve.code == 200) {
                this.getJobList(); // 刷新列表数据
                this.addDialog = false; // 隐藏新增的diglog
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
    // 编辑
    editJob(row) {
      console.log(row);
      this.$set(this.createData, "id", row.id);
      this.$set(this.createData, "jobDtl", row.jobDtl);
      this.$set(this.createData, "name", row.name);
      this.$set(this.createData, "eName", row.eName);
      this.addDialog = true;
    },
    //  点击分页
    toPage(e) {
      this.$set(this.searchformData, "number", e);
      this.getJobList();
    },
    // 删除用户
    deleteJob(row) {
      MessageBox.confirm("您确定要删除吗？", {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("deleteJob", { id: row.id })
            .then(resolve => {
              if (resolve.code === 200) {
                this.$set(this.searchformData, "number", 1);
                this.getJobList();
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

