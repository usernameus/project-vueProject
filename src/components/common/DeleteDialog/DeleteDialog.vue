<template>
	<el-dialog title="提示" :visible="dialogDeleteVisible" :show-close="false" width="300px">
	    <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
	    <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('cancel');">取 消</el-button>
        <el-button type="primary" :loading="btnLoading" @click="$emit('deleteRow');">确定</el-button>
      </div>
	</el-dialog>
</template>
<script>
export default {
  name: "DeleteRow",
  props: {
    dialogDeleteVisible:Boolean,
  },
  data() {
    return {
      btnLoading: false
    };
  },
  methods: {}
};
</script>
