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
      </div>

      <el-scrollbar>
        <el-collapse v-model="activeRecipes">
          <el-collapse-item
            v-for="recipe in recipes"
            :key="recipe.objectId"
            :name="recipe.name"
            class="recipe"
          >
            <template #title>
              <el-checkbox @change="selectRecipe($event, recipe.objectId)">
                {{ recipe.name }}
              </el-checkbox>
            </template>

            <ingredient-item
              v-for="{ ingredient, quantity } in recipe.ingredients"
              :key="ingredient.objectId"
              :name="ingredient.name"
              :quantity="quantity"
              :unit="ingredient.unit.name"
            ></ingredient-item>
          </el-collapse-item>
        </el-collapse>
      </el-scrollbar>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import IngredientItem from "./IngredientItem.vue";

export default {
  name: "selected-recipe-list",

  components: { IngredientItem },

  data() {
    return {
      activeRecipes: [],
      selectedRecipes: new Set(),
    };
  },

  computed: {
    ...mapState({
      recipes: (state) => state.recipes.selectedRecipes,
    }),
  },

  methods: {
    generateRandom() {
      this.$prompt(
        "Please input the number of recipe you want",
        "Number of recipes",
        {
          inputType: "number",
          inputErrorMessage: "Invalid number",
        }
      )
        .then(({ value }) =>
          this.$store.dispatch("generateRandom", parseInt(value, 10) || 0)
        )
        .catch(() =>
          this.$message({ type: "info", message: "Random canceled" })
        );
    },

    selectRecipe(value, objectId) {
      if (value) {
        this.selectedRecipes.add(objectId);
      } else {
        this.selectedRecipes.delete(objectId);
      }
    },

    unselect() {
      this.selectedRecipes.forEach((recipe) => {
        this.$store.commit("unselectRecipe", recipe);
        this.selectedRecipes.delete(recipe);
      });
    },
  },
};
</script>

<style>
</style>