<template>
  <section>
    <div class="container">
      <div class="header">
        <h2 class="title">Shopping List</h2>
        <el-button
          plain
          type="info"
          @click="download"
          :disabled="!ingredients.size"
          >DOWNLOAD</el-button
        >
      </div>

      <div class="content">
        <ingredient-item
          v-for="[name, { quantity, unit }] in ingredients"
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

export default {
  name: "shopping-list",

  components: { IngredientItem },

  data() {
    return {
      ingredients: new Map(),
    };
  },

  computed: {
    recipes() {
      return Recipe.query().where("selected", true).withAllRecursive().get();
    },
  },

  watch: {
    recipes(newRecipes) {
      this.ingredients.clear();

      for (const { ingredients } of newRecipes) {
        for (const { name, unit, pivot: { quantity } } of ingredients) {
          const { quantity: oldQuantity = 0 } = this.ingredients.get(name) || {};

          this.ingredients.set(name, {
            unit: unit.name,
            quantity: oldQuantity + quantity,
          });
        }
      }
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