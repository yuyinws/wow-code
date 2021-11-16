<template>
  <div>
    <div>
      {{ `${path.join('/')}/${fileName}` }}
    </div>
    <n-button type="info" @click="generatorClick">生成文件</n-button>
    <n-button color="#3B82F6" @click="isModalShow = !isModalShow"
      >选择路径</n-button
    >
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
            class="hover:bg-green-100 rounded-md p-1 cursor-pointer flex-grow"
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
import { NButton, NModal, NCard, NInput, NDivider, NIcon } from 'naive-ui'
import { ArrowBackOutline, FolderOutline } from '@vicons/ionicons5'
import { Edit32Filled } from '@vicons/fluent'
import { DoneRound } from '@vicons/material'
import gql from 'graphql-tag'

const isModalShow = ref(false)
const isEditing = ref(false)
const config = JSON.stringify({
  breadcrumbList: ['业务订单', '检查预约'],
  searchItem: [
    {
      type: 'input',
      label: '输入框',
    },
  ],
})

const path = ref([])
const pathString = ref('')
const fileName = ref('')
const children = ref([])

const params = ref({
  base: '',
})
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

const { mutate: generator } = useMutation(gql`
  mutation generator($config: String!, $path: String!) {
    generator(config: $config, path: $path)
  }
`)

const generatorClick = () => {
  let _path = path.value.join('//')
  _path = _path + `//${fileName.value}`
  generator({
    config: config,
    path: _path,
  })
}

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

watch(() => {
  if (fileList.result.value) {
    console.log(fileList.result.value)
    path.value = fileList.result.value.getFileList.path.split('\\')
    children.value = fileList.result.value.getFileList.children.filter(
      (x) => !!x
    )
  }
})
</script>

<style scoped></style>
