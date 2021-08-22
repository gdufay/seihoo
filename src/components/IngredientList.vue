<template>
  <el-card>
    <div class="card-header column-header">
      <span>Ingredients</span>
    </div>

    <el-scrollbar style="height: 0">
      <ingredient
        v-for="ingredient in ingredients"
        :key="ingredient.id"
        :ingredient="ingredient"
      ></ingredient>
    </el-scrollbar>

    <div class="card__bottom">
      <el-tooltip content="Add ingredient">
        <el-button
          type="success"
          @click="add"
          icon="el-icon-plus"
          circle
        ></el-button>
      </el-tooltip>
    </div>
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

    add() {
      console.log("Adding ingredient");
      // TODO: unshift, set editable mode and give focus
    },
  },
};
</script>

<style>
.ingredient {
  margin: 1rem 0;
}

.el-card__body,
.el-scrollbar {
  flex: 1 0 auto;
}

.el-card__body {
  display: flex;
  flex-direction: column;
}

.card__bottom {
  text-align: end;
  margin-top: 0.5rem;
}
</style>
