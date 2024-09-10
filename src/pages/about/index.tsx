import { Box, Button, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"; // Correct import for Grid2
import MarqueeCarousel from "../components/marqueeCarousel";
import { useRouter } from "next/router";

const Home: React.FC = () => {
  const router = useRouter();
  return (
    <Grid
      container
      columns={{ lg: 12, sm: 6, xs: 3 }}
      justifyContent="center"
      alignItems="center"
      spacing={4} // Adjusted for better spacing between sections
      sx={{ minHeight: "100vh", textAlign: "center" }} // Vertically center everything
    >
      {/* Title Section */}
      <Grid size={12}>
        <Typography
          variant="h1"
          gutterBottom
          sx={{ mb: 2, lineHeight: 1.2, fontWeight: "bold" }}
        >
          Welcome to the Game Library
        </Typography>
      </Grid>

      {/* Subtitle and Theme Info Section */}
      <Grid size={{ md: 10, lg: 8 }}>
        <Typography
          variant="h4"
          color="primary"
          sx={{ mt: 0, mb: 0.5, lineHeight: 1.3 }}
        >
          A project showcasing Material UI components and games
        </Typography>
        <Typography variant="h6" color="secondary" sx={{ mt: 0 }}>
          With Dracula Theme!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => router.push("/home")}
        >
          Get Started
        </Button>
      </Grid>

      {/* Carousel Section */}
      <Grid size={12}>
        <Tooltip title="This is a Marquee Carousel. It is not part of Material UI. I complicated things. But! It has boxes and circular progress! That is Material UI.">
          <Box display="flex" justifyContent="center" mt={3}>
            <MarqueeCarousel />
          </Box>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default Home;
