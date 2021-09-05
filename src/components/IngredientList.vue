<template>
  <section class="Ingredients">
    <div class="container">
      <div class="header">
        <h2 class="title">Ingredients</h2>
        <el-button plain type="info" @click="dialogFormVisible = true">
          ADD INGREDIENT
        </el-button>
      </div>

      <div class="content">
        <ingredient
          v-for="ingredient in ingredients"
          :key="ingredient.objectId"
          :ingredient="ingredient"
          @edit="onEdit"
          @remove="onRemove"
        ></ingredient>
      </div>

      <el-dialog
        title="Add ingredient"
        v-model="dialogFormVisible"
        destroy-on-close
      >
        <ingredient-form
          @cancel="onCancel"
          @submit="onSubmit"
          :ingredient="ingredientEdited"
          v-loading="loading"
        ></ingredient-form>
      </el-dialog>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import Ingredient from "./Ingredient.vue";
import IngredientForm from "./IngredientForm.vue";

export default {
  name: "ingredient-list",

  components: { Ingredient, IngredientForm },

  data() {
    return {
      dialogFormVisible: false,
      ingredientEdited: null,
      loading: false,
    };
  },

  computed: {
    ...mapState({
      ingredients: (state) => state.ingredients.ingredients,
    }),
  },

  methods: {
    onSubmit(formIngredient) {
      if (this.ingredientEdited) this.editIngredient(formIngredient);
      else this.addIngredient(formIngredient);
    },

    addIngredient(formIngredient) {
      this.loading = true;

      this.$store
        .dispatch("addIngredient", formIngredient)
        .then(() => {
          this.$message({ type: "success", message: "Adding succesful" });
          this.dialogFormVisible = false;
        })
        .catch(() =>
          this.$message({ type: "error", message: "Ohoh... A problem occured" })
        )
        .finally(() => (this.loading = false));
    },

    editIngredient(formIngredient) {
      this.loading = true;

      this.$store
        .dispatch("editIngredient", {
          objectId: this.ingredientEdited.objectId,
          ingredient: formIngredient,
        })
        .then(() => {
          this.$message({ type: "success", message: "Edit success" });
          this.onCancel();
        })
        .catch(() =>
          this.$message({ type: "error", message: "Ohoh... A problem occured" })
        )
        .finally(() => (this.loading = false));
    },

    onCancel() {
      this.dialogFormVisible = false;
      this.ingredientEdited = null;
    },

    onEdit(ingredient) {
      this.ingredientEdited = ingredient;
      this.dialogFormVisible = true;
    },

    onRemove(ingredient) {
      this.loading = true;

      this.$store
        .dispatch("removeIngredient", ingredient)
        .then(() =>
          this.$message({ type: "success", message: "Removing successful" })
        )
        .catch(() =>
          this.$message({ type: "error", message: "Ohoh... A problem occured" })
        )
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style>
</style>