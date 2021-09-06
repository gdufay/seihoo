<template>
  <div class="ingredient-recipe-form">
    <div class="input-container">
      <el-select
        v-model="form.ingredient"
        placeholder="Ingredient"
        value-key="objectId"
        class="input"
      >
        <el-option
          v-for="item in ingredientsList"
          :key="item.objectId"
          :label="item.name"
          :value="item"
        ></el-option>
      </el-select>

      <el-input
        v-model.number="form.quantity"
        type="number"
        placeholder="Quantity"
        :min="0"
        class="input"
      >
        <template #append v-if="form.ingredient">
          {{ form.ingredient.unit.name }}
        </template>
      </el-input>
    </div>

    <el-button @click="emit" :disabled="!form.ingredient">Save</el-button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ingredient-recipe-form",

  props: ["ingredient"],

  emits: ["save"],

  data() {
    return {
      form: {
        quantity: 0,
        ingredient: null,
      },
    };
  },

  computed: {
    ...mapState({
      ingredientsList: (state) => state.ingredients.ingredients,
    }),
  },

  methods: {
    emit() {
      this.$emit("save", this.form);
      this.form = { quantity: 0, ingredient: null };
    },
  },

  watch: {
    ingredient(newIngredient) {
      this.form = { ...newIngredient };
    },
  },
};
</script>

<style>
.ingredient-recipe-form {
  text-align: start;
}

.input-container {
  display: flex;
}

.input-container > .input {
  width: 150px;
  margin: 0 0.25rem 0.25rem 0;
}
</style>