<template>
	<div class="ingredient">
		<el-avatar
			class="ingredient__avatar"
			icon="el-icon-food"
		></el-avatar>

		<template v-if="!formVisible">
			<div class="ingredient__text">
				<p class="ingredient__primary-text">
					{{ name }}
				</p>
				<p class="ingredient__secondary-text">
					{{ unitName }}
				</p>
			</div>

			<el-dropdown trigger="click" @command="handleCommand">
				<el-icon class="ingredient__meta">
					<more-filled />
				</el-icon>

				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item
							:command="EDIT_COMMAND"
							>Edit</el-dropdown-item
						>
						<el-dropdown-item
							:command="
								REMOVE_COMMAND
							"
							>Remove</el-dropdown-item
						>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</template>

		<template v-else>
			<el-form
				ref="form"
				:model="form"
				class="ingredient__form"
			>
				<el-form-item class="ingredient__text">
					<el-form-item>
						<el-input
							ref="nameInput"
							v-model="form.name"
							placeholder="Ingredient name"
						></el-input>
					</el-form-item>
					<el-form-item>
						<el-select
							ref="unitSelect"
							v-model="form.unit"
							placeholder="Ingredient unit"
							value-key="id"
						>
							<el-option
								v-for="unit in units"
								:key="unit.id"
								:label="
									unit.get(
										'name'
									)
								"
								:value="unit"
							></el-option>
						</el-select>
					</el-form-item>
				</el-form-item>
				<el-form-item>
					<el-icon @click="handleEditConfirm">
						<check />
					</el-icon>
				</el-form-item>
			</el-form>
		</template>
	</div>
</template>

<script>
import { MoreFilled, Check } from "@element-plus/icons";
import { mapState } from "vuex";

const EDIT_COMMAND = "edit";
const REMOVE_COMMAND = "remove";

export default {
	name: "ingredient",

	components: {
		MoreFilled,
		Check,
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
			form: {
				name: "",
				unit: null,
			},
			formVisible: false,
		};
	},

	mounted() {
		this.form.name = this.name;
		this.form.unit = this.ingredient.get("unit");
	},

	computed: {
		...mapState({
			units: (state) => state.units.units,
		}),

		name() {
			return this.ingredient.get("name");
		},

		unitName() {
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
					console.error(
						"Unknown command:",
						command
					);
			}
		},

		edit() {
			this.formVisible = true;
			this.$nextTick(() => {
				this.$refs.nameInput.$refs.input.focus();
			});
		},

		handleEditConfirm() {
			this.$store
				.dispatch("editIngredient", {
					ingredient: this.ingredient,
					name: this.form.name,
					unit: this.form.unit,
				})
				.then(() =>
					this.$message({
						type: "success",
						message: "Edit success",
					})
				)
				.catch((e) => {
					this.$messgae({
						type: "error",
						message:
							"Ohoh... A problem occured",
					});
					console.error(e);
				})
				.finally(() => (this.formVisible = false));
		},

		remove() {
			this.$store
				.dispatch("removeIngredient", this.ingredient)
				.then(() =>
					this.$message({
						type: "success",
						message: "Removing successful",
					})
				)
				.catch((e) => {
					this.$messgae({
						type: "error",
						message:
							"Ohoh... A problem occured",
					});
					console.error(e);
				});
		},
	},
};
</script>

<style>
.ingredient,
.ingredient__form {
	display: flex;
	align-items: center;
}

.ingredient__avatar {
	margin-right: 1rem;
	flex: 0 0 auto;
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

.ingredient__form .el-form-item {
	margin: 0;
}

.ingredient__form > .ingredient__text .el-form-item {
	width: 220px;
}
</style>
