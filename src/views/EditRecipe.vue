<template>
  <el-form
    class="edit-recipe"
    ref="recipeForm"
    :model="form"
    label-position="left"
    label-width="100px"
  >
    <el-form-item label="Recipe name">
      <el-input v-model="form.name" placeholder="Recipe Name"></el-input>
    </el-form-item>

    <el-form-item label="Frequency">
      <el-select v-model="form.frequency" placeholder="Frequency">
        <el-option
          v-for="(_, key) in frequencies"
          :key="key"
          :label="key"
          :value="key"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="Ingredient List">
      <ul class="list">
        <li
          v-for="(
            { ingredient: { name, unit }, quantity }, index
          ) in form.ingredients"
          :key="index"
          class="list-item"
        >
          <ingredient-item
            :name="name"
            :quantity="quantity"
            :unit="unit.name"
          ></ingredient-item>

          <el-button-group>
            <el-tooltip content="Edit">
              <el-button
                @click.prevent="editIngredient(index)"
                icon="el-icon-edit"
                type="primary"
              >
              </el-button>
            </el-tooltip>
            <el-tooltip content="Remove">
              <el-button
                @click.prevent="removeIngredient(index)"
                icon="el-icon-delete"
                type="danger"
              >
              </el-button>
            </el-tooltip>
          </el-button-group>
        </li>
      </ul>

      <ingredient-recipe-form
        @save="onSave"
        :ingredient="editedIngredient"
        :quantity="editedQuantity"
      ></ingredient-recipe-form>
    </el-form-item>

    <el-form-item>
      <el-button @click="onCancel">Cancel</el-button>
      <el-button type="primary" @click="onSubmit('recipeForm')">{{
        id ? "Update" : "Add"
      }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import IngredientItem from "../components/IngredientItem.vue";
import IngredientRecipeForm from "../components/IngredientRecipeForm.vue";
import { Recipe } from "../models";
import { frequencies } from "../utils/utils";

export default {
  name: "EditRecipe",

  props: ["id"],

  components: { IngredientItem, IngredientRecipeForm },

  data() {
    return this.initialState();
  },

  computed: {
    editedQuantity() {
      return this.edited !== null
        ? this.form.ingredients[this.edited].quantity
        : null;
    },

    editedIngredient() {
      return this.edited !== null
        ? this.form.ingredients[this.edited].ingredient
        : null;
    },
  },

  watch: {
    $route: {
      handler({ params }) {
        this.resetState();

        if (!params.id) {
          return;
        }

        this.findAndSet(params.id);
      },
      immediate: true,
    },
  },

  methods: {
    initialState() {
      return {
        frequencies: frequencies,
        edited: null,
        form: {
          ingredients: [],
          name: "",
          frequency: "",
        },
      };
    },

    resetState() {
      Object.assign(this.$data, this.initialState());
    },

    onSubmit() {
      // TODO: check if succesful
      if (this.id) {
        Recipe.edit(this.id, this.form);
      } else {
        Recipe.add(this.form);
      }

      this.$router.back();
    },

    onCancel() {
      this.$router.back();
    },

    onSave(ingredient) {
      if (this.edited !== null) {
        this.form.ingredients.splice(this.edited, 1, ingredient);
        this.edited = null;
      } else {
        this.form.ingredients.push(ingredient);
      }
    },

    editIngredient(index) {
      this.edited = index;
    },

    removeIngredient(index) {
      this.form.ingredients.splice(index, 1);
      this.edited = null;
    },

    findAndSet(id) {
      const recipe = Recipe.query().whereId(id).withAllRecursive().first();

      if (recipe) {
        this.form = {
          ingredients: recipe.ingredients.map((ingredient) => ({
            quantity: ingredient.pivot.quantity,
            ingredient: ingredient,
          })),
          name: recipe.name,
          frequency: recipe.frequency,
        };
      } else {
        this.$router.replace("/404");
      }
    },
  },
};
</script>

<style>
.list {
  margin-bottom: 1rem;
}

.list-item {
  width: 300px;
  display: flex;
  align-items: center;
}

.list-item > .ingredient-item {
  flex: 1 0 auto;
  margin-right: 0.5rem;
}
</style>