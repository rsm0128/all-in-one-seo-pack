export const escapeRegex = (string) => {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}