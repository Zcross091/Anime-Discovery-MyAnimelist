const https = require('https');
https.request('https://anime-activity.vercel.app/', { method: 'HEAD' }, (res) => {
  console.log(JSON.stringify(res.headers, null, 2));
}).end();
