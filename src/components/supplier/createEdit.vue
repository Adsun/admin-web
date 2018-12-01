<!--新建供应商-->
<template>
  <div class="app-container">
    <el-form :model="formData" label-width="120px" ref="formData" :rules="formDataRules"   v-loading="loading" element-loading-text="正在上传">
      <el-form-item label="供应商全称" prop="supplierName">
        <el-col :span="11">
          <el-input v-model="formData.supplierName" placeholder="请输入供应商全名"/>
        </el-col>
      </el-form-item>
      <el-form-item label="供应商地址" required>
        <el-row :gutter="20">
          <el-col :span="3">
            <el-form-item prop="province">
              <el-select v-model="formData.province" placeholder="省">
                <el-option
                  v-for="item in provinceOption"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item prop="city">
              <el-select v-model="formData.city" placeholder="市">
                <el-option
                  v-for="item in cityOption"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item prop="area">
              <el-select v-model="formData.area" placeholder="区">
                <el-option
                  v-for="item in areaOption"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="addressDtl">
              <el-input v-model="formData.addressDtl" placeholder="详细地址"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="法人" prop="juridicalPersonId" required>
        <el-tag
          :key="tag.id"
          v-for="tag in formData.juridicalPersonId"
          closable
          :disable-transitions="false"
          @close="handleClose(tag, 'juridicalPersonId')" :model="formData.juridicalPersonId" @click.native="editContact(tag, 'juridicalPersonId')">
          {{tag.customerName}}
        </el-tag>
        <el-button type="primary" size="small" @click="addContact = true;contactType=1">添加</el-button>
      </el-form-item>
      <el-form-item label="供应商联系人" prop="contactIds" required>
        <el-tag
          :key="tag.id"
          v-for="tag in formData.contactIds"
          closable
          :disable-transitions="false"
          @close="handleClose(tag,'contactIds')" :model="formData.contactIds"  @click.native="editContact(tag, 'juridicalPersonId')">
          {{tag.customerName}}
        </el-tag>
        <el-button type="primary" size="small" @click="addContact = true;contactType=2">添加</el-button>
      </el-form-item>
      <el-form-item label="附加服务" >
        <el-checkbox-group v-model="formData.addServiceIds">
          <el-checkbox v-for="item in addServiceOption" :label="item.id" >{{item.constantValue}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="供应商评级" class="starsBox">
          <!--<el-col >-->
            <el-rate v-model="formData.stars" class="starts"/>
          <!--</el-col>-->
      </el-form-item>
      <el-form-item label="结算方式" prop="settlementMethodId" required>
        <el-col :span="11">
          <el-select v-model="formData.settlementMethodId" placeholder="请选择" class="supplierSel">
            <el-option v-for="item in settlementMethodOption" :label="item.constantValue" :value="item.id" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="行业" prop="tradeTypeIds" required>
        <el-col :span="11">
          <el-select v-model="formData.tradeTypeIds" placeholder="请选择行业" multiple filterable class="supplierSel">
            <el-option v-for="item in tradeTypeOption" :label="item.constantValue" :value="item.id" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="代理品牌" prop="brandIds"  required>
        <el-col :span="11">
          <el-select v-model="formData.brandIds" placeholder="请选择代理品牌" multiple filterable class="supplierSel">
            <el-option v-for="item in brandsOption" :label="item.constantValue" :value="item.id" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="其他信息">
        <el-col :span="11">
          <el-input v-model="formData.otherCtx" type="textarea" placeholder="多行文本" :rows="6"/>
        </el-col>
      </el-form-item>
      <el-form-item label="产品列表" prop="supplierFileIds" required>
        <el-row :gutter="20" type="flex" justify="start" :model="formData.supplierFileIds" v-for="item in formData.supplierFileIds">
          <el-col :span="3">{{item.fileName}}</el-col>
          <el-col :span="2">{{item.fileSize}}</el-col>
          <el-button type="text" @click="exportFile(item.id)">下载</el-button>
          <el-button type="text" @click="delFile('supplierFileIds',item.id)">删除</el-button>
        </el-row>
        <el-col>
          <el-upload
            class="upload-demo"
            :action="acitonUrl"
            :data="uploadData"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :show-file-list="false"
            :before-upload="function(file){return beforeUpload(file,2)}" :with-credentials="true">
            <el-button size="small" type="primary">添加</el-button>
          </el-upload>
        </el-col>
      </el-form-item>
      <el-form-item label="其他附件">
        <el-row :gutter="20" type="flex" justify="start" v-for="item in formData.supplierOtherFileIds">
          <el-col :span="3">{{ item.fileName }}</el-col>
          <el-button type="text" @click="exportFile(item.id)">下载</el-button>
          <el-button type="text" @click="delFile('supplierOtherFileIds',item.id)">删除</el-button>
        </el-row>
        <el-col>
          <el-upload
            class="upload-demo"
            :action = "acitonUrl"
            :data="uploadData"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :show-file-list="false"
            :before-upload="function(file){return beforeUpload(file,3)}"
            :with-credentials="true">
            <el-button size="small" type="primary">添加</el-button>
          </el-upload>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 150px; margin-right: 80px; margin-top: 50px" @click="onCancel">取消</el-button>
        <el-button type="primary" style="width: 150px" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
    <!--添加联系人弹窗-->
    <el-dialog :visible.sync="addContact" width="30%" center>
      <el-form :model="addContactForm" type="flex" :rules="addContactFormRules" ref="addContactForm" label-width="80px">
        <el-form-item label="姓名" prop="customerName" center>
          <el-col :span="18">
            <el-input v-model="addContactForm.customerName" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item label="职位" prop="title">
          <el-col :span="18">
            <el-input v-model="addContactForm.title" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item label="公司电话" prop="companyTel">
          <el-col :span="18">
            <el-input v-model="addContactForm.companyTel" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item label="手机1" prop="phone1">
          <el-col :span="18">
            <el-input v-model="addContactForm.phone1" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item label="手机2" prop="phone2">
          <el-col :span="18">
            <el-input v-model="addContactForm.Phone2" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item label="QQ号" prop="qqNumber">
          <el-col :span="18">
            <el-input v-model="addContactForm.qqNumber" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item label="微信号" prop="wxNumber">
          <el-col :span="18">
            <el-input v-model="addContactForm.wxNumber" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-col :span="18">
            <el-input v-model="addContactForm.email" autocomplete="off" />
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addContact = false">取 消</el-button>
        <el-button type="primary" @click="submitContactForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Message, MessageBox } from 'element-ui'
import { validatMobile } from '@/utils/validate'
export default {
  name: 'createEdit',
  components: { },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateMobile = (rule, value, callback) => {
      if (!validatMobile(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    return {
      addContact: false, // 添加联系人dialog是否显示
      contactType: 1, // 区分添加联系人是法人或者供应商联系人：1法人2供应商联系人
      provinceOption: [], // 省份选择数据 option
      cityOption: [], // 市选择数据 option
      areaOption: [], // 区选择数据 option
      addServiceOption: [], // 附加服务的选项
      tradeTypeOption: [], // 行业的选项
      settlementMethodOption: [], // 结算方式的选项
      brandsOption: [], // 品牌选项
      formData: { // 新增供应商form数据
        supplierName: '', // 供应商名称
        province: '', // 省
        city: '', // 市
        area: '', // 区
        addressDtl: '', // 详细地址
        juridicalPersonId: [], // 法人联系人
        contactIds: [], // 联系人
        stars: 0, // 星级
        settlementMethodId: '', // 结算方式
        addServiceIds: [], // 附加服务
        tradeTypeIds: [], // 行业
        brandIds: [], // 品牌
        otherCtx: '', // 其它信息
        supplierFileIds: [], // 产品列表附件
        supplierOtherFileIds: [] // 其它附件
      },
      addContactForm: { // 新建联系人form数据
        customerName: '', // 姓名
        title: '', // 职位
        companyTel: '', // 公司电话
        phone1: '', // 手机1
        phone2: '', // 手机2
        qqNumber: '', // QQ号
        wxNumber: '', // 微信号
        email: '' // 邮箱
      },
      addContactFormRules: { // 新增联系人校验规则
        customerName: { required: true, message: '请输入供应商名称', trigger: 'change' }, // 姓名
        title: { required: true, message: '请输入职位', trigger: 'change' }, // 职位
        phone1: { required: true,validator:validateMobile,  message: '请输入联系方式', trigger: 'change' } // 手机1
      },
      formDataRules: {
        supplierName: { required: true, message: '请输入供应商名称', trigger: 'change' }, // 供应商名称
        province: { required: true, message: '请输入省', trigger: 'change' }, // 省
        city: { required: true, message: '请输入市', trigger: 'change' }, // 市
        area: { required: true, message: '请输入区', trigger: 'change' }, // 区
        addressDtl: { required: true, message: '请输入详细地址', trigger: 'change' }, // 详细地址
        juridicalPersonId: { required: true, message: '请输入法人联系人', trigger: 'change' }, // 法人联系人
        contactIds: { required: true, message: '请输入联系人', trigger: 'change' }, // 联系人
        settlementMethodId: { required: true, message: '请选择结算方式', trigger: 'change' }, // 结算方式
        addServiceIds: { required: true, message: '请选择附加服务', trigger: 'change' }, // 附加服务
        tradeTypeIds: { required: true, message: '请选择行业', trigger: 'change' }, // 行业
        brandIds: { required: true, message: '请选择品牌', trigger: 'change' }, // 品牌
        supplierFileIds: { required: true, message: '请选择产品附件', trigger: 'change' } // 产品附件
      },
      acitonUrl: 'http://39.107.230.91:18080/addFile/upload', // 上传url
      uploadData: {}, // 上传文件的参数
      loading:false
    }
  },

  watch: {
    'formData.province'(curVal, oldVal) {
      this.cityOption = []
      this.areaOption = []
      this.getArea({
        provinceId: curVal
      })
    },
    'formData.city'(curVal, oldVal) {
      this.areaOption = []
      this.getArea({
        provinceId: this.formData.province,
        cityId: curVal
      })
    }
  },
  created() {
    this.getArea({}) // 请求省市区
    this.getConstant('settlementMethod') // 请求结算方式
    this.getConstant('addService') // 请求附加服务
    this.getConstant('tradeType') // 请求行业
    this.getConstant('brand') // 请求品牌
    if(this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.getSupplier(id) // 修改则请求供应商详情数据
    }
  },
  methods: {
    // 获取供应商详情
    getSupplier(id) {
      this.$store.dispatch('editSupplier', { supplierId: id }).then((resolve) => {
        if (resolve.code === 200) {
          this.$set(this.formData, 'id', resolve.data.id)
          this.$set(this.formData, 'supplierName', resolve.data.supplierName) // 供应商名称
          this.$set(this.formData, 'province', resolve.data.province) // 省
          this.$set(this.formData, 'city', resolve.data.city) // 市
          this.$set(this.formData, 'area', resolve.data.area) // 区
          this.$set(this.formData, 'addressDtl', resolve.data.addressDtl) // 详细地址
          this.$set(this.formData, 'juridicalPersonId', resolve.data.juridicalPersonDto) // 法人联系人
          this.$set(this.formData, 'contactIds', resolve.data.contactDtos) // 联系人
          this.$set(this.formData, 'stars', resolve.data.stars) // 星级
          this.$set(this.formData, 'settlementMethodId', resolve.data.settlementMethodDto.id) // 结算方式
          this.$set(this.formData, 'addServiceIds', resolve.data.addServices.map(function (item,index) {
            return item.id;
          })) // 附加服务
          this.$set(this.formData, 'tradeTypeIds', resolve.data.tradeTypes.map(function (item,index) {
            return item.id;
          })) // 行业
          this.$set(this.formData, 'brandIds', resolve.data.brands.map(function (item,index) {
            return item.id;
          })) // 品牌
          this.$set(this.formData, 'otherCtx', resolve.data.otherCtx); // 其它信息
          this.$set(this.formData, 'supplierFileIds', resolve.data.supplierFiles) // 产品列表附件
          this.$set(this.formData, 'supplierOtherFileIds', resolve.data.supplierOtherFiles) // 其它附件
        }
      }).catch((res) => {
        this.$message({
          message: res,
          type: 'warning'
        })
      })
    },
    // 上传附件前
    beforeUpload(file, type) {
      const $this = this
      $this.$set($this.uploadData, 'type', type)
      $this.loading = true
      return true
    },
    // 上传成功后
    uploadSuccess(file,suss) {
      this.loading = false
      if (this.uploadData.type == 2){
        this.formData.supplierFileIds.push(file.data)
      } else {
        this.formData.supplierOtherFileIds.push(file.data)
      }
    },
    // 上传失败
    uploadError(file,err) {
      this.loading = false;
      this.$message({
        message: '上传失败',
        type: 'warning'
      })
    },
    // 获取结算方式/附加服务/行业/品牌
    getConstant(str) {
      this.$store.dispatch('getConstant', { constantType: str }).then((resolve) => {
        if (resolve.code === 200) {
          if (str == 'settlementMethod') {
            this.settlementMethodOption = resolve.data
          } else if (str == 'addService') {
            this.addServiceOption = resolve.data
          } else if (str == 'tradeType') {
            this.tradeTypeOption = resolve.data
          } else {
            this.brandsOption = resolve.data
          }
        }
      }).catch((err) => {
        this.$message({
          message: err,
          type: 'warning'
        })
      })
    },
    // 获取省市区
    getArea(obj) {
      this.$store.dispatch('getAreas', obj).then((resolve) => {
        if (resolve.code === 200) {
          if (Object.keys(obj).length == 0) {
            this.provinceOption = resolve.data
          } else if (obj.provinceId && obj.cityId) {
            this.areaOption = resolve.data
          } else {
            this.cityOption = resolve.data
          }
        } else {
          this.$message({
            message: '获取省市区数据失败',
            type: 'warning'
          })
        }
      }).catch(() => {
        this.loading = false
      })
    },
    // 保存新增联系人form表单
    submitContactForm(e) {
      this.$refs['addContactForm'].validate((valid) => {
        if (valid) {
          this.$store.dispatch('addContact', this.addContactForm).then((resolve) => {
            if (resolve.code === 200) {
              if (this.contactType == 1) { // 1为法人联系人 2为供应商联系人
                let str = this.formData.juridicalPersonId.findIndex(function (item, index) {
                  return item.id == resolve.data.id
                })
                if(str == -1){
                  this.formData.juridicalPersonId.push(resolve.data)
                }else{
                  this.formData.juridicalPersonId.splice(str, 1, resolve.data)
                }
              } else {
                let str = this.formData.contactIds.findIndex(function (item, index) {
                  return item.id == resolve.data.id
                })
                if(str == -1){
                  this.formData.contactIds.push(resolve.data)
                }else{
                  this.formData.contactIds.splice(str, 1, resolve.data)
                }
              }
              this.$refs['addContactForm'].resetFields() // 新增联系人的form表单重置
              this.addContact = false// 隐藏新增联系人的diglog
            }
          }).catch((reject) => {
            this.$message({
              type: 'error',
              message: reject
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    editContact(tag,ele) {
      this.$store.dispatch("getContact",{contactId:tag.id}).then(resolve => {
        if (resolve.code === 200) {
          this.addContact = true
          this.addContactForm = resolve.data
        } else {
          this.$message({
            message: "获取员工数据失败",
            type: "warning"
          });
        }
      }).catch(() => {
        this.$message({
          message: "系统繁忙",
          type: "warning"
        });
      });
    },
    // 删除联系人
    handleClose(tag,ele) {
      MessageBox.confirm(
        '您确定要删除该'+(ele == 'juridicalPersonId'? '法人': '联系人')+'吗？',
        {
          confirmButtonText: '确定删除',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        this.formData[ele].splice(this.formData[ele].indexOf(tag), 1);
      }).catch((res) => {
        this.$message({
          message: '已取消删除',
          type: 'warning'
        })
      })
    },
    // 保存
    onSubmit() {
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          let formData = JSON.parse(JSON.stringify(this.formData))
          // 法人
          formData.juridicalPersonId = formData.juridicalPersonId.map(function(item, index) {
            return item.id
          })
          // 联系人
          formData.contactIds = formData.contactIds.map(function (item,index) {
            return item.id
          })
          // 产品列表
          formData.supplierFileIds = formData.supplierFileIds.map(function (item,index) {
            return item.id
          })
          // 其它附件
          formData.supplierOtherFileIds = formData.supplierOtherFileIds.map(function (item,index) {
            return item.id
          })
          let url = ""
          if(this.isEdit) { url = 'updateSupplier' }else{ url = "createSupplier" }
          this.$store.dispatch(url, formData).then((resolve) => {
            if (resolve.code == 200) {
              this.$message({
                type: 'success',
                message: this.isEdit?"编辑成功" : '新增成功'
              })
              this.$router.push({ path: '/supplierList' })
            }
          }).catch((reject) => {
            this.$message({
              type: 'error',
              message: reject
            })
          })
        }
      })
    },
    // 下载附件
    exportFile(id) {
      location.href = this.baseUrl + '/addFile/download?fileId=' + id
    },
    // 上传文件的删除
    delFile(str, id) {
      MessageBox.confirm(
        '您确定要删除该附件吗？',
        {
          confirmButtonText: '确定删除',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        let formDataStr = JSON.parse(JSON.stringify(this.formData[str]))
        let index = formDataStr.findIndex(function(item){return item.id == id})
        formDataStr.splice(index, 1)
        this.$set(this.formData, str, formDataStr)
      }).catch((res) => {
        this.$message({
          message: '已取消删除',
          type: 'warning'
        })
      })
    },
    // 取消保存 跳转至供应商列表
    onCancel() {
      this.$router.push({ path: '/supplierList' })
    }
  }
}
</script>

<style scoped>
  .line{
    text-align: center;
  }
  .el-tag+.el-tag{margin-left:10px}
  /*select宽度设置为100%*/
  .supplierSel{
    width:100%;
  }
  /*星星*/
  .starts{
    display: inline-block;
  }
</style>

