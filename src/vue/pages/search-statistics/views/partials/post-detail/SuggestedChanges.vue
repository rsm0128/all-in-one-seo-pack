<template>
	<div class="aioseo-search-statistics-suggested-changes">
		<div v-if="suggestedChanges.length">
			<ul>
				<li
					v-for="(change, index) in suggestedChanges"
					:key="index"
				>
					<svg-circle-close width="20" />
					<div>{{ change.text }}</div>

					<core-tooltip
						v-if="change.tooltip"
						offset="-100px,0"
					>
						<svg-circle-question-mark />

						<template #tooltip>
							<span v-html="strings.tooltip" />
						</template>
					</core-tooltip>
				</li>
			</ul>
		</div>

		<div v-else class="all-good">
			<lottie :options="lottieOptions" :width="60" :height="60" class="all-good-animation" />
			<div class="all-good-title">{{ strings.youCrushed }}</div>
			<p class="all-good-description">{{ strings.weWillLet }}</p>
		</div>
	</div>
</template>

<script>
import * as rollingCheckMark from '@/vue/assets/lottie/rolling-check-mark.json'
import CoreTooltip from '@/vue/components/common/core/Tooltip'
import Lottie from '@/vue/components/common/core/Lottie'
import SvgCircleClose from '@/vue/components/common/svg/circle/Close'
import SvgCircleQuestionMark from '@/vue/components/common/svg/circle/QuestionMark'
export default {
	components : {
		CoreTooltip,
		Lottie,
		SvgCircleClose,
		SvgCircleQuestionMark
	},
	data () {
		return {
			strings : {
				youCrushed : this.$t.__('Woohoo! You crushed the SEO for this post.', this.$td),
				weWillLet  : this.$t.__('We\'ll let you know if anything changes. Keep up the great work!', this.$td),
				tooltip    : this.$t.sprintf(
					// Translators: 1 - Opening link tag, 2 - Closing link tag.
					this.$t.__('To learn more about this suggestion, %1$sclick here%2$s.', this.$td),
					'<a href="' + this.editUrl + '" target="_blank">',
					'</a>'
				)
			},
			lottieOptions : {
				animationData : rollingCheckMark
			}
		}
	},
	props : {
		suggestedChanges : {
			type : Array,
			default () {
				return []
			}
		},
		editUrl : String
	}
}
</script>

<style lang="scss">
.aioseo-search-statistics-suggested-changes {
	ul {
		margin: 0;

		li {
			font-weight: 400;
			font-size: 14px;
			color: $black;
			margin-bottom: 16px;
			position: relative;
			padding-left: 30px;
			display: flex;
			align-items: center;

			.aioseo-circle-close {
				position: absolute;
				top: 50%;
				left: 0;
				margin-top: -10px;
				color: $red;
			}

			.aioseo-tooltip {
				margin-left: 6px;
			}
		}
	}

	.all-good {
		text-align: center;

		&-animation {
			margin: 0 auto 8px;
		}

		&-title {
			font-weight: 700;
			font-size: 16px;
			color: $black;
			margin-bottom: 8px;
		}

		&-description {
			font-weight: 400;
			font-size: 16px;
			color: $black;
			margin-bottom: 0;
		}
	}
}
</style>