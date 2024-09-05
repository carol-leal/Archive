import Button from "@mui/material/Button";
import { ROUTES } from "../utils/routes";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <Button variant="contained" onClick={() => router.push(ROUTES.home)}>
      Go Home
    </Button>
  );
}
