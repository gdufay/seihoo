<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>Selected Recipes</span>
      </div>
    </template>

    <recipe-item
      v-for="recipe in recipes"
      :key="recipe.get('name')"
      :recipe="recipe"
    >
      <template #footer="{ item }">
        <el-button @click="unselectRecipe(item)">Unselect</el-button>
      </template>
    </recipe-item>
  </el-card>
</template>

<script>
import { mapState } from "vuex";
import RecipeItem from "./RecipeItem.vue";
export default {
  name: "selected-recipe-list",

  components: { RecipeItem },

  computed: {
    ...mapState({
      recipes: (state) => state.recipes.selectedRecipes,
    }),
  },

  methods: {
    unselectRecipe(recipe) {
      console.log("Unselecting recipe", recipe);
    },
  },
};
</script>

<style>
</style>