<template>
  <div class="font-mono bg-gray-100 min-h-screen p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-5xl font-bold text-center mb-5">Wow-Code Generator</h1>
      <p class="text-center text-2xl mb-5 text-gray-600">
        Generator A Vue SFC Quickly
      </p>
      <div class="text-center">
        <span
          @click="goPage(1)"
          class="
            text-lg text-gray-500
            hover:text-green-400 hover:underline
            cursor-pointer
          "
          >Github</span
        >
        <span class="text-gray-500"> | </span>
        <span
          @click="goPage(2)"
          class="
            text-lg text-gray-500
            hover:underline hover:text-green-400
            cursor-pointer
          "
          >npm</span
        >
      </div>
      <div
        class="
          flex
          justify-center
          items-center
          text-xl
          rounded-md
          hover:shadow-md
          mt-5
          p-2
          text-gray-500
          bg-white
          w-full
        "
      >
        <div>文件路径:</div>
        <div>
          {{ `${path.join('/')}/${fileName}` }}
        </div>
        <n-tooltip placement="top" trigger="hover">
          <template #trigger>
            <n-icon
              size="20"
              class="mr-1 text-green-500 cursor-pointer mr-3 ml-3"
              @click="isModalShow = !isModalShow"
            >
              <Edit32Filled />
            </n-icon>
          </template>
          编辑文件路径
        </n-tooltip>
        <n-tooltip placement="top" trigger="hover">
          <template #trigger>
            <img
              :src="VueIcon"
              @click="generatorClick"
              class="cursor-pointer"
              style="height: 20px; width: 20px"
              alt=""
            />
          </template>
          生成Vue文件
        </n-tooltip>
      </div>
      <div class="bg-white hover:shadow-md rounded-md mt-5 p-5">
        <div class="flex items-center mb-3">
          <div class="text-gray-500 text-xl">配置项</div>
          <n-tooltip placement="top" trigger="hover">
            <template #trigger>
              <n-icon class="text-gray-500 text-xl ml-3 cursor-pointer">
                <CopyOutline />
              </n-icon>
            </template>
            复制JSON文本
          </n-tooltip>
        </div>
        <div>
          <div class="text-gray-400">面包屑(使用逗号分隔)</div>
          <n-input
            v-model:value="jsonForm.breadcrumbList"
            class="mt-4 w-1/2"
            placeholder="面包屑"
            size="small"
          ></n-input>
        </div>
        <n-divider></n-divider>
        <div>
          <div class="flex items-center">
            <div class="text-gray-400">筛选项(标签/类型)</div>
            <n-icon
              size="20"
              class="ml-3 text-green-500 cursor-pointer"
              @click="addSearchItem"
            >
              <AddCircleOutline />
            </n-icon>
          </div>
          <div
            class="flex items-center"
            v-for="(item, index) in jsonForm.searchList"
            :key="item.id"
          >
            <n-input
              v-model:value="jsonForm.searchList[index].label"
              class="mt-4 w-1/4"
              placeholder="标签"
              size="small"
            ></n-input>
            <n-select
              size="small"
              placeholder="类型"
              class="mt-4 w-1/4 ml-5"
              v-model:value="jsonForm.searchList[index].type"
              :options="TypeOptions"
            ></n-select>
            <n-input
              v-model:value="jsonForm.searchList[index].param"
              class="mt-4 w-1/4 ml-5"
              placeholder="参数名"
              size="small"
            ></n-input>
            <n-icon
              size="20"
              class="ml-3 text-red-500 cursor-pointer mt-4"
              @click="removeSearchItem(index)"
            >
              <RemoveCircleOutline />
            </n-icon>
          </div>
        </div>
        <n-divider></n-divider>
        <div>
          <div class="flex items-center">
            <div class="text-gray-400">表格(标签/props)</div>
            <n-icon
              size="20"
              class="ml-3 text-green-500 cursor-pointer"
              @click="addTableItem"
            >
              <AddCircleOutline />
            </n-icon>
          </div>
          <div
            class="flex items-center"
            v-for="(item, index) in jsonForm.tableList"
            :key="item.id"
          >
            <n-input
              v-model:value="jsonForm.tableList[index].label"
              class="mt-4 w-1/4"
              placeholder="标签"
              size="small"
            ></n-input>
            <n-input
              v-model:value="jsonForm.tableList[index].props"
              class="mt-4 w-1/4 ml-5"
              placeholder="props"
              size="small"
            ></n-input>
            <n-icon
              size="20"
              class="ml-3 text-red-500 cursor-pointer mt-4"
              @click="removeTableItem(index)"
            >
              <RemoveCircleOutline />
            </n-icon>
          </div>
        </div>
      </div>
    </div>

    <n-modal
      title="文件路径选择"
      preset="card"
      class="w-8/12"
      v-model:show="isModalShow"
    >
      <div class="flex justify-between">
        <div class="flex items-center flex-grow">
          <n-icon
            size="20"
            class="mr-1 text-green-300 cursor-pointer"
            @click="lastPath"
          >
            <arrow-back-outline />
          </n-icon>
          <n-input
            v-model:value="pathString"
            type="text"
            v-if="isEditing"
          ></n-input>
          <div
            @click="handlePathClick(index)"
            v-else
            class="
              w-auto
              bg-green-300
              hover:bg-green-500
              mr-1
              p-1
              rounded-md
              cursor-pointer
            "
            v-for="(item, index) in path"
            :key="index"
          >
            {{ item }}
          </div>

          <n-icon
            size="20"
            class="mr-1 text-green-300 cursor-pointer"
            @click="editPath"
          >
            <Edit32Filled v-if="!isEditing" />
            <DoneRound v-else />
          </n-icon>
        </div>
        <div class="flex">
          <n-input
            style="width: 150px"
            placeholder="文件名称"
            class="mr-3"
            v-model:value="fileName"
          ></n-input>
          <n-button @click="isModalShow = !isModalShow" type="success"
            >确定</n-button
          >
        </div>
      </div>
      <n-divider></n-divider>
      <div class="h-96 overflow-y-auto">
        <div
          @click="handleFolderClick(item.name)"
          v-for="(item, index) in children"
          :key="index"
          class="flex items-center"
        >
          <n-icon class="text-green-600" size="20">
            <folder-outline></folder-outline>
          </n-icon>
          <div
            class="hover:bg-green-200 rounded-md p-1 cursor-pointer flex-grow"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </n-modal>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useMutation, useQuery } from '@vue/apollo-composable'
import {
  NButton,
  NModal,
  NInput,
  NDivider,
  NIcon,
  NSelect,
  NTooltip,
} from 'naive-ui'
import {
  ArrowBackOutline,
  FolderOutline,
  AddCircleOutline,
  RemoveCircleOutline,
  CopyOutline,
} from '@vicons/ionicons5'
import { Edit32Filled } from '@vicons/fluent'
import { DoneRound } from '@vicons/material'
import gql from 'graphql-tag'
import VueIcon from '/public/favicon.ico'
import _ from 'lodash'

const isModalShow = ref(false)
const isEditing = ref(false)
// const config = JSON.stringify({
//   breadcrumbList: ['业务订单', '检查预约','hhhhhh'],
// })

const path = ref([])
const pathString = ref('')
const fileName = ref('demo.vue')
const children = ref([])

const searchItem = {
  id: new Date().valueOf(),
  label: null,
  type: null,
  param: null,
}
const tableItem = {
  id: new Date().valueOf(),
  label: null,
  props: null,
}
const jsonForm = ref({
  breadcrumbList: '',
  searchList: [_.cloneDeep(searchItem)],
  tableList: [_.cloneDeep(tableItem)],
})
const TypeOptions = [
  {
    label: '输入框',
    value: 'input',
  },
  {
    label: '下拉框',
    value: 'select',
  },
  {
    label: '日期选择器',
    value: 'datePicker',
  },
  {
    label: '时间选择器',
    value: 'timePicker',
  },
]
const params = ref({
  base: '',
})
const addSearchItem = () => {
  let _searchItem = _.cloneDeep(searchItem)
  _searchItem.id = new Date().valueOf()
  jsonForm.value.searchList.push(_searchItem)
}
const removeSearchItem = (index) => {
  jsonForm.value.searchList.splice(index, 1)
}

const addTableItem = () => {
  let _tableItem = _.cloneDeep(tableItem)
  _tableItem.id = new Date().valueOf()
  jsonForm.value.tableList.push(_tableItem)
}
const removeTableItem = (index) => {
  jsonForm.value.tableList.splice(index, 1)
}

const fileList = useQuery(
  gql`
    query fileListQuery($base: String) {
      getFileList(base: $base) {
        path
        children {
          name
          path
        }
      }
    }
  `,
  params
)

const {
  mutate: generator,
  error: generatorError,
  onDone: generatorDone,
} = useMutation(gql`
  mutation generator($config: String!, $path: String!) {
    generator(config: $config, path: $path) {
      results
      msg
    }
  }
`)

const generatorClick = () => {
  const _jsonForm = _.cloneDeep(jsonForm.value)
  _jsonForm.breadcrumbList = _jsonForm.breadcrumbList.split(',')
  let config = JSON.stringify(_jsonForm)
  console.log(config)
  let _path = path.value.join('//')
  _path = _path + `//${fileName.value}`
  generator({
    config: config,
    path: _path,
  })
}

generatorDone((event) => {
  console.log(event)
})

const handleFolderClick = (name) => {
  const _path = [...path.value]
  _path.push(name)
  const base = _path.join('\\')
  params.value.base = base
  fileList.refetch()
}

const handlePathClick = (index) => {
  const originLen = path.value.length
  const _path = [...path.value]
  _path.splice(index + 1, originLen - index)
  const base = _path.join('\\')
  params.value.base = base
  fileList.refetch()
}

const lastPath = () => {
  const _path = [...path.value]
  _path.pop()
  const base = _path.join('\\')
  params.value.base = base
  fileList.refetch()
}

const editPath = () => {
  if (isEditing.value) {
    isEditing.value = false
    const _path = pathString.value.split('/')
    path.value = _path
    params.value.base = _path.join('\\')
    fileList.refetch()
  } else {
    isEditing.value = true
    const _path = [...path.value]
    pathString.value = _path.join('/')
  }
}

const goPage = (index) => {
  let url = ''
  if (index === 1) {
    url = 'https://github.com/yuyinws/wow-code'
  } else {
    url = 'https://www.npmjs.com/package/wow-code'
  }
  window.open(url, '_blank')
}

watch(() => {
  if (fileList.result.value) {
    console.log(fileList.result.value)
    path.value = fileList.result.value.getFileList.path.split('\\')
    children.value = fileList.result.value.getFileList.children.filter(
      (x) => !!x
    )
  }
  if (generatorError.value) {
    console.log(generatorError.value)
  }
})
</script>

<style scoped></style>
