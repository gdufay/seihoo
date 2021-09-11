<template>
  <section>
    <div class="container">
      <div class="header">
        <h2 class="title">Shopping List</h2>
        <el-button
          plain
          type="info"
          @click="download"
          :disabled="!ingredients.length"
          >DOWNLOAD</el-button
        >
      </div>

      <div class="content">
        <ingredient-item
          v-for="{ name, quantity, unit } in ingredients"
          :key="name"
          :name="name"
          :quantity="quantity"
          :unit="unit"
          class="ingredient"
        ></ingredient-item>
      </div>
    </div>
  </section>
</template>

<script>
import IngredientItem from "./IngredientItem.vue";
import { generateShoppingList } from "@/utils/pdf";
import { Recipe } from "../models";
import { recipesToShoppingMap } from "../utils/utils";

export default {
  name: "shopping-list",

  components: { IngredientItem },

  data() {
    return {
      ingredients: [],
    };
  },

  computed: {
    recipes() {
      return Recipe.query().where("selected", true).withAllRecursive().get();
    },
  },

  watch: {
    recipes: {
      handler(newRecipes) {
        const map = recipesToShoppingMap(newRecipes);

        this.ingredients = Array.from(map, ([name, value]) => ({
          name,
          ...value,
        })).sort((a, b) => (a.type < b.type ? -1 : 1));
      },
      immediate: true,
    },
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