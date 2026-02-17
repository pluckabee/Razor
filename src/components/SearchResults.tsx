//Movie Results dumb component

import { MovieCard } from "./MovieCard";
import type { OMDBSearchResult } from "../types/types";
import { Grid } from "@mui/material";

interface SearchResultsProps {
  movies: OMDBSearchResult[];
}

export function SearchResults({ movies }: SearchResultsProps) {
  return (
    <Grid container spacing={2}>
      {movies.map((movie) => (
        <Grid key={movie.imdbID} size={4}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
}   