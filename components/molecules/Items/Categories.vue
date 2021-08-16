<template>
  <div class="Items__Categories">
    <div class="Items__Categories-Placeholder_Arrow" v-if="!categories.length" />
      <div class="grid__aside-header">
        <div class="Items__Categories-Header">
          <div class="text text__extra-large text__medium text__dark">Список категорий</div>
          <v-button color="primary" plain="" circle="" icon="" @click="addCategory">
            <template slot="icon"><v-icon name="Plus" color="primary" fill="" /></template>
          </v-button>
        </div>
      </div>
    <div class="grid__aside-body">
      <div class="Items__Categories-Placeholder" v-if="!categories.length">
        <div class="Items__Categories-Placeholder_Box">Нажмите, чтобы<br>добавить категорию</div>
      </div>
      <div class="Items__Categories-Container" v-if="categories.length">
        <div class="Items__Categories-Row">
          <div class="Items__Categories-Col" v-for="(category, category_idx) in categories" :key="category_idx">
            <div class="Items__Categories-Col_Left">
              <v-img class="Items__Categories-Col_Image" :link="category.image" :width="70" :height="70" :radius="10" :style="{ backgroundSize: 'cover' }" />
              <div class="Items__Categories-Col_Body">
                <div class="Items__Categories-Col_Title text text__large text__medium text__dark">{{ category.name['RU'] }}</div>
                <v-button class="Items__Categories-Col_Categories" @click="showSubCategories(category_idx)" :class="{ 'Active': category.show_subcategories }" shadow="none" color="secondary-200" native="button" plain="" v-if="category.subcategories.length">
                  <span class="text text__secondary-200 text__medium">
                    {{ category.subcategories.length }} {{ (category.subcategories.length === 1) ? 'подкатегория' : (category.subcategories.length > 1 && category.subcategories.length < 4) ? 'подкатегории' : 'подкатегорий' }}
                  </span>
                  <v-icon name="ChevronDown" size="small" color="secondary-200" fill="" />
                </v-button>
              </div>
            </div>
            <div class="Items__Categories-Col_Actions">
              <el-popover :width="160" trigger="click" :visible-arrow="false" placement="bottom-end" popper-class="el-popover__buttons">
                <v-button color="primary" plain="" circle="" icon="" slot="reference" shadow="none" size="small"><v-icon name="More" color="secondary-100" fill="" slot="icon" /></v-button>
                <ul class="popover" slot="default">
                  <li class="popover__item">
                    <button @click.prevent="editCategory(category.id)" class="popover__item-btn">Редактировать</button>
                  </li>
                  <li class="popover__item">
                    <button @click.prevent="deleteCategory(category.id)" class="popover__item-btn popover__item-btn_delete">Удалить</button>
                  </li>
                </ul>
              </el-popover>
              <v-button color="primary" circle="" icon="" size="small" shadow="none" @click="addSubCategory(category.id)">
                <v-icon slot="icon" color="white" fill="" name="Plus" size="small" />
              </v-button>
            </div>
            <div class="Items__SubCategories" v-if="category.subcategories.length" :class="{ 'Show': (category.show_subcategories), 'Hide': (!category.show_subcategories) }">
              <ul class="Items__SubCategories_List">
                <li class="Items__SubCategories_Item" v-for="(subcategory, subcategory_idx) in category.subcategories" :key="subcategory.id">
                  <v-button class="Items__SubCategories_Label" :color="(select_subcategory === subcategory.id) ? ('primary') : ('secondary-200')"
                            shadow="none" plain="" @click="e_select_subcategory(subcategory.id)">
                    {{ (subcategory_idx+1) }}. {{ subcategory.name['RU'] }}
                  </v-button>
                  <el-popover :width="160" trigger="click" :visible-arrow="false" placement="bottom-end" popper-class="el-popover__buttons">
                    <v-button class="Items__SubCategories_Action" circle="" plain="" icon="" size="small" shadow="none" slot="reference">
                      <v-icon slot="icon" color="secondary-100" fill="" name="More" />
                    </v-button>
                    <ul class="popover" slot="default">
                      <li class="popover__item">
                        <button @click="editSubCategory(subcategory.id, category.id, subcategory.status)" class="popover__item-btn">Редактировать</button>
                      </li>
                      <li class="popover__item">
                        <button @click="deleteSubCategory(subcategory.id, category.id)" class="popover__item-btn popover__item-btn_delete">Удалить</button>
                      </li>
                    </ul>
                  </el-popover>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Category -->
    <component :is="AddCategory.Component" v-if="AddCategory.Component != null" @hide="addCategoryClose" />
    <component :is="EditCategory.Component" v-if="EditCategory.Component != null" v-model="EditCategory.ID" @hide="editCategoryClose" />
    <component :is="DeleteCategory.Component" v-if="DeleteCategory.Component != null" v-model="DeleteCategory.ID" @hide="deleteCategoryClose" />
    <!-- SubCategory -->
    <component :is="AddSubCategory.Component" v-if="AddSubCategory.Component != null" v-model="AddSubCategory.ID" @hide="addSubCategoryClose" />
    <component :is="EditSubCategory.Component" v-if="EditSubCategory.Component != null" v-model="EditSubCategory.ID" :category_id="EditSubCategory.Category" :status="EditSubCategory.Status" @hide="editSubCategoryClose" />
    <component :is="DeleteSubCategory.Component" v-if="DeleteSubCategory.Component != null" v-model="DeleteSubCategory.ID" :category_id="DeleteSubCategory.Category" @hide="deleteSubCategoryClose" />
  </div>
</template>

<script>
import Button from "@/components/atoms/button";
import Icon from "@/components/atoms/icon";
import Image from "@/components/atoms/Image";
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: "Categories",
  components: {
    'v-button': Button,
    'v-icon': Icon,
    'v-img': Image,
  },
  computed: {
    ...mapGetters({
      categories: 'category/getCategories',
      select_subcategory: 'category/getSelectSubCategory'
    })
  },
  created() {

  },
  mounted() {
  },
  methods: {
    ...mapActions({
      getCategories: 'category/getCategories'
    }),
    ...mapMutations({
      showSubCategories: 'category/showSubCategories',
      selectSubcategory: 'category/selectSubcategory',
      setItemsTable: 'items/setItemsTable'
    }),
    e_select_subcategory (subcategory_id) {
      if (this.select_subcategory === subcategory_id) {
        this.selectSubcategory (null)
        this.setItemsTable(null)
      } else {
        this.selectSubcategory (subcategory_id)
        this.setItemsTable(subcategory_id)
      }
    },
    async addCategory () {
      this.AddCategory.Component = await require('~/components/molecules/Items/Category/Add').default
    },
    async editCategory (category_id) {
      this.EditCategory.ID = category_id
      this.EditCategory.Component = await require('~/components/molecules/Items/Category/Edit').default
    },
    async deleteCategory (category_id) {
      this.DeleteCategory.ID = category_id
      this.DeleteCategory.Component = await require('~/components/molecules/Items/Category/Delete').default
    },
    addCategoryClose () {
      this.AddCategory.Component = null
    },
    editCategoryClose () {
      this.EditCategory = { ID: null, Component: null }
    },
    deleteCategoryClose () {
      this.DeleteCategory = { ID: null, Component: null }
    },
    //// Подкатегории
    async addSubCategory (category_id) {
      this.AddSubCategory.ID = category_id
      this.AddSubCategory.Component = await require('~/components/molecules/Items/SubCategory/Add').default
    },
    async editSubCategory (subcategory_id, category_id, status) {
      this.EditSubCategory.ID = subcategory_id
      this.EditSubCategory.Category = category_id
      this.EditSubCategory.Status = status
      this.EditSubCategory.Component = await require('~/components/molecules/Items/SubCategory/Edit').default
    },
    async deleteSubCategory (subcategory_id, category_id) {
      this.DeleteSubCategory.ID = subcategory_id
      this.DeleteSubCategory.Category = category_id
      this.DeleteSubCategory.Component = await require('~/components/molecules/Items/SubCategory/Delete').default
    },
    addSubCategoryClose () {
      this.AddSubCategory = { Component: null, ID: null }
    },
    editSubCategoryClose () {
      this.EditSubCategory = { Component: null, ID: null, Category: null }
    },
    deleteSubCategoryClose () {
      this.DeleteSubCategory = { Component: null, ID: null, Category: null }
    },
  },
  data: () => ({
    // Category
    AddCategory: { Component: null },
    EditCategory: { ID: null, Component: null },
    DeleteCategory: { ID: null, Component: null },
    // SubCategory
    AddSubCategory: { Component: null, ID: null },
    EditSubCategory: { Component: null, ID: null, Category: null },
    DeleteSubCategory: { Component: null, ID: null, Category: null }
  })
}
</script>

<style scoped>

</style>
