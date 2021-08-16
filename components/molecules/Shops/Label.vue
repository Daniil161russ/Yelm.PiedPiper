<template>
  <div class="Shops__Label">{{ label }}</div>
</template>

<script>
export default {
  name: "Label",
  props: {
    label: {
      required: true,
      type: String
    }
  }
}
</script>

<style scoped>

</style>
