<template>
  <el-card class="column-card">
    <template #header>
      <div class="card-header">
        <span>Recipes</span>
      </div>
    </template>
  </el-card>

  <el-card class="column-card">
    <template #header>
      <div class="card-header">
        <span>Ingredients</span>
      </div>
    </template>
    <el-tag
      v-for="ingredient in ingredients"
      :key="ingredient"
      closable
      @close="removeIngredient(ingredient)"
    >
      {{ ingredient.get("name") }}
    </el-tag>
  </el-card>

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
import { mapState } from "vuex";

export default {
  name: "Home",

  data() {
    return {};
  },

  computed: {
    ...mapState({
      ingredients: (state) => state.ingredients.ingredients,
    }),
  },

  mounted() {
    this.$store.dispatch("getAllIngredients");
  },

  methods: {
    removeIngredient(ingredient) {
      this.$confirm(
        "This will permanently delete the ingredient. Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => this.$store.dispatch("removeIngredient", ingredient))
        .then(() =>
          this.$message({ type: "success", message: "Delete completed" })
        )
        .catch((e) =>
          this.$message(
            e === "cancel"
              ? { type: "info", message: "Delete canceled" }
              : { type: "error", message: e.message }
          )
        );
    },
  },
};
</script>

<style>
</style>