import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { ROUTES } from "../../utils/routes";

const Home: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <h1>Home</h1>
      <Button variant="contained" onClick={() => router.push(ROUTES.main)}>
        Go Main
      </Button>
    </div>
  );
};

export default Home;
