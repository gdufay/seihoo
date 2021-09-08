<template>
  <section class="Recipes">
    <div class="container">
      <div class="header">
        <h2 class="title">Recipes</h2>

        <template v-if="selectedRecipes.size">
          <el-button-group>
            <el-button plain type="info" @click="onSelect">SELECT</el-button>
            <el-button plain type="info" @click="onRemove">REMOVE</el-button>
          </el-button-group>
        </template>
        <el-button v-else plain type="info" @click="onAdd"
          >ADD RECIPE</el-button
        >
      </div>

      <el-collapse v-model="activeRecipes" class="content">
        <el-collapse-item
          v-for="recipe in recipes"
          :key="recipe.objectId"
          :name="recipe.name"
          class="recipe"
        >
          <template #title>
            <el-checkbox @change="onSelectRecipe($event, recipe.objectId)">
              {{ recipe.name }}
              <el-tag type="primary" effect="dark" size="mini">
                {{ recipe.frequency }}
              </el-tag>
            </el-checkbox>
          </template>

          <ingredient-item
            v-for="ingredient in recipe.ingredients"
            :key="ingredient.objectId"
            :name="ingredient.name"
            :quantity="ingredient.pivot.quantity"
            :unit="ingredient.unit.name"
          ></ingredient-item>

          <div class="button-group__container">
            <el-tooltip content="Edit">
              <el-button
                type="primary"
                @click="onEdit(recipe)"
                size="mini"
                plain
                icon="el-icon-edit"
              ></el-button>
            </el-tooltip>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </section>
</template>

<script>
import { Recipe } from "../models";
import IngredientItem from "./IngredientItem.vue";

export default {
  name: "recipe-list",

  components: { IngredientItem },

  data() {
    return {
      activeRecipes: [],
      selectedRecipes: new Set(),
    };
  },

  computed: {
    recipes() {
      return Recipe.query().withAllRecursive().get();
    },
  },

  methods: {
    onEdit(recipe) {
      this.$router.push("/edit/" + recipe.objectId);
    },

    onSelect() {
      this.selectedRecipes.forEach((recipe) => {
        this.$store.commit("selectRecipe", recipe);
        this.selectedRecipes.delete(recipe);
      });
    },

    onAdd() {
      this.$router.push("/new");
    },

    async onRemove() {
      try {
        await Promise.all(
          [...this.selectedRecipes].map((objectId) => Recipe.destroy(objectId))
        );
        this.$message({ type: "success", message: "Removing successful" });
      } catch (e) {
        console.error(e);
        this.$message({ type: "error", message: "Ohoh... A problem occured" });
      }

      this.selectedRecipes.clear();
    },

    onSelectRecipe(value, objectId) {
      if (value) {
        this.selectedRecipes.add(objectId);
      } else {
        this.selectedRecipes.delete(objectId);
      }
    },
  },
};
</script>

<style>
.container {
  height: 100%;
  border-radius: 4px;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08); /* var(--shadow-depth-3) */
  display: flex;
  flex-flow: column nowrap;
}

.header {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
}

.title {
  line-height: 32px;
  font-size: 16px;
  color: var(--c-gray);
}

.recipe,
.ingredient {
  padding: 12px 24px;
}

.el-collapse {
  border: none;
}

.content {
  overflow: scroll;
  flex: 1;
}

.button-group__container {
  text-align: end;
  margin-top: 0.5rem;
}
</style>