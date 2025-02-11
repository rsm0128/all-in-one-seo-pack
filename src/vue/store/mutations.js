import { setOptions } from '@/vue/utils/options'
import schemaMutations from './mutations/schema'

export default {
	...schemaMutations,
	setPong (state, payload) {
		this._vm.$set(state, 'pong', payload)
	},
	loading (state, payload) {
		this._vm.$set(state, 'loading', payload)
	},
	isDirty (state, payload) {
		this._vm.$set(state, 'isDirty', payload)
	},
	analyzer (state, payload) {
		this._vm.$set(state, 'analyzer', payload)
	},
	analyzing (state, payload) {
		this._vm.$set(state, 'analyzing', payload)
	},
	analyzeError (state, payload) {
		this._vm.$set(state, 'analyzeError', payload)
	},
	toggleCard (state, slug) {
		this._vm.$set(state.settings.toggledCards, slug, !state.settings.toggledCards[slug])
	},
	closeCard (state, slug) {
		this._vm.$set(state.settings.toggledCards, slug, false)
	},
	hideUpgradeBar (state) {
		this._vm.$set(state.settings, 'showUpgradeBar', false)
	},
	hideSetupWizard (state) {
		this._vm.$set(state.settings, 'showSetupWizard', false)
	},
	toggleNotifications (state) {
		this._vm.$set(state, 'showNotifications', !state.showNotifications)

		if (!state.showNotifications) {
			this._vm.$set(state, 'showDismissedNotifications', false)
		}
	},
	disableForceShowNotifications (state) {
		this._vm.$set(state.notifications, 'force', false)
	},
	updateTags (state, tags) {
		this._vm.$set(state, 'tags', tags)
	},
	updateAddon (state, addon) {
		const addons     = state.addons
		const addonIndex = addons.findIndex(a => a.sku === addon.sku)

		if (-1 !== addonIndex) {
			addons[addonIndex] = addon
			this._vm.$set(state, 'addons', addons)
			setOptions({
				addons
			})
		}
	},
	updateOption (state, { groups, key, value }) {
		let options = state.options
		groups.forEach(group => {
			options = options[group]
		})
		this._vm.$set(options, key, value)
	},
	updateOptions (state, options) {
		this._vm.$set(state, 'options', options)
	},
	updateInternalOption (state, { groups, key, value }) {
		let options = state.internalOptions
		groups.forEach(group => {
			options = options[group]
		})
		this._vm.$set(options, key, value)
	},
	toggleRadio (state, { slug, value }) {
		this._vm.$set(state.settings.toggledRadio, slug, value)
	},
	changeItemsPerPage (state, { slug, value }) {
		this._vm.$set(state.settings.tablePagination, slug, value)
	},
	changeTab (state, { slug, value }) {
		this._vm.$set(state.settings.internalTabs, slug, value)
	},
	changePageSettings (state, { setting, value }) {
		this._vm.$set(state.currentPost, setting, value)
	},
	changeTabSettings (state, { setting, value }) {
		this._vm.$set(state.metaBoxTabs, setting, value)
	},
	openModal (state, value) {
		this._vm.$set(state.currentPost, 'modalOpen', value)
	},
	toggleLinkAssistantModal (state) {
		this._vm.$set(state.currentPost.linkAssistant, 'modalOpen', !state.currentPost.linkAssistant.modalOpen)
	},
	toggleRedirectsModal (state) {
		this._vm.$set(state.currentPost.redirects, 'modalOpen', !state.currentPost.redirects.modalOpen)
	},
	changeGeneralPreview (state, value) {
		this._vm.$set(state.currentPost, 'generalMobilePrev', value)
	},
	changeSocialPreview (state, value) {
		this._vm.$set(state.currentPost, 'socialMobilePreview', value)
	},
	changeSchemaSettings (state, { schema, setting, value }) {
		this._vm.$set(state.currentPost.schema_type_options[schema], setting, value)
	},
	updateNotifications (state, payload) {
		if (payload.new.length && window.aioseoNotifications) {
			this._vm.$set(window.aioseoNotifications, 'newNotifications', payload.new.length)
		}
		this._vm.$set(state, 'notifications', payload)
	},
	toggleDismissedNotifications (state, payload) {
		this._vm.$set(state, 'showDismissedNotifications', payload)
	},
	setLicense (state, payload) {
		this._vm.$set(state, 'license', payload)
	},
	setHtaccessError (state, payload) {
		this._vm.$set(state, 'htaccessError', payload)
	},
	updateState (state, value) {
		this._vm.$set(state, 'currentPost', value)
	},
	updateBackups (state, backups) {
		this._vm.$set(state, 'backups', backups)
	},
	updatePostPermalinkPath (state, slug) {
		this._vm.$set(state.currentPost, 'permalinkPath', slug)
	},
	updatePostStatus (state, status) {
		this._vm.$set(state.currentPost, 'postStatus', status)
	},
	updateAdditionalPages (state, pages) {
		this._vm.$set(state.options.sitemap.general.additionalPages, 'pages', pages)
	},
	incrementInternalLinkCount (state) {
		const count = state.currentPost.options.linkFormat.internalLinkCount || 0
		this._vm.$set(state.currentPost.options.linkFormat, 'internalLinkCount', count + 1)
	},
	disableLinkAssistantEducation (state) {
		this._vm.$set(state.currentPost.options.linkFormat, 'linkAssistantDismissed', true)
	},
	// Network mutations.
	updateNetworkOption (state, { groups, key, value }) {
		let options = state.networkOptions
		groups.forEach(group => {
			options = options[group]
		})
		this._vm.$set(options, key, value)
	},
	updateInternalNetworkOption (state, { groups, key, value }) {
		let options = state.internalNetworkOptions
		groups.forEach(group => {
			options = options[group]
		})
		this._vm.$set(options, key, value)
	},
	updateNetworkBackups (state, { backups, siteId }) {
		this._vm.$set(state.networkBackups, siteId, backups)
	},
	updateNetworkData (state, { key, data }) {
		this._vm.$set(state.networkData, key, data)
	},
	updateNetworkRobots (state, rules) {
		this._vm.$set(state.networkRobots, 'rules', rules)
	},
	updateNetworkRobotsSite (state, siteId) {
		this._vm.$set(state.networkRobots, 'siteId', siteId)
	},
	setModalState (state, { modalName, value }) {
		this._vm.$set(state.modals, modalName, value)
	},
	setOpenAiData (state, { type, suggestions, usage }) {
		this._vm.$set(state.currentPost.open_ai[type], 'suggestions', suggestions)
		this._vm.$set(state.currentPost.open_ai[type], 'usage', usage)
	},
	setOpenAiError (state, error) {
		this._vm.$set(state, 'openAiError', error)
	},
	updateTitle (state, title) {
		this._vm.$set(state.currentPost, 'title', title)

		this._vm.$bus.$emit('updateTitleKey')
	},
	updateDescription (state, description) {
		this._vm.$set(state.currentPost, 'description', description)

		this._vm.$bus.$emit('updateDescriptionKey')
	}
}