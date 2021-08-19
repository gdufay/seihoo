<template>
  <recipe-list class="column-card"></recipe-list>

  <ingredient-list class="column-card"></ingredient-list>

  <selected-recipe-list class="column-card"></selected-recipe-list>

  <el-card class="column-card">
    <template #header>
      <div class="card-header">
        <span>Shopping List</span>
      </div>
    </template>
  </el-card>
</template>

<script>
import IngredientList from "../components/IngredientList.vue";
import RecipeList from "../components/RecipeList.vue";
import SelectedRecipeList from "../components/SelectedRecipeList.vue";

export default {
  name: "Home",

  components: {
    IngredientList,
    RecipeList,
    SelectedRecipeList,
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
  width: 25%;
}

.column-card:not(:last-child) {
  margin-right: 1rem;
}
</style>