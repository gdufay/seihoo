<template>
  <div class="ingredient-item">
    <span class="ingredient-name capitalize">{{ name }}</span>
    <span class="ingredient-measurement">{{ quantity }} {{ unit }}</span>
  </div>
</template>

<script>
export default {
  name: "ingredient-item",

  props: {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unit: String,
  },
};
</script>

<style>
.ingredient-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem;
}
</style>