<template>
  <el-card>
    <div class="card-header column-header">
      <span>Shopping List</span>
    </div>

    <el-scrollbar style="height: 0">
      <ingredient-item
        v-for="[name, { quantity, unit }] in ingredients"
        :key="name"
        :name="name"
        :quantity="quantity"
        :unit="unit.get('name')"
      ></ingredient-item>
    </el-scrollbar>

    <div class="card__bottom">
      <el-tooltip content="Download as pdf">
        <el-button
          type="info"
          @click="download"
          icon="el-icon-download"
          circle
        ></el-button>
      </el-tooltip>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from "vuex";
import IngredientItem from "./IngredientItem.vue";
import { generateShoppingList } from "@/utils/pdf";

export default {
  name: "shopping-list",

  components: { IngredientItem },

  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      ingredients: "shoppingListFromSelected",
    }),
  },

  methods: {
    download() {
      generateShoppingList(this.ingredients);
    },
  },
};
</script>

<style>
</style>
