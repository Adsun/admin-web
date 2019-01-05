<!--员工管理-->
<template>
  <div class="app-container">
    
    <div style="width:800px">
      <el-form :model="createData" label-width="80px" ref='createData'>
      <el-form-item label="页面类型" prop="constantId">
        <el-select v-model="createData.constantId" placeholder="请选择">
          <el-option
            v-for="constant in constantList"
            :key="constant.constantId"
            :label="constant.constantName"
            :value="constant.constantId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图片" prop="imgUrl">
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
      <el-form-item label="页面标题" prop="title">
        <el-col>
          <el-input v-model="createData.title" autocomplete="off"/>
        </el-col>
      </el-form-item>
      <el-form-item label="页面副标题" prop="subTitle">
        <el-col>
          <el-input v-model="createData.subTitle" autocomplete="off"/>
        </el-col>
      </el-form-item>
      <el-form-item label="内容简介" prop="detail">
          <el-col >
            <el-input type="textarea"
                    :autosize="{ minRows: 2, maxRows: 10}"  
                    v-model="createData.detail" autocomplete="off"/>
          </el-col>
        </el-form-item>
      <el-form-item label="发布时间" prop="time">
        <el-col>
          <el-input v-model="createData.time" autocomplete="off"/>
        </el-col>
      </el-form-item>
    </el-form>
    </div>
    <div ref="editor" style="text-align:left"></div>
    
    
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="createEdit('createData')">确 定</el-button>
    </span>
  </div>
</template>

<script>
import { validatMobile } from "@/utils/validate";
import { Message, MessageBox } from "element-ui";
import E from 'wangeditor'

export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      editor:"",

      constantList: [],
      editorContent: "",
      createData: {
        id: "",
        imgUrl:"",
        constantId: "",
        subTitle: "",
        title: "",
        time: "",
        contextStr: "",
        detail:""
      }
    };
  },
  mounted() {
    var editor = new E(this.$refs['editor']);
    editor.customConfig.onchange = html => {
      this.editorContent = html;
    };
    // editor.customConfig.uploadImgShowBase64 = true;
    editor.customConfig.uploadImgServer = 'http://118.24.110.84:18080/picture/uploadFile'
    editor.customConfig.withCredentials = true
    editor.customConfig.uploadFileName = 'file'
    editor.create();
    this.editor = editor
  },
  created() {
    this.getConstantList()
    if (this.$route.query.id) {
      this.getEditListById(this.$route.query.id)
    }
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
    getEditListById(eid) {
       this.$store
        .dispatch("getEditListById", { id: eid })
        .then(resolve => {
          if (resolve.code == 200) {
            this.createData = resolve.data;
            this.editorContent = this.createData.contextStr;
            this.editor.txt.html(this.createData.contextStr);
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
        .dispatch("getConstantList", { types: "5" })
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
    // 新建用户
    createEdit(form) {
      this.createData.contextStr = this.editorContent
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("updateEdit", this.createData)
            .then(resolve => {
              if (resolve.code == 200) {
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

