<template>
	<component
		:is="tag"
		:type="tag === 'button' ? nativeType : ''"
		:disabled="disabled || loading"
		:to="tag === 'router-link' ? to : ''"
		@click="handleClick"
		@mouseenter="$emit('mouseenter', $event)"
		@mouseleave="$emit('mouseleave', $event)"
		class="aioseo-button"
		:class="[
			{ [type]: type },
			{ [size]: size },
			{ 'btn-link': link },
			{ disabled: disabled && tag !== 'button' },
			{ color: color },
			{ loading: loading }
		]"
	>
		<slot name="loading">
			<core-loader
				v-if="loading"
				:dark="'gray' === type"
			/>
		</slot>

		<slot></slot>
	</component>
</template>

<script>
import CoreLoader from '@/vue/components/common/core/Loader'
export default {
	name       : 'base-button',
	components : {
		CoreLoader
	},
	props : {
		color : String,
		tag   : {
			type        : String,
			default     : 'button',
			description : 'Button html tag'
		},
		block    : Boolean,
		loading  : Boolean,
		wide     : Boolean,
		disabled : Boolean,
		type     : {
			type        : String,
			default     : 'default',
			description : 'Button type (blue|black|green|red|gray|wp-blue)'
		},
		nativeType : {
			type        : String,
			default     : 'button',
			description : 'Button native type (e.g button, input etc)'
		},
		size : {
			type        : String,
			default     : '',
			description : 'Button size (small-table|small|medium|large)'
		},
		link : {
			type        : Boolean,
			description : 'Whether button is a link (no borders or background)'
		},
		to : {
			type        : [ Object, String ],
			description : 'The router link object or string'
		}
	},
	methods : {
		handleClick (event) {
			this.$emit('click', event)
		}
	}
}
</script>

<style lang="scss">
.aioseo-button {
	flex-shrink: 0;
	line-height: 1;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-size: 16px;
	font-weight: 600 !important;
	padding: 0 24px;
	border-radius: 4px;
	-webkit-appearance: none;
	cursor: pointer;
	height: 48px;
	transition: background-color 0.2s ease;
	position: relative;
	overflow: hidden;
	text-decoration: none;
	color: $black;
	white-space: nowrap;
	letter-spacing: normal;

	&.small,
	&.small-table {
		height: 30px;
		font-size: 14px;
		padding: 0 12px;

		.aioseo-loading-spinner {
			width: 25px;
			height: 25px;
		}
	}

	&.small-table {
		font-size: 12px;
		border-radius: 3px;
	}

	&.medium {
		height: 40px;
		font-size: 14px;
		padding: 0 18px;

		.aioseo-loading-spinner {
			width: 35px;
			height: 35px;
		}
	}

	&.xl {
		height: 66px;
		border-radius: 4px;
		font-size: 18px;
		padding: 0 48px;
	}

	&.gray {
		border: 1px solid $gray;
		background-color: $background;
		color: $black;

		&:hover {
			background-color: #fff;
			color: $black;
		}

		&:active {
			background-color: $background;
		}
	}

	&.green {
		border: 1px solid $green;
		background-color: $green;
		color: #fff;

		&:hover {
			border-color: $green2;
			background-color: $green2;
		}

		&:active {
			border-color: $green3;
			background-color: $green3;
		}
	}

	&.blue {
		border: 1px solid $blue;
		background-color: $blue;
		color: #fff;

		&:hover {
			border-color: $blue2;
			background-color: $blue2;
		}

		&:active {
			border-color: $blue3;
			background-color: $blue3;
		}
	}

	&.wp-blue {
		border: 1px solid $blue;
		background-color: $gray4;
		color: $blue;

		&:hover {
			border-color: $blue2;
			background-color: $blue2;
			color: #fff;
		}

		&:active {
			border-color: $blue3;
			background-color: $blue3;
			color: #fff;
		}
	}

	&.black {
		border: 1px solid $black2;
		background-color: $black2;
		color: #fff;

		&:hover {
			border-color: $black2-hover;
			background-color: $black2-hover;
		}

		&:active {
			border-color: $black;
			background-color: $black;
		}
	}

	&.red {
		border: 1px solid $red;
		background-color: #fff;
		color: $red;

		&:hover {
			background-color: $red;
			color: #fff;
		}

		&:active {
			border-color: $red2;
			background-color: $red2;
		}
	}

	&.loading {
		&.blue {
			border-color: $blue3;
			background-color: $blue3;
			color: $blue3;

			svg {
				color: $blue3;
			}

			&:hover {
				background-color: $blue3;
				color: $blue3;
			}
		}

		&.green {
			border-color: $green3;
			background-color: $green3;
			color: $green3;

			svg {
				color: $green3;
			}

			&:hover {
				background-color: $green3;
				color: $green3;
			}
		}

		&.gray {
			border-color: $background;
			background-color: $background;
			color: $background;

			svg {
				color: $background;
			}

			&:hover {
				background-color: $background;
				color: $background;
			}
		}

		&.black {
			border-color: $black;
			background-color: $black;
			color: $black;

			svg {
				color: $black;
			}

			&:hover {
				background-color: $black;
				color: $black;
			}
		}
	}

	&:disabled,
	&.disabled {
		border: 1px solid $gray;
		color: $placeholder-color;
		background-color: $background;
		cursor: default;

		&.gray {
			&:hover:not(.loading) {
				color: $placeholder-color;
			}
		}

		&.wp-blue {
			border-color: #DDDDDD;
			background-color: #F7F7F7;

			&:hover {
				border-color: #DDDDDD;
				color: $placeholder-color;
			}
		}

		&:hover {
			border-color: $gray;
			background-color: $background;
		}
	}

	&.disabled {
		pointer-events: none;
	}
}
</style>