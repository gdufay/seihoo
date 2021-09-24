<template>
  <section>
    <div class="container">
      <div class="header">
        <h2 class="title">Shopping List</h2>

        <el-button
          v-if="selectedIngredients.size"
          plain
          type="info"
          @click="onRemove"
          >REMOVE</el-button
        >
        <el-button
          v-else
          plain
          type="info"
          @click="download"
          :disabled="!ingredients.length"
          >DOWNLOAD</el-button
        >
      </div>

      <div class="content">
        <div
          v-for="{ name, quantity, unit } in ingredients"
          :key="name"
          class="item"
        >
          <el-checkbox @change="onSelect($event, name)"></el-checkbox>
          <ingredient-item
            :name="name"
            :quantity="quantity"
            :unit="unit"
            class="ingredient"
          ></ingredient-item>
        </div>

        <ingredient-recipe-form
          @save="onAdd"
          class="item"
          :filter="filter"
        ></ingredient-recipe-form>
      </div>
    </div>
  </section>
</template>

<script>
import { generateShoppingList } from "@/utils/pdf";
import { Recipe } from "../models";
import { recipesToShoppingMap } from "../utils/utils";
import IngredientItem from "./IngredientItem.vue";
import IngredientRecipeForm from "./IngredientRecipeForm.vue";

export default {
  name: "shopping-list",

  components: { IngredientItem, IngredientRecipeForm },

  data() {
    return {
      ingredients: [],
      selectedIngredients: new Set(),
    };
  },

  computed: {
    recipes() {
      return Recipe.query().where("selected", true).withAllRecursive().get();
    },

    filter() {
      return this.ingredients.map(({ name }) => name);
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

    onSelect(value, name) {
      if (value) {
        this.selectedIngredients.add(name);
      } else {
        this.selectedIngredients.delete(name);
      }
    },

    onRemove() {
      this.selectedIngredients.forEach((ingredientName) => {
        const index = this.ingredients.findIndex(
          ({ name }) => name === ingredientName
        );

        this.ingredients.splice(index, 1);
      });
      this.selectedIngredients.clear();
    },

    onAdd({ quantity, ingredient: { name, unit } }) {
      this.ingredients.push({ quantity, name, unit: unit.name });
    },
  },
};
</script>

<style>
.item {
  padding: 12px 24px;
}

.item .el-checkbox {
  float: left;
}
</style>