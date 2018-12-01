<!--项目权限管理-->
<template>
  <div class="app-container">
    <el-form :inline="true" class="f1">
      <el-form-item>
        <el-input placeholder="请输入姓名" v-model="searchData.searchName" clearable>
          <el-button slot="append" icon="el-icon-search" @click.native="getUser" />
        </el-input>
      </el-form-item>
    </el-form>
    <el-form>
      <el-col :span="8">
        <ul style="margin-right: 150px">
          <li v-if="userList.length>0" v-for="limit in userList" style="list-style: none" >
            <el-button type="text" @click="getUserLimit(limit.id)">
              {{limit.name}}({{limit.userName}})
            </el-button>
          </li>
          <li v-else="">暂无数据</li>
        </ul>
      </el-col>
      <el-col :span="16" >
        <div class="app-container">
          <tree-table :data="userLimitList.permissions" :columns="columns" border >
            <el-table-column label="管理员">
              <template slot-scope="scope" v-if="scope.row._level != 1" >
                <el-select  placeholder="请选择" @change  ="changes(scope)" v-model="scope.row.ownerId">
                  <el-option  v-for="item in userList" :label="item.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
                </template>
            </el-table-column>
            <el-table-column label="编辑">
              <template slot-scope="scope"  >
                <el-checkbox v-model="scope.row.post" @change  ="changes(scope)"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="查看">
              <template slot-scope="scope"  >
                <el-checkbox v-model="scope.row.get" @change  ="changes(scope)"></el-checkbox>
              </template>
            </el-table-column>
          </tree-table>
        </div>
      </el-col>
      <el-col class="line">
        <el-button type="primary" class="submitBtn" @click.native="submitLimits">保存</el-button>
      </el-col>
    </el-form>
  </div>
</template>

<script>

  import treeTable from '../../../components/treeTable'
  import ElCheckbox from "../../../../node_modules/element-ui/packages/checkbox/src/checkbox.vue";

  export default {
    components: {
      ElCheckbox,
      treeTable
    },
    data() {
      return {
        searchData: { // 搜索用户姓名的参数
          searchName: ''
        },
        userList:[], // 用户列表数据
        userLimitList:{
          userId:'',
          permissions: []
        }, // 用户权限列表
        columns: [ // 权限第一列树结构
          {
            text: '供应商/项目',
            value: 'name',
            width: 200
          }
        ],
        sd: '22',
        checkData:[],
        isShow: false, // 表单默认隐藏
        add: false, // 添加员工按钮
        power: false, // 权限按钮
        people: [], // 管理员名单
        searchName: '', // 姓名搜索
        items: [{ // 用户信息
          id: '', // 用户id
          name: '', // 用户名
          userName: '' // 用户账号
        }],
        propsList: {
          label: 'name'
        },

      }
    },
    created(){
      this.getUser() // 请求用户列表
    },
    methods: {
      changes(e) {
//        debugger
      },
      // 获取用户数据
      getUser() {
        this.$store.dispatch("getUser", this.searchData).then(resolve => {
          if (resolve.code === 200) {
            this.userList = resolve.data
          }else{
            this.$message({
              message: resolve.desc,
              type: "warning"
            })
          }
        }).catch((res) => {
          this.$message({
            message: '请求超时',
            type: "warning"
          })
        })
      },
      // 请求用户列表数据
      getUserLimit (userId) {
        this.$set(this.userLimitList, 'userId', userId);
        this.$store.dispatch("getUserLimit", {userId:userId}).then(resolve => {
          if (resolve.code === 200) {
            this.userLimitList.permissions = resolve.data
          } else {
            this.$message({
              message: res.desc,
              type: "warning"
            })
          }
        }).catch(() => {
          this.$message({
            message: "请求超时",
            type: "warning"
          })
        })
      },
      submitLimits() {
//        console.log(this.userLimitList)
        this.userLimitList.permissions.forEach(function (item) {
          console.log(item)
          item.children.map(function (newchild,index) {
            delete newchild.parent
            return newchild
          })
        })
        this.$store.dispatch("updateUserLimits", this.userLimitList).then(resolve => {
          if (resolve.code === 200) {
            this.$message({
              message: '保存成功',
              type: "success"
            })
          }else{
            this.$message({
              message: resolve.desc,
              type: "warning"
            })
          }
        }).catch((res) => {
          this.$message({
            message: '请求超时',
            type: "warning"
          })
        })
      }
    }
  }
</script>

<style scoped>
  .line{
    text-align: center;
  }
  .f1{
    margin-bottom: 40px;
  }
  .submitBtn{
    width: 150px;
  }
</style>

