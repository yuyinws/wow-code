export default function scriptGenerator (breadcrumbList) {
  const code = `<script setup>
import { ref,reactive } from 'vue'
const breadcrumbList = ref(${JSON.stringify(breadcrumbList)})
</script>
`
  return code
}