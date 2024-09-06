import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"; // Correct import for Grid2
import MarqueeCarousel from "../components/marqueeCarousel";

const Home: React.FC = () => {
  return (
    <Grid
      container
      columns={{ lg: 12, sm: 6, xs: 3 }}
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
    >
      {/* Title Section */}
      <Grid size={12}>
        <Typography variant="h1" gutterBottom sx={{ mb: 0, lineHeight: 1.1 }}>
          Welcome to the Game Library
        </Typography>
      </Grid>

      {/* Subtitle Section */}
      <Grid size={8}>
        <Typography
          align="center"
          variant="h4"
          color="primary"
          sx={{ mt: 0, mb: 0.5 }}
        >
          A project showcasing Material UI components and games
        </Typography>
      </Grid>

      {/* Theme Info */}
      <Grid size={{ lg: 4, md: 12 }}>
        <Typography
          align="center"
          variant="h6"
          color="secondary"
          sx={{ mt: 0, mb: 0.5 }}
        >
          With Dracula Theme!
        </Typography>
      </Grid>

      {/* Carousel Section */}
      <Grid size={12}>
        <Box mt={2}>
          <Typography variant="h5" align="center" gutterBottom>
            This is a Marquee Carousel. It has boxes and circular progress!
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          <MarqueeCarousel />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;
