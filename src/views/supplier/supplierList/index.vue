<!--供应商列表-->
<template>
  <div class="app-container">
    <el-form :inline="true" :model="formData"  label-width="70px">
      <el-col :span="6">
        <el-form-item label="供应商" >
            <el-input v-model="formData.supplierName" placeholder="请输入供应商全名" name="supplierName">
            </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="代理品牌" >
          <el-select collapse-tags v-model="formData.brandIds" placeholder="请选择代理品牌" multiple filterable class="supplierSel">
            <el-option v-for="item in brandsOption" :label="item.constantValue" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="行业">
          <el-select collapse-tags v-model="formData.tradeTypeIds" placeholder="请选择行业" multiple filterable class="supplierSel">
            <el-option v-for="item in tradeTypeOption" :label="item.constantValue" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="开发人员" >
          <el-select collapse-tags v-model="formData.ownerId" placeholder="请选择" class="supplierSel" multiple>
            <el-option v-for="item in userOption" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="结算方式" >
          <el-select collapse-tags v-model="formData.settlementMethodIds" placeholder="请选择" class="supplierSel" multiple>
            <el-option v-for="item in settlementMethodOption" :label="item.constantValue" :value="item.id" />
          </el-select>
      </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="推荐指数" >
            <el-select  collapse-tags v-model="formData.stars" placeholder="全部" name="stars" multiple>
              <el-option label="全部" value=""/>
              <el-option label="一星" value="1"/>
              <el-option label="二星" value="2"/>
              <el-option label="三星" value="3"/>
              <el-option label="四星" value="4"/>
              <el-option label="五星" value="5"/>
            </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="附加服务">
            <el-select collapse-tags v-model="formData.addServiceIds" placeholder="一键代发" multiple>
              <el-option v-for="item in addServiceOption" :label="item.constantValue" :value="item.id" />
            </el-select>
        </el-form-item>
      </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button @click="toSearch">查询</el-button>
          </el-form-item>
        </el-col>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        type="index"
        label="序号" />
      <el-table-column
        prop="supplierName"
        label="供应商" >
        <template slot-scope="scope">
          <el-col class="supplierName">
           {{scope.row.supplierName}}
          </el-col>
          <el-col>
            <el-rate
              v-model="scope.row.stars"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate>
          </el-col>
          <el-col>
            <div class="service" v-for="(item, index) in scope.row.addServices" v-if="index<3">{{item.constantValue}}</div>
          </el-col>
          <el-col class="uploadDate">
            更新时间：{{scope.row.updateDatetime}}
          </el-col>
        </template>
      </el-table-column>
      <el-table-column
        prop="tradeTypes"
        label="行业">
        <template slot-scope="scope">
          <el-col v-for="item in scope.row.tradeTypes">
            {{item.constantValue}}
          </el-col>
        </template>

      </el-table-column>
      <el-table-column
        prop="brands"
        label="代理品牌">
        <template slot-scope="scope">
          <el-col v-for="item in scope.row.brands">
            {{item.constantValue}}
          </el-col>
        </template>
      </el-table-column>
      <el-table-column
        prop="settlementMethodDto.constantValue"
        label="结算方式"/>
      <el-table-column
        prop="ownerDto.fullName"
        label="开发人员"
      width="120"/>
      <el-table-column
        prop="operation"
        label="操作">
        <template slot-scope="scope">
          <router-link :to="'/supplierList/edit/'+scope.row.id" class="link-type">
            <span>查看</span>
          </router-link>
          <el-button type="text"  @click="deleteData(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="pageDoct">
      <el-col>
        <el-pagination background layout="prev, pager, next, jumper"  page-size.sync="formData.size" :pager-count="7" :page-count="totalPage" @current-change="toPage">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import ElCol from 'element-ui/packages/col/src/col'
import ElRow from 'element-ui/packages/row/src/row'
import { Message, MessageBox } from 'element-ui'

export default {
  components: {
    ElRow,
    ElCol },
  data() {
    return {
      addServiceOption:[],//附加服务的选项
      tradeTypeOption:[],//行业的选项
      settlementMethodOption:[],//结算方式的选项
      brandsOption:[],//品牌选项
      userOption:[],// 开发人员选项
      tableData: [],//表格数据
      formData: { // form表单数据
        supplierName: '', // 供应商名称
        stars: [], // 星级
        settlementMethodIds: [], // 结算方式
        addServiceIds: [], // 附加服务
        tradeTypeIds: [], // 行业
        brandIds: [], // 品牌
        ownerId: [], // 开发人员ID
        number: 1, // 当前页 从0开始
        size: 1 // 每页大小
      },
      totalPage:0,//总页数
      add: false,
      reduce: false,
      listAdd: false,
      brand: false,
      value1: null,
      newSupplier: {
        name: '',
        region: '',
        type: [],
        desc: ''
      }
    }
  },
  created() {
    this.getList();// 请求供应商列表
    this.getConstant('settlementMethod'); //请求结算方式
    this.getConstant('addService'); // 请求附加服务
    this.getConstant('tradeType'); // 请求行业
    this.getConstant('brand'); // 请求品牌
    this.getUser()
  },
  methods: {
    // 获取供应商列表数据
    getList() {
        let formData = JSON.parse(JSON.stringify(this.formData))
      formData.stars= formData.stars.toString(), // 星级
        formData.settlementMethodIds= formData.settlementMethodIds.toString(), // 结算方式
        formData.addServiceIds= formData.addServiceIds.toString(), // 附加服务
        formData.tradeTypeIds= formData.tradeTypeIds.toString(), // 行业
        formData.brandIds= formData.brandIds.toString(), // 品牌
        formData.ownerId= formData.ownerId.toString(), // 开发人员ID
      this.$store.dispatch('getSupplierList', formData).then((resolve) => {
        if(resolve.code == 200){
          this.tableData = resolve.data.content
          this.totalPage = resolve.data.totalPages
        }
      }).catch((err) => {
        this.$message({
          type: 'waring',
          message: err
        })
      })
    },
    // 获取结算方式/附加服务/行业/品牌
    getConstant(str) {
      this.$store.dispatch('getConstant', {constantType: str}).then((resolve) => {
        if (resolve.code === 200) {
          if(str == 'settlementMethod'){
            this.settlementMethodOption =  resolve.data;
          }else if(str == 'addService'){
            this.addServiceOption = resolve.data;
          }else if(str == 'tradeType'){
            this.tradeTypeOption =  resolve.data;
          }else{
            this.brandsOption =  resolve.data;
          }
        }else{
          this.$message({
            message: '获取供应商常量失败',
            type: 'warning'
          })
        }
      }).catch(() => {
        this.loading = false
      })
    },
    // 获取开发人员选项数据
    getUser() {
      this.$store.dispatch('getUser').then((resolve) => {
        if (resolve.code === 200) {
          this.userOption = resolve.data
        }else{
          this.$message({
            message: '获取员工数据失败',
            type: 'warning'
          })
        }
      }).catch(() => {
        this.loading = false
      })
    },
    //  点击分页
    toPage(e) {
      this.$set(this.formData, 'number', e)
      this.getList()
    },
    // 去查询
    toSearch(e) {
      this.$set(this.formData, 'number', 1)
      this.getList()
    },
    // 删除供应商
    deleteData(row) {
      MessageBox.confirm(
        '您确定要删除该供应商吗？',
        {
          confirmButtonText: '确定删除',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        this.$store.dispatch('delete', {suplierId: row.id}).then((resolve) => {
          if (resolve.code === 200) {
            this.$set(this.formData, 'number', 1);
            this.getList()
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          }
        }).catch((res) => {
          this.$message({
            message: res,
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
  .link-type{
    color: #409EFF;
  }
  .service{
    display: inline-block;
    background: #D4D4D4;
    padding: 0 5px;
    font-size: 10px;
  }
  .service+.service{
    margin-left: 5px;
  }
  /*供应商名称*/
  .supplierName{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  /*更新时间*/
  .uploadDate{
    font-size: 10px;
    color: #aaaaaa;
  }

</style>

