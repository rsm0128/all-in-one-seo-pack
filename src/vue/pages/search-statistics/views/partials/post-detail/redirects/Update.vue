<template>
	<div class="aioseo-search-statistics-redirects">
		<blur />

		<cta :type="4">
			<template #header-text>
				{{ strings.ctaHeader }}
			</template>
			<template #description>
				{{ strings.ctaDescription }}

				<base-button
					type="blue"
					tag="a"
					:href="$aioseo.urls.aio.redirects"
					size="small"
				>
					{{ strings.updateRedirects }}
				</base-button>
			</template>
		</cta>
	</div>
</template>

<script>
import Blur from './Blur'
import Cta from '@/vue/components/common/cta/Index.vue'
export default {
	components : {
		Blur,
		Cta
	},
	data () {
		return {
			strings : {
				ctaHeader       : this.$t.__('Update Redirects to the latest version', this.$tdPro),
				ctaDescription  : this.$t.__('Our Redirection Manager allows you to easily create and manage redirects for all your pages and posts.', this.$td),
				updateRedirects : this.$t.__('Update Redirects', this.$td)
			}
		}
	}
}
</script>