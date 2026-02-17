//Movie Results dumb component

import { MovieCard } from "./MovieCard";
import type { OMDBSearchResult } from "../types/types";
import { Grid } from "@mui/material";

interface SearchResultsProps {
  movies: OMDBSearchResult[];
}

export function SearchResults({ movies }: SearchResultsProps) {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 4, md: 12 }}>
      {movies.map((movie) => (
        <Grid key={movie.imdbID} size={{ xs: 1, sm: 2, md: 4 }} >
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
}   