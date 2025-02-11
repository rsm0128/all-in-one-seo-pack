<template>
	<div
		class="statistic"
		:class=" {
			'no-margin' : !showCurrent
		}"
	>
		<span v-if="showCurrent && (total || showZeroValues)">
			{{ formatStatistic(type, total) }}
		</span>

		<core-tooltip
			v-if="showDifference && 0 !== differenceRounded"
			:offset="tooltipOffset"
		>
			<span
				class="statistic-direction"
				:class="{
					up   : 0 < differenceRounded,
					down : 0 >= differenceRounded
				}"
			>
				<svg-caret-solid :direction="0 < differenceRounded ? 'up' : 'down'" />
				{{ formatStatistic(type, differenceRounded) }}
			</span>

			<template #tooltip>
				<span v-html="compareDescription(Math.abs(differenceRounded), 0 < differenceRounded ? 'up' : 'down')" />
			</template>
		</core-tooltip>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import StatisticMixin from '../../mixins/Statistic.js'
import dateFormat from '@/vue/utils/dateFormat'
import CoreTooltip from '@/vue/components/common/core/Tooltip'
import SvgCaretSolid from '@/vue/components/common/svg/CaretSolid'
export default {
	components : {
		CoreTooltip,
		SvgCaretSolid
	},
	mixins : [ StatisticMixin ],
	props  : {
		total       : [ Number, String ],
		difference  : [ Number, String ],
		showCurrent : {
			type : Boolean,
			default () {
				return true
			}
		},
		showDifference : {
			type : Boolean,
			default () {
				return true
			}
		},
		showZeroValues : {
			type : Boolean,
			default () {
				return false
			}
		},
		type : {
			type     : String,
			required : true
		},
		tooltipOffset : {
			type : String,
			default () {
				return '0,0'
			}
		}
	},
	computed : {
		...mapState('search-statistics', [ 'range' ]),
		differenceRounded () {
			if ('position' === this.type) {
				return parseInt(Math.round(this.difference))
			}

			return this.difference
		}
	},
	methods : {
		compareDescription (number, direction) {
			const directionI18n = 'up' === direction
				? this.$t.__('Up', this.$td)
				: this.$t.__('Down', this.$td)

			const compareStart = new Date(`${this.range.compareStart} 00:00:00`)
			const compareEnd   = new Date(`${this.range.compareEnd} 00:00:00`)

			return this.$t.sprintf(
				// Translators: 1 - The direction (up or down), 2 - The difference, 3 - "in search results", 4 - The first date, 5 - The second date.
				this.$t.__('%1$s %2$s %3$s compared to the previous period (%4$s - %5$s)', this.$td),
				directionI18n,
				'<strong>' + this.points(number) + '</strong>',
				'position' === this.type
					? this.$t.__('in search results', this.$td)
					: '',
				'<strong>' + dateFormat(compareStart, this.$aioseo.data.dateFormat) + '</strong>',
				'<strong>' + dateFormat(compareEnd, this.$aioseo.data.dateFormat) + '</strong>'
			)
		},
		points (number) {
			switch (this.type) {
				case 'clicks':
					return this.$t.sprintf(
						// Translators: 1 - The number of clicks.
						this.$t._n('%s click', '%s clicks', parseInt(this.formatStatistic('clicks', number)), this.$td),
						this.$numbers.compactNumber(number)
					)
				case 'impressions':
					return this.$t.sprintf(
						// Translators: 1 - The number of impressions.
						this.$t._n('%s impression', '%s impressions', parseInt(this.formatStatistic('impressions', number)), this.$td),
						this.$numbers.compactNumber(number)
					)
				case 'ctr':
					return this.formatStatistic('ctr', number)
				case 'position':
					number = parseInt(Math.round(number))
					return this.$t.sprintf(
						// Translators: 1 - The number of spots.
						this.$t._n('%s spot', '%s spots', parseInt(this.formatStatistic('position', number)), this.$td),
						number
					)
				case 'keywords':
					return this.$t.sprintf(
						// Translators: 1 - The number of keywords.
						this.$t._n('%s keyword', '%s keywords', parseInt(this.formatStatistic('keywords', number)), this.$td),
						this.$numbers.compactNumber(number)
					)
				case 'decay':
					return this.$t.sprintf(
						// Translators: 1 - The number of points.
						this.$t._n('%s point', '%s points', parseInt((this.formatStatistic('keywords', number))), this.$td),
						this.$numbers.compactNumber(number)
					)
				default:
					return ''
			}
		}
	}
}
</script>

<style lang="scss">
.statistic {
	display: flex;
	align-items: center;
	font-size: 14px;

	> span {
		display: inline-flex;
		flex: 1;
	}

	.aioseo-tooltip {
		margin-left: 0;
		justify-content: flex-end;
	}

	&-direction {
		display: flex;
		align-items: center;
		margin-left: 12px;
		font-weight: 700;

		&.up {
			color: $green;
		}

		&.down {
			color: $red;
		}
	}

	&.no-margin {
		.aioseo-tooltip {
			justify-content: center;
		}

		.statistic-direction {
			margin-left: 0;
		}
	}

	svg {
		width: 12px;
		height: 12px;
		margin-right: 6px;
	}
}
</style>