<template>
  <el-card>
    <div class="card-header column-header">
      <span>Selected Recipes</span>
    </div>

    <el-scrollbar style="height: 0">
      <recipe-item
        v-for="recipe in recipes"
        :key="recipe.objectId"
        :recipe="recipe"
        :actions="actions"
        @menuAction="handleMenuAction"
      >
      </recipe-item>
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
import RecipeItem from "./RecipeItem.vue";

const UNSELECT_RECIPE = "unselect";

export default {
  name: "selected-recipe-list",

  components: { RecipeItem },

  data() {
    return {
      actions: [{ id: UNSELECT_RECIPE, text: "Unselect" }],
    };
  },

  computed: {
    ...mapState({
      recipes: (state) => state.recipes.selectedRecipes,
    }),
  },

  methods: {
    ...mapMutations(["unselectRecipe"]),

    handleMenuAction({ action, recipe }) {
      switch (action) {
        case UNSELECT_RECIPE:
          this.unselectRecipe(recipe);
          break;
        default:
          console.error("Unknown action:", action);
          break;
      }
    },

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
        .catch(
          () => this.$message({ type: "info", message: "Random canceled" }) // TODO: catch other error message
        );
    },
  },
};
</script>

<style>
</style>