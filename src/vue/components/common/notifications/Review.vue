<template>
	<transition-slide
		class="aioseo-notification"
		:active="active"
	>
		<div>
			<div class="icon">
				<svg-circle-check class="success" />
			</div>

			<div class="body">
				<div class="title">
					<div>{{ title }}</div>
				</div>

				<div
					class="notification-content"
					v-html="content"
				/>

				<div class="actions">
					<template
						v-if="1 === step"
					>
						<base-button
							size="small"
							type="blue"
							@click.stop="step = 2"
						>
							{{ strings.yesILoveIt }}
						</base-button>

						<base-button
							size="small"
							type="gray"
							@click.stop="step = 3"
						>
							{{ strings.notReally }}
						</base-button>
					</template>

					<template
						v-if="2 === step"
					>
						<base-button
							tag="a"
							href="https://wordpress.org/support/plugin/all-in-one-seo-pack/reviews/?filter=5#new-post"
							size="small"
							type="blue"
							target="_blank"
							rel="noopener noreferrer"
							@click="processDismissNotification(false)"
						>
							{{ strings.okYouDeserveIt }}
						</base-button>

						<base-button
							size="small"
							type="gray"
							@click.stop.prevent="processDismissNotification(true)"
						>
							{{ strings.nopeMaybeLater }}
						</base-button>
					</template>
					<template
						v-if="3 === step"
					>
						<base-button
							tag="a"
							:href="feedbackUrl"
							size="small"
							type="blue"
							target="_blank"
							rel="noopener noreferrer"
							@click="processDismissNotification(false)"
						>
							{{ strings.giveFeedback }}
						</base-button>

						<base-button
							size="small"
							type="gray"
							@click.stop.prevent="processDismissNotification(false)"
						>
							{{ strings.noThanks }}
						</base-button>
					</template>

					<a
						v-if="!notification.dismissed"
						href="#"
						class="dismiss"
						@click.stop.prevent="processDismissNotification(false)"
					>{{ strings.dismiss }}</a>
				</div>
			</div>
		</div>
	</transition-slide>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import SvgCircleCheck from '@/vue/components/common/svg/circle/Check'
import TransitionSlide from '@/vue/components/common/transition/Slide'
export default {
	components : {
		SvgCircleCheck,
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
			step    : 1,
			active  : true,
			strings : {
				dismiss        : this.$t.__('Dismiss', this.$td),
				yesILoveIt     : this.$t.__('Yes, I love it!', this.$td),
				notReally      : this.$t.__('Not Really...', this.$td),
				okYouDeserveIt : this.$t.__('Ok, you deserve it', this.$td),
				nopeMaybeLater : this.$t.__('Nope, maybe later', this.$td),
				giveFeedback   : this.$t.__('Give feedback', this.$td),
				noThanks       : this.$t.__('No thanks', this.$td)
			}
		}
	},
	computed : {
		...mapState([ 'options' ]),
		...mapGetters([ 'licenseKey' ]),
		title () {
			switch (this.step) {
				case 2:
					return this.$t.__('That\'s Awesome!', this.$td)
				case 3:
					return this.$t.__('Help us improve', this.$td)
				default:
					return this.$t.sprintf(
						// Translators: 1 - The plugin short name ("AIOSEO").
						this.$t.__('Are you enjoying %1$s?', this.$td),
						import.meta.env.VITE_SHORT_NAME
					)
			}
		},
		content () {
			switch (this.step) {
				case 2:
					return this.$t.__('Could you please do me a BIG favor and give it a 5-star rating on WordPress to help us spread the word and boost our motivation?', this.$td) +
					'<br><br><strong>~ Syed Balkhi<br>' +
					this.$t.sprintf(
						// Translators: 1 - The plugin name ("All in One SEO").
						this.$t.__('CEO of %1$s', this.$td),
						import.meta.env.VITE_NAME
					) + '</strong>'
				case 3:
					return this.$t.sprintf(
						// Translators: 1 - The plugin name ("All in One SEO").
						this.$t.__('We\'re sorry to hear you aren\'t enjoying %1$s. We would love a chance to improve. Could you take a minute and let us know what we can do better?', this.$td),
						import.meta.env.VITE_NAME
					)
				default:
					return ''
			}
		},
		feedbackUrl () {
			const key = this.options.general && this.licenseKey ? this.licenseKey : ''
			const pro = this.$isPro ? 'pro' : 'lite'
			return this.$links.utmUrl(
				'notification-review-notice',
				this.$aioseo.version,
				'https://aioseo.com/plugin-feedback/' +
					'?wpf7528_24=' + encodeURIComponent(this.$aioseo.urls.home) +
					'&wpf7528_26=' + key +
					'&wpf7528_27=' + pro +
					'&wpf7528_28=' + this.$aioseo.version
			)
		}
	},
	methods : {
		...mapActions([ 'dismissNotifications', 'processButtonAction' ]),
		processDismissNotification (delay = false) {
			this.active = false
			this.dismissNotifications([ this.notification.slug + (delay ? '-delay' : '') ])
			this.$emit('dismissed-notification')
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