<template>
  <el-card>
    <div class="card-header column-header">
      <span>Selected Recipes</span>
    </div>

    <el-scrollbar style="height: 0">
      <el-collapse v-model="activeRecipes">
        <el-collapse-item
          v-for="recipe in recipes"
          :key="recipe.objectId"
          :title="recipe.name"
        >
          <ingredient-item
            v-for="{ ingredient, quantity } in recipe.ingredients"
            :key="ingredient.objectId"
            :name="ingredient.name"
            :quantity="quantity"
            :unit="ingredient.unit.name"
          ></ingredient-item>

          <div class="button-group__container">
            <el-tooltip content="Unselect">
              <el-button
                type="primary"
                @click="unselectRecipe(recipe)"
                size="mini"
                plain
                icon="el-icon-close"
              ></el-button>
            </el-tooltip>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-scrollbar>

    <div class="card__bottom">
      <el-tooltip content="Get random recipes">
        <el-button
          type="warning"
          @click="generateRandom"
          icon="el-icon-setting"
          circle
        ></el-button>
      </el-tooltip>
    </div>
  </el-card>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import IngredientItem from "./IngredientItem.vue";

export default {
  name: "selected-recipe-list",

  components: { IngredientItem },

  data() {
    return {
      activeRecipes: [],
    };
  },

  computed: {
    ...mapState({
      recipes: (state) => state.recipes.selectedRecipes,
    }),
  },

  methods: {
    ...mapMutations(["unselectRecipe"]),

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
  },
};
</script>

<style>
</style>