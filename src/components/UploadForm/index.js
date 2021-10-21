import { lazy, useState } from "react";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { styled } from "@mui/material/styles";
import axiosInstance from "utils/axios";

const Box = lazy(() => import("@mui/material/Box"));
const Paper = lazy(() => import("@mui/material/Paper"));
const Button = lazy(() => import("@mui/material/Button"));
const Divider = lazy(() => import("@mui/material/Divider"));
const Container = lazy(() => import("@mui/material/Container"));
const TextField = lazy(() => import("@mui/material/TextField"));
const ChooseFile = lazy(() => import("components/ChooseFile"));
const Typography = lazy(() => import("@mui/material/Typography"));
const LinearProgressWithLabel = lazy(() => import("components/LinearProgressWithLabel"));
const SuccessDialog = lazy(() => import("components/SuccessDialog"));

const StyledDivider = styled(Divider)({
  marginTop: "1.5rem",
  marginBottom: "1rem",
});

export default function UploadForm() {
  const [value, setValue] = useState({
    name: "",
    language: "",
    releasedYear: new Date(),
  });
  const [error, setError] = useState({
    name: "",
    language: "",
    releasedYear: "",
    video: false,
    thumbnail: false,
  });
  const [res, setRes] = useState("");
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [progress, setProgress] = useState(null);

  const handleClose = () => {
    setRes("");
  };

  const handleMedia = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type.match("video.*")) {
        // check file extension is mp4 only
        if (file.name.match(/\.(mp4)$/)) {
          setError({ ...error, video: false });
          setVideo(file);
        } else {
          setError({ ...error, video: true });
        }
      } else if (file.type.match("image.*")) {
        // check file type is jpg, png and jpeg only
        if (file.name.match(/\.(jpg|png|jpeg)$/)) {
          setError({ ...error, thumbnail: false });
          setThumbnail(file);
        } else {
          setError({ ...error, thumbnail: true });
        }
      }
    }
  };

  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  const handleDate = (newDate) => {
    setValue({ ...value, releasedYear: newDate });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //prevent the form from submitting
    const formData = new FormData();

    formData.append("name", value.name);
    formData.append("language", value.language);
    formData.append("releasedYear", value.releasedYear.toISOString());
    formData.append("video", video);
    formData.append("thumbnail", thumbnail);

    axiosInstance
      .post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (data) => {
          //Set the progress value to show the progress bar
          setProgress(Math.round((100 * data.loaded) / data.total));
        }
      })
      .then(({ data }) => {
        setProgress(null);
        setValue({
          name: "",
          language: "",
          releasedYear: new Date(),
        });
        setVideo(null);
        setThumbnail(null);
        setRes(data.message);
      })
      .catch((error) => {
        console.log(error);
        const { code } = error?.response?.data;
        console.error(code);
      });
  };

  return (
    <Container style={{ marginTop: 40 }}>
      <SuccessDialog open={res !== ""} handleClose={handleClose} title={res}/>
      <Paper elevation={16}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          paddingTop={3}
          paddingBottom={3}
          paddingLeft={3}
          paddingRight={3}
          onSubmit={handleSubmit}
        >
          <Typography variant="h3" textAlign="center">
            Upload Movie
          </Typography>
          <StyledDivider />
          {progress !== null && <LinearProgressWithLabel value={progress} />}
          <TextField
            id="movie-name"
            name="name"
            label="Movie Name"
            variant="outlined"
            margin="normal"
            value={value.name}
            onChange={handleChange}
            fullWidth
            disabled={progress !== null}
          />
          <TextField
            id="movie-language"
            name="language"
            label="Movie Language"
            variant="outlined"
            margin="normal"
            value={value.language}
            onChange={handleChange}
            fullWidth
            disabled={progress !== null}
          />
          <ChooseFile
            error={error.video}
            value={video ? video.name : ""}
            id="movie"
            name="video"
            label="Movie"
            margin="normal"
            helperText={"Only mp4 file is allowed"}
            onChange={handleMedia}
            accept="video/*"
            fullWidth
            disabledSelectFile={progress !== null}
          />
          <ChooseFile
            error={error.thumbnail}
            value={thumbnail ? thumbnail.name : ""}
            id="thumbnail"
            name="thumbnail"
            label="Thumbnail"
            margin="normal"
            helperText={"Only jpg, png and jpeg file is allowed"}
            onChange={handleMedia}
            accept="image/*"
            fullWidth
            disabledSelectFile={progress !== null}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="dd/MM/yyyy"
              value={value.releasedYear}
              onChange={handleDate}
              renderInput={(params) => (
                <TextField {...params} margin="normal" />
              )}
              disabled={progress !== null}
            />
          </LocalizationProvider>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            style={{ marginTop: 20 }}
            disabled={
              error.name ||
              error.language ||
              error.video ||
              error.thumbnail ||
              !video ||
              !thumbnail ||
              progress !== null
            }
          >
            Upload
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
