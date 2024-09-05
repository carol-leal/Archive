import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import styles from "./MarqueeCarousel.module.css"; // Use CSS Module
import { getGamesImages } from "../api/rawg";

interface Game {
  id: number;
  name: string;
  background_image: string;
}

const MarqueeCarousel: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchGames() {
      try {
        const gameData = await getGamesImages(1, 20);
        setGames(gameData);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, []);

  const duplicatedGames = [...games, ...games]; // Duplicate games for carousel effect

  return (
    <Box sx={{ overflow: "hidden", width: "100%", position: "relative" }}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box className={styles.carousel}>
          {duplicatedGames.map((game) => (
            <Box key={game.id} className={styles.carouselItem}>
              <Box
                component="img"
                src={game.background_image}
                alt={game.name}
                sx={{
                  height: "200px", // Set height for consistency
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
                onClick={() => alert(`Clicked on game: ${game.name}`)}
              />
              <Typography sx={{ textAlign: "center", color: "#fff" }}>
                {game.name}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default MarqueeCarousel;
