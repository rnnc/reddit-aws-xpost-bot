'use strict';

const { getRawData, submitXpost } = require('./bot');

module.exports.botRun = async () => {

  try {

    const rData = await getRawData();

    if (Array.isArray(rData) && rData.length > 0) {
      for (const post of rData) {
        try {
          const posted = await submitXpost(post)
        } catch (e) { console.log(`Failed to post\n${JSON.stringify(post, null, 2)}`) }
      }
    } else console.log('Ran at schedule :: No UASMR posts');

  } catch (error) { console.log(error) }
};
