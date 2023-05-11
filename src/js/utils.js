export function slugify(text) {
	return text
		.toString()
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^\w-]+/g, '')
		.replace(/--+/g, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '');
}

export function formatDate(date) {
	return new Date(date).toLocaleDateString('en-UK', {
		timeZone: "UTC",
	})
}

export function formatBlogPosts(posts, {
	filterDrafts = true,
	filterFuturePosts = true,
	sortByDate = true,
	limit = undefined,
} = {}) {

	const filteredPosts = posts.reduce((acc, post) => {
		const { date, draft } = post.frontmatter;

		// if the post is a draft, return accumulated array
		if (filterDrafts && draft) return acc;

		// if the post date is greater than the current date, return acc array
		if (filterFuturePosts && new Date(date) > new Date()) return acc;

		// add post to the accumulated array
		acc.push(post)

		return acc;

	}, [])

	// posts sorted by date, 
	if (sortByDate) {
		filteredPosts.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
	} else {
		filteredPosts.sort(() => Math.random() - 0.5)
	}

	// limit posts by number
	if (typeof limit === "number") {
		return filteredPosts.slice(0, limit);
	}
	return filteredPosts;

};