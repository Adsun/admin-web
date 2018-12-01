<template>
  <div class="app-container">
    <el-form class="form-item" :model="invitationForm" ref="invitationForm" v-if="subSuccess == 'false'" :rules="invitationFormRUles" label-width="120px">
        <el-form-item label="标题" prop="requestName">
          <el-col :span="11">
            <el-input v-model="invitationForm.requestName" :readonly="true" maxlength="20" placeholder="项目名称"/>
          </el-col>
        </el-form-item>
        <el-form-item label="内容描述" prop="requestName">
          <el-col :span="11">
            <el-input v-model="invitationForm.requestCtx" type="textarea" :readonly="true" placeholder="内容描述"/>
          </el-col>
        </el-form-item>
        <el-form-item label="内容描述" prop="nodeCtx">
          <el-col :span="11">
            <el-input v-model="invitationForm.nodeCtx" type="textarea" placeholder="内容描述"/>
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
          <el-row :gutter="20" type="flex" justify="start" :model="invitationForm.addFileDtos" v-for="item in invitationForm.addFileDtos">
            <el-col :span="5">{{item.fileName}}</el-col>
            <el-col :span="3">{{item.fileSize}}</el-col>
            <!-- <el-button type="text" @click="exportFile(item.id)">下载</el-button> -->
            <el-button type="text" @click="delFile('addFileDtos',item.id)">删除</el-button>
          </el-row>
        </el-form-item>
        <el-button type="primary" class="subBtn" @click="invitationSbumit">提交</el-button>
    </el-form>
    <!-- 提交成功后显示的页面 -->
    <el-form class="form-item" :model="invitationForm" ref="invitationForm" v-if="subSuccess == 'true'" :rules="invitationFormRUles" label-width="120px">
        <el-form-item label="标题" >
          <el-col :span="11">
            <el-input v-model="invitationForm.requestName" :readonly="true" maxlength="20" placeholder="项目名称"/>
          </el-col>
        </el-form-item>
        <el-form-item label="内容描述">
          <el-col :span="11">
            <el-input v-model="invitationForm.requestCtx" type="textarea" :readonly="true" placeholder="内容描述"/>
          </el-col>
        </el-form-item>
        <el-form-item label="内容描述" prop="nodeCtx">
          <el-col :span="11">
            <el-input v-model="invitationForm.nodeCtx" :readonly="true" type="textarea" placeholder="内容描述"/>
          </el-col>
        </el-form-item>
        <el-form-item label="附件">
          <el-row>
            请添加需要上传的附件
            <!-- <el-upload
              class="upload-demo"
              :action = "acitonUrl"
              :data="uploadData"
              :on-success="uploadSuccess"
              :show-file-list="false"
              :before-upload="function(file){return beforeUpload(file,1)}"
              :with-credentials="true">
            </el-upload> -->
          </el-row>
          <el-row :gutter="20" type="flex" justify="start" :model="invitationForm.addFileDtos" v-for="item in invitationForm.addFileDtos">
            <el-col :span="5">{{item.fileName}}</el-col>
            <el-col :span="3">{{item.fileSize}}</el-col>
          </el-row>
        </el-form-item>
        <el-button class="subBtn" @click="custom_close">关闭</el-button>
    </el-form>
  </div>
</template>

<script>

export default {
  components: {
    
  },
  data() {
    return {
      cooperId:"",
      invitationForm:{
        requestName: "",//协作任务标题
        requestCtx: "",//协作任务描述
        nodeCtx: "",//被邀请人输入详情
        addFileDtos: [],//附件
        addFileIds: [],//附件id
      },
      invitationFormRUles:{
        nodeCtx: "",//被邀请人输入详情
      },
      uploadData: {}, // 上传文件的参数
      acitonUrl: 'http://39.107.230.91:18080/addFile/upload', // 上传url
      subSuccess:"false"
    }
  },
  created() {
    this.getUrlParam("cooperId");//获取链接中的参数
    this.getRequestNode(this.cooperId);//获取协作任务详情
  },
  methods: {
    // //获取链接中的参数
    getUrlParam(name) {
      var after = window.location.search;
      // if(after.indexOf('?') === -1) return null; //如果url中没有传参直接返回空
      //key存在先通过search取值如果取不到就通过hash来取
      after = after.substr(1) || window.location.hash.split("?")[1];
      if(after){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = after.match(reg);
        console.log(r);
        if(r != null){
            this.cooperId =  decodeURI(r[2])
        }else{
            return console.log("我不知道任务ID");
        }
      }
    },
    //获取协作任务详情
    getRequestNode(cooperId) {
      this.$store.dispatch("getCooper",{cooperId:cooperId}).then(resolve => {
        if (resolve.code === 200) {
          if(resolve.data.nodeId){
            this.$set(this.invitationForm, "id", resolve.data.id);
            this.$set(this.invitationForm, "requestName", resolve.data.requestName);
            this.$set(this.invitationForm, "requestCtx", resolve.data.requestCtx);
            this.$set(this.invitationForm, "addFileDtos", resolve.data.addFileDtos);
            this.$set(this.invitationForm, "nodeCtx", resolve.data.nodeCtx);
            this.subSuccess = "true";
          }else{
            this.$set(this.invitationForm, "id", resolve.data.id);
            this.$set(this.invitationForm, "requestName", resolve.data.requestName);
            this.$set(this.invitationForm, "requestCtx", resolve.data.requestCtx);
          }
          console.log(resolve.data);
        } else {
          this.$message({
            message:resolve.desc,
            type:"error"
          })
        }
      }).catch((reject) => {
        this.$message({
          message:reject,
          type:"error"
        })
      });
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
        this.invitationForm.addFileDtos.push(file.data)
        this.invitationForm.addFileIds.push(file.data.id)
      }
    },
      // 删除附件
    delFile(str, id) {
      let formDataStr = JSON.parse(JSON.stringify(this.invitationForm[str]))
      let index = formDataStr.findIndex(function(item){return item.id == id})
      formDataStr.splice(index, 1)
      this.$set(this.invitationForm, str, formDataStr)
    },
    // 提交表单
    invitationSbumit(){
      let requestNode= {};
      requestNode.id = this.invitationForm.id;
      requestNode.nodeCtx = this.invitationForm.nodeCtx;
      requestNode.addFileIds = this.invitationForm.addFileIds;
      this.$store.dispatch("submitCooper",{cooperId:requestNode.id,requestNode}).then(resolve => {
        if (resolve.code === 200) {
          console.log(resolve.data);
        } else {
          this.$message({
            message:resolve.desc,
            type:"error"
          })
        }
      }).catch((reject) => {
        this.$message({
          message:reject,
          type:"error"
        })
      });
    },
    //关闭页面
    custom_close() {
      if(confirm("您确定要关闭本页吗？")){
        console.log("是的");
        window.location.href="about:blank";
        window.close();
      }else{

      }
    }
  },
}
</script>

<style scoped>
  .line{
    text-align: center;
  }
  .f1{
    margin-bottom: 40px;
  }
</style>