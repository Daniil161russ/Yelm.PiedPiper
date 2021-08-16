<template>
  <el-dialog :close-on-press-escape="false" :visible.sync="NewsDelete" custom-class="Items__AddCategory-Dialog Items__AddCategory-Dialog_EmptyHeader"
             @close="$emit('hide', { complete: false })" :append-to-body="true" :show-close="false" :close-on-click-modal="false" :center="true">
    <div class="Items__AddCategory-Delete" slot="default">
      <div class="Items__AddCategory-Delete_Label">Вы действительно хотите удалить <br>новость "{{ name }}" ?</div>
      <div class="Items__AddCategory-Delete_Actions">
        <v-btn round="" plain="" color="success" size="small" @click="removeNews">Потвердить</v-btn>
        <v-btn round="" plain="" color="danger" @click="$emit('hide', { complete: false })" size="small">Отказаться</v-btn>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import Button from "@/components/atoms/button";
import { mapActions } from 'vuex'
export default {
  name: "Delete",
  components: {
    'v-btn': Button
  },
  methods: {
    ...mapActions({
      deleteNews: 'news/deleteNews'
    }),
    async removeNews () {
      try {
        await this.deleteNews({ id: this.id })
        this.$emit('hide', { complete: true })
      } catch (e) {
        console.log(e)
      }
    }
  },
  props: {
    name: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  data: () => {
    return {
      NewsDelete: true
    }
  }
}
</script>

<style scoped>

</style>
