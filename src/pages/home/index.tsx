import { Button, Card, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { ROUTES } from "../../utils/routes";
import MarqueeCarousel from "../components/marqueeCarousel";

const Home: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <h1>Home</h1>
      <MarqueeCarousel />
      <Button variant="contained" onClick={() => router.push(ROUTES.main)}>
        Go Main
      </Button>
    </div>
  );
};

export default Home;
