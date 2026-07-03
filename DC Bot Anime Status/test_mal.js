import malScraper from 'mal-scraper';

async function test() {
  const top = await malScraper.getSeason(2024, 'winter');
  console.log("TOP ANIME [0]:", JSON.stringify(top.TV[0], null, 2));

  const search = await malScraper.getResultsFromSearch('naruto');
  console.log("SEARCH [0]:", JSON.stringify(search[0], null, 2));
}

test();
