export default function scriptGenerator(breadcrumbList, searchList) {
  const code = `<script setup>
import { ref,reactive } from 'vue'
const breadcrumbList = ref(${JSON.stringify(breadcrumbList)})
const searchForm = ref({
  ${searchRef(searchList)}
})
${options(searchList)}
const page = ref({
  size: 0,
  page: 1,
  total: 0,
})
</script>
`
  return code
}

function searchRef(searchList) {
  let code = ''
  searchList.forEach((item) => {
    code += `
    ${item.param}: null,`
  })
  return code
}

function options(searchList) {
  if (searchList.filter((item) => item.type === 'select')) {
    return `const options = [
      {
        value: 'op1',
        label: '选项1',
      },
      {
        value: 'op2',
        label: '选项2',
      },
    ]`
  }
}
