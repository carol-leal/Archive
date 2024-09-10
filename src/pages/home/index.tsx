import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  InputBase,
  Divider,
  Button,
  alpha,
  Card,
  CardContent,
  CardMedia,
  Pagination,
  Skeleton,
  Tooltip,
  Rating,
  Chip, // Import Chip component
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid2";
import { getGames } from "../api/rawg";

const drawerWidth = 240;

const MainPage: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Search Query:", searchQuery);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const drawer = (
    <Box>
      <Toolbar />
      <Divider />
      <List>
        <Typography variant="h6" sx={{ pl: 2 }}>
          Genres
        </Typography>
        {["Action", "RPG", "Strategy", "Shooter", "Adventure"].map((genre) => (
          <Tooltip title="ListItem" key={genre}>
            <ListItem component="button">
              <ListItemText primary={genre} />
            </ListItem>
          </Tooltip>
        ))}
        <Divider />
        <Typography variant="h6" sx={{ pl: 2, pt: 2 }}>
          Platforms
        </Typography>
        {["PC", "PlayStation", "Xbox", "Nintendo Switch"].map((platform) => (
          <Tooltip title="ListItem" key={platform}>
            <ListItem component="button">
              <ListItemText primary={platform} />
            </ListItem>
          </Tooltip>
        ))}
        <Divider />
        <Typography variant="h6" sx={{ pl: 2, pt: 2 }}>
          Other Links
        </Typography>
        {["Popular Games", "Top-rated Games", "Upcoming Games"].map((link) => (
          <Tooltip title="ListItem" key={link}>
            <ListItem component="button">
              <ListItemText primary={link} />
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={(theme) => ({
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: theme.palette.secondary.main,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Game Library
          </Typography>

          <Box
            component="form"
            onSubmit={handleSearchSubmit}
            sx={(theme) => ({
              position: "relative",
              borderRadius: theme.shape.borderRadius,
              backgroundColor: alpha(theme.palette.common.white, 0.15),
              "&:hover": {
                backgroundColor: alpha(theme.palette.common.white, 0.25),
              },
              mr: 2,
              ml: 3,
              width: "auto",
              display: "flex",
              alignItems: "center",
            })}
          >
            <Box
              sx={(theme) => ({
                position: "absolute",
                padding: theme.spacing(0, 2),
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              })}
            >
              <SearchIcon />
            </Box>
            <InputBase
              placeholder="Search games…"
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={handleSearchChange}
              sx={(theme) => ({
                color: "inherit",
                pl: `calc(1em + ${theme.spacing(4)})`,
                width: "100%",
                [theme.breakpoints.up("sm")]: {
                  width: "20ch",
                  "&:focus": {
                    width: "30ch",
                  },
                },
              })}
            />
          </Box>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button color="inherit" onClick={() => router.push("/about")}>
              About
            </Button>
            <Button color="inherit" onClick={() => router.push("/home")}>
              Games
            </Button>
            <Button color="inherit" onClick={() => router.push("/genres")}>
              Genres
            </Button>
            <Button color="inherit" onClick={() => router.push("/platforms")}>
              Platforms
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
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
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={game.id}>
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

                        <Rating
                          name="read-only"
                          value={game.rating}
                          precision={0.5}
                          readOnly
                          sx={{ mt: 1 }}
                        />
                        <Typography variant="body2" color="textSecondary">
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
      </Box>
    </Box>
  );
};

export default MainPage;
