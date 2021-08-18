<template>
  <el-card>
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
      {{ ingredient.get("name") }}
    </el-tag>

    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="mini"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput"
      >+ New Ingredient
    </el-button>
  </el-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ingredient-list",

  data() {
    return {
      inputVisible: false,
      inputValue: "",
    };
  },

  computed: {
    ...mapState({
      ingredients: (state) => state.ingredients.ingredients,
    }),
  },

  mounted() {
    if (this.ingredients.length === 0) {
      this.$store.dispatch("getAllIngredients");
    }
  },

  methods: {
    removeIngredient(ingredient) {
      this.$confirm(
        "This will permanently delete the ingredient. Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => this.$store.dispatch("removeIngredient", ingredient))
        .then(() =>
          this.$message({ type: "success", message: "Delete completed" })
        )
        .catch((e) =>
          this.$message(
            e === "cancel"
              ? { type: "info", message: "Delete canceled" }
              : { type: "error", message: e.message }
          )
        );
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      const ingredientName = this.inputValue.trim();

      if (ingredientName) {
        this.$store.dispatch("addIngredient", ingredientName);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>