<template>
  <div class="checkbox">
    <el-checkbox :value="value" @change="$emit('input', $event)" />
  </div>
</template>

<script>
export default {
  name: "checkbox",
  props: [ 'value' ],
}
</script>

<style scoped>

</style>
