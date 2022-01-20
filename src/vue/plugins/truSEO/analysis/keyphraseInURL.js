import includes from 'lodash/includes'
import { __ } from '@wordpress/i18n'
import { cleanForSlug } from '@/vue/utils/cleanForSlug'
const td = process.env.VUE_APP_TEXTDOMAIN

const scores = {
	noMatches : 1,
	matches   : 5
}

function keyphraseInURL (url, keyphrase) {
	if (!url) {
		return {}
	}

	const permalink = url.replace(/\s/g, '-')
	const keyphraseLower = cleanForSlug(keyphrase)
	const hasKeyword = includes(permalink, keyphraseLower)

	if (hasKeyword) {
		return {
			title       : __('Focus keyphrase in URL', td),
			description : __('Focus keyphrase used in the URL.', td),
			score       : scores.matches,
			maxScore    : scores.matches,
			error       : 0
		}
	}

	return {
		title       : __('Focus keyphrase in URL', td),
		description : __('Focus keyphrase not found in the URL.', td),
		score       : scores.noMatches,
		maxScore    : scores.matches,
		error       : 1
	}
}

export default keyphraseInURL