<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>Recipes</span>
      </div>
    </template>

    <el-card v-for="recipe in recipes" :key="recipe.get('name')">
      <template #header>
        <div class="card-header">
          {{ recipe.get("name") }}
        </div>
      </template>

      <div class="ingredients-container">
        <ingredient-item
          v-for="{ ingredient, quantity } in recipe.get('ingredients')"
          :key="ingredient.get('name')"
          :name="ingredient.get('name')"
          :quantity="quantity"
          :unit="ingredient.get('unit').get('name')"
        ></ingredient-item>
      </div>

      <el-button @click="editRecipe(recipe)">Edit</el-button>
      <el-button @click="removeRecipe(recipe)">Remove</el-button>
    </el-card>
  </el-card>
</template>

<script>
import { mapState } from "vuex";
import IngredientItem from "./IngredientItem.vue";

export default {
  name: "recipe-list",

  components: {
    IngredientItem,
  },

  computed: {
    ...mapState({
      recipes: (state) => state.recipes.recipes,
    }),
  },

  methods: {
    editRecipe(recipe) {
      this.$router.push("/edit/" + recipe.id);
    },

    removeRecipe(recipe) {
      console.log("Removing recipe:", recipe);
    },
  },
};
</script>

<style>
</style>