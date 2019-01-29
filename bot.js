const snoowrap = require('snoowrap');

const { filterSubmissionsFlair } = require('./functions');

const sr = new snoowrap({
  userAgent: "reddit-aws-xpost-bot",
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  username: process.env.REDDIT_USER,
  password: process.env.REDDIT_PASS
});

const { MAIN_SUBREDDIT, XPOST_SUBREDDIT, FILTER_FLAIR } = process.env;

module.exports.getRawData = async () => {

  let data;
  try { data = await sr.getSubreddit(MAIN_SUBREDDIT).getTop('day') }
  catch (e) { throw `Failed to get initial data from reddit\n${e}` }

  return filterSubmissionsFlair(data, FILTER_FLAIR);
}

module.exports.submitXpost = async (post) => {

  const { title, url, author } = post;

  try {
    return await sr.getSubreddit(XPOST_SUBREDDIT)
      .submitLink({
        title: `${title} (X-Post r/asmr, u/${author})`,
        url, resubmit: false
      });
  } catch (e) { throw `Failed to crosspost/submit link\n${e}\n${post}` }

}
