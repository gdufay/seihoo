<template>
  <recipe-list class="column-card"></recipe-list>

  <ingredient-list class="column-card"></ingredient-list>

  <el-card class="column-card">
    <template #header>
      <div class="card-header">
        <span>Selected recipes</span>
      </div>
    </template>
  </el-card>

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

export default {
  name: "Home",

  components: {
    IngredientList,
    RecipeList,
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
</style>
    IngredientList