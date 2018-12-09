<!--员工管理-->
<template>
  <div class="app-container">
    <el-col :span="18">
      <el-button style="float: left" @click="addDialog = true">添加</el-button>
    </el-col>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="50"/>
      <el-table-column prop="constantName" label="课程类别" width="80"/>
      <el-table-column prop="courseName" label="课程名称" width="80"/>
      <el-table-column prop="startTime" label="开始时间" width="80"/>
      <el-table-column prop="price" label="价格" width="80"/>
      <el-table-column prop="courseDtl" label="课程详情" width="150"/>
      <el-table-column prop="imgUrl" label="课程图片" width="150">
        <template slot-scope="scope">
          <img :src="scope.row.imgUrl" alt style="width: 100px;height: 50px">
        </template>
      </el-table-column>
      <el-table-column prop="teacher" label="教师姓名" width="80"/>
      <el-table-column prop="teacherDtl" label="教师简介" width="150"/>
      <el-table-column prop="teacherImg" label="教师图片" width="150">
        <template slot-scope="scope">
          <img :src="scope.row.teacherImg" alt style="width: 100px;height: 50px">
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="coursePlan(scope.row)">课程计划</el-button>
          <el-button type="text" @click="editCourse(scope.row)">编辑</el-button>
          <el-button type="text" @click="deleteCourse(scope.row)">删除</el-button>
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
        <el-form-item label="课程类别" prop="constantId">
          <el-select v-model="createData.constantId" placeholder="请选择">
            <el-option
              v-for="constant in constantList"
              :key="constant.constantId"
              :label="constant.constantName"
              :value="constant.constantId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程名称" prop="courseName">
          <el-col>
            <el-input v-model="createData.courseName" autocomplete="off"/>
          </el-col>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-col>
            <el-input v-model="createData.startTime" autocomplete="off"/>
          </el-col>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-col>
            <el-input v-model="createData.price" autocomplete="off"/>
          </el-col>
        </el-form-item>
        <el-form-item label="课程详情" prop="courseDtl">
          <el-col>
            <el-input type="textarea"
                    :autosize="{ minRows: 2, maxRows: 10}"
                     v-model="createData.courseDtl" autocomplete="off"/>
          </el-col>
        </el-form-item>
        <el-form-item label="课程图片" prop="imgUrl">
          <el-upload
            action="http://118.24.110.84:18080/picture/upload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :limit="1"
            :before-upload="function(file){return beforeUpload(file,1)}"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :with-credentials="true"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt>
          </el-dialog>
        </el-form-item>
        <el-form-item label="教师姓名" prop="teacher">
          <el-col>
            <el-input v-model="createData.teacher" autocomplete="off"/>
          </el-col>
        </el-form-item>
        <el-form-item label="教师简介" prop="teacherDtl">
          <el-col>
            <el-input type="textarea"
                    :autosize="{ minRows: 2, maxRows: 10}" v-model="createData.teacherDtl" autocomplete="off"/>
          </el-col>
        </el-form-item>
        <el-form-item label="教师图片" prop="teacherImg">
          <el-upload
            action="http://118.24.110.84:18080/picture/upload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :limit="1"
            :before-upload="function(file){return beforeUpload(file,2)}"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :with-credentials="true"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="createCourse('createData')">确 定</el-button>
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
      dialogImageUrl: "",
      dialogVisible: false,
      fileType: "",
      searchformData: {
        // 查询参数
        number: 1,
        size: 10
      },
      constantList: [],
      totalPage: 1, // 总页数
      tableData: [], // 列表数据
      createData: {
        id: "",
        constantId: "",
        courseName:"",
        startTime:"",
        price:"",
        courseDtl:"",
        imgUrl:"",
        teacher: "",
        teacherDtl: "",
        teacherImg: ""
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
        constantId: "",
        courseName:"",
        startTime:"",
        price:"",
        courseDtl:"",
        imgUrl:"",
        teacher: "",
        teacherDtl: "",
        teacherImg: ""
      }// form表单重置
      }
    }
  },
  created() {
    this.getConstantList();
    this.getCourseList();
  },
  methods: {
    // 上传附件前
    beforeUpload(file, type) {
      this.fileType = type
    },
    // 上传成功后
    uploadSuccess(response, file, fileList) {
      this.loading = false;
      if (this.fileType === 1) {
        this.createData.imgUrl = response.data;
      } else {
        this.createData.teacherImg = response.data;
      }
    },
    // 上传失败
    uploadError(file, err) {
      this.loading = false;
      this.$message({
        message: "上传失败",
        type: "warning"
      });
    },
    handleRemove(file, fileList) {
      this.createData.path = ""
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    getCourseList() {
      this.$store
        .dispatch("getCourseList", this.searchformData)
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
    getConstantList() {
      this.$store
        .dispatch("getConstantList", { types: "3" })
        .then(resolve => {
          if (resolve.code == 200) {
            this.constantList = resolve.data;
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
      this.getCourseList();
    },
    // 新建用户
    createCourse(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("editCourse", this.createData)
            .then(resolve => {
              if (resolve.code == 200) {
                this.getCourseList(); // 刷新列表数据
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
    coursePlan(row) {
      this.$router.push({
        name:'coursePlan',
        query :{
          courseId:row.id
        }
      })
    },
    // 编辑
    editCourse(row) {
      console.log(row);
      this.$set(this.createData, "id", row.id);
      this.$set(this.createData, "constantId", row.constantId);
      this.$set(this.createData, "courseName", row.courseName);
      this.$set(this.createData, "startTime", row.startTime);
      this.$set(this.createData, "price", row.price);
      this.$set(this.createData, "courseDtl", row.courseDtl);
      this.$set(this.createData, "imgUrl", row.imgUrl);
      this.$set(this.createData, "teacher", row.teacher);
      this.$set(this.createData, "teacherDtl", row.teacherDtl);
      this.$set(this.createData, "teacherImg", row.teacherImg);
      this.addDialog = true;
    },
    //  点击分页
    toPage(e) {
      this.$set(this.searchformData, "number", e);
      this.getCourseList();
    },
    // 删除用户
    deleteCourse(row) {
      MessageBox.confirm("您确定要删除吗？", {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("deleteCourse", { id: row.id })
            .then(resolve => {
              if (resolve.code === 200) {
                this.$set(this.searchformData, "number", 1);
                this.getCourseList();
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

