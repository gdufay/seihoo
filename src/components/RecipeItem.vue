<template>
  <el-card class="recipe-item">
    <template #header>
    <div class="card-header item-name">
      <span>{{ recipe.get("name") }}</span>

      <el-dropdown v-if="actions" trigger="click" @command="handleCommand">
        <el-icon class="dropdown-link" :size="24">
          <more-filled :style="iconStyle" />
        </el-icon>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="action in actions" :key="action.id" :command="action.id">
              {{ action.text }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    </template>

    <div class="ingredients-container">
      <ingredient-item
        v-for="{ ingredient, quantity } in recipe.get('ingredients')"
        :key="ingredient.get('name')"
        :name="ingredient.get('name')"
        :quantity="quantity"
        :unit="unitNameOrNothing(ingredient)"
      ></ingredient-item>
    </div>
  </el-card>
</template>

<script>
import IngredientItem from "./IngredientItem.vue";
import { MoreFilled } from "@element-plus/icons";

export default {
  name: "recipe-item",

  props: {
    recipe: {
      type: Object,
      required: true,
    },
    actions: Array,
  },

  components: { IngredientItem, MoreFilled },

  emits: ["menuAction"],

  data() {
    return {
      iconStyle: {
        width: "1.5rem",
        height: "1.5rem",
      },
    };
  },

  methods: {
    // TODO: quickfixe, change
    unitNameOrNothing(ingredient) {
      let name;

      try {
        name = ingredient.get("unit").get("name");
      } catch (e) {
        console.error(e.message);
      }

      return name || "";
    },

    handleCommand(command) {
      this.$emit("menuAction", { action: command, recipe: this.recipe });
    },
  },
};
</script>

<style>
.recipe-item {
  margin-bottom: 0.5rem;
}

.item-name {
  word-wrap: break-word;
  clear: both;
  color: #172b4d;
  display: block;
  margin: 0 0 4px;
  overflow: hidden;
  text-decoration: none;
}
</style>