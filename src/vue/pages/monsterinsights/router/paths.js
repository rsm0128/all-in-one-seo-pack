import { __ } from '@wordpress/i18n'

const td       = import.meta.env.VITE_TEXTDOMAIN
const loadView = view => {
	return () => import(`../views/${view}.vue`)
}

export default [
	{
		path     : '*',
		redirect : '/'
	},
	{
		path      : '/',
		name      : 'monsterinsights',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_manage_seo',
			name   : __('Analytics', td)
		}
	}
]