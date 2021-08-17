<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>Recipes</span>
      </div>
    </template>

    <el-card v-for="recipe in recipes" :key="recipe">
      <template #header>
        <div class="card-header">
          {{ recipe.get("name") }}
        </div>
      </template>
      <ul>
        <li v-for="ingredient in recipe.get('ingredients')" :key="ingredient">
          {{ ingredient.get("name") }}
        </li>
      </ul>

      <el-button @click="editRecipe(recipe)">Edit</el-button>
      <el-button @click="removeRecipe(recipe)">Remove</el-button>
    </el-card>
  </el-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "recipe-list",

  computed: {
    ...mapState({
      recipes: (state) => state.recipes.recipes,
    }),
  },

  mounted() {
    // this.$store.dispatch("getAllRecipes");
  },

  methods: {
      editRecipe(recipe) {
          console.log("Editing recipe:", recipe);
      },

      removeRecipe(recipe) {
          console.log("Removing recipe:", recipe);
      },
  }
};
</script>

<style>
</style>