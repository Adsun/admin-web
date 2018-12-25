<!--员工管理-->
<template>
  <div class="app-container">
    <el-col :span="18">
      <el-button style="float: left" @click="addDialog = true">添加</el-button>
    </el-col>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="70"/>
      <el-table-column prop="courseDate" label="日期" width="200"/>
      <el-table-column prop="courseTime" label="课程时间" width="200"/>
      <el-table-column prop="courseDtl" label="课程内容" width="200"/>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="editCoursePlan(scope.row)">编辑</el-button>
          <el-button type="text" @click="deleteCoursePlan(scope.row)">删除</el-button>
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
        <el-form-item label="日期" prop="courseDate">
          <el-col>
            <el-input v-model="createData.courseDate" autocomplete="off"/>
          </el-col>
        </el-form-item>
        <el-form-item label="课程时间" prop="courseTime">
          <el-col>
            <el-input type="textarea"
                    :autosize="{ minRows: 2, maxRows: 10}" v-model="createData.courseTime" autocomplete="off"/>
          </el-col>
        </el-form-item>
        <el-form-item label="课程内容" prop="courseDtl">
          <el-col>
            <el-input type="textarea"
                    :autosize="{ minRows: 2, maxRows: 10}"
                    v-model="createData.courseDtl" autocomplete="off"/>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="createCoursePlan('createData')">确 定</el-button>
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
      courseId: null,
      searchformData: {
        // 查询参数
        courseId: null,
        number: 1,
        size: 10
      },
      constantList: [],
      totalPage: 1, // 总页数
      tableData: [], // 列表数据
      createData: {
        id: "",
        courseDate: "",
        courseTime:"",
        courseDtl:"",
        courseId:"",
      },
      addDialog: false // 弹窗是否显示
    };
  },
  watch: {
    // 清除form表单数据
    addDialog(curVal, oldVal) {
      if (!curVal && oldVal) {
        this.createData = {
        id: "",
        courseDate: "",
        courseTime:"",
        courseDtl:"",
        courseId:"",
      } // form表单重置
      }
    }
  },
  created() {
    this.courseId = this.$route.query.courseId;
    this.searchformData.courseId = this.$route.query.courseId;
    this.getCoursePlanList();
  },
  methods: {
    getCoursePlanList() {
      this.$store
        .dispatch("getCoursePlanList", this.searchformData)
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
      this.getCoursePlanList();
    },
    // 新建用户
    createCoursePlan(form) {
      this.$refs[form].validate(valid => {
        if (this.courseId === null) {
          this.$message({
                  type: "waring",
                  message: "当前课程信息有误"
                });
          return
        }
        this.createData.courseId = this.courseId
        if (valid) {
          this.$store
            .dispatch("editCoursePlan", this.createData)
            .then(resolve => {
              if (resolve.code == 200) {
                this.getCoursePlanList(); // 刷新列表数据
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
    editCoursePlan(row) {
      console.log(row);
      this.$set(this.createData, "id", row.id);
      this.$set(this.createData, "courseDate", row.courseDate);
      this.$set(this.createData, "courseTime", row.courseTime);
      this.$set(this.createData, "courseDtl", row.courseDtl);
      this.$set(this.createData, "courseId", this.courseId);
      this.addDialog = true;
    },
    //  点击分页
    toPage(e) {
      this.$set(this.searchformData, "number", e);
      this.getCoursePlanList();
    },
    // 删除用户
    deleteCoursePlan(row) {
      MessageBox.confirm("您确定要删除吗？", {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("deleteCoursePlan", { id: row.id })
            .then(resolve => {
              if (resolve.code === 200) {
                this.$set(this.searchformData, "number", 1);
                this.getCoursePlanList();
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

