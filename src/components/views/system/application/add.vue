<template>
  <div class="role-dialog">
    <el-dialog :title="title" :visible="dialogFormVisible" :show-close="false" width="45%">
      <el-form :model="form" ref="form" label-width="100px" class="demo-dynamic">
          <el-form-item label="应用名称">
            <el-input v-model="form.appname" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="IP">
            <el-input v-model="form.appip" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="域名">
            <el-input v-model="form.domain" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="端口">
            <el-input v-model="form.appport" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="视图">
            <el-input v-model="form.webview" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="应用说明">
            <el-input type="textarea" v-model="form.appdesc"></el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('cancel');">取 消</el-button>
        <el-button type="primary" :loading="btnLoading"  @click="submitForm('form')">提交</el-button>
      </div>
   </el-dialog>
  </div>
</template>
<script>
import { addApplication } from "../../../../api/api";
export default {
  name: "AppendRow",
  props: {
    dialogFormVisible: Boolean,
    title: String,
    editListData: Object
  },
  data() {
    return {
      btnLoading: false
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.logining = true;
          var datas = {
            appname: this.form.appname,
            appip: this.form.appip,
            domain: this.form.domain,
            appport: this.form.appport,
            webview: this.form.webview,
            appdesc: this.form.appdesc
          };
          addApplication(datas).then(data => {
            this.logining = false;
            let { msg, code } = data;
            if (code == "200") {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.$emit("cancel");
            } else {
              this.$message({
                message: msg,
                type: "error"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  computed:{
    
    form(){
      if(this.title == '应用修改'){
         return  {
        ...this.editListData
      } 
      }else{
        return {
          appname: '',
          appip:'',
          domain:'',
          appport: '',
          webview: '',
          appdesc:''
        }
      }       
    } 
  }
};
</script>
