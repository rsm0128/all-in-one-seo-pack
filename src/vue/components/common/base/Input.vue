<template>
	<div class="aioseo-input-container">
		<div
			class="aioseo-input"
			:class="{
				file           : 'file' === type,
				'aioseo-error' : error
			}"
		>
			<div
				v-if="!$slots.prependIcon && prependIcon"
				class="prepend-icon"
				:class="{ [size]: size }"
			>
				<component
					:is="`svg-${prependIcon}`"
				/>
			</div>

			<slot
				v-if="$slots['prepend-icon']"
				name="prepend-icon"
			/>

			<input
				:id="inputId"
				:required="required"
				:disabled="disabled"
				:type="type"
				:value="value"
				:placeholder="placeholder"
				:autocomplete="autocomplete"
				:readonly="readonly"
				:spellcheck="spellcheck"
				:max="'number' === type ? max : null"
				:min="'number' === type ? min : null"
				:step="'number' === type ? step : null"
				@input="$emit('input', $event.target.value)"
				@blur="$emit('blur', $event.target.value); validate($event.target.value)"
				@change="$emit('change', $event.target.value)"
				@focus="$emit('focus', $event.target.value)"
				@keyup="$emit('keyup', $event)"
				@keydown="$emit('keydown', $event)"
				:class="{
					[size]  : size,
					prepend : prependIcon,
					append  : appendIcon,
				}"
			/>

			<div
				v-if="!$slots.append && appendIcon"
				class="append-icon"
				:class="{ [size]: size, clickable : $listeners['append-icon-click'] }"
				@click="$emit('append-icon-click', $event)"
			>
				<component
					:is="`svg-${appendIcon}`"
				/>
			</div>

			<slot
				v-if="$slots['append-icon']"
				name="append-icon"
			/>
		</div>

		<core-alert
			class="aioseo-input-error"
			type="red"
			v-if="error"
		>
			<strong>{{ error }}</strong>
		</core-alert>

	</div>
</template>

<script>
import CoreAlert from '@/vue/components/common/core/alert/Index.vue'

import SvgCircleCheck from '@/vue/components/common/svg/circle/Check'
import SvgCircleClose from '@/vue/components/common/svg/circle/Close'
import SvgSearch from '@/vue/components/common/svg/Search'

import SvgArticle from '@/vue/components/common/svg/schema/Article'
import SvgBook from '@/vue/components/common/svg/schema/Book'
import SvgCircleQuestionMark from '@/vue/components/common/svg/circle/QuestionMark'
import SvgCustomSchema from '@/vue/components/common/svg/schema/CustomSchema'
import SvgCopy from '@/vue/components/common/svg/Copy'
import SvgCourse from '@/vue/components/common/svg/schema/Course'
import SvgDataset from '@/vue/components/common/svg/schema/Dataset'
import SvgEvent from '@/vue/components/common/svg/schema/Event'
import SvgFaqPage from '@/vue/components/common/svg/schema/FaqPage'
import SvgFactCheck from '@/vue/components/common/svg/schema/FactCheck'
import SvgFile from '@/vue/components/common/svg/File'
import SvgFileEdit from '@/vue/components/common/svg/schema/FileEdit'
import SvgGoogleSmall from '@/vue/components/common/svg/logo/GoogleSmall'
import SvgHowTo from '@/vue/components/common/svg/schema/HowTo'
import SvgJobPosting from '@/vue/components/common/svg/schema/JobPosting'
import SvgMovie from '@/vue/components/common/svg/schema/Movie'
import SvgMusic from '@/vue/components/common/svg/schema/Music'
import SvgPencil from '@/vue/components/common/svg/Pencil'
import SvgPerson from '@/vue/components/common/svg/schema/Person'
import SvgProduct from '@/vue/components/common/svg/schema/Product'
import SvgRecipe from '@/vue/components/common/svg/schema/Recipe'
import SvgRestaurant from '@/vue/components/common/svg/schema/Restaurant'
import SvgService from '@/vue/components/common/svg/schema/Service'
import SvgSoftwareApplication from '@/vue/components/common/svg/schema/SoftwareApplication'
import SvgTerminal from '@/vue/components/common/svg/schema/Terminal'
import SvgTrash from '@/vue/components/common/svg/Trash'
import SvgVideo from '@/vue/components/common/svg/schema/Video'

export default {
	components : {
		CoreAlert,
		SvgCircleCheck,
		SvgCircleClose,
		SvgSearch,
		SvgArticle,
		SvgBook,
		SvgCircleQuestionMark,
		SvgCustomSchema,
		SvgCopy,
		SvgCourse,
		SvgDataset,
		SvgEvent,
		SvgFaqPage,
		SvgFactCheck,
		SvgFile,
		SvgFileEdit,
		SvgGoogleSmall,
		SvgHowTo,
		SvgJobPosting,
		SvgMovie,
		SvgMusic,
		SvgPencil,
		SvgPerson,
		SvgProduct,
		SvgRecipe,
		SvgRestaurant,
		SvgService,
		SvgSoftwareApplication,
		SvgTerminal,
		SvgTrash,
		SvgVideo
	},
	props : {
		value        : [ String, Number ],
		appendIcon   : String,
		autocomplete : String,
		prependIcon  : String,
		placeholder  : String,
		inputId      : String,
		disabled     : Boolean,
		readonly     : Boolean,
		required     : Boolean,
		max          : {
			type    : Number,
			default : Number.MAX_SAFE_INTEGER
		},
		min : {
			type    : Number,
			default : Number.MIN_SAFE_INTEGER
		},
		spellcheck : {
			type : Boolean,
			default () {
				return true
			}
		},
		type : {
			type : String,
			default () {
				return 'text'
			}
		},
		size : {
			type        : String,
			default     : '',
			description : 'Button size (small|medium|large)'
		},
		step : {
			type     : Number,
			required : false
		},
		validation : {
			type : String,
			default () {
				return ''
			}
		}
	},
	data () {
		return {
			error   : '',
			strings : {
				urlInvalid : this.$t.__('Your URL is invalid. Please check the format and try again.', this.$td)
			}
		}
	},
	methods : {
		validate (value) {
			this.error = ''
			if (!this.validation || !this.value) {
				return
			}

			if ('url' === this.validation) {
				if (value.startsWith('http://')) {
					value = value.replace('http://', 'https://')
				}

				if (value && !value.startsWith('https://')) {
					value = `https://${value}`
				}

				const urlValid = value.match(/(http[s]?:\/\/)[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/i)
				if (!urlValid) {
					this.error = this.strings.urlInvalid
				}
			}
		}
	},
	beforeMount () {
		this.validate(this.value)
	}
}
</script>

<style lang="scss" scoped>
.aioseo-input-container {
	position: relative;
	width: 100%;

	.aioseo-input {
		width: 100%;

		&.file {
			position: absolute;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			margin: 0;
			padding: 0;

			input[type=file] {
				position: absolute;
				top: 0;
				right: 0;
				left: 0;
				bottom: 0;
				margin: 0;
				padding: 0;
				cursor: pointer;
				opacity: 0;

				&::-webkit-file-upload-button {
					visibility: hidden;
				}

				&:focus {
					box-shadow: none;
				}
			}
		}

		input {
			height: 48px;
			width: 100%;
			background-color: #fff;
			border: 1px solid $input-border;
			border-radius: 3px;
			padding: 15px;
			font-size: 18px;
			position: relative;
			overflow: hidden;
			margin: 0;

			&:disabled {
				background: $box-background;
			}

			&:focus {
				border-color: $blue;
				box-shadow: 0 0 0 1px $blue;
			}

			&::placeholder {
				color: $placeholder-color;
			}

			&.prepend {
				padding-left: 50px;
			}

			&.append {
				padding-right: 50px;
			}

			&.small {
				height: 30px;
				padding: 10px;
				font-size: 14px;

				&.prepend {
					padding-left: 30px;
				}

				&.append {
					padding-right: 30px;
				}
			}

			&.medium {
				height: 40px;
				padding: 12px;
				font-size: 16px;

				&.prepend {
					padding-left: 35px;
				}

				&.append {
					padding-right: 35px;
				}
			}
		}

		&.aioseo-active {
			input {
				border-color: $green;

				&:active,
				&:focus {
					box-shadow: 0 0 0 1px $green;
				}
			}

			.prepend-icon,
			.append-icon {
				color: $green;
			}
		}

		&.aioseo-error {
			input {
				border-color: $red;

				&:active,
				&:focus {
					box-shadow: 0 0 0 1px $red;
				}
			}

			.prepend-icon,
			.append-icon {
				color: $red;
			}
		}

		&.aioseo-warning {
			input {
				border-color: $orange;

				&:active,
				&:focus {
					box-shadow: 0 0 0 1px $orange;
				}
			}

			.prepend-icon,
			.append-icon {
				color: $orange;
			}
		}

		.prepend-icon {
			position: absolute;
			top: 0;
			left: 10px;
			width: 30px;
			height: 100%;
			color: $input-border;
			display: flex;
			align-items: center;
			z-index: 1;

			svg {
				width: 30px;
				height: 30px;
			}

			&.small {
				width: 20px;

				svg {
					width: 10px;
					height: 10px;
				}
			}

			&.medium {
				width: 15px;

				svg {
					width: 15px;
					height: 15px;
				}
			}
		}

		.append-icon {
			position: absolute;
			top: 0;
			right: 10px;
			height: 100%;
			color: $input-border;
			display: flex;
			align-items: center;
			z-index: 1;

			svg {
				width: 30px;
				height: 30px;
			}

			&.small {
				width: 10px;
			}

			&.medium {
				width: 15px;
			}

			&.clickable {
				cursor: pointer;
				padding: 0 5px;
				background: #F3F4F5;
				border: 1px solid $input-border;
				color: #434960;
				right: 0;
				width: 30px;
				border-radius: 0 3px 3px 0;

				&.small {
					width: 15px;
				}

				&.medium {
					padding: 0 10px;
					width: 40px;
				}
			}
		}
	}

	.aioseo-input-error {
		margin-top: 10px;
	}
}
</style>