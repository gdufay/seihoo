<template>
  <el-card>
    <div class="card-header column-header">
      <span>Ingredients</span>
    </div>

    <el-scrollbar style="height: 0">
      <ingredient
        v-for="ingredient in ingredients"
        :key="ingredient.id"
        :ingredient="ingredient"
      ></ingredient>
    </el-scrollbar>

    <el-dialog title="Add ingredient" v-model="dialogFormVisible">
      <el-form v-model="form" label-width="120px">
        <el-form-item label="Ingredient name">
          <el-input placeholder="Name" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Unit">
          <el-select v-model="form.unit" placeholder="Unit" value-key="objectId">
            <el-option
              v-for="unit in units"
              :key="unit.objectId"
              :label="unit.name"
              :value="unit"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="addIngredient"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>

    <div class="card__bottom">
      <el-tooltip content="Add ingredient">
        <el-button
          type="success"
          @click="dialogFormVisible = true"
          icon="el-icon-plus"
          circle
        ></el-button>
      </el-tooltip>
    </div>
  </el-card>
</template>

<script>
import { mapState } from "vuex";
import Ingredient from "./Ingredient.vue";

export default {
  name: "ingredient-list",

  components: { Ingredient },

  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        unit: null,
      },
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
.ingredient {
  margin: 1rem 0;
}

.el-card__body,
.el-scrollbar {
  flex: 1 0 auto;
}

.el-card__body {
  display: flex;
  flex-direction: column;
}

.card__bottom {
  text-align: end;
  margin-top: 0.5rem;
}
</style>
