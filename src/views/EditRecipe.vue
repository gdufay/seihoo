<template>
  <el-form class="edit-recipe" ref="recipeForm">
    <el-form-item label="Recipe name">
      <el-input v-model="name"></el-input>
    </el-form-item>

    <el-form-item
      v-for="(ingredient, index) in ingredients"
      :key="index"
      :label="'Ingredient ' + index"
    >
      <el-input
        v-model.number="ingredient.quantity"
        type="number"
        placeholder="Quantity"
        :min="0"
      >
        <template #prepend>
          <el-select
            v-model="ingredient.ingredient"
            placeholder="Ingredient"
            value-key="objectId"
          >
            <el-option
              v-for="ingredientItem in ingredientsList"
              :key="ingredientItem.objectId"
              :label="ingredientItem.name"
              :value="ingredientItem"
            ></el-option>
          </el-select>
        </template>

        <template #append v-if="ingredient.ingredient">
          {{ ingredient.ingredient.unit.name }}
        </template>
      </el-input>

      <el-tooltip content="Remove">
        <el-button
          @click.prevent="removeIngredient(index)"
          icon="el-icon-delete"
          type="danger"
        >
        </el-button>
      </el-tooltip>
    </el-form-item>

    <el-form-item>
      <el-button @click="addIngredient">Add Ingredient</el-button>
      <el-button @click="cancel">Cancel</el-button>
      <el-button type="primary" @click="onSubmit('recipeForm')">{{
        id ? "Update" : "Add"
      }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { mapFields, mapMultiRowFields } from "vuex-map-fields";

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
    if (this.id) {
      this.findAndSet(this.id);
    }
  },

  unmounted() {
    this.cleanEditedRecipe();
  },

  watch: {
    $route({ params }) {
      if (!params.id) {
        this.cleanEditedRecipe();
        return;
      }

      this.findAndSet(params.id);
    },
  },

  methods: {
    ...mapMutations({
      addIngredient: "editedRecipe/newIngredient",
      removeIngredient: "editedRecipe/removeIngredient",
    }),

    ...mapActions({
      setEditedRecipe: "editedRecipe/setEditedRecipe",
      editRecipe: "editedRecipe/editRecipe",
      createRecipe: "editedRecipe/createRecipe",
      cleanEditedRecipe: "editedRecipe/cleanEditedRecipe",
    }),

    onSubmit() {
      // TODO: add/update editedRecipe to store.recipes (when getAll put in root component)
      const ft = this.id ? this.editRecipe : this.createRecipe;

      ft(); // TODO: check if succesful
      this.$router.back();
    },

    cancel() {
      this.$router.back();
    },

    findAndSet(id) {
      const recipe = this.$store.state.recipes.recipes.find(
        (recipe) => recipe.objectId === id
      );

      if (recipe) {
        this.setEditedRecipe(recipe);
      } else {
        this.$router.replace("/404");
      }
    },
  },
};
</script>

<style>
.edit-recipe .el-select {
  width: 100px;
}
</style>