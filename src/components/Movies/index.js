import { lazy, Suspense, useState, useEffect } from "react";
import { LinearProgress } from "@mui/material";
import axiosInstance from "utils/axios";

const MoviesWithData = lazy(() => import("components/MoviesWithData"));
const TablePagination = lazy(() => import("@mui/material/TablePagination"));

function fetchMovies(page, rowsPerPage, setLoading, setMovies, setTotal) {
  try {
    setLoading(true);
    axiosInstance
      .get(`/list?page=${page}&limit=${rowsPerPage}`)
      .then(({ data }) => {
        setMovies(data.movies);
        setTotal(data.total);
        setLoading(false);
      });
  } catch (error) {
    console.error(error);
  }
}

export default function Movies() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [movies, setMovies] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    fetchMovies(page, rowsPerPage, setLoading, setMovies, setTotal);
  }, [page, rowsPerPage]);

  return (
    <Suspense fallback={<LinearProgress />}>
      { loading && <LinearProgress color="secondary" /> }
      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <MoviesWithData data={movies}/>
    </Suspense>
  );
}
