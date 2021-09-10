import { isBlockEditor } from '@/vue/plugins/truSEO/components'
import { __ } from '@wordpress/i18n'

(function (wp) {
	const td = process.env.VUE_APP_TEXTDOMAIN
	if (!isBlockEditor()) {
		return
	}
	const registerPlugin = wp.plugins.registerPlugin
	const PluginSidebarMoreMenuItem = wp.editPost.PluginSidebarMoreMenuItem
	const PluginSidebar = wp.editPost.PluginSidebar
	const Fragment = wp.element.Fragment
	const el = wp.element.createElement
	const analysisCapability = window.aioseo.user.capabilities.aioseo_page_analysis
	const score = window.aioseo.currentPost.seo_score
	const naString = __('N/A', td)
	const scoreClass = function (score) {
		if (!analysisCapability) {
			return 'score-disabled'
		}
		return 80 < score ? 'score-green' : 50 < score ? 'score-orange' : 1 < score  ? 'score-red' : 'score-disabled'
	}
	const AIOSEOicon = el('svg',
		{
			width   : 20,
			height  : 20,
			viewBox : '0 0 20 20',
			xmlns   : 'http://www.w3.org/2000/svg'
		},
		el('path',
			{
				d        : 'M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47716 0 0 4.47715 0 10C0 15.5228 4.47716 20 10 20ZM8.40767 3.65998C8.27222 3.45353 8.02129 3.357 7.79121 3.43828C7.52913 3.53087 7.27279 3.63976 7.02373 3.76429C6.80511 3.87361 6.69542 4.12332 6.74355 4.36686L6.91501 5.23457C6.95914 5.45792 6.86801 5.68459 6.69498 5.82859C6.42152 6.05617 6.16906 6.31347 5.94287 6.59826C5.80229 6.77526 5.58046 6.86908 5.36142 6.82484L4.51082 6.653C4.27186 6.60473 4.02744 6.71767 3.92115 6.94133C3.86111 7.06769 3.80444 7.19669 3.75129 7.32826C3.69815 7.45983 3.64929 7.59212 3.60464 7.72495C3.52562 7.96007 3.62107 8.21596 3.82396 8.35351L4.54621 8.84316C4.73219 8.96925 4.82481 9.19531 4.80234 9.42199C4.7662 9.78671 4.76767 10.1508 4.80457 10.5089C4.82791 10.7355 4.73605 10.9619 4.55052 11.0886L3.82966 11.5811C3.62734 11.7193 3.53274 11.9753 3.61239 12.2101C3.70314 12.4775 3.80985 12.7391 3.93188 12.9932C4.03901 13.2163 4.28373 13.3282 4.5224 13.2791L5.37279 13.1042C5.59165 13.0591 5.8138 13.1521 5.95491 13.3287C6.17794 13.6077 6.43009 13.8653 6.70918 14.0961C6.88264 14.2396 6.97459 14.4659 6.93122 14.6894L6.76282 15.5574C6.71551 15.8013 6.8262 16.0507 7.04538 16.1591C7.16921 16.2204 7.29563 16.2782 7.42457 16.3324C7.55352 16.3867 7.68316 16.4365 7.81334 16.4821C8.19418 16.6154 8.72721 16.1383 9.1213 15.7855C9.31563 15.6116 9.4355 15.3654 9.43677 15.1018C9.43677 15.1004 9.43678 15.099 9.43678 15.0976L9.43677 13.6462C9.43677 13.6308 9.43736 13.6155 9.43852 13.6004C8.27454 13.3165 7.40918 12.248 7.40918 10.9732V9.43198C7.40918 9.31483 7.50224 9.21986 7.61706 9.21986H8.338V7.70343C8.338 7.49405 8.50433 7.32432 8.70952 7.32432C8.9147 7.32432 9.08105 7.49405 9.08105 7.70343V9.21986H11.0316V7.70343C11.0316 7.49405 11.1979 7.32432 11.4031 7.32432C11.6083 7.32432 11.7746 7.49405 11.7746 7.70343V9.21986H12.4956C12.6104 9.21986 12.7034 9.31483 12.7034 9.43198V10.9732C12.7034 12.2883 11.7825 13.3838 10.5628 13.625C10.5631 13.632 10.5632 13.6391 10.5632 13.6462L10.5632 15.0914C10.5632 15.36 10.6867 15.6107 10.8868 15.7853C11.2879 16.1351 11.8302 16.6079 12.2088 16.4742C12.4708 16.3816 12.7272 16.2727 12.9762 16.1482C13.1949 16.0389 13.3046 15.7891 13.2564 15.5456L13.085 14.6779C13.0408 14.4545 13.132 14.2278 13.305 14.0838C13.5785 13.8563 13.8309 13.599 14.0571 13.3142C14.1977 13.1372 14.4195 13.0434 14.6385 13.0876L15.4892 13.2595C15.7281 13.3077 15.9725 13.1948 16.0788 12.9711C16.1389 12.8448 16.1955 12.7158 16.2487 12.5842C16.3018 12.4526 16.3507 12.3204 16.3953 12.1875C16.4744 11.9524 16.3789 11.6965 16.176 11.559L15.4537 11.0693C15.2678 10.9432 15.1752 10.7171 15.1976 10.4905C15.2338 10.1258 15.2323 9.76167 15.1954 9.40357C15.1721 9.17699 15.2639 8.95062 15.4495 8.82387L16.1703 8.33141C16.3726 8.1932 16.4672 7.93715 16.3876 7.70238C16.2968 7.43495 16.1901 7.17337 16.0681 6.91924C15.961 6.69615 15.7162 6.58422 15.4776 6.63333L14.6272 6.8083C14.4083 6.85333 14.1862 6.76033 14.0451 6.58377C13.822 6.30474 13.5699 6.04713 13.2908 5.81632C13.1173 5.67287 13.0254 5.44652 13.0688 5.22301L13.2372 4.35503C13.2845 4.11121 13.1738 3.86179 12.9546 3.75334C12.8308 3.69208 12.7043 3.63424 12.5754 3.58002C12.4465 3.52579 12.3168 3.47593 12.1866 3.43037C11.9562 3.34974 11.7055 3.44713 11.5707 3.65416L11.0908 4.39115C10.9672 4.58093 10.7457 4.67543 10.5235 4.65251C10.1661 4.61563 9.80932 4.61712 9.45837 4.65477C9.23633 4.6786 9.01448 4.58486 8.89027 4.39554L8.40767 3.65998Z',
				fillRule : 'evenodd',
				clipRule : 'evenodd'
			}
		)
	)
	const AIOSEOButton = el('div',
		{ id: 'aioseo-post-settings-sidebar-button', className: scoreClass(score) },
		AIOSEOicon,
		el('span',
			{ id: 'aioseo-post-score-disabled' },
			naString
		),
		el('span',
			{ id: 'aioseo-post-score' },
			score
		),
		el('span',
			{},
			'/100'
		)
	)
	const user = window.aioseo.user

	registerPlugin('aioseo-post-settings-sidebar', {
		render : function () {
			if (!user.capabilities.aioseo_page_analysis && !user.capabilities.aioseo_page_general_settings && !user.capabilities.aioseo_page_social_settings && !user.capabilities.aioseo_page_schema_settings && !user.capabilities.aioseo_page_advanced_settings) {
				return null
			}
			return el(Fragment, {},
				el(PluginSidebarMoreMenuItem,
					{
						target : 'aioseo-post-settings-sidebar',
						icon   : AIOSEOicon
					},
					'AIOSEO'
				),
				el(PluginSidebar,
					{
						name  : 'aioseo-post-settings-sidebar',
						icon  : AIOSEOButton,
						title : 'AIOSEO'
					},
					el('div',
						{ id: 'aioseo-post-settings-sidebar', className: 'aioseo-post-settings-sidebar' },
						el('div',
							{ id: 'aioseo-post-settings-sidebar-vue', className: 'aioseo-post-settings-sidebar-vue' },
							el('div',
								{ className: 'aioseo-loading-spinner dark' },
								el('div',
									{ className: 'double-bounce1' },
									null
								),
								el('div',
									{ className: 'double-bounce2' },
									null
								)
							)
						)
					)
				)
			)
		}
	})
})(window.wp)