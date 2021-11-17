export default function templateGenerator(breadcrumbList, searchItem) {  
  const code = `<template>
  <div class="title-wrap">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="item in breadcrumbList">{{ item }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="info-wrap">
    <div class="info-title">
      <i class="iconfont icon-tongyongbiaotiicon"></i>
      <span class="text">${breadcrumbList[breadcrumbList.length - 1]}</span>
    </div>
  </div>
</template>
`
  return code
}