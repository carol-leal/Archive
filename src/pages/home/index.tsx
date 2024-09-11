import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Pagination,
  Skeleton,
  Tooltip,
  Rating,
  Chip,
} from "@mui/material";
import { useRouter } from "next/router"; // Use Next.js router for navigation
import Grid from "@mui/material/Grid2";
import { getGames } from "../api/rawg";
import Layout from "../components/Layout"; // Import reusable Layout component

const MainPage: React.FC = () => {
  const [games, setGames] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    async function fetchGames() {
      setLoading(true);
      const data = await getGames(page);
      if (data && data.results) {
        setGames(data.results);
        setTotalPages(Math.ceil(data.count / 20));
      }
      setLoading(false);
    }
    fetchGames();
  }, [page]);

  const handleCardClick = (gameId: string) => {
    router.push(`/game/${gameId}`); // Navigate to the detailed page for the clicked game
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Welcome to the Game Library
      </Typography>
      <Typography>
        Explore the best games, genres, and platforms available today. Search
        for your favorite games using the search bar, or navigate through
        different categories using the drawer.
      </Typography>

      {/* Grid Layout for Game Cards */}
      <Grid container spacing={4}>
        {loading
          ? Array.from(new Array(8)).map((_, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={350}
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
            ))
          : games.map((game) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                key={game.id}
                onClick={() => handleCardClick(game.id)} // Add click event to navigate to the game details page
                sx={{ cursor: "pointer" }} // Add pointer cursor for clickability
              >
                <Tooltip title="Card" arrow>
                  <Card
                    sx={{
                      height: "350px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt={game.name}
                      image={game.background_image}
                      sx={{
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {game.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Release Date: {game.released}
                      </Typography>

                      {/* Genre Chips */}
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 0.5,
                          mt: 1,
                        }}
                      >
                        {game.genres.map((genre: any) => (
                          <Chip
                            key={genre.id}
                            label={genre.name}
                            size="small"
                            sx={{ mr: 0.5 }}
                          />
                        ))}
                      </Box>

                      <Typography variant="body2" color="textSecondary">
                        <Rating
                          name="read-only"
                          value={game.rating}
                          precision={0.5}
                          readOnly
                          sx={{ mt: 1 }}
                        />
                        {game.ratings_count} reviews
                      </Typography>
                    </CardContent>
                  </Card>
                </Tooltip>
              </Grid>
            ))}
      </Grid>

      {/* Pagination Component */}
      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Layout>
  );
};

export default MainPage;
