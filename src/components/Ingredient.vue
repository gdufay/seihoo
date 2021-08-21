<template>
  <div class="ingredient">
    <el-avatar class="ingredient__avatar" icon="el-icon-food"></el-avatar>

    <div class="ingredient__text">
      <p class="ingredient__primary-text">{{ name }}</p>
      <p class="ingredient__secondary-text">{{ unit }}</p>
    </div>

    <el-dropdown trigger="click" @command="handleCommand">
      <el-icon class="ingredient__meta">
        <more-filled />
      </el-icon>

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
import { MoreFilled } from "@element-plus/icons";

const EDIT_COMMAND = "edit";
const REMOVE_COMMAND = "remove";

export default {
  name: "ingredient",

  components: {
    MoreFilled,
  },

  props: {
    ingredient: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      EDIT_COMMAND: EDIT_COMMAND,
      REMOVE_COMMAND: REMOVE_COMMAND,
    };
  },

  computed: {
    name() {
      return this.ingredient.get("name");
    },

    unit() {
      return this.ingredient.get("unit").get("name");
    },
  },

  methods: {
    handleCommand(command) {
      switch (command) {
        case EDIT_COMMAND:
          this.edit();
          break;
        case REMOVE_COMMAND:
          this.remove();
          break;
        default:
          console.error("Unknown command:", command);
      }
    },

    edit() {
      console.log("editing");
    },

    remove() {
      console.log("removing");
    }
  },
};
</script>

<style>
.ingredient {
  display: flex;
  align-items: center;
}

.ingredient__avatar {
  margin-right: 1rem;
}

.ingredient__text {
  flex: 1 0 auto;
  text-align: left;
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