import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Rating,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab,
  ImageList,
  ImageListItem,
  Dialog,
  DialogContent,
  CircularProgress,
  Skeleton,
  Modal,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  getGame,
  getGameScreenshots,
  getGameAchievements,
  getGameRedditPosts,
} from "../api/rawg";
import Layout from "../components/Layout";
import Grid from "@mui/material/Grid2";
import { circularProgressClasses } from "@mui/material/CircularProgress";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function GameDetail() {
  const [game, setGame] = useState<any>(null);
  const [screenshots, setScreenshots] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [redditPosts, setRedditPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [openScreenshot, setOpenScreenshot] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [expandedAchievement, setExpandedAchievement] = useState<any>(null);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function fetchGameDetails() {
      if (id) {
        setLoading(true);
        const [gameData, screenshotData, achievementData, redditData] =
          await Promise.all([
            getGame(id as string),
            getGameScreenshots(id as string),
            getGameAchievements(id as string),
            getGameRedditPosts(id as string),
          ]);

        if (gameData) setGame(gameData);
        if (screenshotData) setScreenshots(screenshotData.results || []);
        if (achievementData) setAchievements(achievementData.results || []);
        if (redditData) setRedditPosts(redditData.results || []);

        setLoading(false);
      }
    }
    fetchGameDetails();
  }, [id]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleClickOpen = (image: string) => {
    setSelectedImage(image);
    setOpenScreenshot(true);
  };

  const handleClose = () => {
    setOpenScreenshot(false);
  };

  const handleExpand = (achievement: any) => {
    setExpandedAchievement(achievement);
  };

  const handleModalClose = () => {
    setExpandedAchievement(null);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!game) {
    return <Typography>No game data found.</Typography>;
  }

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="img"
              src={game.background_image}
              alt={game.name}
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
                boxShadow: 3,
                mb: 2,
                "&:hover": {
                  transform: "scale(1.02)",
                  transition: "transform 0.3s ease-in-out",
                },
              }}
            />
            <ImageList
              sx={{
                width: "100%",
                height: 450,
                [`& .MuiImageListItem-root`]: {
                  borderRadius: "8px",
                },
              }}
              cols={3}
              rowHeight={164}
            >
              {screenshots.length > 0
                ? screenshots.map((screenshot) => (
                    <ImageListItem
                      key={screenshot.id}
                      onClick={() => handleClickOpen(screenshot.image)}
                      sx={{
                        cursor: "pointer",
                        transition: "transform 0.3s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.02)",
                        },
                      }}
                    >
                      <img
                        src={`${screenshot.image}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${screenshot.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt="Game screenshot"
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))
                : Array.from(new Array(9)).map((_, index) => (
                    <ImageListItem key={index}>
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={164}
                        sx={{
                          borderRadius: 2,
                          [`& .MuiSkeleton-rect`]: {
                            borderRadius: "8px",
                          },
                        }}
                      />
                    </ImageListItem>
                  ))}
            </ImageList>
            <Dialog open={openScreenshot} onClose={handleClose} maxWidth="lg">
              <DialogContent>
                <img
                  src={selectedImage}
                  alt="Game screenshot"
                  style={{ width: "100%", height: "auto" }}
                />
              </DialogContent>
            </Dialog>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ borderRadius: "8px", boxShadow: 3 }}>
              <CardHeader
                title={game.name}
                subheader={`Released on ${game.released}`}
                sx={{ "& .MuiCardHeader-title": { fontWeight: "bold" } }}
              />
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    mb: 2,
                    "& .MuiChip-root": {
                      borderRadius: "8px",
                      fontWeight: "bold",
                    },
                  }}
                >
                  {game.genres.map((genre: any) => (
                    <Chip key={genre.id} label={genre.name} color="primary" />
                  ))}
                  {game.platforms.map((platform: any) => (
                    <Chip
                      key={platform.platform.id}
                      label={platform.platform.name}
                      color="secondary"
                    />
                  ))}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    "& .MuiRating-root": {
                      fontSize: "1.5rem",
                    },
                  }}
                >
                  <Rating
                    name="game-rating"
                    value={game.rating}
                    precision={0.5}
                    readOnly
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ ml: 1 }}
                  >
                    ({game.ratings_count} reviews)
                  </Typography>
                </Box>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Game Description</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      variant="body2"
                      dangerouslySetInnerHTML={{
                        __html: game.description,
                      }}
                    />
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Metacritic Scores</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>Metacritic Score: {game.metacritic}</Typography>
                    <ul>
                      {game.metacritic_platforms.map((platform: any) => (
                        <li key={platform.url}>
                          {platform.platform.name}: {platform.metascore} (
                          <a
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View on Metacritic
                          </a>
                          )
                        </li>
                      ))}
                    </ul>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
            <Box sx={{ width: "100%", mt: 4 }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  aria-label="game information tabs"
                  sx={{
                    "& .MuiTabs-indicator": {
                      backgroundColor: "primary.main",
                    },
                  }}
                >
                  <Tab label="Achievements" />
                  <Tab label="Reddit Posts" />
                </Tabs>
              </Box>
              <TabPanel value={tabValue} index={0}>
                <Box>
                  {achievements.length > 0 ? (
                    <Grid container spacing={2}>
                      {achievements.map((achievement: any) => (
                        <Grid
                          size={{ xs: 12, sm: 6, md: 4 }}
                          key={achievement.id}
                        >
                          <Card
                            sx={{
                              borderRadius: 2,
                              boxShadow: 2,
                              padding: 2,
                              height: 180,
                              overflow: "hidden",
                              position: "relative",
                              transition: "transform 0.3s ease-in-out",
                              "&:hover": {
                                transform: "scale(1.05)",
                              },
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: "bold", mb: 1 }}
                            >
                              {achievement.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {achievement.description}
                            </Typography>
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 8,
                                right: 8,
                                cursor: "pointer",
                              }}
                              onClick={() => handleExpand(achievement)}
                            >
                              <Typography variant="caption" color="primary">
                                Read More
                              </Typography>
                            </Box>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Typography>No achievements available.</Typography>
                  )}
                </Box>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <Box
                  sx={{
                    maxHeight: 400,
                    overflowY: "auto",
                    pr: 2,
                    "& .MuiCard-root": {
                      borderRadius: "8px",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  {redditPosts.length > 0 ? (
                    <Grid container spacing={2}>
                      {redditPosts.map((post: any) => (
                        <Grid size={{ xs: 12 }} key={post.id}>
                          <Card
                            sx={{
                              transition: "transform 0.3s ease-in-out",
                              "&:hover": {
                                transform: "scale(1.05)",
                              },
                            }}
                          >
                            <CardContent>
                              <Typography
                                variant="h6"
                                sx={{ fontWeight: "bold", mb: 1 }}
                              >
                                {post.name}
                              </Typography>
                              {post.subreddit && (
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {`Posted in r/${post.subreddit}`}
                                </Typography>
                              )}
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 1 }}
                              >
                                {post.text && post.text.length > 200
                                  ? `${post.text.substring(0, 200)}...`
                                  : post.text || "No description provided."}
                              </Typography>
                              <Box sx={{ mt: 2 }}>
                                <a
                                  href={post.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ textDecoration: "none" }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      color: "primary.main",
                                      "&:hover": {
                                        textDecoration: "underline",
                                      },
                                    }}
                                  >
                                    <Typography variant="body2" sx={{ mr: 1 }}>
                                      Read Full Post
                                    </Typography>
                                    <OpenInNewIcon fontSize="small" />
                                  </Box>
                                </a>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Typography>No Reddit posts available.</Typography>
                  )}
                </Box>
              </TabPanel>
            </Box>
          </Grid>
        </Grid>

        {/* Modal for showing full achievement description */}
        <Modal open={!!expandedAchievement} onClose={handleModalClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton onClick={handleModalClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              {expandedAchievement?.name}
            </Typography>
            <Typography>{expandedAchievement?.description}</Typography>
          </Box>
        </Modal>
      </Container>
    </Layout>
  );
}
