<template>
  <div class="Items__AddCategory">
    <el-dialog :close-on-press-escape="false" :close-on-click-modal="false" :visible.sync="DeleteSubCategoryDialog"
               :append-to-body="true" custom-class="Items__AddCategory-Dialog Items__AddCategory-Dialog_EmptyHeader" :show-close="false" @close="$emit('hide')">
      <div class="Items__AddCategory-Delete" slot="default">
        <div class="Items__AddCategory-Delete_Label">Вы действительно хотите удалить <br>подкатегорию "{{ subcategory.name['RU'] }}" ?</div>
        <div class="Items__AddCategory-Delete_Actions">
          <v-btn round="" plain="" color="success" size="small" @click="deleteSubCategory">Потвердить</v-btn>
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
  name: "Delete",
  components: {
    'v-btn': Button
  },

  created() {
    this.category = this.categories.find((value) => (value.id === this.category_id))
    this.subcategory = this.category.subcategories.find((value) => (value.id === this.value))
  },

  computed: {
    ...mapGetters({
      categories: 'category/getCategories'
    })
  },

  mounted() {
    // console.log('delete subcategory: ', this.subcategory)
  },

  methods: {
    ...mapActions({
      removeSubCategory: 'category/removeSubCategory'
    }),
    async deleteSubCategory () {
      await this.removeSubCategory ({ id: this.value }).then(response => {
        if (response === 403) {
          this.$notify.error({ title: 'Ошибка', message: 'Удалите/измените подкатегорию в товаре', customClass: 'el-notification-error', duration: 1000  })
        }
      })
      this.$emit('hide')
    }
  },
  props: {
    value: {
      type: Number,
      required: true
    },
    category_id: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    DeleteSubCategoryDialog: true
  })
}
</script>

<style scoped>

</style>
