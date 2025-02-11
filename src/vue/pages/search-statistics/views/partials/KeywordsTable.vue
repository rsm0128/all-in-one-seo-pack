<template>
	<div class="aioseo-search-statistics-keywords-table">
		<core-wp-table
			ref="table"
			class="keywords-table"
			:id="tableId"
			:columns="tableColumns"
			:rows="Object.values(keywords.rows)"
			:totals="keywords.totals"
			:filters="keywords.filters"
			:additional-filters="keywords.additionalFilters"
			:loading="loading"
			:initial-page-number="pageNumber"
			:initial-search-term="searchTerm"
			:initial-items-per-page="$aioseo.settings.tablePagination[changeItemsPerPageSlug]"
			:show-header="showHeader"
			:show-bulk-actions="false"
			:show-table-footer="showTableFooter"
			:show-items-per-page="showItemsPerPage"
			show-pagination
			:blur-rows="showUpsell"
			@filter-table="processFilter"
			@process-additional-filters="processAdditionalFilters"
			@paginate="processPagination"
			@process-change-items-per-page="processChangeItemsPerPage"
			@search="processSearch"
			@sort-column="processSort"
		>
			<template #keyword="{ row, index, editRow }">
				<div class="keyword">
					<core-tooltip v-if="shouldLimitText(row.keyword)">
						<a
							href="#"
							@click.prevent="editRow(index); toggleRow(index)"
							class="limit-line"
						>
							{{ decodeHTMLEntities(row.keyword) }}
						</a>

						<template #tooltip>
							{{ decodeHTMLEntities(row.keyword) }}
						</template>
					</core-tooltip>

					<a
						v-else
						href="#"
						@click.prevent="editRow(index); toggleRow(index)"
					>
						{{ decodeHTMLEntities(row.keyword) }}
					</a>
				</div>
			</template>

			<template #clicks="{ row }">
				{{ row.clicks }}
			</template>

			<template #ctr="{ row }">
				{{ $numbers.compactNumber(row.ctr) }}%
			</template>

			<template #impressions="{ row }">
				{{ $numbers.compactNumber(row.impressions) }}
			</template>

			<template #position="{ row }">
				{{ Math.round(row.position).toFixed(0) }}
			</template>

			<template #diffPosition="{ row }">
				<statistic
					v-if="row.difference.comparison"
					type="position"
					:difference="row.difference.position"
					:showCurrent="false"
					tooltip-offset="-100px,0"
				/>
			</template>

			<template #diffDecay="{ row }">
				<statistic
					v-if="row.difference.comparison"
					type="decay"
					:difference="row.difference.decay"
					:showCurrent="false"
					tooltip-offset="-100px,0"
				/>
			</template>

			<template #buttons="{ row, index, column, editRow }">
				<div class="">
					<slot
						name="buttons"
						:row="row"
						:column="column"
						:index="index"
					/>

					<base-button
						type="gray"
						class="toggle-row-button"
						:class="{ active: isRowActive(index) }"
						@click="editRow(index); toggleRow(index)"
					>
						<svg-caret />
					</base-button>
				</div>
			</template>

			<template #edit-row="{ index }">
				<keyword-inner
					:index="index"
					:postDetail="postDetail"
				/>
			</template>

			<template #cta>
				<cta
					v-if="showUpsell"
					:cta-link="$links.getPricingUrl('search-statistics', 'search-statistics-upsell')"
					:button-text="strings.ctaButtonText"
					:learn-more-link="$links.getUpsellUrl('search-statistics', 'search-statistics-upsell', 'home')"
				>
					<template #header-text>
						{{ strings.ctaHeader }}
					</template>
				</cta>
			</template>

			<template #tablenav>
				<slot name="tablenav" />
			</template>
		</core-wp-table>
	</div>
</template>

<script>
import { decodeHTMLEntities } from '@/vue/utils/helpers'
import { mapActions, mapGetters, mapState } from 'vuex'
import { WpTable } from '@/vue/mixins'
import PostTypesMixin from '@/vue/mixins/PostTypes.js'
import Table from '../../mixins/Table.js'
import CoreTooltip from '@/vue/components/common/core/Tooltip'
import CoreWpTable from '@/vue/components/common/core/wp/Table'
import Cta from '@/vue/components/common/cta/Index.vue'
import KeywordInner from './KeywordInner.vue'
import Statistic from './Statistic.vue'
import SvgCaret from '@/vue/components/common/svg/Caret'
export default {
	components : {
		CoreTooltip,
		CoreWpTable,
		Cta,
		KeywordInner,
		Statistic,
		SvgCaret
	},
	mixins : [ PostTypesMixin, WpTable, Table ],
	data () {
		return {
			tableId      : 'aioseo-search-statistics-keywords-table',
			activeRow    : -1,
			showUpsell   : false,
			isPreloading : false,
			isFetching   : false,
			interval     : null,
			strings      : {
				ctaButtonText : this.$t.__('Upgrade to Pro and Unlock Access Control', this.$td),
				ctaHeader     : this.$t.sprintf(
					// Translators: 1 - Plugin short name ("AIOSEO"), 2 - "Pro".
					this.$t.__('Access Control is only available for licensed %1$s %2$s users.', this.$td),
					import.meta.env.VITE_SHORT_NAME,
					'Pro'
				)
			}
		}
	},
	props : {
		keywords : Object,
		loading  : {
			type : Boolean,
			default () {
				return false
			}
		},
		showHeader : {
			type : Boolean,
			default () {
				return true
			}
		},
		showTableFooter  : Boolean,
		showItemsPerPage : Boolean,
		columns          : {
			type : Array,
			default () {
				return [ 'keyword', 'clicks', 'ctr', 'impressions', 'position', 'diffPosition', 'buttons' ]
			}
		},
		appendColumns : {
			type : Object,
			default () {
				return {}
			}
		},
		postDetail : {
			type : Boolean,
			default () {
				return false
			}
		},
		refreshOnLoad : {
			type : Boolean,
			default () {
				return true
			}
		},
		page : {
			type : String,
			default () {
				return ''
			}
		}
	},
	computed : {
		...mapGetters([ 'isUnlicensed' ]),
		...mapState('search-statistics', [ 'data', 'isConnected' ]),
		changeItemsPerPageSlug () {
			if (this.postDetail) {
				return 'searchStatisticsPostDetailKeywords'
			}

			return 'searchStatisticsKeywordRankings'
		},
		allColumns () {
			const columns = this.columns

			// Get the active filter from this.keywords.filters array.
			const activeFilter = this.keywords?.filters?.find(f => f.active) || {}

			if (this.appendColumns[activeFilter.slug || 'all']) {
				columns.push(this.appendColumns[activeFilter.slug || 'all'])
			}

			return columns
		},
		tableColumns () {
			return [
				{
					slug     : 'keyword',
					label    : this.$t.__('Keyword', this.$td),
					sortable : this.isSortable,
					sortDir  : 'keyword' === this.orderBy ? this.orderDir : 'asc',
					sorted   : 'keyword' === this.orderBy
				},
				{
					slug     : 'clicks',
					label    : this.$t.__('Clicks', this.$td),
					width    : '80px',
					sortable : this.isSortable,
					sortDir  : 'clicks' === this.orderBy ? this.orderDir : 'asc',
					sorted   : 'clicks' === this.orderBy
				},
				{
					slug     : 'ctr',
					label    : this.$t.__('Avg. CTR', this.$td),
					width    : '100px',
					sortable : this.isSortable,
					sortDir  : 'ctr' === this.orderBy ? this.orderDir : 'asc',
					sorted   : 'ctr' === this.orderBy
				},
				{
					slug     : 'impressions',
					label    : this.$t.__('Impressions', this.$td),
					width    : '120px',
					sortable : this.isSortable,
					sortDir  : 'impressions' === this.orderBy ? this.orderDir : 'asc',
					sorted   : 'impressions' === this.orderBy
				},
				{
					slug     : 'position',
					label    : this.$t.__('Position', this.$td),
					width    : '85px',
					sortable : this.isSortable,
					sortDir  : 'position' === this.orderBy ? this.orderDir : 'asc',
					sorted   : 'position' === this.orderBy
				},
				{
					slug  : 'diffDecay',
					label : this.$t.__('Diff', this.$tdPro),
					width : '95px'
				},
				{
					slug  : 'diffPosition',
					label : this.$t.__('Diff', this.$tdPro),
					width : '80px'
				},
				{
					slug  : 'buttons',
					label : '',
					width : this.hasSlot('buttons') ? '240px' : '40px'
				}
			].filter(column => this.allColumns.includes(column.slug))
		},
		isSortable () {
			return 'all' === this.filter && (this.$isPro && !this.isUnlicensed)
		}
	},
	methods : {
		...mapActions('search-statistics', [
			'getPagesByKeywords',
			'updateKeywords',
			'updatePostDetailKeywords' ]
		),
		decodeHTMLEntities,
		isRowActive (index) {
			return index === this.activeRow
		},
		toggleRow (index) {
			if (this.activeRow === index) {
				this.activeRow = -1
				return
			}
			this.activeRow = index
		},
		fetchData (payload) {
			this.isPreloading = false
			this.isFetching   = true

			if ('' !== this.page) {
				payload = { ...payload, page: this.page }
			}

			if (this.postDetail) {
				return this.updatePostDetailKeywords(payload).finally(() => {
					this.isFetching = false
				})
			}

			return this.updateKeywords(payload).finally(() => {
				this.isFetching = false
			})
		},
		hasSlot (name = 'default') {
			return !!this.$slots[name] || !!this.$scopedSlots[name]
		},
		shouldLimitText (line) {
			return 120 < decodeHTMLEntities(line).length
		},
		maybePreloadPages () {
			if (!this.isConnected || this.isPreloading) {
				return
			}

			if (this.isFetching && !this.interval) {
				this.interval = setInterval(() => {
					if (!this.isFetching) {
						clearInterval(this.interval)
						this.maybePreloadPages()
					}
				}, 100)

				return
			}

			this.isPreloading = true
			this.preloadPages().then(() => {
				this.isPreloading = false
			})
		},
		preloadPages () {
			let rows = this.data.keywords?.paginated?.rows
			if (this.postDetail) {
				rows = this.data.postDetail?.keywords?.paginated?.rows
			}

			const keywords = []
			rows.forEach(row => {
				if (row.pages) {
					return
				}

				keywords.push(row.keyword)
			})

			const chunks = []
			for (let i = 0; i < keywords.length; i += 10) {
				chunks.push(keywords.slice(i, i + 10))
			}

			const promises = []
			chunks.forEach(chunk => {
				promises.push(
					new Promise(resolve => {
						this.getPagesByKeywords(chunk).then((data) => {
							Object.entries(data).forEach((row) => {
								const [ key, value ] = row
								const rowIndex = rows.findIndex(row => row.keyword === key)
								if (-1 === rowIndex) {
									return
								}

								const pages = Object.values(value).slice(0, 10)

								if (this.postDetail) {
									this.data.postDetail.keywords.paginated.rows[rowIndex].pages = pages
								} else {
									this.data.keywords.paginated.rows[rowIndex].pages = pages
								}
							})
						}).finally(() => {
							resolve()
						})
					})
				)
			})

			return Promise.all(promises)
		}
	},
	mounted () {
		this.maybePreloadPages()
	},
	updated () {
		this.maybePreloadPages()
	}
}
</script>

<style lang="scss">
.aioseo-search-statistics-keywords-table {
	.keywords-table {
		.subsubsub {
			position: absolute;
			top: 55px;
		}
	}

	.limit-line {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.aioseo-tooltip {
		margin-left: 0;
	}

	.move-subsubsub {
		.subsubsub {
			top: 40px;
			position: relative;
		}
	}

	thead {
		tr th.manage-column,
		tr td.manage-column  {
			font-size: 13px;
		}
	}

	.manage-column {
		&.buttons {
			> div {
				display: flex;
				align-items: center;
				justify-content: end;
			}
		}

		&.diffPosition,
		&.diffDecay {
			.statistic {
				.aioseo-tooltip {
					justify-content: start;
				}

				.statistic-direction {
					margin-left: 0;
				}
			}
		}
	}

	.text-button {
		display: flex;
		align-items: center;
		color: $blue;
		font-weight: 400;
		font-size: 14px;
		margin-right: 10px;

		svg {
			min-width: 16px;
			min-height: 16px;
			width: 16px;
			height: 16px;
			margin-right: 5px;
		}
	}

	tr.edit-row .edit-row-content {
		padding: 0 !important;

		.wrapper .border {
			padding: 0 !important;
		}
	}

	.keyword-inner {
		.aioseo-wp-table {
			margin: 0;
			padding: 0;
			border: 0;
		}

		.wp-table table {
			border: 0;
			padding: 0;
			border-bottom: 1px solid $border !important;

			thead {
				tr:last-child {
					th.manage-column,
					td.manage-column {
						border-bottom: 1px solid $input-border !important;
					}

					th {
						font-weight: 700;

						&:first-of-type {
							padding-left: 15px !important;
						}
					}

					td {
						padding: 4px 0 0 8px !important;
					}
				}
			}

			tbody {
				tr {
					// These are set in WordPress Core but we need to reset them for the inner table; otherwise the row actions for all rows show on hover.
					.row-actions {
						position: relative;
					}

					&:hover {
						.row-actions {
							position : static;
						}
					}

					th {
						padding: 11px 0 0 8px;
					}

					td:first-of-type {
						padding-left: 15px;
					}

					&:first-child td {
						border-top: 1px solid $border;
					}
				}

				.aioseo-tooltip {
					display: inline-block;
					margin-left: 0;
				}

				svg {
					&.aioseo-trash {
						width: 18px;
						height: 22px;
						color: $placeholder-color;
						cursor: pointer;
						transition: color 0.1s ease;
						margin-top: 2px;

						&:hover {
							color: $red;
						}
					}
				}
			}
		}
	}

	.toggle-row-button {
		display: inline-flex;
		width: 30px;
		height: 26px;
		padding: 0;
		justify-content: center;
		align-items: center;
		background-color: white;
		border: 1px solid $gray;
		border-radius: 3px;
		margin-left: 10px;

		&:hover {
			cursor: pointer;
			background-color: #F9F9FA;
		}

		&.active {
			background-color: $blue;
			border: 1px solid $blue;

			&:hover {
				background-color: $blue2;
			}

			svg {
				&.aioseo-caret {
					color: white;
					transform: rotate(-360deg);
				}
			}
		}

		svg {
			&.aioseo-caret {
				margin: 0;
				height: 20px;
				width: 20px;
				transform: rotate(-90deg);
				color: $placeholder-color;
				transition: transform 0.3s;
			}
		}
	}

	@media (max-width: 1300px) {
		.manage-column {
			&.keyword {
				width: 160px !important;
			}
		}
	}

	.aioseo-wp-table {
		&.pagination-hidden {
			.search-box {
				position: relative;
				top: 45px;
			}

			.subsubsub {
				margin-bottom: 9px;
			}
		}
	}
}
</style>