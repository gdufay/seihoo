<template>
  <section class="Ingredients">
    <div class="container">
      <div class="header">
        <h2 class="title">Ingredients</h2>
        <el-button plain type="info" @click="dialogFormVisible = true">
          ADD INGREDIENT
        </el-button>
      </div>

      <el-scrollbar>
        <ingredient
          v-for="ingredient in ingredients"
          :key="ingredient.objectId"
          :ingredient="ingredient"
        ></ingredient>
      </el-scrollbar>

      <el-dialog title="Add ingredient" v-model="dialogFormVisible">
        <el-form v-model="form" label-width="120px">
          <el-form-item label="Ingredient name">
            <el-input placeholder="Name" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="Unit">
            <el-select
              v-model="form.unit"
              placeholder="Unit"
              value-key="objectId"
            >
              <el-option
                v-for="unit in units"
                :key="unit.objectId"
                :label="unit.name"
                :value="unit"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Type">
            <el-select v-model="form.type" placeholder="Type" value-key="name">
              <el-option
                v-for="(type, name) in ingredientType"
                :key="name"
                :label="type.text"
                :value="name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="addIngredient">
              Confirm
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import Ingredient from "./Ingredient.vue";
import { ingredientType } from "../utils/utils";

export default {
  name: "ingredient-list",

  components: { Ingredient },

  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        unit: null,
        type: "",
      },
      ingredientType: ingredientType,
    };
  },

  computed: {
    ...mapState({
      ingredients: (state) => state.ingredients.ingredients,
      units: (state) => state.units.units,
    }),
  },

  methods: {
    addIngredient() {
      this.$store
        .dispatch("addIngredient", this.form)
        .then(() => {
          this.$message({ type: "success", message: "Adding succesful" });
          this.dialogFormVisible = false;
          this.form = { name: "", unit: null };
        })
        .catch(() =>
          this.$message({ type: "error", message: "Ohoh... A problem occured" })
        );
    },
  },
};
</script>

<style>
.el-card__body,
.el-scrollbar {
  flex: 1 0 auto;
}

.el-card__body {
  display: flex;
  flex-direction: column;
}
</style>
