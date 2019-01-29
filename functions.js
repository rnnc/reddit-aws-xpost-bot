module.exports.filterSubmissionsFlair = (submissions, flair) => {

  const filtered = submissions.filter(sub =>
    (sub.link_flair_text.toLowerCase() === flair));

  return filtered.map(sub => dataReducer(sub, flair))
}


function dataReducer(submission, filter_flair) {

  const {
    selftext, subreddit, author, title, id,
    link_flair_text, downs, ups, score, url
  } = submission;

  return {
    title: removeTitleFlairs(title, filter_flair),
    id, selftext, url, score,
    ups, downs, link_flair_text,
    author: author.name,
    subreddit: subreddit.display_name
  }

}


function removeTitleFlairs(title, filter_flair) {
  return title.replace(`[${filter_flair.toUpperCase()}]`, '')
    .replace(`[${filter_flair.toLowerCase()}]`, '').trim();
}
