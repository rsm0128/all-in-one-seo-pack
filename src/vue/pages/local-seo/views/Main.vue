<template>
	<core-main
		:page-name="strings.pageName"
	>
		<component :is="$route.name" />
	</core-main>
</template>

<script>
import CoreMain from '@/vue/components/common/core/main/Index.vue'
import Locations from './Locations'
import Maps from './Maps'
import OpeningHours from './OpeningHours'
export default {
	components : {
		CoreMain,
		Locations,
		Maps,
		OpeningHours
	},
	data () {
		return {
			strings : {
				pageName : this.$t.__('Local SEO', this.$td)
			}
		}
	}
}
</script>