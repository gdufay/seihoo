<template>
  <div class="ingredient-recipe-form">
    <div class="input-container">
      <el-select
        filterable
        default-first-option
        v-model="form.ingredient"
        placeholder="Ingredient"
        value-key="objectId"
        class="input"
      >
        <el-option
          v-for="ingredient in ingredients"
          :key="ingredient.objectId"
          :label="ingredient.name"
          :value="ingredient"
        ></el-option>
      </el-select>

      <el-input
        v-model.number="form.quantity"
        type="number"
        placeholder="Quantity"
        :min="0"
        step="1"
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
import { Ingredient } from "../models";

export default {
  name: "ingredient-recipe-form",

  props: {
    ingredient: Object,
    quantity: Number,
    filter: {
      type: Array,
      default: [],
    },
    filterName: {
      type: String,
      default: "name",
    },
  },

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
    ingredients() {
      return Ingredient.query()
        .where(this.filterName, (value) => !this.filter.includes(value))
        .with("unit")
        .orderBy("name")
        .get();
    },
  },

  methods: {
    emit() {
      this.$emit("save", this.form);
      this.form = { quantity: 0, ingredient: null };
    },
  },

  watch: {
    ingredient(ingredient) {
      this.form.ingredient = ingredient;
    },

    quantity(quantity) {
      this.form.quantity = quantity;
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