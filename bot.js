const snoowrap = require('snoowrap');

const { filterSubmissionsFlair } = require('./functions');

/*

const fs = require('fs');

const {
  CLIENT_ID, CLIENT_SECRET,
  REDDIT_USER, REDDIT_PASS,
  MAIN_SUBREDDIT, XPOST_SUBREDDIT,
  FILTER_FLAIR
} = JSON.parse(fs.readFileSync('./secrets.json', 'utf8'));

const sr = new snoowrap({
  userAgent: "reddit-aws-xpost-bot",
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  username: REDDIT_USER,
  password: REDDIT_PASS
}); 

*/

const sr = new snoowrap({
  userAgent: "reddit-aws-xpost-bot",
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  username: process.env.REDDIT_USER,
  password: process.env.REDDIT_PASS
});

module.exports.getRawData = async () => {

  let data;
  try { data = await sr.getSubreddit(MAIN_SUBREDDIT).getTop('day') }
  catch (e) { throw `Failed to get initial data from reddit\n${e}` }

  return filterSubmissionsFlair(data, FILTER_FLAIR);
}

module.exports.submitXpost = async (post) => {

  const { title, url, author } = post;

  try {
    return await sr.getSubreddit('throwaway_media')
      .submitLink({
        title: `${title} (X-Post r/asmr, u/${author})`,
        url, resubmit: false
      });
  } catch (e) { throw `Failed to crosspost/submit link\n${e}\n${post}` }

}

/*
getRawData()
  .then(async (results) => {
    for (const res of results)
      await submitXpost(res)
  })
  .catch(error => {
    console.log(error)
  }) */