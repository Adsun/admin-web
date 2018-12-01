<!--更新项目-->
<template>
  <div class="app-container">
    <h3 style="color: #606266;width: 1100px;">
      项目名称：{{projectData.projectName}}
      <span class="svg-container">
          <router-link v-if="projectData.adminInd" :to="'/projectList/edit/'+projectData.id" class="link-type">
            <svg-icon icon-class="pan_icon"/>
          </router-link>
          <svg-icon v-else icon-class="pan_icon"/>
      </span>
      <span style="float: right;" >
        <el-button @click="invite = true">协作邀请</el-button>
        <el-button @click="update = true">更新项目</el-button>
      </span>
    </h3>
    <p>项目简介：{{projectData.projectSummary}}</p>
    <p>项目公告：{{projectData.projectNotice}}</p>
    <div style=" margin-left:200px; width: 900px">
      <el-steps direction="vertical" :active="1">
        <el-step :title='projectData.projectName' style="position:relative;" v-if = "projectData.state !== '1'">
          <i class="step" slot="icon"></i>
          <template slot="description">
            <h2 style="position: absolute; left:-110px; top: -10px">项目创建</h2>
          </template>
          <template slot="description">
            <p>更新人员：{{projectData.updateBy}}</p>
            <p>更新时间：{{projectData.updateDatetime}}</p>
          </template>
        </el-step>
        <el-step :title="item.nodeName" v-for="item in projectData.nodeDtos">
          <i class="step" slot="icon"></i>
          <template slot="description">
            <h2 style="position: absolute; left:-110px; top: -10px; width:110px;">{{item.landmark}}</h2>
          </template>
          <template slot="description">
            <p>更新人员：{{item.updateBy}}</p>
            <p>更新时间：{{item.updateDatetime}}</p>
            <div v-if = "item.nodeContext === null">
              无阅读权限
            </div>
            <div v-else>
              <div style="max-height:40px;">更新内容：{{item.nodeContext}}</div>
              <el-form>
                <el-form-item label="附件:">
                  <el-row :gutter="20" type="flex" justify="start" :model="item.addFileDtos" v-for="items in item.addFileDtos">
                    <el-col :span="5">{{items.fileName}}</el-col>
                    <el-col :span="3">{{items.fileSize}}</el-col>
                    <el-button type="text" @click="exportFile(items.id)">下载</el-button>
                  </el-row>
                </el-form-item>
              </el-form>
            </div>
            <p v-if = "item.state === '1' && item.nodeContext !== null" :class = "item.nodeContext === null ? 'cancel_none' : 'cancel' " @click="nodeCancel(projectData.id,item.id,2)">删除</p>
            <p v-else-if = "item.nodeContext !== null && item.state === '2'" :class = "item.nodeContext === null ? 'cancel_none' : 'cancel' " @click="nodeCancel(projectData.id,item.id,1)">还原</p>
          </template>
        </el-step>
        <el-step :title='projectData.projectName' v-if = "projectData.state === '1'">
          <i class="step" slot="icon"></i>
          <template slot="description">
            <h2 style="position: absolute; left:-110px; top: -10px">项目创建</h2>
          </template>
          <template slot="description">
            <p>更新人员：{{projectData.updateBy}}</p>
            <p>更新时间：{{projectData.updateDatetime}}</p>
          </template>
        </el-step>
      </el-steps>
    </div>
    <!--协作邀请按钮弹窗-->
    <el-dialog :visible.sync="invite" @close='closeDialogInvite'>
      <el-form :model="inviteForm" label-width="180px" :rules="inviteFormRules" ref="inviteForm">
        <el-form-item label="协作任务" prop="requestName">
          <el-col :span="20">
            <el-input v-model="inviteForm.requestName" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item label="协作人称呼" prop="callName">
          <el-col :span="20">
            <el-input v-model="inviteForm.callName" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item label="内容描述" prop="requestCtx">
          <el-col :span="20">
            <el-input v-model="inviteForm.requestCtx" type="textarea" placeholder="多行文本" :rows="6"/>
          </el-col>
        </el-form-item>
        <el-form-item label="权限">
          <el-col :span="20">
            <el-select v-model="inviteForm.readIds" multiple placeholder="无">
              <el-option label="全部" value="0"/>
              <el-option v-for="item in projectData.joins" :key="item.id" :label="item.fullName" :value="item.id"/>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="链接" prop="link">
          <el-col :span="20">
            <el-input v-model="inviteForm.link" autocomplete="off" placeholder="http://jfshare.com"/>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="inviteCancel">关 闭</el-button>
        <el-button type="primary" @click="inviteSbumit">生成链接</el-button>
      </span>
    </el-dialog>
    <!--更新项目按钮弹窗-->
    <el-dialog :visible.sync="update" @close='closeDialogUpdate'>
      <el-form :model="updateForm" label-width="180px" :rules="updateFormRules" ref="updateForm">
        <el-form-item label="标题" prop="nodeName">
          <el-col :span="20">
            <el-input v-model="updateForm.nodeName" autocomplete="off" maxlength="20"/>
          </el-col>
        </el-form-item>
        <el-form-item label="里程碑" prop="landmark">
          <el-col :span="20">
            <el-input v-model="updateForm.landmark" autocomplete="off" maxlength="12"/>
          </el-col>
        </el-form-item>
        <el-form-item label="内容" prop="nodeContext">
          <el-col :span="20">
            <el-input v-model="updateForm.nodeContext" type="textarea" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item label="附件">
          <el-row>
            请添加需要上传的附件
            <el-upload
              class="upload-demo"
              :action = "acitonUrl"
              :data="uploadData"
              :on-success="uploadSuccess"
              :show-file-list="false"
              :before-upload="function(file){return beforeUpload(file,1)}"
              :with-credentials="true">
              <el-button size="small" type="primary">选择文件</el-button>
            </el-upload>
          </el-row>
          <el-row :gutter="20" type="flex" justify="start" :model="updateForm.addFileDtos" v-for="item in updateForm.addFileDtos">
            <el-col :span="5">{{item.fileName}}</el-col>
            <el-col :span="3">{{item.fileSize}}</el-col>
            <el-button type="text" @click="exportFile(item.id)">下载</el-button>
            <el-button type="text" @click="delFile('addFileDtos',item.id)">删除</el-button>
          </el-row>
        </el-form-item>
        <el-form-item label="阅读权限">
          <el-col :span="20">
            <el-select v-model="updateForm.readIds" multiple placeholder="无">
              <el-option label="全部" value=""/>
              <el-option v-for="item in projectData.joins" :key="item.id" :label="item.fullName" :value="item.id"/>
            </el-select>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateCancel">取 消</el-button>
        <el-button type="primary" @click="updateSbumit">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

  import ElCol from 'element-ui/packages/col/src/col'
  import ElRow from 'element-ui/packages/row/src/row'
  import ElStep from "../../../../node_modules/element-ui/packages/steps/src/step.vue";
  import { validateURL } from '@/utils/validate'

  export default {
    components: {
      ElStep,
      ElRow,
      ElCol
    },
    data() {
      // const validaterURL = (rule, value, callback) => {
      //   if (!validateURL(value)) {
      //     callback(new Error('请输入正确的网址链接'))
      //   } else {
      //     callback()
      //   }
      // }
      return {
        projectId:"",//项目ID
        invite: false, // 协作邀请按钮
        update: false, // 项目更新节点按钮
        inviteForm: { // 协作邀请表单数据
          requestName: '', // 协作任务
          callName: '', // 协作人称呼
          requestCtx: '', // 内容描述
          readIds: [], // 权限
          link: '', // 链接
        },
        inviteFormRules:{
          // 协作邀请规则
          requestName: {required: true,message: "请输入协作任务",trigger: "change"}, //协作任务标题
          callName: { required: true, message: "请输入协作人称呼", trigger: "change" }, //协作人名字
          requestCtx: { required: true, message: "请输入内容描述", trigger: "change" }, //内容
          // link: { required: true, message: "请输入链接", trigger: "change" }, //链接
        },
        updateForm: { // 更新项目表单数据
          nodeName: '', // 标题nodeName
          landmark: '', // 里程碑landmark
          nodeContext: '', // 内容nodeContext
          readIds: [], // 阅读权限readIds
          addFileDtos:[],//附件
          addFileIds:[],//附件addFileIds
        },
        updateFormRules:{
          // 更新项目规则
          nodeName: {required: true,message: "请输入项目的节点标题",trigger: "change"}, //标题
          nodeContext: { required: true, message: "请输入项目的节点内容", trigger: "change" }, //内容
        },
        projectData: {},//项目详情
        uploadData: {}, // 上传文件的参数
        acitonUrl: 'http://39.107.230.91:18080/addFile/upload', // 上传url
        // optionsList: [] //用户
      }
    },
    created() {
      this.getParams();
      // this.getUser();
    },
    methods: {
      // 接收参数
      getParams(){
        let routerParams = {};
        routerParams.projectId = this.$route.query.projectId
        // console.log(routerParams);
        this.projectId = this.$route.query.projectId
        this.getProjectList(routerParams);
      },
      // 获取项目信息
      getProjectList(projectId) {
        this.$store.dispatch('projectDetail', projectId).then((resolve) => {
          if(resolve.code == 200){
            console.log(resolve.data)
            this.projectData = resolve.data;
          }
        }).catch((err) => {
          this.$message({
            type:'waring',
            message:err
          })
        })
      },
      // 上传附件前
      beforeUpload(file, type) {
        const $this = this
        $this.$set($this.uploadData, 'type', type)
        return true
      },
      // 上传成功后
      uploadSuccess(file,suss) {
        if (this.uploadData.type == 1){
          this.updateForm.addFileDtos.push(file.data)
          this.updateForm.addFileIds.push(file.data.id)
        }
      },
       // 下载附件
      exportFile(id) {
        location.href = this.baseUrl + '/addFile/download?fileId=' + id
      },
       // 删除附件
      delFile(str, id) {
        let formDataStr = JSON.parse(JSON.stringify(this.updateForm[str]))
        let index = formDataStr.findIndex(function(item){return item.id == id})
        formDataStr.splice(index, 1)
        this.$set(this.updateForm, str, formDataStr)
      },
      //提交更新项目
      updateSbumit (){
        console.log(this.updateForm);
        this.$refs["updateForm"].validate(valid => {
          if (valid) {
            let updateForms = {};
            updateForms.nodeName = this.updateForm.nodeName;
            updateForms.landmark = this.updateForm.landmark;
            updateForms.nodeContext = this.updateForm.nodeContext;
            updateForms.readIds = this.updateForm.readIds;
            updateForms.addFileIds = this.updateForm.addFileIds;
            this.projectData.nodeDtos = [updateForms];
            console.log(this.projectData);
            this.$store.dispatch("state", {projectId: this.projectData.id,state:this.projectData}).then(resolve => {
                if (resolve.code === 200) {
                  this.$message({
                    type: 'success',
                    message: "项目节点更新成功"
                  })
                  this.$refs["updateForm"].resetFields(); // // 新增联系人的form表单重置
                  this.update = false; // 隐藏新增联系人的diglog
                  let routerParams = {};
                  routerParams.projectId = this.projectData.id;
                  this.getProjectList(routerParams);//重新获取项目信息
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
      closeDialogUpdate (){
        this.$refs["updateForm"].resetFields(); // 更新项目弹窗重置
      },
      updateCancel (){
        this.$refs["updateForm"].resetFields(); // 更新项目弹窗重置
        this.update = false;
      },
      // 删除，还原节点
      nodeCancel (projectId,nodeId,type){
        let state = {
          id:nodeId,
          state:type
        }
        this.$store.dispatch("nodeState", {projectId: projectId,nodeId:nodeId,state:state}).then(resolve => {
          debugger;
          if (resolve.code === 200) {
            this.$message({
              type: 'success',
              message: type == 1 ? "节点还原成功" : "节点删除成功"
            })
            let routerParams = {};
            routerParams.projectId = this.projectData.id;
            this.getProjectList(routerParams);//重新获取项目信息
          }
        }).catch(reject => {
          this.$message({
            type: "error",
            message: reject
          });
        });
      },
      //协作邀请提交
      inviteSbumit (){
        //  console.log(this.inviteForm);
        this.$refs["inviteForm"].validate(valid => {
          if (valid) {
            this.inviteForm.readIds=this.inviteForm.readIds.join(",");
            this.inviteForm.projectId = this.projectId;
            debugger;
            this.$store.dispatch("linkSbumit", this.inviteForm).then(resolve => {
                debugger;
                if (resolve.code === 200) {
                  // this.$refs["inviteForm"].resetFields(); // // 新增联系人的form表单重置
                  // this.invite = false; // 隐藏新增联系人的diglog
                  // this.$alert(resolve.data, '协作邀请链接已生成', {
                  //   confirmButtonText: '知道了',
                  // });
                  // let routerParams = {};
                  // routerParams.projectId = this.projectData.id;
                  // this.getProjectList(routerParams);//重新获取项目信息
                  this.$set(this.inviteForm,"link",resolve.data);
                  this.$message({
                    type: 'success',
                    message: "链接生成成功"
                  })
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
      closeDialogInvite (){
        this.$refs["inviteForm"].resetFields(); // 协作邀请弹窗重置
      },
      //关闭协作邀请弹窗
      inviteCancel (){
         this.$refs["inviteForm"].resetFields(); // 协作邀请弹窗重置
         this.invite = false
      },
      //获取所有用户
      // getUser() {
      //   this.$store.dispatch("getUser").then(resolve => {
      //     // debugger
      //     if (resolve.code === 200) {
      //       this.optionsList = resolve.data;
      //     } else {
      //       this.$message({
      //         message: "获取员工数据失败",
      //         type: "warning"
      //       });
      //     }
      //   }).catch(() => {
      //     this.loading = false;
      //   });
      // },
      onAdd() {
        this.$message('submit!')
      },
      reduce() {
        this.$message('submit!')
      }
//      reduce() {
//        this.$confirm('确定要删除姓名吗?', '删除确认', {
//          confirmButtonText: '确定',
//          cancelButtonText: '取消',
//          type: 'title',
//          center: true
//        }).then(() => {
//          this.$message({
//            type: 'success',
//            message: '删除成功!'
//          })
//        }).catch(() => {
//          this.$message({
//            type: 'info',
//            message: '已取消删除'
//          })
//        })
//      }
    },
    watch:{
      "$route":"getParams"
    }
  }
</script>

<style scoped>
  .line{
    text-align: center;
  }
  .step{
    background-image: url("http://www.sdky.org/d/cj/tubiao/u05pfzbvu5j.png")
  }
  .cancel{
    margin-top:-15px;
    color:red;
    text-decoration:underline;
    cursor:pointer;
  }
  .cancel_none{
    color:red;
    text-decoration:underline;
    cursor:pointer;
  }
</style>

