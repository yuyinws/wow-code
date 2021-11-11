<template>
  <div class="title-wrap">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="item in breadcrumbList">{{ item }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="info-wrap">
    <div class="info-title">
      <i class="iconfont icon-tongyongbiaotiicon"></i>
      <span class="text">检查预约</span>
    </div>
  </div>
</template>
<script setup>
import { ref,reactive } from 'vue'
const breadcrumbList = ref(["业务订单","检查预约"])
</script>
<style lang="scss" scoped>
  .info-wrap {
    height: calc(100vh - 135px);
    margin: 20px;
    padding: 20px;
    overflow: auto;
    background-color: white;
    box-shadow: 0 1px 4px 0 rgba(202, 202, 202, 0.5);
    box-sizing: border-box;
    .info-title {
      font-size: 0;
      padding-bottom: 20px;
      .icon-tongyongbiaotiicon {
        font-size: 16px;
        color: #198eeb;
      }
      .text {
        margin-left: 10px;
        font-size: 14px;
        color: #333;
      }
    }
  }
</style>
