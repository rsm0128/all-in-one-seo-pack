<template>
	<transition-slide
		class="aioseo-notification"
		:active="active"
	>
		<div>
			<div class="icon">
				<svg-circle-close class="error" />
			</div>

			<div class="body">
				<div class="title">
					<div>{{ strings.title }}</div>
				</div>

				<div
					class="notification-content"
					v-html="content"
				/>

				<div class="actions">
					<base-button
						size="small"
						type="green"
						tag="a"
						:href="$links.utmUrl('notification-unlicensed-addons')"
						target="_blank"
					>
						{{ strings.upgrade }}
					</base-button>
				</div>
			</div>
		</div>
	</transition-slide>
</template>

<script>
import { mapState } from 'vuex'
import SvgCircleClose from '@/vue/components/common/svg/circle/Close'
import TransitionSlide from '@/vue/components/common/transition/Slide'
export default {
	components : {
		SvgCircleClose,
		TransitionSlide
	},
	props : {
		notification : {
			type     : Object,
			required : true
		}
	},
	data () {
		return {
			active  : true,
			strings : {
				title : this.$t.sprintf(
					// Translators: 1 - Plugin short name ("AIOSEO"), 2 - "Addons".
					this.$t.__('%1$s %2$s Not Configured Properly', this.$td),
					import.meta.env.VITE_SHORT_NAME,
					'Addons'
				),
				learnMore : this.$t.__('Learn More', this.$td),
				upgrade   : this.$t.__('Upgrade', this.$td)
			}
		}
	},
	computed : {
		...mapState([ 'options' ]),
		content () {
			let addonsList = '<ul>'
			this.notification.addons.forEach(addon => {
				addonsList += '<li><strong>' + import.meta.env.VITE_SHORT_NAME + ' - ' + addon.name + '</strong></li>'
			})
			addonsList += '</ul>'
			return this.notification.message + addonsList
		}
	}
}
</script>

<style lang="scss">
.aioseo-notification {
	margin-bottom: 20px;

	> div {
		display: flex;
		align-items: flex-start;
		padding-bottom: 10px;
		border-bottom: 1px solid $border;

		.icon {
			margin-right: 20px;

			svg {
				width: 20px;
				height: 20px;
				color: $green;

				&.warning {
					color: $orange;
				}

				&.info {
					color: $blue;
				}

				&.success {
					color: $green;
				}

				&.error {
					color: $red;
				}
			}
		}

		.body {
			margin-right: 20px;
			flex: 1;

			.title {
				font-size: 16px;
				font-weight: 600;
				color: $black;
				margin-bottom: 7px;
				display: flex;
				align-items: center;

				div:first-child {
					flex: 1;
					margin-right: 5px;
					line-height: 1.4;
				}
			}

			.notification-content {
				margin-bottom: 10px;
				max-width: 400px;
			}

			.actions {
				flex-wrap: wrap;
				display: flex;
				align-items: center;

				> * {
					margin-bottom: 10px;
				}

				.aioseo-button {
					margin-right: 20px;
				}

				.dismiss {
					color: $placeholder-color;
					font-size: 14px;
				}
			}
		}
	}
}
</style>