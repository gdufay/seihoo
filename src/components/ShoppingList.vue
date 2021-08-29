<template>
  <section>
    <div class="container">
      <div class="header">
        <h2 class="title">Shopping List</h2>
        <el-button plain type="info" @click="download">DOWNLOAD</el-button>
      </div>

      <el-scrollbar>
        <ingredient-item
          v-for="[name, { quantity, unit }] in ingredients"
          :key="name"
          :name="name"
          :quantity="quantity"
          :unit="unit"
          class="ingredient"
        ></ingredient-item>
      </el-scrollbar>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import IngredientItem from "./IngredientItem.vue";
import { generateShoppingList } from "@/utils/pdf";

export default {
  name: "shopping-list",

  components: { IngredientItem },

  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      ingredients: "shoppingListFromSelected",
    }),
  },

  methods: {
    download() {
      generateShoppingList(this.ingredients);
    },
  },
};
</script>

<style>
</style>
