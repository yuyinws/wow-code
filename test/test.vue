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
    <div class="search-wrap">
    <div class="option-item">
  <span class="label">输入框</span>
    <n-input
      size="small"
      placeholder="请输入"
      v-model:value="searchForm.undefined"
    ></n-input>
  </div>
  
    </div>
    <div class="dataList">
      <el-table
        :data="dataList"
        class="table-weight"
        stripe
        style="width: 100%"
      >
        
      <el-table-column
        prop="name"
        min-width="100px"
        label="姓名"
    ></el-table-column>
    
        <template v-slot:empty>
          <div class="table-none">
            <div class="none-pic-wrap">
              <img class="none-pic" src="@/assets/imgs/none.png" alt />
            </div>
            <span class="none-text">暂无数据</span>
          </div>
        </template>
      </el-table>
      <div class="pagination-wrap">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :page-size="page.size"
          v-model:current-page="page.page"
          layout="prev, pager, next, jumper"
          :total="page.total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref,reactive } from 'vue'
const breadcrumbList = ref(["业务订单","检查预约"])
const searchForm = ref({
  
    undefined: null,
})
const options = [
      {
        value: 'op1',
        label: '选项1',
      },
      {
        value: 'op2',
        label: '选项2',
      },
    ]
const page = ref({
  size: 0,
  page: 1,
  total: 0,
})
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
  .search-wrap {
    display: flex;
    flex-wrap: wrap;
    .option-item {
      display: flex;
      align-items: center;
      margin-right: 20px;
      padding-bottom: 20px;
      &:last-child {
        margin-right: 0;
      }
      .label {
        padding-right: 10px;
        width: auto;
        flex-shrink: 0;
        font-size: 14px;
        color: #666;
        text-align: right;
      }
    }
  }
</style>
