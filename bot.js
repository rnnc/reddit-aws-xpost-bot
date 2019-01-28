const snoowrap = require('snoowrap');
const fs = require('fs');

const {
  CLIENT_ID,
  CLIENT_SECRET,
  REDDIT_USER,
  REDDIT_PASS,
  MAIN_SUBREDDIT,
  XPOST_SUBREDDIT,
  FILTER_FLAIR
} = JSON.parse(fs.readFileSync('./secrets.json', 'utf8'), null, 2);

const sr = new snoowrap({
  userAgent: "AWS Lambda based xpost bot",
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  username: REDDIT_USER,
  password: REDDIT_PASS
});

sr.getSubreddit(MAIN_SUBREDDIT).getTop()
