<template>
  <!-- <button type @click="refetchTest">refetch</button> -->
  <div class="flex">
    <div
      class="text-red-700"
      @click="handlePathClick(index)"
      v-for="(item, index) in path"
      :key="index"
    >
      {{ item }}\
    </div>
  </div>
  <div
    @click="handleFolderClick(item.name)"
    v-for="(item, index) in children"
    :key="index"
  >
    {{ item.name }}
  </div>
</template>

<script setup>
import { watchEffect, ref, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const path = ref([])
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

const handleFolderClick = (name) => {
  const _path = [...path.value]
  _path.push(name)
  const base = _path.join('\\')
  params.value.base = base
  fileList.refetch()
}

const handlePathClick = (index) => {
  console.log(index)
  const originLen = path.value.length
  const _path = [...path.value]
  console.log('_path', _path)
  _path.splice(index + 1, originLen - index)
  const base = _path.join('\\')
  params.value.base = base
  fileList.refetch()
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

<style scoped>
a {
  color: #42b983;
}
</style>
