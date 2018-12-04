<!--员工管理-->
<template>
  <div class="app-container">
    <el-col :span="18">
      <el-button style="float: left" @click="addDialog = true">添加</el-button>
    </el-col>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="50"/>
      <el-table-column prop="constantName" label="资源类别" width="80"/>
      <el-table-column prop="resName" label="资源名称" width="80"/>
      <el-table-column prop="resContent" label="资源简介" width="150"/>
      <el-table-column prop="imgUrl" label="资源图" width="150">
        <template slot-scope="scope">
          <img :src="scope.row.qrcUrl" alt style="width: 100px;height: 50px">
        </template>
      </el-table-column>
      <el-table-column prop="videoUrl" label="视频地址" width="80"/>
      <el-table-column prop="qrcUrl" label="二维码" width="150">
        <template slot-scope="scope">
          <img :src="scope.row.qrcUrl" alt style="width: 100px;height: 50px">
        </template>
      </el-table-column>
      <el-table-column prop="bdyUrl" label="百度云地址" width="80"/>
      <el-table-column prop="bdyCode" label="提取码" width="150"/>
      
      <el-table-column prop="playUrl" label="播放图标" width="150"> 
        <template slot-scope="scope">
          <img :src="scope.row.qrcUrl" alt style="width: 100px;height: 50px">
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="editResource(scope.row)">编辑</el-button>
          <el-button type="text" @click="deleteResource(scope.row)">删除</el-button>
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
        <el-form-item label="资源类别" prop="constantId">
          <el-select v-model="createData.constantId" placeholder="请选择">
            <el-option
              v-for="constant in constantList"
              :key="constant.constantId"
              :label="constant.constantName"
              :value="constant.constantId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资源名称" prop="resName">
          <el-col>
            <el-input v-model="createData.resName" autocomplete="off"/>
          </el-col>
        </el-form-item>
        <el-form-item label="资源简介" prop="resContent">
          <el-col>
            <el-input type="textarea"
                    :autosize="{ minRows: 2, maxRows: 10}"
                     v-model="createData.resContent" autocomplete="off"/>
          </el-col>
        </el-form-item>
        <el-form-item label="资源图" prop="imgUrl">
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
        <el-form-item label="视频地址" prop="videoUrl">
          <el-col>
            <el-input v-model="createData.videoUrl" autocomplete="off"/>
          </el-col>
        </el-form-item>
        <el-form-item label="二维码" prop="qrcUrl">
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
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt>
          </el-dialog>
        </el-form-item>
        <el-form-item label="百度云地址" prop="bdyUrl">
          <el-col>
            <el-input v-model="createData.bdyUrl" autocomplete="off"/>
          </el-col>
        </el-form-item>
        <el-form-item label="提取码" prop="bdyCode">
          <el-col>
            <el-input v-model="createData.bdyCode" autocomplete="off"/>
          </el-col>
        </el-form-item>
        <el-form-item label="播放图标" prop="playUrl">
          <el-upload
            action="http://118.24.110.84:18080/picture/upload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :limit="1"
            :before-upload="function(file){return beforeUpload(file,3)}"
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
        <el-button type="primary" @click="createResource('createData')">确 定</el-button>
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
        resName:"",
        resContent:"",
        videoUrl:"",
        qrcUrl:"",
        bdyUrl:"",
        bdyCode: "",
        imgUrl: "",
        playUrl: ""
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
    this.getResourceList();
  },
  methods: {
    // 上传附件前
    beforeUpload(file, type) {
      this.fileType = type
    },
    // 上传成功后
    uploadSuccess(response, file, fileList) {
      debugger
      this.loading = false;
      if (this.fileType === 1) {
        this.createData.imgUrl = response.data;
      } else if (this.fileType === 2) {
        this.createData.qrcUrl = response.data;
      } else {
        this.createData.playUrl = response.data;
      }
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
    getResourceList() {
      this.$store
        .dispatch("getResourceList", this.searchformData)
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
        .dispatch("getConstantList", { types: "4" })
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
      this.getResourceList();
    },
    // 新建用户
    createResource(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("editResource", this.createData)
            .then(resolve => {
              if (resolve.code == 200) {
                this.getResourceList(); // 刷新列表数据
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
    editResource(row) {
      console.log(row);
      this.$set(this.createData, "id", row.id);
      this.$set(this.createData, "constantId", row.constantId);
      this.$set(this.createData, "resName", row.resName);
      this.$set(this.createData, "resContent", row.resContent);
      this.$set(this.createData, "videoUrl", row.videoUrl);
      this.$set(this.createData, "qrcUrl", row.qrcUrl);
      this.$set(this.createData, "bdyUrl", row.bdyUrl);
      this.$set(this.createData, "bdyCode", row.bdyCode);
      this.$set(this.createData, "imgUrl", row.imgUrl);
      this.$set(this.createData, "playUrl", row.playUrl);
      this.addDialog = true;
    },
    //  点击分页
    toPage(e) {
      this.$set(this.searchformData, "number", e);
      this.getResourceList();
    },
    // 删除用户
    deleteResource(row) {
      MessageBox.confirm("您确定要删除吗？", {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("deleteResource", { id: row.id })
            .then(resolve => {
              if (resolve.code === 200) {
                this.$set(this.searchformData, "number", 1);
                this.getResourceList();
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

