<template>
  <el-card>
    <div class="card-header column-header">
      <span>Recipes</span>
    </div>

    <el-scrollbar style="height: 0">
      <el-collapse v-model="activeRecipes">
        <el-collapse-item
          v-for="recipe in recipes"
          :key="recipe.objectId"
          :name="recipe.name"
        >
          <template #title>
            <el-checkbox @change="selectRecipe($event, recipe.objectId)">
              {{ recipe.name }}
              <el-tag type="primary" effect="dark" size="mini">
                {{ frequencyToString(recipe.frequency) }}
              </el-tag>
            </el-checkbox>
          </template>

          <ingredient-item
            v-for="{ ingredient, quantity } in recipe.ingredients"
            :key="ingredient.objectId"
            :name="ingredient.name"
            :quantity="quantity"
            :unit="ingredient.unit.name"
          ></ingredient-item>

          <div class="button-group__container">
            <el-button-group>
              <el-tooltip content="Select">
                <el-button
                  type="primary"
                  @click="selectRecipe(recipe)"
                  size="mini"
                  plain
                  icon="el-icon-check"
                ></el-button>
              </el-tooltip>
              <el-tooltip content="Edit">
                <el-button
                  type="primary"
                  @click="editRecipe(recipe)"
                  size="mini"
                  plain
                  icon="el-icon-edit"
                ></el-button>
              </el-tooltip>
              <el-tooltip content="Remove">
                <el-button
                  type="primary"
                  @click="removeRecipe(recipe)"
                  size="mini"
                  plain
                  icon="el-icon-delete"
                ></el-button>
              </el-tooltip>
            </el-button-group>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-scrollbar>

    <div class="card__bottom">
      <el-tooltip content="Add recipe">
        <el-button
          type="success"
          @click="add"
          icon="el-icon-plus"
          circle
        ></el-button>
      </el-tooltip>
    </div>
  </el-card>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import IngredientItem from "./IngredientItem.vue";
import { frequencyToString } from "../utils/utils";

export default {
  name: "recipe-list",

  components: { IngredientItem },

  data() {
    return {
      activeRecipes: [],
      selectedRecipes: [],
    };
  },

  computed: {
    ...mapState({
      recipes: (state) => state.recipes.recipes,
    }),
  },

  methods: {
    ...mapMutations(["selectRecipe"]),

    frequencyToString(frequency) {
      return frequencyToString(frequency);
    },

    editRecipe(recipe) {
      this.$router.push("/edit/" + recipe.objectId);
    },

    add() {
      this.$router.push("/new");
    },

    removeRecipe(recipe) {
      this.$store
        .dispatch("removeRecipe", recipe)
        .then(() =>
          this.$message({ type: "success", message: "Removing successful" })
        )
        .catch(() =>
          this.$message({ type: "error", message: "Ohoh... A problem occured" })
        );
    },

    selectRecipe(value, objectId) {
      if (value) {
        this.selectedRecipes.push(objectId);
      } else {
        const index = this.selectedRecipes.indexOf(objectId);

        this.selectedRecipes.splice(index, 1);
      }
    },
  },
};
</script>

<style>
.el-collapse-item__header {
  padding: 0.25rem 0.5rem;
}

.el-collapse-item__content {
  padding: 0.5rem;
}

.button-group__container {
  text-align: end;
  margin-top: 0.5rem;
}
</style>