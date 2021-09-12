<template>
  <el-dialog :title="title" v-model="show" destroy-on-close>
    <ingredient-form
      @cancel="$emit('cancel', $event)"
      @submit="$emit('submit', $event)"
      :ingredient="ingredient"
      v-loading="loading"
    ></ingredient-form>
  </el-dialog>
</template>

<script>
import IngredientForm from "./IngredientForm.vue";

export default {
  name: "ingredient-dialog",

  components: { IngredientForm },

  props: ["ingredient", "show", "loading"],

  emits: ["cancel", "submit"],

  computed: {
    title() {
      return this.ingredient ? "Edit ingredient" : "Add ingredient";
    },
  },
};
</script>

<style>
</style>