<template>
  <el-card>
    <div class="card-header column-header">
      <span>Selected Recipes</span>
    </div>

    <recipe-item
      v-for="recipe in recipes"
      :key="recipe.get('name')"
      :recipe="recipe"
      :actions="actions"
      @menuAction="handleMenuAction"
    >
    </recipe-item>
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
  },
};
</script>

<style>
</style>