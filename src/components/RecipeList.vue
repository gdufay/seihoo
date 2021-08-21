<template>
  <el-card>
    <div class="card-header column-header">
      <span>Recipes</span>
    </div>

    <el-scrollbar>
      <recipe-item
        v-for="recipe in recipes"
        :key="recipe.get('name')"
        :recipe="recipe"
        :actions="actions"
        @menuAction="handleMenuAction"
      >
      </recipe-item>
    </el-scrollbar>
  </el-card>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import RecipeItem from "./RecipeItem.vue";

const SELECT_ACTION = "select";
const EDIT_ACTION = "edit";
const REMOVE_ACTION = "remove";

export default {
  name: "recipe-list",

  components: { RecipeItem },

  data() {
    return {
      actions: [
        { id: SELECT_ACTION, text: "Select" },
        { id: EDIT_ACTION, text: "Edit" },
        { id: REMOVE_ACTION, text: "Remove" },
      ],
    };
  },

  computed: {
    ...mapState({
      recipes: (state) => state.recipes.recipes,
    }),
  },

  methods: {
    ...mapMutations(["selectRecipe"]),

    handleMenuAction({ action, recipe }) {
      switch (action) {
        case SELECT_ACTION:
          this.selectRecipe(recipe);
          break;
        case EDIT_ACTION:
          this.editRecipe(recipe);
          break;
        case REMOVE_ACTION:
          this.removeRecipe(recipe);
          break;
        default:
          console.error("Unknown action", action);
      }
    },

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