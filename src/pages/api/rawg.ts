//Connect with Rawg API
const apiKey = process.env.NEXT_PUBLIC_RAWG;
const baseUrl = "https://api.rawg.io/api/";

export async function getGames(page = 1) {
  try {
    const res = await fetch(`/api/games?page=${page}`);

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch games:", (error as Error).message);
    return null;
  }
}

export async function getGamesImages(page: number = 1, pageSize: number = 20) {
  const res = await fetch(
    `${baseUrl}games?key=${apiKey}&page=${page}&page_size=${pageSize}`
  );
  try {
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("Failed to fetch games: ", error);
  }
}

// Helper function to fetch and handle JSON safely
async function fetchData(url: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Error: ${res.status} - ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Return null or handle the error appropriately
  }
}

// Fetch game details
export async function getGame(id: string) {
  const url = `${baseUrl}games/${id}?key=${apiKey}`;
  return await fetchData(url);
}

// Fetch game screenshots
export async function getGameScreenshots(id: string) {
  const url = `${baseUrl}games/${id}/screenshots?key=${apiKey}`;
  return await fetchData(url);
}

// Fetch game achievements
export async function getGameAchievements(id: string) {
  const url = `${baseUrl}games/${id}/achievements?key=${apiKey}`;
  return await fetchData(url);
}

// Fetch Reddit posts about the game
export async function getGameRedditPosts(id: string) {
  const url = `${baseUrl}games/${id}/reddit?key=${apiKey}`;
  return await fetchData(url);
}

export async function getDevelopers() {
  const res = await fetch(`${baseUrl}developers?key=${apiKey}`);
  const data = await res.json();
  return data;
}

export async function getDeveloper(id: string) {
  const res = await fetch(`${baseUrl}developers/${id}?key=${apiKey}`);
  const data = await res.json();
  return data;
}

export async function getPublishers() {
  const res = await fetch(`${baseUrl}publishers?key=${apiKey}`);
  const data = await res.json();
  return data;
}

export async function getPublisher(id: string) {
  const res = await fetch(`${baseUrl}publishers/${id}?key=${apiKey}`);
  const data = await res.json();
  return data;
}

export async function getCreators() {
  const res = await fetch(`${baseUrl}creators?key=${apiKey}`);
  const data = await res.json();
  return data;
}

export async function getPlatforms() {
  const res = await fetch(`${baseUrl}platforms?key=${apiKey}`);
  const data = await res.json();
  return data;
}

export async function getPlatform(id: string) {
  const res = await fetch(`${baseUrl}platforms/${id}?key=${apiKey}`);
  const data = await res.json();
  return data;
}

export async function getGenres() {
  const res = await fetch(`${baseUrl}genres?key=${apiKey}`);
  const data = await res.json();
  return data;
}

export async function getStores() {
  const res = await fetch(`${baseUrl}stores?key=${apiKey}`);
  const data = await res.json();
  return data;
}

export async function getTags() {
  const res = await fetch(`${baseUrl}tags?key=${apiKey}`);
  const data = await res.json();
  return data;
}
