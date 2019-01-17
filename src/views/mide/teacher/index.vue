<!--员工管理-->
<template>
  <div class="app-container">
    <el-col :span="18">
      <el-button style="float: left" @click="addDialog = true">添加</el-button>
    </el-col>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="70"/>
      <el-table-column prop="name" label="姓名" width="100"/>
      <el-table-column prop="title" label="介绍标题" width="100"/>
      <el-table-column prop="detail" label="介绍" width="200"/>
      <el-table-column prop="summary" label="简介" width="200"/>
      <el-table-column prop="imgUrl" label="图片" width="200">
        <template slot-scope="scope">
          <img :src="scope.row.imgUrl" alt style="width: 100px;height: 50px">
        </template>
      </el-table-column>
      <el-table-column prop="link" label="跳转链接" width="200"/>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="editTeacher(scope.row)">编辑</el-button>
          <el-button type="text" @click="deleteTeacher(scope.row)">删除</el-button>
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
      <el-form :model="createData" label-width="80px" ref="createData" >
        <el-form-item label="姓名" prop="name">
          <el-col >
            <el-input v-model="createData.name" autocomplete="off"/>
          </el-col>
        </el-form-item>
        <el-form-item label="介绍标题" prop="title">
          <el-col >
            <el-input v-model="createData.title" autocomplete="off"/>
          </el-col>
        </el-form-item>
        <el-form-item label="介绍" prop="detail">
          <el-col >
            <el-input type="textarea"
                    :autosize="{ minRows: 2, maxRows: 10}"  
                    v-model="createData.detail" autocomplete="off"/>
          </el-col>
        </el-form-item>
        <el-form-item label="简介" prop="summary">
          <el-col >
            <el-input type="textarea"
                    :autosize="{ minRows: 2, maxRows: 10}"  
                    v-model="createData.summary" autocomplete="off"/>
          </el-col>
        </el-form-item>
        <el-form-item label="图片" prop="imgUrl">
          <el-upload
            action="http://port.midezaixian.com/picture/upload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :limit="1"
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
        <el-form-item label="跳转链接" prop="link">
          <el-col >
            <el-input v-model="createData.link" autocomplete="off"/>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="createTeacher('createData')">确 定</el-button>
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
        name: "",
        title:"",
        summary: "",
        detail: "",
        imgUrl:"",
        link:""
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
        name: "",
        title:"",
        summary: "",
        detail: "",
        imgUrl:"",
        link:""
      } // form表单重置
      }
    }
  },
  created() {
    this.getTeacherList()
  },
  methods: {
     // 上传成功后
    uploadSuccess(file, suss) {
      this.loading = false;
      this.createData.imgUrl = file.data;
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
      this.createData.imgUrl = ""
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    getTeacherList() {
      this.$store
        .dispatch("getTeacherList", this.searchformData)
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
      this.getTeacherList();
    },
    // 新建用户
    createTeacher(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("editTeacher", this.createData)
            .then(resolve => {
              if (resolve.code == 200) {
                this.getTeacherList(); // 刷新列表数据
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
    editTeacher(row) {
      console.log(row);
      this.$set(this.createData, "id", row.id);
      this.$set(this.createData, "name", row.name);
      this.$set(this.createData, "summary", row.summary);
      this.$set(this.createData, "detail", row.detail);
      this.$set(this.createData, "imgUrl", row.imgUrl);
      this.$set(this.createData, "link", row.link);
      this.$set(this.createData, "title", row.title);
      this.addDialog = true;
    },
    //  点击分页
    toPage(e) {
      this.$set(this.searchformData, "number", e);
      this.getTeacherList();
    },
    // 删除用户
    deleteTeacher(row) {
      MessageBox.confirm("您确定要删除吗？", {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("deleteTeacher", { id: row.id })
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

