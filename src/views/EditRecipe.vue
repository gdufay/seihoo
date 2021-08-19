<template>
  <el-form ref="recipeForm">
    <el-form-item label="Recipe name">
      <el-input v-model="name"></el-input>
    </el-form-item>

    <el-form-item
      v-for="(ingredient, index) in ingredients"
      :key="index"
      :label="'Ingredient ' + index"
    >
      <el-select
        v-model="ingredient.ingredient"
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
        placeholder="Quantity"
        controls-position="right"
        :min="0"
      ></el-input-number>
      <el-button @click.prevent="removeIngredient(index)"> Remove </el-button>
    </el-form-item>

    <el-form-item>
      <el-button @click="addIngredient">Add Ingredient</el-button>
      <el-button type="primary" @click="onSubmit('recipeForm')"
        >{{ id ? "Update" : "Add" }}</el-button
      >
      <el-button @click="cancel">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { mapFields, mapMultiRowFields } from "vuex-map-fields";

// TODO: watch route changes
export default {
  name: "EditRecipe",

  props: ["id"],

  computed: {
    ...mapState({
      ingredientsList: (state) => state.ingredients.ingredients,
    }),

    ...mapFields("editedRecipe", ["name"]),

    ...mapMultiRowFields("editedRecipe", ["ingredients"]),
  },

  created() {
    // TODO: move to root component
    if (this.ingredientsList.length === 0) {
      this.$store.dispatch("getAllIngredients");
    }

    if (!this.id) {
      return;
    }

    const recipe = this.$store.state.recipes.recipes.find(
      (recipe) => recipe.id === this.id
    );

    if (recipe) {
      this.setEditedRecipe(recipe);
    } else {
      this.$router.replace("/404");
    }
  },

  unmounted() {
    this.cleanEditedRecipe();
  },

  methods: {
    ...mapMutations({
      addIngredient: "editedRecipe/newIngredient",
      removeIngredient: "editedRecipe/removeIngredient",
    }),

    ...mapActions({
      setEditedRecipe: "editedRecipe/setEditedRecipe",
      submitEditedRecipe: "editedRecipe/submitEditedRecipe",
      cleanEditedRecipe: "editedRecipe/cleanEditedRecipe",
    }),

    onSubmit() {
      // TODO: add/update editedRecipe to store.recipes (when getAll put in root component)
      this.submitEditedRecipe(); // TODO: check if save succesful
      this.$router.back();
    },

    cancel() {
      this.$router.back();
    },
  },
};
</script>

<style>
</style>