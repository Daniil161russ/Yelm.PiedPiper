<template>
  <div class="Items__AddCategory">
    <el-dialog :close-on-press-escape="false" :close-on-click-modal="false" :visible.sync="DeleteCategoryDialog"
               :append-to-body="true" custom-class="Items__AddCategory-Dialog Items__AddCategory-Dialog_EmptyHeader" :show-close="false" @close="$emit('hide')">
      <div class="Items__AddCategory-Delete" slot="default">
        <div class="Items__AddCategory-Delete_Label">Вы дейсddddтвительно хотите удалить <br>категорию "{{ category.name['RU'] }}" ?</div>
        <div class="Items__AddCategory-Delete_Actions">
          <v-btn round="" plain="" color="success" size="small" @click="deleteCategory">Потвердить</v-btn>
          <v-btn round="" plain="" color="danger" @click="$emit('hide')" size="small">Отказаться</v-btn>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import Button from '@/components/atoms/button'
export default {
  name: "DeleteCategory",
  components: {
    'v-btn': Button
  },
  props: {
    value: {
      type: Number,
      required: false
    }
  },
  computed: {
    ...mapGetters({
      categories: 'category/getCategories'
    })
  },
  methods: {
    ...mapActions({
      removeCategory: 'category/removeCategory'
    }),
    async deleteCategory () {
      await this.removeCategory(this.category)
      this.$emit('hide')
    }
  },
  created() {
    this.category = this.categories.find((value) => (value.id === this.value))
  },
  data: () => ({
    DeleteCategoryDialog: true
  })
}
</script>

<style scoped>

</style>
