<template>
  <el-form ref="recipeForm">
    <el-form-item label="Recipe name">
      <el-input v-model="recipeName"></el-input>
    </el-form-item>

    <el-form-item
      v-for="(ingredient, index) in recipeIngredients"
      :key="index"
      :label="'Ingredient ' + index"
    >
      <el-select
        v-model="ingredient.ingredient"
        @change="updateRecipeIngredient($event, index)"
        placeholder="Ingredient"
        value-key="id"
      >
        <el-option
          v-for="ingredientItem in ingredientsList"
          :key="ingredientItem.id"
          :label="ingredientItem.get('name')"
          :value="ingredientItem"
        ></el-option>
      </el-select>
      <el-input-number
        v-model.number="ingredient.quantity"
        @change="updateRecipeIngredientQuantity($event, index)"
        placeholder="Quantity"
        controls-position="right"
        :min="0"
      ></el-input-number>
      <el-button @click.prevent="removeIngredient(ingredient)">
        Remove
      </el-button>
    </el-form-item>

    <el-form-item>
      <el-button @click="addIngredient">Add Ingredient</el-button>
      <el-button type="primary" @click="onSubmit('recipeForm')"
        >Create</el-button
      >
      <el-button @click="cancel">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";

// TODO: watch route changes
export default {
  name: "EditRecipe",

  props: ["id"],

  computed: {
    ...mapState({
      ingredientsList: (state) => state.ingredients.ingredients,
    }),

    ...mapGetters({
      recipeIngredients: "editedRecipeIngredients",
    }),

    recipeName: {
      get() {
        return this.$store.getters.editedRecipeName;
      },
      set(value) {
        this.$store.commit("setEditedRecipeName", value);
      },
    },
  },

  created() {
    // TODO: move to root component
    if (this.ingredientsList.length === 0) {
      this.$store.dispatch("getAllIngredients");
    }

    if (!this.id) {
      this.$store.commit("newEditedRecipe");
      return;
    }

    const recipe = this.$store.state.recipes.recipes.find(
      (recipe) => recipe.id === this.id
    );
    let clone = recipe.clone();
    clone.id = recipe.id;

    if (recipe) {
      this.$store.commit("setEditedRecipe", clone);
    } else {
      this.$router.replace("/404");
    }
  },

  unmounted() {
    this.$store.commit("setEditedRecipe", null);
  },

  methods: {
    ...mapMutations({
      addIngredient: "newEditedRecipeIngredient",
    }),

    onSubmit() {
        // TODO: add/update editedRecipe to store.recipes (when getAll put in root component)
        this.$store.dispatch("submitEditedRecipe"); // TODO: check if save succesful
        this.$router.back();
    },

    cancel() {
      this.$router.back();
    },

    removeIngredient(ingredient) {
      const index = this.form.ingredients.indexOf(ingredient);
      console.log("removing ingredient:", ingredient, "at index", index);

      if (index !== -1) this.form.ingredients.splice(index, 1);
    },

    updateRecipeIngredient(ingredient, index) {
      this.$store.commit("updateEditedRecipeIngredient", {
        ingredient: ingredient,
        index: index,
      });
    },

    updateRecipeIngredientQuantity(quantity, index) {
      this.$store.commit("updateEditedRecipeIngredientQuantity", {
        quantity: quantity,
        index: index,
      });
    },
  },
};
</script>

<style>
</style>