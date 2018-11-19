<template>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</template>
<script>
  export default {
    props: {
     total:Number
    },
     data() {
      return {
        currentPage: 4
      };
    },
    methods: {
      handleSizeChange(msg) {
        this.$emit('tosizeChange',msg)
      },
      handleCurrentChange(msg) {
        this.$emit('tocurrentChange',msg)
      }
    }
  }
</script>