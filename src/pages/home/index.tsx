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
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid2";
import { getGames } from "../api/rawg";
import Layout from "../components/Layout"; // Make sure this is correct

const MainPage: React.FC<{ toggleTheme: () => void }> = ({ toggleTheme }) => {
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
    router.push(`/game/${gameId}`);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <Layout toggleTheme={toggleTheme}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          "&.MuiTypography-root": {
            fontWeight: "bold",
          },
        }}
      >
        Welcome to the Game Library
      </Typography>
      <Typography sx={{ mb: 4 }}>
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
                  sx={{
                    borderRadius: 2,
                    [`& .MuiSkeleton-rect`]: {
                      borderRadius: "8px",
                    },
                  }}
                />
              </Grid>
            ))
          : games.map((game) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                key={game.id}
                onClick={() => handleCardClick(game.id)}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.02)",
                    transition: "transform 0.3s ease-in-out",
                  },
                }}
              >
                <Tooltip title="View Game Details" arrow>
                  <Card
                    sx={{
                      height: "350px",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "8px",
                      boxShadow: 3,
                      "& .MuiCardContent-root": {
                        flexGrow: 1,
                      },
                      "&:hover": {
                        boxShadow: 5,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt={game.name}
                      image={game.background_image}
                      sx={{
                        height: "200px",
                        objectFit: "cover",
                        borderTopLeftRadius: "8px",
                        borderTopRightRadius: "8px",
                      }}
                    />
                    <CardContent>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{
                          fontWeight: "bold",
                          mb: 1,
                        }}
                      >
                        {game.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ mb: 1 }}
                      >
                        Release Date: {game.released}
                      </Typography>

                      {/* Genre Chips */}
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 0.5,
                          mt: 1,
                          "& .MuiChip-root": {
                            borderRadius: "4px",
                          },
                        }}
                      >
                        {game.genres.map((genre: any) => (
                          <Chip
                            key={genre.id}
                            label={genre.name}
                            size="small"
                          />
                        ))}
                      </Box>

                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ mt: 1, display: "flex", alignItems: "center" }}
                      >
                        <Rating
                          name="read-only"
                          value={game.rating}
                          precision={0.5}
                          readOnly
                          sx={{ mr: 1 }}
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
      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "center",
          "& .MuiPagination-root": {
            "& .MuiPaginationItem-root": {
              borderRadius: "50%",
              "&:hover": {
                backgroundColor: "primary.light",
              },
            },
          },
        }}
      >
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
