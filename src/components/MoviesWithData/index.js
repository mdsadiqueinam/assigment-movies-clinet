import { lazy } from "react";
import MovieCard from "components/MovieCard";

const Container = lazy(() => import("@mui/material/Container"));

export default function MoviesWithData({ data }) {
  console.log(data);
  return (
    <Container
      sx={{
        display: "flex",
        flexWrap: "wrap",
        marginTop: "2rem",
        spacing: "1rem",
        columnGap: "1rem",
        rowGap: "1rem",
        justifyContent: "center",
      }}
    >
      {data.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
      ))}
    </Container>
  );
}
