const BASE_URL = 'https://api.jikan.moe/v4';

// Helper to delay requests to respect Jikan API rate limits (3 requests per second)
const delay = (ms) => new Promise(res => setTimeout(res, ms));

export const fetchTrendingAnime = async () => {
    try {
        const response = await fetch(`${BASE_URL}/top/anime?filter=bypopularity&limit=12`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching trending anime:", error);
        return [];
    }
};

export const searchAnime = async (query) => {
    try {
        const response = await fetch(`${BASE_URL}/anime?q=${encodeURIComponent(query)}&limit=12`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error searching anime:", error);
        return [];
    }
};

export const getAnimeDetails = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/anime/${id}/full`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching anime details:", error);
        return null;
    }
};
