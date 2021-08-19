<template>
  <el-card class="recipe-item">
    <template #header>
      <div class="card-header">
        {{ recipe.get("name") }}
      </div>
    </template>

    <div class="ingredients-container">
      <ingredient-item
        v-for="{ ingredient, quantity } in recipe.get('ingredients')"
        :key="ingredient.get('name')"
        :name="ingredient.get('name')"
        :quantity="quantity"
        :unit="ingredient.get('unit').get('name')"
      ></ingredient-item>
    </div>

    <slot name="footer" :item="recipe"></slot>
  </el-card>
</template>

<script>
import IngredientItem from "./IngredientItem.vue";
export default {
  name: "recipe-item",

  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },

  components: { IngredientItem },
};
</script>

<style>
</style>