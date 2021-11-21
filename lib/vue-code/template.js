export default function templateGenerator(
  breadcrumbList,
  searchList,
  tableList
) {
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
    <div class="search-wrap">
    ${searchWrapGenerator(searchList)}
    </div>
    <div class="dataList">
      <el-table
        :data="dataList"
        class="table-weight"
        stripe
        style="width: 100%"
      >
        ${tableWrapGenerator(tableList)}
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
`
  return code
}

function tableWrapGenerator(tableList) {
  let code = ''
  tableList.forEach((item) => {
    code += `
      <el-table-column
        prop="${item.props}"
        min-width="100px"
        label="${item.label}"
    ></el-table-column>
    `
  })
  return code
}

function searchWrapGenerator(searchList) {
  let code = ''
  searchList.forEach((item) => {
    if (item.type === 'input') {
      code += inputItem(item.label, item.param)
    }
    if (item.type === 'select') {
      code += selectItem(item.label, item.param)
    }
    if (item.type === 'datePicker') {
      code += datePickerItem(item.label, item.param)
    }
    if (item.type === 'timePicker') {
      code += timePickerItem(item.label, item.param)
    }
  })
  return code
}

function timePickerItem(label, param) {
  return `<div class="option-item">
  <span class="label">${label}</span>
  <n-date-picker
    type="datetimerange"
    style="width:320px"
    clearable
    v-model:value="searchForm.${param}"
  ></n-date-picker>
  </div>
  `
}

function datePickerItem(label, param) {
  return `<div class="option-item">
  <span class="label">${label}</span>
  <n-date-picker
    type="daterange"
    style="width:320px"
    clearable
    v-model:value="searchForm.${param}"
  ></n-date-picker>
  </div>
  `
}

function selectItem(label, param) {
  return `<div class="option-item">
  <span class="label">${label}</span>
  <n-select
    size="small"
    placeholder="请选择"
    style="width: 210px"
    v-model:value="searchForm.${param}"
    :options="options"
  />
  </div>
  `
}

function inputItem(label, param) {
  return `<div class="option-item">
  <span class="label">${label}</span>
    <n-input
      size="small"
      placeholder="请输入"
      v-model:value="searchForm.${param}"
    ></n-input>
  </div>
  `
}
