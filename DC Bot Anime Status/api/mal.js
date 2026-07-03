import malScraper from 'mal-scraper';

export default async function handler(req, res) {
  // 6 hour cache (21600 seconds)
  // s-maxage tells Vercel Edge Network to cache it for 6 hours
  // stale-while-revalidate tells Vercel to serve stale content while fetching new data in the background
  res.setHeader('Cache-Control', 'public, s-maxage=21600, stale-while-revalidate=86400');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { action, q, name } = req.query;

  try {
    if (action === 'search' && q) {
      const results = await malScraper.getResultsFromSearch(q);
      const mapped = results.map(item => ({
        id: item.id,
        title: item.name,
        image: item.image_url.replace('/r/116x180', ''), // get high-res
        score: item.payload?.score || 'N/A',
        status: item.payload?.status || 'Unknown',
        type: item.payload?.media_type || 'Unknown'
      }));
      return res.status(200).json(mapped);
    } 
    
    if (action === 'top') {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      let season = 'winter';
      if (month >= 4 && month <= 6) season = 'spring';
      else if (month >= 7 && month <= 9) season = 'summer';
      else if (month >= 10 && month <= 12) season = 'fall';

      const results = await malScraper.getSeason(year, season);
      const mapped = (results.TV || []).map(item => ({
        title: item.title,
        image: item.picture,
        score: item.score || 'N/A',
        synopsis: item.synopsis || '',
        genres: item.genres || []
      }));
      return res.status(200).json(mapped);
    }

    if (action === 'info' && name) {
      const info = await malScraper.getInfoFromName(name);
      return res.status(200).json(info);
    }

    return res.status(400).json({ error: 'Invalid action or missing parameters' });
  } catch (error) {
    console.error('MAL Scraper Error:', error);
    return res.status(500).json({ error: 'Failed to fetch data from MyAnimeList' });
  }
}
