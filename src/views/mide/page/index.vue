<!--员工管理-->
<template>
  <div class="app-container">
    <div>
      <div ref="editor" style="text-align:left"></div>
    </div>
  </div>
</template>

<script>
import { validatMobile } from "@/utils/validate";
import { Message, MessageBox } from "element-ui";
import E from "wangeditor";

export default {
  data() {
    return {
      editorContent: "",
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
  mounted() {
    var editor = new E(this.$refs.editor);
    editor.customConfig.uploadImgShowBase64 = true
    editor.customConfig.onchange = html => {
      this.editorContent = html;
    };
    editor.create();
  },
  methods: {
    getArticleList() {
      this.$store
        .dispatch("getArticleList", this.searchformData)
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
      this.getArticleList();
    },
    // 新建用户
    createArticle(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("editArticle", this.createData)
            .then(resolve => {
              if (resolve.code == 200) {
                this.getArticleList(); // 刷新列表数据
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
    editArticle(row) {
      console.log(row);
      this.$set(this.createData, "id", row.id);
      this.$set(this.createData, "articleId", row.articleId);
      this.$set(this.createData, "articleContent", row.articleContent);
      this.$set(this.createData, "contentUrl", row.contentUrl);
      this.addDialog = true;
    },
    //  点击分页
    toPage(e) {
      this.$set(this.searchformData, "number", e);
      this.getArticleList();
    },
    // 删除用户
    deleteArticle(row) {
      MessageBox.confirm("您确定要删除吗？", {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("deleteArticle", { id: row.id })
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

