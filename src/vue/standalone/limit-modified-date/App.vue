<template>
	<div v-if="currentPost.id">
		<span class="components-checkbox-control__input-container">
			<input
				id="aioseo-limit-modified-date-input"
				class="components-checkbox-control__input"
				type="checkbox"
				v-model="currentPost.limit_modified_date"
				@change="addLimitModifiedDateAttribute"
			/>

			<svg
				v-if="canShowSvg"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				width="24"
				height="24"
				role="img"
				class="components-checkbox-control__checked"
				aria-hidden="true"
				focusable="false"
			>
				<path d="M18.3 5.6L9.9 16.9l-4.6-3.4-.9 1.2 5.8 4.3 9.3-12.6z" />
			</svg>
		</span>
		<label class="components-checkbox-control__label" for="aioseo-limit-modified-date-input">{{ strings.label }}</label>
	</div>
</template>

<script>
import { Standalone } from '@/vue/mixins/Standalone'
import { isBlockEditor } from '@/vue/utils/context'

export default {
	mixins : [ Standalone ],
	data () {
		return {
			strings : {
				label : this.$t.__('Don\'t update the modified date', this.$td)
			}
		}
	},
	methods : {
		addLimitModifiedDateAttribute () {
			if (!isBlockEditor()) {
				return
			}

			window.wp.data.dispatch('core/editor').editPost({
				aioseo_limit_modified_date : this.currentPost.limit_modified_date
			})
		}
	},
	computed : {
		canShowSvg () {
			return isBlockEditor() && this.currentPost.limit_modified_date
		}
	},
	watch : {
		'currentPost.limit_modified_date' (newVal) {
			// Update the hidden aioseo-post-settings field.
			this.$bus.$emit('standalone-update-post', { limit_modified_date: newVal })
		}
	}
}
</script>