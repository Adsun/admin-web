<!--员工管理-->
<template>
  <div class="app-container">
    <el-col :span="18">
      <el-button style="float: left" @click="addDialog = true">添加</el-button>
    </el-col>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="70"/>
      <el-table-column prop="picName" label="图片名称" width="200"/>>
      <el-table-column prop="path" label="图片路径" sortable width="400">
        <template slot-scope="scope">
          <img :src="scope.row.path" alt style="width: 100px;height: 50px">
        </template>
      </el-table-column>
      <el-table-column prop="url" label="跳转链接" width="400"/>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="editPicture(scope.row)">编辑</el-button>
          <el-button type="text" @click="deletePicture(scope.row)">删除</el-button>
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
        <el-form-item label="图片名称" prop="picId">
          <el-select v-model="createData.picId" placeholder="请选择">
            <el-option
              v-for="constant in constantList"
              :key="constant.constantId"
              :label="constant.constantName"
              :value="constant.constantId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片" prop="path">
          <el-upload
            action="http://118.24.110.84:18080/picture/upload"
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
        <el-form-item label="跳转链接" prop="url">
          <el-col>
            <el-input v-model="createData.url" autocomplete="off"/>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="createPicture('createData')">确 定</el-button>
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
        picId: "",
        path: "",
        url: ""
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
    this.getPictureList();
  },
  methods: {
    // 上传成功后
    uploadSuccess(file, suss) {
      debugger
      this.loading = false;
      this.createData.path = file.data;
    },
    // 上传失败
    uploadError(file, err) {
      debugger
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
    getPictureList() {
      this.$store
        .dispatch("getPictureList", this.searchformData)
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
        .dispatch("getConstantList", { types: "2" })
        .then(resolve => {
          if (resolve.code == 200) {
            this.constantList = resolve.data;
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
      this.getPictureList();
    },
    // 新建用户
    createPicture(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("editPicture", this.createData)
            .then(resolve => {
              if (resolve.code == 200) {
                this.getPictureList(); // 刷新列表数据
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
    editPicture(row) {
      console.log(row);
      this.$set(this.createData, "id", row.id);
      this.$set(this.createData, "picId", row.picId);
      this.$set(this.createData, "path", row.path);
      this.$set(this.createData, "url", row.url);
      this.addDialog = true;
    },
    //  点击分页
    toPage(e) {
      this.$set(this.searchformData, "number", e);
      this.getPictureList();
    },
    // 删除用户
    deletePicture(row) {
      MessageBox.confirm("您确定要删除吗？", {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("deletePicture", { id: row.id })
            .then(resolve => {
              if (resolve.code === 200) {
                this.$set(this.searchformData, "number", 1);
                this.getPictureList();
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

