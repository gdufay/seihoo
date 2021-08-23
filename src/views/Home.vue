<template>
  <recipe-list class="column-card"></recipe-list>

  <ingredient-list class="column-card"></ingredient-list>

  <selected-recipe-list class="column-card"></selected-recipe-list>

  <shopping-list class="column-card"></shopping-list>
</template>

<script>
import IngredientList from "../components/IngredientList.vue";
import RecipeList from "../components/RecipeList.vue";
import SelectedRecipeList from "../components/SelectedRecipeList.vue";
import ShoppingList from "../components/ShoppingList.vue";

export default {
  name: "Home",

  components: {
    IngredientList,
    RecipeList,
    SelectedRecipeList,
    ShoppingList,
  },

  data() {
    return {};
  },

  computed: {},

  mounted() {},

  methods: {},
};
</script>

<style>
.column-card {
  width: 350px;
  min-width: 350px;
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
}

.column-header {
  font-weight: 600;
  font-size: 14px;
  margin: 1rem 0;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
