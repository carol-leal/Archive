// pages/api/games.ts

import type { NextApiRequest, NextApiResponse } from "next";

const apiKey = process.env.NEXT_PUBLIC_RAWG;
const baseUrl = "https://api.rawg.io/api/";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page = 1 } = req.query; // Extract page from query parameters

  try {
    const response = await fetch(`${baseUrl}games?key=${apiKey}&page=${page}`);

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ message: "Failed to fetch data from RAWG API" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
