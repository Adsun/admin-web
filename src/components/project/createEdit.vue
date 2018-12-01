<!--新建项目-->
<template>
  <div class="app-container">
    <el-form :model="newProject" ref="newProject" :rules="newProjectRules" label-width="120px">
      <el-form-item label="项目名称" prop="projectName">
        <el-col :span="11">
          <el-input v-model="newProject.projectName" maxlength="20" placeholder="项目名称"/>
        </el-col>
      </el-form-item>
      <el-form-item label="客户名称" prop="customerName">
        <el-col :span="11">
          <el-input v-model="newProject.customerName" placeholder="客户名称"/>
        </el-col>
      </el-form-item>
      <!-- <el-form-item label="参与人员">
        <el-select v-model="newProject.joinIds" multiple placeholder="请选择">
          <el-option v-for="item in optionsList" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item> -->
      <el-form-item label="客户联系人">
        <el-tag
          :key="tag.id"
          v-for="tag in newProject.contactIds"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)" :model="newProject.contactIds"
          @click.native="contactEdit(tag.id)">
          {{tag.customerName}}
        </el-tag>
        <el-button type="primary" @click="add = true">添加</el-button>
      </el-form-item>
      <el-form-item label="项目简介">
        <el-col :span="11">
          <el-input v-model="newProject.projectSummary" type="textarea" placeholder="请输入项目简介"/>
        </el-col>
      </el-form-item>
      <el-form-item label="项目公告">
        <el-col :span="11">
          <el-input v-model="newProject.projectNotice" type="textarea" placeholder="请输入项目公告"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 150px; margin-right: 80px; margin-top: 50px" @click="onCancel">取消</el-button>
        <el-button type="primary" style="width: 150px" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
    <!--添加按钮弹窗-->
    <el-dialog :visible.sync="add" width="30%" center @close='closeDialog'>
      <el-form :model="addContactForm" type='flex' :rules="addContactFormRules" ref="addContactForm" label-width="80px">
        <el-form-item prop="customerName" label="姓名">
          <el-col :span="18">
            <el-input v-model="addContactForm.customerName" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item prop="title" label="职位">
          <el-col :span="18">
            <el-input v-model="addContactForm.title" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item prop="companyTel" label="公司电话">
          <el-col :span="18">
            <el-input v-model="addContactForm.companyTel" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item prop="phone1" label="手机1">
          <el-col :span="18">
            <el-input v-model="addContactForm.phone1" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item prop="phone2" label="手机2">
          <el-col :span="18">
            <el-input v-model="addContactForm.phone2" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item prop="qqNumber" label="QQ号">
          <el-col :span="18">
            <el-input v-model="addContactForm.qqNumber" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item prop="wxNumber" label="微信号">
          <el-col :span="18">
            <el-input v-model="addContactForm.wxNumber" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-col :span="18">
            <el-input v-model="addContactForm.email" autocomplete="off" />
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCancel">取 消</el-button>
        <el-button type="primary" @click="submitContactForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import dialogBar from "dialog.vue";
import { validatMobile } from '@/utils/validate'
export default {
  // components: {
  //   "dialog-bar": dialogBar
  // },
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
      add: false, // 添加按钮
      newProject: {
        // 表单数据
        projectName: "", // 项目名称
        customerName: "", // 客户名称
        projectSummary: "", // 项目简介
        // joinIds: [], // 参与人员
        projectNotice: "", // 项目公告
        contactIds: [] //联系人
      },
      newProjectRules: {//新建项目校验规则
        projectName:{required: true, message:'请输入项目名称', trigger:"change"},
        customerName:{required: true, message:'请输入客户名称', trigger:"change"},
        contactIds:{required: true, message:'请输入客户联系人', trigger:"change"},
      },
      addContactForm: {
        // 新建联系人form数据
        customerName: "", //姓名
        title: "", //职位
        companyTel: "", //公司电话
        phone1: "", //手机1
        phone2: "", //手机2
        qqNumber: "", //QQ号
        wxNumber: "", //微信号
        email: "" //邮箱
      },
      addContactFormRules: {
        // 新增联系人校验规则
        customerName: {required: true,message: "请输入供应商名称",trigger: "change"}, //姓名
        title: { required: true, message: "请输入职位", trigger: "change" }, //职位
        phone1: { required: true,validator:validateMobile,  message: '请输入联系方式', trigger: 'change' } // 手机1
      },
      optionsList: [] //用户
    };
  },
  created() {
    this.getUser() //请求所有用户
    if(this.isEdit){
      const id = this.$route.params && this.$route.params.id
      console.log(id);
      this.getProject(id) //修改则请求项目详情数据
    }
  },
  methods: {
    // 获取项目信息
    getProject (id){
      this.$store.dispatch('projectDetail', {projectId:id}).then((resolve) => {
        if(resolve.code == 200){
          console.log(resolve.data)
          this.$set(this.newProject, "id", resolve.data.id);
          this.$set(this.newProject, "projectName", resolve.data.projectName);
          this.$set(this.newProject, "customerName", resolve.data.customerName);
          this.$set(this.newProject, "projectSummary", resolve.data.projectSummary);
          this.$set(this.newProject, "projectNotice", resolve.data.projectNotice);
          this.$set(this.newProject, "contactIds", resolve.data.customerContactsDtos);
        }
      }).catch((err) => {
        this.$message({
          type:'waring',
          message:err
        })
      })
    },
    getUser() {
      this.$store.dispatch("getUser").then(resolve => {
        // debugger
        if (resolve.code === 200) {
          this.optionsList = resolve.data;
        } else {
          this.$message({
            message: "获取员工数据失败",
            type: "warning"
          });
        }
      }).catch(() => {
        this.loading = false;
      });
    },
    //关闭新增联系人弹窗
    closeDialog() {
      this.$refs["addContactForm"].resetFields(); // // 新增联系人的form表单重置
    },
    addCancel() {
      this.$refs["addContactForm"].resetFields(); // // 新增联系人的form表单重置
      this.add = false; // 隐藏新增联系人的diglog
    },
    // 保存新增联系人form表单
    submitContactForm(e) {
      this.$refs["addContactForm"].validate(valid => {
        if (valid) {
          this.$store.dispatch("addContact", this.addContactForm).then(resolve => {
              // debugger;
              if (resolve.code === 200) {
                this.newProject.contactIds.push(resolve.data);
                this.$refs["addContactForm"].resetFields(); // // 新增联系人的form表单重置
                this.add = false; // 隐藏新增联系人的diglog
              }
            }).catch(reject => {
              this.$message({
                type: "error",
                message: reject
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 删除联系人
    handleClose(tag) {
      this.$confirm("确定要删除（"+tag.customerName+"）吗?", "删除确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "title",
        center: true
      }).then(() => {
        this.newProject.contactIds.splice(this.newProject.contactIds.indexOf(tag),1);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
    },
    // 项目创建提交按钮
    onSubmit() {
       this.$refs['newProject'].validate((valid) => {
        if(valid){
          let newProject = JSON.parse(JSON.stringify(this.newProject));
          // 联系人
          newProject.contactIds = newProject.contactIds.map(function (item,index) {
            return item.id
          })
          debugger
          this.$store.dispatch('createProject', newProject).then((resolve) => {
            console.log(resolve)
            this.$message({
              type:'success',
              message:this.isEdit?"保存成功":"创建成功"
            })
            this.$router.push("/going");
          }).catch((reject)=>{
            this.$message({
              type:'error',
              message:reject
            })
          })
        }else{

        }
      })
    },
    //联系人详情
    contactEdit(id) {
      console.log(id);
      this.$store.dispatch("getContact",{contactId:id}).then(resolve => {
        if (resolve.code === 200) {
          this.add = true;
          this.$set(this.addContactForm, "id", resolve.data.id);
          this.$set(this.addContactForm, "customerName", resolve.data.customerName);
          this.$set(this.addContactForm, "title", resolve.data.title);
          this.$set(this.addContactForm, "companyTel", resolve.data.companyTel);
          this.$set(this.addContactForm, "phone1", resolve.data.phone1);
          this.$set(this.addContactForm, "phone2", resolve.data.phone2);
          this.$set(this.addContactForm, "qqNumber", resolve.data.qqNumber);
          this.$set(this.addContactForm, "wxNumber", resolve.data.wxNumber);
          this.$set(this.addContactForm, "email", resolve.data.email);
          console.log(resolve.data);
        } else {
          this.$message({
            message: "获取员工数据失败",
            type: "warning"
          });
        }
      }).catch(() => {
        this.loading = false;
      });
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning"
      });
      this.$router.push("/going");
    },
    // 删除按钮弹窗
    // reduce() {
      // this.$confirm("确定要删除（变量）吗?", "删除确认", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "title",
      //   center: true
      // }).then(() => {
      //   this.$message({
      //     type: "success",
      //     message: "删除成功!"
      //   });
      // }).catch(() => {
      //   this.$message({
      //     type: "info",
      //     message: "已取消删除"
      //   });
      // });
    // }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

