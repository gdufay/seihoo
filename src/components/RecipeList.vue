<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>Recipes</span>
      </div>
    </template>

    <recipe-item
      v-for="recipe in recipes"
      :key="recipe.get('name')"
      :recipe="recipe"
    >
      <template #footer="{ item }">
        <el-button @click="selectRecipe(item)">Select</el-button>
        <el-button @click="editRecipe(item)">Edit</el-button>
        <el-button @click="removeRecipe(item)">Remove</el-button>
      </template>
    </recipe-item>
  </el-card>
</template>

<script>
import { mapState } from "vuex";
import RecipeItem from "./RecipeItem.vue";

export default {
  name: "recipe-list",

  components: { RecipeItem },

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

    selectRecipe(recipe) {
      console.log("Selection recipe:", recipe);
    },
  },
};
</script>

<style>
</style>