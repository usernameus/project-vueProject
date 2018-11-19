<template>
  <div class="user-list">
    <ToolBar>
      <el-button type="primary" icon="el-icon-plus" size="small" @click="openAddBox()">添加</el-button>
      <div style="float: right">
        <el-input
            placeholder="请输入用户昵称！"
            size="small"
            style="width: 140px"
          >
        </el-input>
        <el-button type="success" icon="el-icon-search" size="small" @click="queryList()"></el-button>
      </div>
    </ToolBar>
    <el-table
        :data="applicationData"
        border
        ref="table"
        style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="52px"
        >
      </el-table-column>
      <el-table-column
          prop="APPNAME"
          label="应用名称">
      </el-table-column>
      <el-table-column
          prop="APPIP"
          label="IP">
      </el-table-column>
      <el-table-column
          prop="DOMAIN"
          label="域名">
      </el-table-column>
      <el-table-column
          prop="APPPORT"
          label="端口">
      </el-table-column>
      <el-table-column
          prop="WEBVIEW"
          label="视图">
      </el-table-column>
      <el-table-column
          prop="APPDESC"
          label="应用说明">
      </el-table-column>
      <el-table-column
          prop="SID"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
      </el-table-column>
    </el-table>
    <ToolBar>
       <Pagination :total="total" @tosizeChange="sizeChange" @tocurrentChange="currentChange"></Pagination>
    </ToolBar>
    <AppendRow
        :title="dialogTitle"
        :dialogFormVisible="dialogFormVisible"
        :editListData="editListData"
        @cancel="dialogFormVisible = false"
    >
    </AppendRow>
    <DeleteRow
        :dialogDeleteVisible="dialogDeleteVisible"
         @cancel="dialogDeleteVisible = false"
         @deleteRow="deleteRow"
    >
    </DeleteRow>
  </div>
</template>

<script>
  import ToolBar from '@/components/common/ToolBar/ToolBar.vue';
  import Pagination from '@/components/common/Pagination/Pagination.vue';
  import {queryApplication,deleteApplication} from '../../../../api/api';
  import AppendRow from './add.vue';
  import DeleteRow from '@/components/common/DeleteDialog/DeleteDialog.vue';

  export default {
    data() {
      return {
        pageNo:10,
        currentPage:0,
        total:0,
        dialogTitle: '',
        dialogFormVisible: false,
        dialogDeleteVisible: false,
        applicationData: [],
        editListData:{},
        deleteRowIndex:0
      }
    },
    created(){
      this.queryList();
    },
    methods: {
      openAddBox() {
        this.dialogTitle = '应用添加'
        this.dialogFormVisible = true;
      },
      handleEdit(index, row){
        this.dialogTitle = '应用修改'
        this.dialogFormVisible = true;
        this.editListData = row
     },
     handleDelete(index, row){
      this.dialogDeleteVisible = true;
      this.deleteRowIndex = index;
     },
      queryList(){ 
          const datas = {pageNo:this.pageNo,currentPage:this.currentPage}
          queryApplication(datas).then(datas => {
             console.log(datas)
              this.logining = false;              
              let { draw, recordsTotal,recordsFiltered,data} = datas;
              this.applicationData = data
              this.total = recordsTotal
                      
           });
      },
      deleteRow(){
          const datas = {id:this.deleteRowIndex}
          deleteApplication(datas).then(data => {
              this.logining = false;              
              let { msg, code } = data;
              if(code == '200'){ 
                this.dialogDeleteVisible = false;             
                this.$message({
                  message: msg,
                  type: 'success'
                });
              }else{
                this.$message({
                  message: msg,
                  type: 'error'
                });
              }              
           });
      },
      sizeChange(msg) {
        this.pageNo= msg;
        this.queryList()
      },
      currentChange(msg) {
        this.currentPage = msg;
        this.queryList()
      },
    },
    components: {
      ToolBar,AppendRow,Pagination,DeleteRow
    }
  }
</script>

