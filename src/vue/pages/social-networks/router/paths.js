import { __ } from '@wordpress/i18n'

const td       = import.meta.env.VITE_TEXTDOMAIN
const loadView = view => {
	return () => import(`../views/${view}.vue`)
}

export default [
	{
		path     : '*',
		redirect : '/social-profiles'
	},
	{
		path      : '/social-profiles',
		name      : 'social-profiles',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_social_networks_settings',
			name   : __('Social Profiles', td)
		}
	},
	{
		path      : '/facebook',
		name      : 'facebook',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_social_networks_settings',
			name   : __('Facebook', td)
		}
	},
	{
		path      : '/twitter',
		name      : 'twitter',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_social_networks_settings',
			name   : __('Twitter', td)
		}
	},
	{
		path      : '/pinterest',
		name      : 'pinterest',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_social_networks_settings',
			name   : __('Pinterest', td)
		}
	}
]