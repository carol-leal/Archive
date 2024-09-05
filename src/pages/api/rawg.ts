//Connect with Rawg API
const apiKey = process.env.NEXT_PUBLIC_RAWG;
const baseUrl = "https://api.rawg.io/api/";

export async function getGames() {
  const res = await fetch(`${baseUrl}games?key=${apiKey}`);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
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

export async function getGame(id: string) {
  const res = await fetch(`${baseUrl}games/${id}?key=${apiKey}`);
  const data = await res.json();
  return data;
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
