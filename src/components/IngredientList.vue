<template>
  <el-card>
    <div class="card-header column-header">
      <span>Ingredients</span>
    </div>

    <el-scrollbar>
      <ingredient
        v-for="ingredient in ingredients"
        :key="ingredient.id"
        :ingredient="ingredient"
      ></ingredient>
    </el-scrollbar>
  </el-card>
</template>

<script>
import { mapState } from "vuex";
import Ingredient from "./Ingredient.vue";

export default {
  name: "ingredient-list",

  components: { Ingredient },

  computed: {
    ...mapState({
      ingredients: (state) => state.ingredients.ingredients,
    }),
  },

  methods: {
    /*
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
    */
  },
};
</script>

<style>
.ingredient {
  margin: 1rem 0;
}
</style>