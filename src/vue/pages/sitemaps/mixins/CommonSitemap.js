export const CommonSitemap = {
	methods : {
		validateLinksPerIndex (event) {
			if (1 > event.target.value) {
				event.target.value = 1
			}
			if (50000 < event.target.value) {
				event.target.value = 50000
			}
		}
	}
}