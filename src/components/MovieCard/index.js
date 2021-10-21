import { lazy, useState } from "react";
import axiosInstance from "utils/axios";

const Card = lazy(() => import("@mui/material/Card"));
const CardContent = lazy(() => import("@mui/material/CardContent"));
const CardMedia = lazy(() => import("@mui/material/CardMedia"));
const Typography = lazy(() => import("@mui/material/Typography"));
const CardActionArea = lazy(() => import("@mui/material/CardActionArea"));

export default function MovieCard({
  movie: { video, thumbnail, name, language, releasedYear },
}) {
  const [play, setPlay] = useState(false);

  const handlePlay = () => {
    setPlay(true);
    console.log("play");
  };

  const onThumbnail = play
    ? {}
    : {
        cursor: "pointer",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "scale(1.1)",
        },
      };

  const onPlayProps = play
    ? {
        component: "iframe",
        src: `${axiosInstance.defaults.staticUrl}${video}`,
        autoPlay: true,
        allowFullScreen: true,
        allow: "autoplay",
      }
    : {
        onClick: handlePlay,
        component: "img",
        image: `${axiosInstance.defaults.staticUrl}${thumbnail}`,
      };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        height="200"
        alt={name}
        sx={onThumbnail}
        {...onPlayProps}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Language: {language}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Released: {new Date(releasedYear).toDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
}
