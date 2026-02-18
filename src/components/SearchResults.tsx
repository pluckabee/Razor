//Movie Results dumb component

import { MovieCard } from "./MovieCard";
import type { OMDBSearchResult } from "../types/types";
import { Grid } from "@mui/material";
import { useReviews } from "../hooks/useReviews";

interface SearchResultsProps {
  movies: OMDBSearchResult[];
}

export function SearchResults({ movies }: SearchResultsProps) {
  const { reviews } = useReviews();

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 4, md: 12 }}>
      {movies.map((movie) => {
        const review = reviews.find((entry) => entry.imdbID === movie.imdbID);
        return (
          <Grid key={movie.imdbID} size={{ xs: 1, sm: 2, md: 4 }}>
            <MovieCard movie={movie} userScore={review?.score} />
          </Grid>
        );
      })}
    </Grid>
  );
}   