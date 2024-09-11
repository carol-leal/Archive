import React, { useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  Toolbar,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  alpha,
  InputBase,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";

const drawerWidth = 240;

const Layout: React.FC<{
  children: React.ReactNode;
  toggleTheme: () => void;
}> = ({ children, toggleTheme }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Search Query:", searchQuery); // Placeholder for querying the search
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
          <ListItem component="button" key={genre}>
            <ListItemText primary={genre} />
          </ListItem>
        ))}
        <Divider />
        <Typography variant="h6" sx={{ pl: 2, pt: 2 }}>
          Platforms
        </Typography>
        {["PC", "PlayStation", "Xbox", "Nintendo Switch"].map((platform) => (
          <ListItem component="button" key={platform}>
            <ListItemText primary={platform} />
          </ListItem>
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

          {/* Search Bar */}
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

          {/* Theme Toggle Button */}
          <IconButton color="inherit" onClick={toggleTheme}>
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>

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

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
