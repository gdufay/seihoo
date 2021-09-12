<template>
  <section class="SelectedRecipes">
    <div class="container">
      <div class="header">
        <h2 class="title">Selected Recipes</h2>

        <el-button
          v-if="selectedRecipes.size"
          plain
          type="info"
          @click="unselect"
        >
          UNSELECT
        </el-button>
        <el-button v-else plain type="info" @click="generateRandom">
          GENERATE
        </el-button>

        <el-input
          class="search"
          placeholder="search"
          prefix-icon="el-icon-search"
          v-model="searchQuery"
        ></el-input>
      </div>

      <el-collapse v-model="activeRecipes" class="content">
        <el-collapse-item
          v-for="recipe in recipes"
          :key="recipe.objectId"
          :name="recipe.name"
          class="recipe"
        >
          <template #title>
            <el-checkbox
              @change="selectRecipe($event, recipe.objectId)"
              class="capitalize"
            >
              {{ recipe.name }}
            </el-checkbox>
          </template>

          <ingredient-item
            v-for="ingredient in recipe.ingredients"
            :key="ingredient.objectId"
            :name="ingredient.name"
            :quantity="ingredient.pivot.quantity"
            :unit="ingredient.unit.name"
          ></ingredient-item>
        </el-collapse-item>
      </el-collapse>
    </div>
  </section>
</template>

<script>
import { computed, ref } from "vue";
import { Recipe } from "../models";
import IngredientItem from "./IngredientItem.vue";
import useModelNameSearch from "../composables/useModelNameSearch";

export default {
  name: "selected-recipe-list",

  components: { IngredientItem },

  setup() {
    const recipes = computed(() =>
      Recipe.query()
        .where("selected", true)
        .withAllRecursive()
        .orderBy("name")
        .get()
    );
    const { searchQuery, modelsMatchingSearchQuery } =
      useModelNameSearch(recipes);

    const activeRecipes = ref([]);
    const selectedRecipes = ref(new Set())

    return {
      recipes: modelsMatchingSearchQuery,
      searchQuery,
      activeRecipes,
      selectedRecipes,
    };
  },

  methods: {
    async generateRandom() {
      try {
        const { value } = await this.$prompt(
          "Please input the number of recipe you want",
          "Number of recipes",
          { inputType: "number", inputErrorMessage: "Invalid number" }
        );
        Recipe.selectRandom(parseInt(value, 10));
      } catch (e) {
        this.$message({ type: "info", message: "Random canceled" });
      }
    },

    selectRecipe(value, objectId) {
      if (value) {
        this.selectedRecipes.add(objectId);
      } else {
        this.selectedRecipes.delete(objectId);
      }
    },

    unselect() {
      this.selectedRecipes.forEach((objectId) => {
        Recipe.unselect(objectId);
        this.selectedRecipes.delete(objectId);
      });
    },
  },
};
</script>

<style>
</style>