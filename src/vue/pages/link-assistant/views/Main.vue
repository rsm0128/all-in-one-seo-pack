<template>
	<div class="aioseo-link-assistant">
		<core-main
			:page-name="strings.pageName"
			:exclude-tabs="excludedTabs"
			:showTabs="'post-report' !== $route.name"
		>
			<component :is="$route.name" />
		</core-main>
	</div>
</template>

<script>
import { RequiresActivation, RequiresUpdate } from '@/vue/mixins'
import { mapActions, mapMutations, mapState } from 'vuex'
import CoreMain from '@/vue/components/common/core/main/Index.vue'
import CoreProcessingPopup from '@/vue/components/common/core/ProcessingPopup'
import DomainsReport from './AIOSEO_VERSION/DomainsReport'
import LinksReport from './AIOSEO_VERSION/LinksReport'
import Overview from './Overview'
import PostReport from './AIOSEO_VERSION/PostReport'
import Settings from './AIOSEO_VERSION/Settings'
export default {
	components : {
		CoreMain,
		CoreProcessingPopup,
		DomainsReport,
		LinksReport,
		Overview,
		PostReport,
		Settings
	},
	mixins : [ RequiresActivation, RequiresUpdate ],
	data () {
		return {
			strings : {
				pageName : this.$t.__('Link Assistant', this.$td)
			}
		}
	},
	computed : {
		...mapState('linkAssistant', [ 'suggestionsScan' ]),
		excludedTabs () {
			const excludedTabs = (
				!this.$addons.isActive('aioseo-link-assistant')
					? this.getExcludedActivationTabs('aioseo-link-assistant')
					: this.getExcludedUpdateTabs('aioseo-link-assistant')
			) || []
			excludedTabs.push('post-report')
			return excludedTabs
		}
	},
	methods : {
		...mapMutations('linkAssistant', [ 'toggleProcessingPopup' ]),
		...mapActions('linkAssistant', [ 'pollSuggestionsScan', 'getMenuData' ])
	},
	mounted () {
		this.$bus.$on('changes-saved', () => {
			this.getMenuData()
		})

		if (
			this.$isPro &&
			100 !== this.suggestionsScan.percent &&
			this.$addons.isActive('aioseo-link-assistant') &&
			!this.$addons.requiresUpgrade('aioseo-link-assistant') &&
			this.$addons.hasMinimumVersion('aioseo-link-assistant')
		) {
			this.pollSuggestionsScan()
		}
	}
}
</script>

<style lang="scss">
.aioseo-link-assistant {
	.aioseo-wp-table {
		tbody {
			th.check-column,
			td {
				font-size: 14px;
			}

			.date {
				font-size: 13px;
			}
		}

		tr.edit-row .edit-row-content {
			padding: 0;

			.wrapper .border {
				padding: 0;
			}

		}

		.tablenav {
			font-size: 13px !important;
		}

		button.toggle-row-button {
			display: flex;
			width: 30px;
			height: 26px;
			padding: 0;
			justify-content: center;
			align-items: center;
			background-color: white;
			border: 1px solid $gray;
			border-radius: 3px;

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
						transform: rotate(-180deg);
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

		.row-actions {
			a {
				font-size: 13px;
				line-height: 150%;

				&.delete-all-links {
					color: $red;
				}
			}
		}

		svg {
			margin-right: 11.22px;

			&.aioseo-link-external {
				color: $blue;
				width: 10.5px;
				height: 10.5px;
			}
			&.aioseo-new-page {
				color: $black2;
				width: 9.33px;
				height: 11.67px;
			}
		}
	}

	.aioseo-tooltip .popper.action {
		a.tooltip-url {
			white-space: normal !important;
		}
	}

	#the-list .aioseo-wp-table.link-assistant-inner-table {
		.tablenav {
			height: auto;

			.aioseo-wp-bulk-actions {
				margin: 10px 0 16px 16px;
			}

			.pagination {
				margin: 10px 16px 16px 0;
			}
		}

		.wp-table table {
			border: 0;
			padding: 0;

			thead {
				tr:last-child {
					th.manage-column,
					td.manage-column {
						border-bottom: 1px solid #c3c4c7 !important;
					}

					th {
						padding: 8px 10px !important;

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

					td {
						padding: 8px 10px 15px 8px;
						&:first-of-type {
							padding-left: 15px;
						}
					}
				}
			}

			tbody {
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

	.aioseo-tabs.link-tabs {
		border-bottom: 1px solid $border;

		.aioseo-mobile-tabs {
			margin-left: 10px;
		}

		.md-tabs-navigation {
			margin-top: 0;
		}

		.md-button-content {
			display: flex;
			align-items: center;
			column-gap: 11.75px;
		}

		svg {
			display: inline-block;
			width: 11px;
			height: 11px;
			margin-top: 3px;
			margin-right: 0;

			&.aioseo-link-internal-inbound,
			&.aioseo-link-internal-outbound {
				color: $green;
			}
			&.aioseo-link-external {
				color: $blue;
			}
			&.aioseo-link-affiliate {
				color: $orange;
				width: 12px;
				height: 12px;
				margin-top: 2px;
			}
			&.aioseo-link-suggestion {
				color: $black2-hover;
				width: 16.67px;
				height: 8.33px;
			}
		}
	}

	div.links-bottom {
		display: flex;
		flex-direction: row;
		padding: 17px 17px 24px 17px;
		a {
			text-decoration: underline;
			&.link-delete {
				color: $red !important;
			}
			&:hover{
				text-decoration: none;
				cursor: pointer;
			}
		}

		.links-bottom-left {
			display: flex;
			flex: 1 1 auto;
			column-gap: 28px;
			align-items: center;
			div {
				display:flex;
				align-items: center;
				svg {
					margin-right: 10px;
				}
			}

			button {
				svg {
					margin-top: 2.5px;
					margin-right: 10px;
					width: 14px;
					height: 14px;
					color: white !important;
				}
			}

			svg.aioseo-link-external {
				margin-top: 3.5px;
				width: 11px;
				height: 11px;
				color: $blue;
			}
		}

		.links-bottom-right {
			display: flex;
			align-items: center;
		}
	}

	@media (max-width: 1115px) {
		.aioseo-tabs {
			border-bottom: 0;
		}
		.aioseo-mobile-tabs {
			.tab-dropdown {
				border-bottom: 0;
			}
			svg.aioseo-caret {
				height: 20px;
				width: 20px;
			}
		}
	}
}
.aioseo-link-assistant-overview {
	position: relative;

	.overview-link-count {
		margin-bottom: -50px;
	}
}
</style>