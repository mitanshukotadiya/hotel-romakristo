const https = require('https');
const fs = require('fs');
const path = require('path');

const ids = [
  'DXWgOX1jHg8',
  'DXE0hy9CEzJ',
  'DWqxsC9iP_g',
  'DVqereFjrkX',
  'DTksAZBEUxT',
  'DTX0n38DOGB',
  'DTNgXNPkqHq',
  'DSpvB57Enmt',
  'DXb9vSUDIza',
  'DW9B1sLlOrB',
  'DWgno49ALnV'
];

async function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'WhatsApp/2.21.12.21 A' } }, (res) => {
      // Handle redirects (often Instagram redirects to a login page if no auth, but WhatsApp user-agent sometimes bypasses for opengraph)
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, { headers: { 'User-Agent': 'WhatsApp/2.21.12.21 A' } }, (res2) => {
          let data = '';
          res2.on('data', chunk => data += chunk);
          res2.on('end', () => resolve(data));
        }).on('error', reject);
        return;
      }

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const id of ids) {
    console.log(`Fetching ${id}...`);
    try {
      const html = await fetchHtml(`https://www.instagram.com/p/${id}/`);
      
      const imgMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
      if (imgMatch) {
        let imgUrl = imgMatch[1].replace(/&amp;/g, '&');
        const imgPath = path.join(__dirname, 'public', 'images', `${id}.jpg`);
        await downloadFile(imgUrl, imgPath);
        console.log(`Saved image for ${id}`);
      }

      const vidMatch = html.match(/<meta property="og:video:secure_url" content="([^"]+)"/);
      if (vidMatch) {
        let vidUrl = vidMatch[1].replace(/&amp;/g, '&');
        const vidDir = path.join(__dirname, 'public', 'videos');
        if (!fs.existsSync(vidDir)) fs.mkdirSync(vidDir);
        const vidPath = path.join(vidDir, `${id}.mp4`);
        await downloadFile(vidUrl, vidPath);
        console.log(`Saved video for ${id}`);
      }
      
      // Delay to avoid rate limits
      await new Promise(r => setTimeout(r, 1000));
    } catch (err) {
      console.error(`Error processing ${id}:`, err);
    }
  }
}

run();
