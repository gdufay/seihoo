<template>
  <el-card class="column-card">
    <template #header>
      <div class="card-header">
        <span>Recipes</span>
      </div>
    </template>
  </el-card>

  <el-card class="column-card">
    <template #header>
      <div class="card-header">
        <span>Ingredients</span>
      </div>
    </template>
    <el-tag
      v-for="ingredient in ingredients"
      :key="ingredient"
      closable
      @close="removeIngredient(ingredient)"
    >
      {{ ingredient.name }}
    </el-tag>
  </el-card>

  <el-card class="column-card">
    <template #header>
      <div class="card-header">
        <span>Selected recipes</span>
      </div>
    </template>
  </el-card>

  <el-card class="column-card">
    <template #header>
      <div class="card-header">
        <span>Shopping List</span>
      </div>
    </template>
  </el-card>
</template>

<script>
export default {
  name: "Home",

  data() {
    return {
      ingredients: [{ name: "water" }, { name: "milk" }],
    };
  },

  mounted() {
    /*
    const query = new this.$Parse.Query("Ingredient");
    query
      .select("name")
      .find()
      .then((results) => {
        console.log(`ParseObjects found: ${JSON.stringify(results)}`);
      })
      .catch((error) => {
        console.log(`Error: ${JSON.stringify(error)}`);
      });
      */
  },

  methods: {
    removeIngredient(ingredient) {
      console.log("Removing ingredient", ingredient);
    },
  },
};
</script>

<style>
</style>