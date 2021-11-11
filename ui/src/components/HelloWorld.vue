<template>
  <button type @click="refetchTest">refetch</button>
  <div class="flex">
    <div class="text-red-700" v-for="item in path">{{ item }}\</div>
  </div>
  <div @click="handleFolderClick(item.name)" v-for="item in children">
    {{item.name}}
  </div>
</template>


<script setup>
import { watchEffect, ref, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const path = ref([])
const children = ref([])

const vars = ref({
  base: ''
})
const { result, refetch } = useQuery(gql`
   query testQuery($base:String){
    getFileList(base:$base){
      path,
      children {
        name,
        path
      }
    }
  }
`, vars)

const refetchTest = () => {
  vars.value.base = 'D://nodeJs'
  refetch()
}

watch(() => {
  console.log(result.value)
  if (result.value) {
    path.value = result.value.getFileList.path.split('\\')
    children.value = result.value.getFileList.children.filter((x) => !!x)
  }
  // let test = result.value.getFileList.path.split('//')
})
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
