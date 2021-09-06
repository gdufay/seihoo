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
            { quantity, ingredient: { name, unit } }, index
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
        :ingredient="form.ingredients[edited]"
      ></ingredient-recipe-form>
    </el-form-item>

    <el-form-item>
      <el-button @click="cancel">Cancel</el-button>
      <el-button type="primary" @click="onSubmit('recipeForm')">{{
        id ? "Update" : "Add"
      }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import IngredientItem from "../components/IngredientItem.vue";
import IngredientRecipeForm from "../components/IngredientRecipeForm.vue";
import { frequencies } from "../utils/utils";

export default {
  name: "EditRecipe",

  props: ["id"],

  components: { IngredientItem, IngredientRecipeForm },

  data() {
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

  created() {
    if (this.id) {
      this.findAndSet(this.id);
    }
  },

  watch: {
    $route({ params }) {
      this.edited = null;

      if (!params.id) {
        this.form = { ingredients: [], name: "", frequency: "" };
        return;
      }

      this.findAndSet(params.id);
    },
  },

  methods: {
    onSubmit() {
      this.$store.dispatch("updateRecipe", { objectId: this.id, ...this.form }); // TODO: check if succesful
      this.$router.back();
    },

    cancel() {
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
      const recipe = this.$store.state.recipes.recipes.find(
        (recipe) => recipe.objectId === id
      );

      if (recipe) {
        this.form.ingredients = [...recipe.ingredients];
        this.form.name = recipe.name;
        this.form.frequency = recipe.frequency;
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