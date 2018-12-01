<!--供应商管理-->
<template>
  <div class="app-container" style="position: relative;">
    <el-tabs style="margin-bottom: 60px;" @tab-click="handleClick">
      <el-tab-pane label="结算方式管理" name="settlementMethod">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column v-if="false" prop="id"/>
          <el-table-column type="index" label="序号" width="500"/>
          <el-table-column prop="constantValue" label="结算方式" width="600"/>
          <el-table-column prop="operation" label="操作">
            <template slot-scope="scope">
              <el-button  size="small" @click="editConstant(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="附加服务管理" name="addService">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column v-if="false" prop="id"/>
          <el-table-column type="index" label="序号" width="500"/>
          <el-table-column prop="constantValue" label="附加服务" width="600"/>
          <el-table-column prop="operation" label="操作">
            <template slot-scope="scope">
              <el-button  size="small" @click="editConstant(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="行业管理" name="tradeType">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column v-if="false" prop="id"/>
          <el-table-column type="index" label="序号" width="500"/>
          <el-table-column prop="constantValue" label="行业" width="600"/>
          <el-table-column prop="operation" label="操作">
            <template slot-scope="scope">
              <el-button  size="small" @click="editConstant(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="品牌管理" name="brand">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column v-if="false" prop="id"/>
          <el-table-column type="index" label="序号" width="500"/>
          <el-table-column prop="constantValue" label="品牌" width="600"/>
          <el-table-column prop="operation" label="操作">
            <template slot-scope="scope">
              <el-button size="small" @click="editConstant(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-button style="position: absolute; right: 80px; top: 80px;" @click="editConstant(null)">新建</el-button>
  </div>
</template>

<script>
import ElCol from "element-ui/packages/col/src/col";
import ElRow from "element-ui/packages/row/src/row";

export default {
  components: {
    ElRow,
    ElCol
  },
  data() {
    return {
      activeName: "second",
      tableData: [],
      tabName: ""
    };
  },
  methods: {
    handleClick(tab, event) {
      this.tabName = tab.label;
      this.constantType = tab.name;
      this.getConstant(tab.name);
    },
    getConstant(str) {
      this.$store
        .dispatch("getConstant", { constantType: str })
        .then(resolve => {
          if (resolve.code === 200) {
            this.tableData = resolve.data;
          } else {
            this.$message({
              message: "获取供应商常量失败",
              type: "warning"
            });
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    editConstant(row) {
      // 编辑按钮弹窗
      var id = null;
      var value = "";
      if (row != null) {
        id = row.id;
        value = row.constantValue;
      }
      this.$prompt(this.tabName.split("管理")[0], {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: value,
        inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
        inputErrorMessage: "不可为空"
      })
        .then(data => {
          this.$store
            .dispatch("updateConstant", {
              id: id,
              constantType: this.constantType,
              constantValue: data.value
            })
            .then(resolve => {
              if (resolve.code === 200) {
                this.$message({
                  type: "success",
                  message: "保存成功"
                });
                this.getConstant(this.constantType);
              } else {
                this.$message({
                  type: "fail",
                  message: "保存失败"
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "未保存"
          });
        });
    }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
.f1 {
  margin-bottom: 40px;
}
</style>

