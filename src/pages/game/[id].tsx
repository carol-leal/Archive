// pages/game/[id].tsx

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Chip,
  Rating,
} from "@mui/material";
import { useRouter } from "next/router";
import { getGame } from "../api/rawg";
import Layout from "../components/Layout";

const GameDetail: React.FC = () => {
  const [game, setGame] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query; // Get the game ID from the URL

  useEffect(() => {
    async function fetchGameDetails() {
      if (id) {
        const gameData = await getGame(id as string); // Fetch game details using the ID
        setGame(gameData);
        setLoading(false);
      }
    }
    fetchGameDetails();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Layout>
      {game ? (
        <Card
          sx={{
            maxWidth: "900px",
            mx: "auto",
            backgroundColor: "#ffffff",
            boxShadow: 3,
            borderRadius: 3,
          }}
        >
          <CardMedia
            component="img"
            alt={game.name}
            height="400"
            image={game.background_image}
            sx={{ objectFit: "cover", borderRadius: 2 }}
          />
          <CardContent>
            <Typography variant="h3" sx={{ mb: 2, fontWeight: "bold" }}>
              {game.name}
            </Typography>

            <Typography variant="body1" sx={{ mb: 3 }}>
              {game.description_raw}
            </Typography>

            {/* Genre Chips */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
              {game.genres.map((genre: any) => (
                <Chip key={genre.id} label={genre.name} size="medium" />
              ))}
            </Box>

            {/* Game Ratings */}
            <Box sx={{ mt: 2 }}>
              <Rating
                name="game-rating"
                value={game.rating}
                precision={0.5}
                readOnly
              />
              <Typography variant="body2" color="textSecondary">
                {game.ratings_count} reviews
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ mt: 2 }}>
              Released: {game.released}
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Developers:{" "}
              {game.developers.map((dev: any) => dev.name).join(", ")}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography>No game data found.</Typography>
      )}
    </Layout>
  );
};

export default GameDetail;
