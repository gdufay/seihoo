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
