<template>
  <section class="Ingredients">
    <div class="container">
      <div class="header">
        <h2 class="title">Ingredients</h2>
        <el-button plain type="info" @click="dialogFormVisible = true">
          ADD INGREDIENT
        </el-button>
        <el-input
          class="search"
          placeholder="Search"
          prefix-icon="el-icon-search"
          v-model="searchQuery"
        ></el-input>
      </div>

      <div class="content" v-infinite-scroll="load">
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
import Ingredient from "./Ingredient.vue";
import IngredientForm from "./IngredientForm.vue";
import { Ingredient as Ingredients } from "../models";

export default {
  name: "ingredient-list",

  components: { Ingredient, IngredientForm },

  data() {
    return {
      dialogFormVisible: false,
      ingredientEdited: null, // only save objectId
      loading: false,
      searchQuery: "",
      limit: 20,
    };
  },

  computed: {
    ingredients() {
      return Ingredients.query()
        .where("name", (value = "") =>
          value.toLowerCase().includes(this.searchQuery)
        )
        .limit(this.limit)
        .orderBy("name")
        .get();
    },
  },

  methods: {
    onSubmit(formIngredient) {
      if (this.ingredientEdited) this.editIngredient(formIngredient);
      else this.addIngredient(formIngredient);
    },

    async addIngredient(formIngredient) {
      this.loading = true;

      try {
        await Ingredients.add(formIngredient);
        this.$message({ type: "success", message: "Adding succesful" });
        this.dialogFormVisible = false;
      } catch (e) {
        this.$message({ type: "error", message: "Ohoh... A problem occured" });
      }

      this.loading = false;
    },

    async editIngredient(formIngredient) {
      this.loading = true;

      try {
        await Ingredients.edit(this.ingredientEdited.objectId, formIngredient);
        this.$message({ type: "success", message: "Editing succesful" });
        this.dialogFormVisible = false;
      } catch (e) {
        this.$message({ type: "error", message: "Ohoh... A problem occured" });
      }

      this.loading = false;
    },

    async onRemove(ingredient) {
      this.loading = true;

      try {
        await Ingredients.destroy(ingredient.objectId);
        this.$message({ type: "success", message: "Removing successful" });
      } catch (e) {
        this.$message({ type: "error", message: "Ohoh... A problem occured" });
      }

      this.loading = false;
    },

    onCancel() {
      this.dialogFormVisible = false;
      this.ingredientEdited = null;
    },

    onEdit(ingredient) {
      this.ingredientEdited = ingredient;
      this.dialogFormVisible = true;
    },

    load() {
      this.limit += 20;
    },
  },
};
</script>

<style>
</style>