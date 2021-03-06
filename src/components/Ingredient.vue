<template>
  <div class="ingredient">
    <el-tooltip :content="typeToText">
      <el-avatar class="ingredient__avatar">
        <component :is="typeToIcon"></component>
      </el-avatar>
    </el-tooltip>

    <div class="ingredient__text">
      <p class="ingredient__primary-text capitalize">
        {{ ingredient.name }}
      </p>
      <p class="ingredient__secondary-text">
        {{ unit.name }}
      </p>
    </div>

    <el-dropdown trigger="click" @command="handleCommand">
      <el-button type="text">...</el-button>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :command="EDIT_COMMAND">Edit</el-dropdown-item>
          <el-dropdown-item :command="REMOVE_COMMAND">Remove</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { ingredientType } from "../utils/utils";
import { Unit } from '../models';

const EDIT_COMMAND = "edit";
const REMOVE_COMMAND = "remove";

export default {
  name: "ingredient",

  props: {
    ingredient: {
      type: Object,
      required: true,
    },
  },

  emits: ["edit", "remove"],

  data() {
    return {
      EDIT_COMMAND: EDIT_COMMAND,
      REMOVE_COMMAND: REMOVE_COMMAND,
    };
  },

  computed: {
    unit() {
      return Unit.find(this.ingredient.unit_id) || {};
    },

    typeToIcon() {
      const type = ingredientType[this.ingredient.type] || {};

      return type.icon || "el-icon-food";
    },

    typeToText() {
      const type = ingredientType[this.ingredient.type] || {};

      return type.text || "Unknown ingredient type";
    },
  },

  methods: {
    handleCommand(command) {
      switch (command) {
        case EDIT_COMMAND:
          this.$emit("edit", this.ingredient); // TODO: use objectId instead of all ingredient
          break;
        case REMOVE_COMMAND:
          this.$emit("remove", this.ingredient);
          break;
        default:
          console.error("Unknown command:", command);
      }
    },
  },
};
</script>

<style>
.ingredient {
  display: flex;
  align-items: center;
}

.ingredient__avatar {
  background-color: #409eff;
  margin-right: 1rem;
  flex: 0 0 auto;
}

.ingredient__avatar svg {
  height: 32px;
  width: 32px;
  padding: 6px 4px;
  fill: var(--el-avatar-font-color);
}

.ingredient__text {
  flex: 1 0 auto;
  text-align: left;
  margin-right: 1rem;
}

.ingredient__primary-text {
  font-size: 16px;
  color: black;
}

.ingredient__secondary-text {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
}
</style>
