<!--员工管理-->
<template>
  <div class="app-container">
    <el-col :span="18">
      <el-form :inline="true" :model="searchformData"  label-width="70px" class="formData">
        <el-form-item :model="searchformData" label="账号">
          <el-input placeholder="请输入账号" v-model="searchformData.userName">
            <el-button slot="append" icon="el-icon-search" @click="search"/>
          </el-input>
        </el-form-item>
      </el-form>
      <el-button style="float: right" @click="addDialog = true">添加账号</el-button>
    </el-col>

    <el-table
      :data="tableData"
      style="width: 100%" >
      <el-table-column
        type="index"
        label="序号"
        width="70" />
      <el-table-column
        prop="userName"
        label="账号"
        width="200" />
      <el-table-column
        prop="fullName"
        label="姓名"
        width="160" />
      <el-table-column
        prop="operation"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="editUser(scope.row)">编辑</el-button>
          <el-button type="text" @click="deleteData(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-row class="pageDoct">
      <el-col>
        <el-pagination background layout="prev, pager, next, jumper"  page-size.sync="searchformData.size" :pager-count="7" :page-count="totalPage" @current-change="toPage">
        </el-pagination>
      </el-col>
    </el-row>
    <!--添加员工按钮弹窗-->
    <el-dialog :visible.sync="addDialog" width="30%" center>
      <el-form :model="createData" label-width="80px" ref="createData" :rules="createDataRules">
        <el-form-item label="账号" prop="userName">
          <el-col :span="18">
            <el-input v-model="createData.userName" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item label="姓名" prop="fullName">
          <el-col :span="18">
            <el-input v-model="createData.fullName" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item label="密码"  prop="passWord">
          <el-col  :span="18">
            <el-input type="password" v-model="createData.passWord" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item label="确认密码"  prop="checkPassWord">
          <el-col  :span="18">
            <el-input type="password" v-model="createData.checkPassWord" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item prop="adminInd">
          <el-col  :span="18">
            <el-checkbox v-model="createData.adminInd">管理员账号</el-checkbox>
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
import { validatMobile } from '@/utils/validate'
import { Message, MessageBox } from 'element-ui'

export default {
  data() {
    const validatePassWord = (rule, value, callback) => {
      if (value != this.createData.passWord) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("密码不能小于5位"));
      } else {
        callback();
      }
    }
    return {
      searchformData: { // 查询参数
        userName: '',
        number: 1,
        size: 15
      },
      totalPage: 1, // 总页数
      tableData: [], // 列表数据
      createData: {
        id: null, // 用户id,新增不用上传
        userName: '', // 账户
        fullName: '', // 用户名
        passWord: '', // 密码
        checkPassWord: '',
        adminInd: false
      },
      createDataRules: { // 新建用户的验证
        userName: { required: true, message: '请输入账号', trigger: 'change' },
        fullName: { required: true, message: '请输入姓名', trigger: 'change' },
        passWord: { required: true, message: '请输入密码', trigger: 'change', message: '密码不能小于5位', validator: validatePass },
        checkPassWord: { required: true, validator: validatePassWord,  message: '两次输入密码不一致', trigger: 'change' },
      },
      addDialog: false, // 新增员工的弹窗是否显示
    }
  },
  watch: {
    // 新增编辑用户弹窗隐藏时，清除form表单数据
    'addDialog'(curVal, oldVal) {
      if (!curVal && oldVal) {
        this.createData = {
        id: null, // 用户id,新增不用上传
        userName: '', // 账户
        fullName: '', // 用户名
        passWord: '', // 密码
        checkPassWord: '',
        adminInd: false
      }// 新增联系人的form表单重置
      }
    },
  },
  created() {
    this.getList()
  },
  methods: {
    // 请求用户列表数据
    getList () {
      
      this.$store.dispatch('getUserList', this.searchformData).then((resolve) => {
        debugger
        if(resolve.code == 200){
          this.tableData = resolve.data.content
          this.totalPage = resolve.data.totalPages
        }
      }).catch((err) => {
        debugger
        this.$message({
          type: 'waring',
          message: err
        })
      })
    },
    // 查询
    search () {
      this.$set(this.searchformData, 'number', 1)
      this.getList();
    },
    // 新建用户
    createUser(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$store.dispatch('creatUser', this.createData).then((resolve) => {
            if(resolve.code == 200){
              this.getList() // 刷新列表数据
              this.addDialog = false // 隐藏新增员工的diglog
              this.$message({
                type: 'success',
                message: '保存成功'
              })
            }
          }).catch((err) => {
            this.$message({
              type: 'waring',
              message: err
            })
          })
        }
      })
    },
    // 编辑用户
    editUser(row) {
      console.log(row);
      this.$set(this.createData, 'id', row.id)
      this.$set(this.createData, 'userName', row.userName)
      this.$set(this.createData, 'fullName', row.fullName)
      this.$set(this.createData, 'adminInd', row.adminInd)
      this.addDialog = true;
    },
    //  点击分页
    toPage(e) {
      this.$set(this.searchformData, 'number', e)
      this.getList()
    },
    // 删除用户
    deleteData(row) {
      MessageBox.confirm(
        '您确定要删除该用户吗？',
        {
          confirmButtonText: '确定删除',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        this.$store.dispatch('removeUser', {userId: row.id}).then((res) => {
          if (res.code === 200) {
            this.$set(this.searchformData, 'number', 1);
            this.getList()
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: res.desc,
              type: 'success'
            })
          }
        }).catch((res) => {
          this.$message({
            message: '系统繁忙',
            type: 'warning'
          })
        })
      }).catch((res) => {
        this.$message({
          message: '已取消删除',
          type: 'warning'
        })
      })
    }
  }
}
</script>

<style scoped>
  .formData{
    display: inline-block;
  }
  .el-select{
    display: block;
  }
  .title{
    border-bottom: 1px solid #eee;
    font-size: 14px;
  }
  .card{
    margin: 0;
  }
</style>

