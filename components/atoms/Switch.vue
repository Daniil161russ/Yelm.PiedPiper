<template>
  <div class="switch">
    <client-only>
      <el-switch :value="value" @change="changeSwitch" :disabled="disabled"/>
    </client-only>
  </div>
</template>

<script>
export default {
  name: "yelmSwitch",
  props: [ 'value', 'disabled' ],
  methods: {
    changeSwitch (event) {
      this.$emit('input', event)
      this.$emit('change', event)
    }
  }
}
</script>

<style scoped>

</style>
