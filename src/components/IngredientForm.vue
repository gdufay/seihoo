<template>
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

    <el-form-item>
      <el-button @click="$emit('cancel')">Cancel</el-button>
      <el-button type="primary" @click="$emit('submit', form)">
        Confirm
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { ingredientType } from "../utils/utils";
import { Unit } from "../models";

export default {
  name: "ingredient-form",

  emits: ["cancel", "submit"],

  props: ["ingredient"],

  data() {
    return {
      ingredientType: ingredientType,
      form: {
        name: "",
        unit: null,
        type: "",
      },
    };
  },

  mounted() {
    if (this.ingredient) {
      const { name, unit, type } = this.ingredient;

      this.form = { name, unit, type };
    }
  },

  computed: {
    units() {
      return Unit.all();
    }
  },
};
</script>

<style>
</style>