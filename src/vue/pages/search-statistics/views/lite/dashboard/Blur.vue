<template>
	<core-blur>
		<div class="aioseo-search-statistics-dashboard">
			<grid-row>
				<grid-column md="6">
					<core-card
						class="aioseo-seo-statistics-card"
						slug="seoStatistics"
						:header-text="strings.statisticsCard"
						:toggles="false"
						no-slide
					>
						<template #header-icon>
							<svg-statistics />
						</template>

						<seo-statistics-overview
							:statistics="[ 'impressions', 'clicks', 'ctr', 'position' ]"
						/>

						<card-footer />
					</core-card>

					<core-card
						slug="keywords"
						:header-text="strings.keywordsCard"
						:toggles="false"
						no-slide
					>
						<template #header-icon>
							<svg-query />
						</template>

						<template #tabs>
							<core-main-tabs
								:tabs="keywordsTabs"
								:showSaveButton="false"
								active="TopKeywords"
								internal
							/>
						</template>

						<top-keywords />

						<card-footer />
					</core-card>
				</grid-column>

				<grid-column md="6">
					<core-card
						slug="keywordPositions"
						:header-text="strings.keywordPositionsCard"
						:toggles="false"
						no-slide
						class="aioseo-keyword-positions-card"
					>
						<template #header-icon>
							<svg-list />
						</template>

						<keywords-graph legend-style="simple" />

						<card-footer />
					</core-card>

					<core-card
						slug="overallOptimization"
						:header-text="strings.overallOptimizationCard"
						:toggles="false"
						no-slide
					>
						<template #header-icon>
							<svg-speed />
						</template>

						<core-overview />

						<card-footer />
					</core-card>
				</grid-column>
			</grid-row>
			<grid-row>
				<grid-column>
					<core-card
						slug="seoPostRanking"
						:header-text="strings.postRankingCard"
						:toggles="false"
						no-slide
					>
						<template #header-icon>
							<svg-web />
						</template>

						<template #tabs>
							<core-main-tabs
								:tabs="postRankingTabs"
								:showSaveButton="false"
								active="TopPages"
								internal
							/>
						</template>

						<top-pages />
					</core-card>
				</grid-column>
			</grid-row>
		</div>
	</core-blur>
</template>

<script>
import CardFooter from '../../partials/CardFooter'
import CoreBlur from '@/vue/components/common/core/Blur'
import CoreCard from '@/vue/components/common/core/Card'
import CoreMainTabs from '@/vue/components/common/core/main/Tabs'
import CoreOverview from '@/vue/components/common/core/Overview.vue'
import GridColumn from '@/vue/components/common/grid/Column'
import GridRow from '@/vue/components/common/grid/Row'
import KeywordsGraph from '../../partials/KeywordsGraph.vue'
import SeoStatisticsOverview from '../../partials/SeoStatisticsOverview'
import SvgList from '@/vue/components/common/svg/List'
import SvgQuery from '@/vue/components/common/svg/Query'
import SvgSpeed from '@/vue/components/common/svg/Speed'
import SvgStatistics from '@/vue/components/common/svg/Statistics'
import SvgWeb from '@/vue/components/common/svg/Web'
import TopKeywords from '../../partials/TopKeywords.vue'
import TopPages from '../../partials/TopPages.vue'
export default {
	components : {
		CardFooter,
		CoreBlur,
		CoreCard,
		CoreMainTabs,
		CoreOverview,
		GridColumn,
		GridRow,
		KeywordsGraph,
		SeoStatisticsOverview,
		SvgList,
		SvgQuery,
		SvgSpeed,
		SvgStatistics,
		SvgWeb,
		TopKeywords,
		TopPages
	},
	data () {
		return {
			strings : {
				overallOptimizationCard : this.$t.__('Post Optimizations', this.$td),
				keywordsCard            : this.$t.__('Keyword Rankings', this.$td),
				keywordPositionsCard    : this.$t.__('Keyword Positions', this.$td),
				statisticsCard          : this.$t.__('SEO Statistics', this.$td),
				postRankingCard         : this.$t.__('Content Rankings', this.$td)
			},
			keywordsTabs : [
				{
					slug : 'TopKeywords',
					name : this.$t.__('Top Keywords', this.$td)
				},
				{
					slug : 'WinningLosingKeywords',
					name : this.$t.__('Winning / Losing', this.$td)
				}
			],
			postRankingTabs : [
				{
					slug : 'TopPages',
					name : this.$t.__('Top Pages', this.$td)
				},
				{
					slug : 'TopLosingPages',
					name : this.$t.__('Top Losing', this.$td)
				},
				{
					slug : 'TopWinningPages',
					name : this.$t.__('Top Winning', this.$td)
				}
			]
		}
	}
}
</script>